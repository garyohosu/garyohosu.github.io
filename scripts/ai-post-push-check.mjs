#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const DEFAULTS = {
  workflow: "Build and Deploy",
  branch: "main",
  siteUrl: "https://garyohosu.github.io",
  maxAttempts: 24,
  delayMs: 5000,
};

function parseArgs(argv) {
  const config = { ...DEFAULTS };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === "--workflow" && next) {
      config.workflow = next;
      i += 1;
      continue;
    }

    if (arg === "--branch" && next) {
      config.branch = next;
      i += 1;
      continue;
    }

    if (arg === "--site-url" && next) {
      config.siteUrl = next.replace(/\/+$/, "");
      i += 1;
      continue;
    }

    if (arg === "--max-attempts" && next) {
      const parsed = Number.parseInt(next, 10);
      if (!Number.isNaN(parsed) && parsed > 0) {
        config.maxAttempts = parsed;
      }
      i += 1;
      continue;
    }

    if (arg === "--delay-ms" && next) {
      const parsed = Number.parseInt(next, 10);
      if (!Number.isNaN(parsed) && parsed > 0) {
        config.delayMs = parsed;
      }
      i += 1;
      continue;
    }
  }

  return config;
}

function runOrThrow(command, args, { allowFailure = false } = {}) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  const stdout = (result.stdout || "").trim();
  const stderr = (result.stderr || "").trim();

  if (!allowFailure && result.status !== 0) {
    const message = [
      `${command} ${args.join(" ")} failed with exit code ${result.status}.`,
      stdout,
      stderr,
    ]
      .filter(Boolean)
      .join("\n");
    throw new Error(message);
  }

  return { ...result, stdout, stderr };
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getLatestRun(config) {
  const args = [
    "run",
    "list",
    "--workflow",
    config.workflow,
    "--branch",
    config.branch,
    "--event",
    "push",
    "--limit",
    "1",
    "--json",
    "databaseId,status,conclusion,url,displayTitle,headSha,createdAt",
  ];

  const { stdout } = runOrThrow("gh", args);
  const runs = JSON.parse(stdout || "[]");

  if (!Array.isArray(runs) || runs.length === 0) {
    throw new Error(`No workflow run found for "${config.workflow}" on branch "${config.branch}".`);
  }

  return runs[0];
}

async function waitRunSuccess(runId) {
  const watch = runOrThrow("gh", ["run", "watch", String(runId), "--exit-status"], { allowFailure: true });
  if (watch.status !== 0) {
    const view = runOrThrow(
      "gh",
      ["run", "view", String(runId), "--json", "status,conclusion,url,jobs"],
      { allowFailure: true },
    );
    throw new Error(
      [
        `Workflow run ${runId} did not succeed.`,
        watch.stdout,
        watch.stderr,
        view.stdout,
        view.stderr,
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }
}

async function ensureRunSuccess(run) {
  if (run.status !== "completed") {
    console.log(`[ai-post-push-check] Waiting workflow run ${run.databaseId} to complete...`);
    await waitRunSuccess(run.databaseId);
    return;
  }

  if (run.conclusion !== "success") {
    throw new Error(
      `Latest workflow run ${run.databaseId} is completed but not successful (conclusion: ${run.conclusion}).`,
    );
  }
}

async function fetchStatus(url) {
  let response;
  try {
    response = await fetch(url, { method: "HEAD", redirect: "manual" });
  } catch {
    response = await fetch(url, { method: "GET", redirect: "manual" });
  }

  if (response.status === 405) {
    response = await fetch(url, { method: "GET", redirect: "manual" });
  }

  return response.status;
}

async function checkUrlWithRetry(url, maxAttempts, delayMs) {
  let lastStatus = null;
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const status = await fetchStatus(url);
      lastStatus = status;
      if (status >= 200 && status < 400) {
        return { ok: true, status, attempts: attempt };
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    if (attempt < maxAttempts) {
      await sleep(delayMs);
    }
  }

  return {
    ok: false,
    status: lastStatus,
    attempts: maxAttempts,
    error: lastError,
  };
}

function getChangedPostUrls(siteUrl) {
  const { stdout } = runOrThrow("git", ["show", "--pretty=", "--name-only", "HEAD"]);
  const lines = stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const urls = [];
  const seen = new Set();

  for (const line of lines) {
    const match = line.match(/^_posts\/\d{4}-\d{2}-\d{2}-(.+)\.md$/);
    if (!match) {
      continue;
    }

    const slug = match[1];
    const url = `${siteUrl}/posts/${slug}/`;
    if (!seen.has(url)) {
      urls.push(url);
      seen.add(url);
    }
  }

  return urls;
}

async function main() {
  const config = parseArgs(process.argv.slice(2));
  const siteUrl = config.siteUrl.replace(/\/+$/, "");

  // Quick fail if required CLIs are unavailable.
  runOrThrow("gh", ["--version"]);
  runOrThrow("git", ["--version"]);

  const run = await getLatestRun(config);
  console.log(
    `[ai-post-push-check] Latest run: ${run.databaseId} (${run.status}/${run.conclusion || "n/a"}) ${run.url}`,
  );

  await ensureRunSuccess(run);

  const rootResult = await checkUrlWithRetry(`${siteUrl}/`, config.maxAttempts, config.delayMs);
  if (!rootResult.ok) {
    throw new Error(
      `Root URL check failed: ${siteUrl}/ (status=${rootResult.status || "n/a"}, attempts=${rootResult.attempts})`,
    );
  }
  console.log(
    `[ai-post-push-check] Root URL OK: ${siteUrl}/ (status=${rootResult.status}, attempts=${rootResult.attempts})`,
  );

  const postUrls = getChangedPostUrls(siteUrl);
  if (postUrls.length === 0) {
    console.log("[ai-post-push-check] No changed _posts/*.md file in HEAD commit. Post URL checks skipped.");
    return;
  }

  for (const postUrl of postUrls) {
    const result = await checkUrlWithRetry(postUrl, config.maxAttempts, config.delayMs);
    if (!result.ok) {
      throw new Error(
        `Post URL check failed: ${postUrl} (status=${result.status || "n/a"}, attempts=${result.attempts})`,
      );
    }

    console.log(
      `[ai-post-push-check] Post URL OK: ${postUrl} (status=${result.status}, attempts=${result.attempts})`,
    );
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[ai-post-push-check] FAILED\n${message}`);
  process.exit(1);
});
