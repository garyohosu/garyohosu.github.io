---
on:
  schedule: daily

permissions:
  contents: read
  issues: read
  pull-requests: read

safe-outputs:
  create-issue:
    title-prefix: "[AI report] "

tools:
  github:
---

# Daily Report

Create a daily report of repository status.

Include:

- new issues
- merged PRs
- problems found
- suggestions
