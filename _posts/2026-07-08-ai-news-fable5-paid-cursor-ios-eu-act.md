---
layout: post
title: "Claude Fable 5が有料化、CursorのiOSアプリ公開、EU AI法が8月に施行へ ── 2026年7月第2週のAIニュース"
date: 2026-07-08 06:00:00 +0900
categories: [AI, ニュース]
tags: [Claude, Anthropic, Cursor, "EU AI Act", AIエージェント, 規制, セキュリティ]
image:
  path: /assets/img/ai-news-manga-2026-07-08.png
  alt: 2026年7月第2週のAIニュース漫画
---

## 今週のAIニュース漫画

![今週のAIニュース漫画](/assets/img/ai-news-manga-2026-07-08.png)

---

## 導入：AIが「日常インフラ」に変わる週

2026年7月第2週は、AIが便利なツールから「生活・仕事のインフラ」へと本格移行する出来事が相次ぎました。最強クラスのモデルが有料化され、スマートフォンからAIエージェントを操れるアプリが登場し、欧州規制のカウントダウンも始まりました。この1週間を5つのテーマで振り返ります。

---

## 1. Claude Fable 5、7月8日から有料プランへ移行

Anthropic の最上位モデル「**Claude Fable 5**」は、6月9日のリリース後に米国輸出規制で一時停止を経て7月1日に再開されていましたが、**7月8日（今日）をもってProやMax・Teamプランでの無料枠が終了**しました。

| 区分 | 料金 |
|---|---|
| 入力 | $10 / 100万トークン |
| 出力 | $50 / 100万トークン |

前モデル「Claude Mythos Preview」の半額以下でありながら、**数日単位でタスクを自律実行**できるロングホライズン・エージェント能力が最大の売りです。Stripe社は「2か月かかるはずだったRubyの大規模マイグレーションを1日で完了した」と報告しています。Fable 5 はAzure（Microsoft Foundry）、AWS（Amazon Bedrock）、Google Cloudでも提供中です。

**なぜ重要か？** 最高性能モデルの課金移行は、企業が「AIを本番利用するか否か」を問われる節目です。一方、新しく **Claude Sonnet 5** が無料・Proユーザー全員のデフォルトモデルとなり、旗艦モデルに近い性能をより低コストで利用できる選択肢も整いました。

> 参考: [Anthropic — Claude Fable 5 & Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5) / [MacRumors](https://www.macrumors.com/2026/07/01/anthropic-fable-5-relaunch/)

---

## 2. CursorがiOSアプリを公開ベータ ── スマホからAIエージェントを遠隔操作

コーディングAIツール「**Cursor**」が**iOS向けアプリをパブリックベータ**として公開しました。

**主な機能:**
- クラウドまたは自分のPC上で動くAIエージェントをスマホから起動・監視・中断
- 音声入力でタスクを指示
- プッシュ通知でエージェントの進捗を受け取り、承認/修正をその場で実行

エンジニアが外出中でも「エージェントに夜通し作業させて、朝に結果を確認する」ワークフローが現実的になります。

**なぜ重要か？** AIエージェントはこれまでPCに張り付いて監視が必要でした。スマホ連携によって「人間はディレクターに徹し、AIが実行者」というスタイルが普及するきっかけになるかもしれません。

> 参考: [AI-Weekly, July 7, 2026](https://ai-weekly.ai/newsletter-07-07-2026/)

---

## 3. EU AI法、8月2日に高リスクAI義務が適用開始

**欧州連合（EU）のAI規制法「EU AI Act」** は、2026年8月2日に高リスクAI分野の義務規定が正式発効します。

**適用対象の業務領域:**
- 採用・人事評価
- 与信・ローン審査
- 医療診断支援
- 重要インフラ管理
- 生体認証・顔認識
- 教育・法執行

**違反ペナルティ:** 最大 **€3,500万（約56億円）** または全世界年間売上の7%（どちらか高い方）— GDPRを上回る水準です。

各企業はAIシステムのリスク分類、透明性ドキュメント、人間による監督体制の整備を完了させる必要があります。

**なぜ重要か？** 欧州市場に製品・サービスを展開する日本企業も無関係ではありません。グローバルなAI調達・開発基準が事実上 EU 標準に揃う可能性があります。

> 参考: [EU AI Act Compliance Guide — EchelonGraph](https://echelongraph.io/blog/eu-ai-act-2026-enforcement-guide)

---

## 4. イリノイ州がAI安全法に署名 ── 米国で州レベル規制が加速

連邦政府のAI規制が停滞するなか、**米イリノイ州のプリツカー知事が7月6日、「AI安全対策法（Artificial Intelligence Safety Measures Act）」に署名**しました。

高リスクAIシステムへの人間によるレビュー義務、影響を受けた市民への通知義務などが盛り込まれており、カリフォルニア州に続く州主導の枠組み整備として注目されています。

**なぜ重要か？** 米国は連邦単位での規制が遅れており、州ごとにルールが異なる「パッチワーク状態」が企業の負担になりつつあります。複数州での規制が揃うことで、事実上の全米基準が形成されるかもしれません。

> 参考: [WTTW — Pritzker Signs AI Safety Measures Act](https://news.wttw.com/2026/07/06/pritzker-signs-landmark-ai-regulation-bill-aims-mitigate-risks)

---

## 5. 中国AI勢がOpenRouterトラフィックの45%を占有、セキュリティ脆弱性も浮上

**中国AIプロバイダーが OpenRouter（AI APIの仲介プラットフォーム）トラフィックの約45%を処理**していることが明らかになりました。小米（Xiaomi）が週4.21兆トークン（21.1%）でトップ、OpenAIは7.5%にとどまっています。

一方でセキュリティ面では、AI推論プロキシ「**LiteLLM**」に深刻な脆弱性（CVE-2026-42271）が発見されました。MCP（Model Context Protocol）エンドポイントを悪用することでサーバー全体へのアクセス、さらにはOpenAI/Anthropicのすべての**APIキーが漏洩する可能性**があるとされています。LiteLLM を利用中の場合は速やかにパッチ適用が推奨されます。

**なぜ重要か？** AIインフラが分散・多様化するほど、サプライチェーンの脆弱性リスクも広がります。「どのAIを使っているか」だけでなく、「どのインフラで動かしているか」も管理対象になりつつあります。

> 参考: [LLM Stats — AI News July 2026](https://llm-stats.com/ai-news)

---

## まとめ：AIと「責任」が同時進行する時代へ

今週のニュースに共通するのは、**「AIの能力拡張」と「責任の明確化」が同時に進んでいる**という点です。

- 最強モデルが有料化され、本番利用の経済判断が問われる
- スマホからエージェントを制御できる時代に
- EU・米州レベルで規制が本格施行フェーズへ
- インフラ脆弱性がAPIキー漏洩という実害につながりうる

AIは「試すもの」から「運用・管理・リスク評価するもの」へと移行しています。個人も企業も、ツールの便利さと同じくらい、使い方のルールとリスクへの理解が問われる局面です。

---

*Sources:*
- [Anthropic — Claude Fable 5 & Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5)
- [MacRumors — Fable 5 Relaunch](https://www.macrumors.com/2026/07/01/anthropic-fable-5-relaunch/)
- [Azure Blog — Claude Fable 5 in Microsoft Foundry](https://azure.microsoft.com/en-us/blog/claude-fable-5-is-now-available-in-microsoft-foundry-powering-the-next-era-of-autonomous-agents/)
- [AI-Weekly Newsletter July 7, 2026](https://ai-weekly.ai/newsletter-07-07-2026/)
- [EchelonGraph — EU AI Act Compliance 2026](https://echelongraph.io/blog/eu-ai-act-2026-enforcement-guide)
- [WTTW — Illinois AI Safety Measures Act](https://news.wttw.com/2026/07/06/pritzker-signs-landmark-ai-regulation-bill-aims-mitigate-risks)
- [LLM Stats — AI News July 2026](https://llm-stats.com/ai-news)
