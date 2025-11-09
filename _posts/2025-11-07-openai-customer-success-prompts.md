---
layout: post
title: "OpenAI Academy公開：カスタマーサクセス向けChatGPTプロンプト集メモ"
date: 2025-11-07 15:40:00 +0900
categories: [blog, link]
tags: [OpenAI, Prompt, Customer Success, ChatGPT]
description: OpenAI Academyが公開した「ChatGPT for customer success」を整理。オンボーディング、競合調査、アカウントプランニング、ヘルス分析、図解生成まで24本のプロンプトをリンク付きでまとめました。
---

OpenAI Academy（Work Users Club）で新しく公開されたリソース「[ChatGPT for customer success](https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-customer-success)」が、CSチームの日常業務にそのまま流用できるプロンプト集だったのでメモを残します。オンボーディング設計から競合リサーチ、QBR準備、ヘルススコア分析、図解まで「こう書けばいい」が揃っていました。

## 5つのカテゴリで24本のプロンプト

1. **Onboarding & lifecycle strategy** – オンボ/リテンションのテンプレ、フィードバック要約、プロアクティブ施策づくり。
2. **Competitive & benchmark research** – 組織・指標・ツール・競合施策のベンチマーク。
3. **Account planning & renewal prep** – QBRやエグゼクティブ向けの準備資料、更新前のリスク整理。
4. **Data & health analysis** – 指標定義、CSAT分析、サポチケ/利用ログ分析、ヘルススコア策定。
5. **Visual & diagram design** – ジャーニーマップやエスカレーションフローなどの図解生成。

以下は各章の代表プロンプト（角括弧は自社情報に差し替え、リンクから直接ChatGPTを開けます）。

### 1. Onboarding & lifecycle strategy

- **Create onboarding plan template** — 週次マイルストーンと担当者を含むオンボ計画テンプレを自動生成。[ChatGPTで開く](https://chatgpt.com/?prompt=Create%20a%20reusable%20onboarding%20plan%20template%20for%20%5Btype%20of%20customer%5D.%20Reference%20typical%20timelines%2C%20milestones%2C%20and%20stakeholder%20alignment%20needs.%20Format%20as%20a%20week-by-week%20table%20with%20task%20owners%20and%20goals.)
- **Summarize onboarding feedback** — 指定セグメント10社分のメモ/アンケートから勝ち筋・阻害要因・提案を要約。[ChatGPTで開く](https://chatgpt.com/?prompt=Summarize%20onboarding%20feedback%20from%20our%20last%2010%20customers%20in%20%5Bsegment%5D.%20Use%20these%20shared%20notes%20and%20survey%20answers.%20Output%20a%20short%20paragraph%20per%20theme%3A%20wins%2C%20blockers%2C%20suggestions.)
- **Identify best practices for high-touch onboarding** — ACV100万ドル超のハイタッチ施策を引用付きで箇条書き化。[ChatGPTで開く](https://chatgpt.com/?prompt=Research%20how%20leading%20B2B%20companies%20structure%20high-touch%20onboarding%20journeys.%20Focus%20on%20companies%20with%20%241M%2B%20ACV%20and%20hybrid%20onboarding%20models.%20Include%20sources%20and%20structure%20the%20output%20as%20a%20bulleted%20summary%20of%20key%20tactics%20with%20references.)
- **Suggest proactive playbooks** — チャーン兆候別にゴール/トリガー/CTA/タイミングを整理したプレイブックを3本生成。[ChatGPTで開く](https://chatgpt.com/?prompt=Recommend%203%20proactive%20outreach%20playbooks%20for%20at-risk%20customers%20in%20%5Bindustry/segment%5D.%20Use%20trends%20from%20recent%20churn%2C%20feature%20inactivity%2C%20and%20low%20engagement.%20Output%20should%20include%3A%20goal%2C%20trigger%2C%20CTA%2C%20and%20timing.)
- **Brainstorm retention incentives** — ダウングレード懸念アカウント向けに既存案5＋新規案5をメリデメ付きで提案。[ChatGPTで開く](https://chatgpt.com/?prompt=Suggest%20creative%20retention%20strategies%20for%20accounts%20likely%20to%20downgrade%20in%20%5Bindustry%5D.%20Use%20trends%20in%20usage%20and%20renewal%20hesitations%20we%E2%80%99ve%20seen.%20Output%205%20tested%20and%205%20novel%20ideas%20with%20pros/cons.)

### 2. Competitive & benchmark research

- **Benchmark CS org structure** — セグメント別の担当体制と売上比率を比較表で取得。[ChatGPTで開く](https://chatgpt.com/?prompt=Benchmark%20the%20CS%20org%20structure%20for%20companies%20like%20ours%20in%20%5Bindustry%2C%20size%5D.%20Focus%20on%20roles%20per%20customer%20segment%20and%20ratio%20to%20revenue.%20Output%20as%20a%20comparison%20table%20with%20notes%20on%20headcount%20ratios.)
- **Benchmark success metrics by industry** — ヘルス指標（CSAT/NRR/NPS等）の業界別ベンチマークを引用付きで並べる。[ChatGPTで開く](https://chatgpt.com/?prompt=Research%20top%203%20success%20metrics%20used%20for%20customer%20health%20scoring%20in%20the%20%5Bindustry%5D%20sector.%20Include%20CSAT%2C%20NRR%2C%20usage%20frequency%2C%20or%20other%20emerging%20benchmarks.%20Output%20as%20a%20table%20comparing%20metric%2C%20source%2C%20and%20benchmark%20value%20with%20citations.)
- **Evaluate CS tooling stacks** — 事業ステージ別（アーリー/グロース/エンプラ）のCSツール群をチャート化。[ChatGPTで開く](https://chatgpt.com/?prompt=Research%20typical%20Customer%20Success%20tech%20stacks%20for%20companies%20in%20early-stage%2C%20growth-stage%2C%20and%20enterprise.%20Include%20categories%20%28e.g.%2C%20CRM%2C%20Success%20Platform%2C%20Analytics%29.%20Output%20a%20comparison%20chart%20with%20examples%20and%20usage%20notes.)
- **Competitive enablement summary** — 競合3社の導入後サクセス支援（リソース/体制/形式）を表で比較。[ChatGPTで開く](https://chatgpt.com/?prompt=Research%20how%20competitors%20are%20supporting%20enterprise%20customers%20post-sale%20in%20%5Bindustry%5D.%20Include%20examples%20of%20success%20resources%2C%20team%20structure%2C%20and%20onboarding%20formats.%20Output%20as%20a%20table%20comparing%203%20competitors%20with%20pros/cons%20per%20tactic.)
- **Create competitive comparison of CS programs** — 上位3社のCSプログラム（オンボ/ヘルストラッキング/拡張戦略）をマトリクス化。[ChatGPTで開く](https://chatgpt.com/?prompt=Research%20what%20customer%20success%20programs%20look%20like%20at%20our%20top%203%20competitors.%20Focus%20on%20onboarding%2C%20health%20tracking%2C%20and%20expansion%20strategies.%20Output%20a%20comparison%20matrix.)

### 3. Account planning & renewal prep

- **Draft executive email update** — 週次アップデートをエグゼクティブ向け3行メールに整形。[ChatGPTで開く](https://chatgpt.com/?prompt=Write%20a%20weekly%20update%20email%20for%20%5Bexecutive%20stakeholder%20at%20customer%5D.%20Use%20these%20internal%20notes%20from%20this%20week%E2%80%99s%20call%20and%20usage%20metrics%3A%20%5Bpaste%20here%5D.%20Output%20should%20be%20a%20short%2C%20polished%20email%20with%203%20bullets.)
- **Draft QBR talking points** — wins/risks/usageハイライトを内部向けQBR台本に変換。[ChatGPTで開く](https://chatgpt.com/?prompt=Summarize%20the%20top%20wins%2C%20risks%2C%20and%20product%20usage%20highlights%20for%20%5BCustomer%20Name%5D%20ahead%20of%20our%20QBR.%20Use%20their%20latest%20health%20score%2C%20usage%20trends%2C%20and%20support%20ticket%20history.%20Format%20as%20a%20bulleted%20prep%20doc%20for%20internal%20review.)
- **Prep for renewal call** — 契約条件/利用状況/リスク/アップセル観点をチェックリスト化。[ChatGPTで開く](https://chatgpt.com/?prompt=Create%20a%20renewal%20call%20prep%20checklist%20for%20%5BCustomer%20Name%5D.%20Include%20contract%20terms%2C%20current%20usage%2C%20known%20risks%2C%20and%20upsell%20potential.%20Output%20as%20a%20bulleted%20checklist.)
- **Create account plan summary** — 直近2回の議事録と契約情報を1ページのアカウントプランに再構成。[ChatGPTで開く](https://chatgpt.com/?prompt=Draft%20a%201-pager%20account%20plan%20for%20%5BCustomer%20Name%5D.%20Use%20notes%20from%20our%20last%202%20calls%20%2B%20contract%20info%20%2B%20goals%3A%20%5Bpaste%20here%5D.%20Output%20should%20be%20formatted%20as%20goals%2C%20blockers%2C%20actions%2C%20and%20renewals.)
- **Outline renewal risk summary** — 更新リスク（利用/感情/契約メモ）を1段落＋推奨アクションで共有。[ChatGPTで開く](https://chatgpt.com/?prompt=Draft%20a%20renewal%20risk%20summary%20for%20%5BCustomer%20Name%5D%20ahead%20of%20our%20internal%20forecast%20call.%20Include%20their%20renewal%20date%2C%20usage%20trend%2C%20sentiment%2C%20and%20contract%20notes.%20Output%20should%20be%20a%20paragraph%20summary%20%2B%201-line%20recommendation.)

### 4. Data & health analysis

- **Outline success metrics by segment** — 指標×定義の2列テーブルでセグメント別成功指標を草案化。[ChatGPTで開く](https://chatgpt.com/?prompt=Outline%20a%20draft%20list%20of%20success%20metrics%20for%20%5Bsegment%5D%20customers.%20Include%20adoption%20goals%2C%20engagement%20targets%2C%20and%20renewal%20benchmarks.%20Format%20as%20a%202-column%20table%3A%20Metric%20%7C%20Definition.)
- **Evaluate CSAT score distribution** — CSATサーベイから平均/外れ値/トップフィードバックを抽出。[ChatGPTで開く](https://chatgpt.com/?prompt=Review%20this%20CSAT%20survey%20data%20from%20Q2.%20Calculate%20overall%20average%2C%20identify%20outlier%20scores%2C%20and%20summarize%20feedback%20themes%20if%20available.%20Output%20as%20a%20short%20summary%20with%20key%20stats%20and%20top%20positive%2Fnegative%20feedback%20examples.)
- **Analyze support ticket trends** — サポートチケットExportから頻出TOP5と根本要因をランキング化。[ChatGPTで開く](https://chatgpt.com/?prompt=Examine%20this%20export%20of%20support%20tickets%20from%20the%20last%20quarter.%20Identify%20the%20top%205%20recurring%20issues%20and%20provide%20a%20short%20summary%20of%20root%20causes.%20Output%20should%20include%20a%20ranked%20list%20with%20issue%2C%20frequency%2C%20and%20potential%20CS%20actions.)
- **Spot early signs of churn** — 90日分の利用ログを見て危険兆候（利用減/ログイン頻度/サポチケ）を可視化。[ChatGPTで開く](https://chatgpt.com/?prompt=Review%20this%20customer%20usage%20data%20from%20the%20past%2090%20days.%20Identify%20any%20customers%20who%20may%20be%20at%20risk%20of%20churning%20based%20on%20usage%20drop%2C%20login%20frequency%2C%20or%20support%20interactions.%20Summarize%20the%20findings%20in%20a%20table%20with%20columns%3A%20Customer%20Name%20%7C%20Risk%20Factor%20%7C%20Notes.)
- **Standardize customer health scoring** — 利用率/NPS/更新状況/チケ数などを重み付きスコアにまとめる。[ChatGPTで開く](https://chatgpt.com/?prompt=Build%20a%20draft%20health%20scoring%20rubric%20for%20%5Bsegment%20or%20region%5D.%20Use%20inputs%20like%20usage%20%25%2C%20NPS%2C%20renewal%20status%2C%20and%20ticket%20volume.%20Output%20as%20a%20table%20with%20scoring%20ranges%2C%20weights%2C%20and%20color%20indicators.)

### 5. Visual & diagram design

- **Design customer health score mock-up** — カラーゲージ付きヘルススコアのモックを生成。[ChatGPTで開く](https://chatgpt.com/?prompt=Design%20a%20visual%20mock-up%20of%20a%20color-coded%20health%20score%20gauge%20for%20customers.%20Include%20Low%2C%20Medium%2C%20High%20ranges%20with%20suggested%20numerical%20ranges%20and%20icons.%20Style%3A%20dashboard-style%2C%20clean%20lines%2C%20professional.)
- **Visualize customer journey map** — 5ステージのカスタマージャーニーマップを図解化。[ChatGPTで開く](https://chatgpt.com/?prompt=Turn%20this%20outline%20of%20customer%20lifecycle%20stages%20into%20a%20visual%20journey%20map.%20Use%20the%20stages%20and%20pain%20points%20listed%20here%3A%20%5Bpaste%20text%5D.%20Output%20as%20a%20labeled%20diagram%20with%205%20lifecycle%20stages.)
- **Illustrate escalation process flow** — CSM→Support→Engのエスカレーションフローをハンドオフ付きで描く。[ChatGPTで開く](https://chatgpt.com/?prompt=Create%20a%20diagram%20that%20illustrates%20the%20internal%20escalation%20process%20from%20CSM%20to%20Support%20to%20Engineering.%20Include%203%20levels%20of%20severity%20and%20labeled%20handoff%20points.%20Style%3A%20flowchart%20format%2C%20minimal%20colors%2C%20ready%20for%20internal%20wiki.)
- **Build a visual customer maturity model** — 4段階の成熟度モデル（行動特徴＋推奨タッチポイント）をスライド向けに描画。[ChatGPTで開く](https://chatgpt.com/?prompt=Create%20an%20image%20that%20visualizes%20a%204-stage%20customer%20maturity%20model%20for%20a%20SaaS%20platform.%20Each%20stage%20should%20have%20a%20title%2C%20key%20behavior%20pattern%2C%20and%20suggested%20CS%20touchpoint.%20Style%3A%20professional%2C%20clean%2C%20slide-ready.)

## 使うときのメモ

- **プレースホルダーを即差し替え** — `[segment]` や `[Customer Name]` などのラベルが多いので、コピー→自社語彙に一括変換すると早いです。
- **社内データを貼り付けて精度アップ** — フィードバックやヘルススコア定義はメモ/スプレッドシートをそのまま流し込むと要約精度が上がります。
- **繰り返す業務はカスタムGPT化** — 分析・図解系は入力テンプレを整えればCustom GPTや自前のオートメーションに乗せやすい構成でした。

## ひとこと

Customer Success Opsの定型仕事がほぼ網羅されていて、リンクを踏めばそのままChatGPTが起動するのが便利。自社用に微調整したテンプレートをNotionなどに貼っておけば、オンボ～更新までの「まず最初の素案」を一瞬で用意できそうです。
