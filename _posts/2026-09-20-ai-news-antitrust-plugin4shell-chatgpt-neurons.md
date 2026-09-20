---
title: "AI大手4社に独禁法訴訟、Plugin4Shell脆弱性、そしてChatGPT新機能まで——2026年9月20日のAIニュース"
date: 2026-09-20 06:00:00 +0900
categories: [AI, News]
tags: [OpenAI, Anthropic, Google, AI安全性, セキュリティ, ChatGPT, 脆弱性, ニューロン]
image:
  path: /assets/img/ai-news-manga-2026-09-20.png
  alt: 今週のAIニュース漫画
---

## 今週のAIニュース漫画

![今週のAIニュース漫画](/assets/img/ai-news-manga-2026-09-20.png)

---

## 導入：AI業界が「安全と競争」の板挟みに

ここ数日、AI業界は技術革新だけでなく、法律・セキュリティ・倫理の面でも大きな動きがありました。業界最大手がAI開発の「減速」に合意したとして訴えられたり、何百万人ものユーザーが使うAIコーディングツールに深刻な脆弱性が発覚したり、一方で脳と機械をつなぐ夢の技術が実現に近づいていたりと、話題が尽きません。

今日は9月17〜20日の最新ニュースから、特に注目すべき5つのトピックをわかりやすく解説します。

---

## 1. AI大手4社に「開発減速の違法合意」で独禁法訴訟

**何が起きたか？**

2026年9月19〜20日、米国でAnthropicやOpenAI、SpaceXAI（イーロン・マスク率いるAI企業）、Googleを相手取った集団訴訟がカリフォルニア州北部地区連邦地裁に提起されました。訴状は、4社がAI開発を「不当に減速させる違法な合意」をしたと主張しています。

**なぜこうなったの？**

発端は9月12日。Anthropicの最高経営責任者ダリオ・アモダイ氏が、AI開発を業界全体で協調して減速させ安全性を優先すべきだという論考を発表。これにOpenAIのサム・アルトマン氏、SpaceXAIのイーロン・マスク氏、Google DeepMindのデミス・ハサビス氏が相次いで賛同を表明しました。

訴訟の原告（ChatGPT・Claude・Grok・Geminiの有料会員）は「各社が個別に安全策を取ることは問題ないが、競合他社と"談合"して開発ペースを抑えるのは独占禁止法違反だ」と訴えています。「合意によって有料サービスの価値を不当に下げられた」という主張です。

**なぜ重要？**

AIの安全性を守ろうとする動きが、競争法の観点から問題視される——という前例のない状況です。AIガバナンスの行方を占う重要な裁判になるかもしれません。

📰 参考: [ABC News](https://abcnews.com/Technology/wireStory/lawsuit-anthropic-openai-spacexai-google-made-illegal-agreement-136588615), [CNN Business](https://us.cnn.com/2026/09/19/business/ai-slowdown-lawsuit-antitrust)

---

## 2. AIコーディングツール4つに深刻な「Plugin4Shell」脆弱性——既にパッチ済みのものも

**何が起きたか？**

9月17〜18日、セキュリティ研究機関「AIR」が「Plugin4Shell」と呼ばれるゼロクリックRCE（遠隔コード実行）脆弱性を公開しました。この脆弱性は、**Claude Code**（Anthropic）、**Codex**（OpenAI）、**GitHub Copilot**（Microsoft）、**Gemini CLI**（Google）の4つのAIコーディングツールに存在します。

**どんな危険があるの？**

「ゼロクリック」というのは、ユーザーが何もしなくても攻撃が成立するという意味です。攻撃者は悪意のあるプラグインの更新をバックグラウンドで配信するだけで、対象のマシン上でコードを実行できてしまいます。プラグインのバージョン固定（ハッシュチェック）の仕組みを迂回できてしまう構造的な欠陥が原因です。

**現状は？**

- **Anthropic（Claude Code v2.1.179）**: パッチ済み ✅
- **OpenAI（Codex v0.146.0）**: パッチ済み ✅
- **Microsoft（GitHub Copilot）**: 未パッチ ❌
- **Google（Gemini CLI）**: 未パッチ ❌

GitHub CopilotとGemini CLIユーザーは特に注意が必要です。プラグインの自動更新には慎重に。

📰 参考: [Cybersecurity News](https://cybersecuritynews.com/plugin4shell-zero-click-rce/), [Help Net Security](https://www.helpnetsecurity.com/2026/09/18/plugin4shell-ai-coding-agents-vulnerability/)

---

## 3. ChatGPTデスクトップがChrome拡張機能に対応

**何が起きたか？**

9月18日、OpenAIはChatGPTデスクトップアプリの内蔵ブラウザでChrome拡張機能が使えるようになったと発表しました。例えば1Passwordのようなパスワードマネージャーなどをインストール・固定でき、外部のChromeウィンドウに切り替えることなく利用できます。

**ポイントは？**

内蔵ブラウザは通常のChromeプロファイルとは別の状態を保つため、プライバシーの観点から使い分けが可能です。AIアシスタントが単なるチャット画面を超えて、本格的な「仕事のハブ」として機能し始めています。

---

## 4. 人工ニューロンが本物の脳細胞と「会話」できる時代へ

**何が起きたか？**

9月18日、米ノースウェスタン大学の研究チームが、3Dプリンティングで製造した人工ニューロンが実際の生体ニューロンと電気信号をやり取りできることを発表しました。

**なぜすごいの？**

これまで脳とコンピューターをつなぐ「ブレイン・コンピューター・インターフェース（BCI）」は、電気的な信号を受け取るだけでした。今回の技術は、人工ニューロンが脳の細胞と双方向に「会話」できる可能性を示しており、将来的に脊髄損傷の治療や記憶・認知の補助に応用できると期待されています。

---

## 5. 続々登場する新AIモデル——9月の最新リリース状況

9月に入ってから、主要AIプロバイダーから多くのモデルが登場しています。

| モデル名 | 提供元 | リリース日 | 特徴 |
|---|---|---|---|
| Fable 5.1 | Anthropic | 9月1日 | Fable 5と同価格、キャッシュ読み取りを値下げ |
| Gemini 3.8 Flash | Google DeepMind | 9月2日 | 高速・低コストの最新フラッシュモデル |
| GPT-6 Astra | OpenAI | 9月上旬 | コーディング・研究・マルチステップタスクに特化 |
| Fugu Ultra v2.0 / Fugu Max | Sakana AI | 9月11日 | 国産AIの最新大型モデル |

特にGPT-6 Astraは最大コンテキスト長が105万トークン、出力が12万8000トークンという大規模な仕様で、複雑な長文タスクへの対応力が大幅に向上しています。

---

## まとめ：AI業界の「三つの問い」

今週のニュースを振り返ると、AI業界が今まさに向き合っている3つの課題が浮かび上がります。

1. **安全性 vs. 競争**: 開発ペースを業界全体で調整しようとすれば、競争法に触れる可能性がある。
2. **利便性 vs. セキュリティ**: 便利なプラグイン連携が攻撃の入り口になる可能性がある。
3. **機械 vs. 生物**: 人工知能と生体組織が融合する未来が、もはや夢物語ではない。

次世代のAIは私たちの仕事・健康・社会制度をまとめて変えようとしています。テクノロジーの進化を楽しむためにも、その「影の部分」を知ることがますます大切になっています。

---

Sources:
- [AI News Today, September 20: Top Stories | AI Weekly](https://aiweekly.co/ai-news-today)
- [Lawsuit says Anthropic, OpenAI, SpaceXAI and Google made illegal agreement on AI slowdown | ABC News](https://abcnews.com/Technology/wireStory/lawsuit-anthropic-openai-spacexai-google-made-illegal-agreement-136588615)
- [Lawsuit says Anthropic, OpenAI, SpaceXAI and Google made illegal agreement on AI slowdown | CNN Business](https://us.cnn.com/2026/09/19/business/ai-slowdown-lawsuit-antitrust)
- [Plugin4Shell Zero-Click RCE Hits Claude Code, Codex, Copilot and Gemini CLI | Cybersecurity News](https://cybersecuritynews.com/plugin4shell-zero-click-rce/)
- [Zero-click RCE vulnerability hit four major AI coding agents | Help Net Security](https://www.helpnetsecurity.com/2026/09/18/plugin4shell-ai-coding-agents-vulnerability/)
- [OpenAI, Anthropic, Google have been in talks on AI safety for weeks | TechCrunch](https://techcrunch.com/2026/09/15/openai-anthropic-google-have-been-in-talks-on-ai-safety-for-weeks/)
- [AI Updates Today (September 2026) – Latest AI Model Releases](https://llm-stats.com/llm-updates)
