---
title: "AIニュース 2026/11/10: AnthropicがFable 5.2/Mythos 5.2を発表・IPO価格帯$70〜78確定、DeepMindがRSA暗号を突破、Apple Intelligenceが有料化へ"
date: 2026-11-10 06:00:00 +0900
categories: [AI, News]
tags: [Anthropic, OpenAI, Google, DeepMind, Apple, IPO, セキュリティ, 暗号, 生成AI]
image:
  path: /assets/img/ai-news-manga-2026-11-10.png
  alt: "AIニュース 2026年11月10日"
---

今日のAIニュースは「Anthropicの二重爆弾」とも言える日。最新モデルのリリースとIPO価格帯の確定が同日に並び、AI業界の資本化と技術革新が加速していることが改めて明確になりました。さらに、Google DeepMindが暗号技術の常識を覆す発見を公表し、Apple Intelligenceがいよいよ有料化に踏み切るという動きも見えてきました。

---

## 1. AnthropicがFable 5.2とMythos 5.2をリリース——前世代より30%高速化

Anthropicは11月10日（月）、最新AIモデル「**Claude Fable 5.2**」と「**Claude Mythos 5.2**」の一般/限定公開を開始しました（[Business Standard報道](https://business-standard.com/technology/artificial-intelligence/anthropic-launches-fable-5-2-and-mythos-5-2-with-faster-ai-capabilities-126111000263_1.html)）。

**主なポイント:**
- **前バージョン（5.1）比で出力速度が約30%向上**
- **Fable 5.2**: 一般ユーザー・企業向けに広く公開
- **Mythos 5.2**: サイバーセキュリティ組織や防衛分野向けの審査済み限定提供。Anthropicが「最も高度なサイバーセキュリティエンジニアリング能力を持つモデル」と位置付ける

Mythos系モデルは発表当初から「人間のトップ研究者に匹敵するゼロデイ脆弱性発見能力」として注目されてきましたが、今回の5.2で処理速度がさらに上がり、防衛・セキュリティ企業にとっての実用性が一段と高まりました。

**なぜ重要か:** 「安全性とスピードのトレードオフなし」という方向性を示す今回のアップデートは、AIが「道具」から「実戦配備システム」へ進化したことを端的に示しています。

---

## 2. AnthropicのIPO、価格帯$70〜$78で上場申請——11月19日（水）初値予想

[CNBC報道](https://cnbc.com/2026/11/10/anthropic-sets-price-range-of-70-to-78-in-upcoming-ipo.html)によれば、AnthropicはNasdaq（ティッカー: ANT）上場に向けて公募価格帯を**1株$70〜$78**と設定。高値で完全実施された場合、**調達総額は最大約$643.5億（約9兆円）** になる見込みです。初値付きは**11月19日（水）** が最有力とされています。

**背景:**
- 評価額は**$1.1兆〜$1.3兆ドル**の範囲で市場はコンセンサスを形成中
- Goldman Sachs・Morgan Stanley・JPMorganが主幹事
- 11月26日の感謝祭前の上場を目指していたロードショーが、ついに具体的な数字を持って動き出した形

**なぜ重要か:** 「AI安全性」を旗印に掲げる企業が$1兆超の評価を受けることの意味は、単なる株式市場の出来事を超えています。「AIの危険性を最も警告してきた企業が、同時に最も高く評価される」という逆説は、資本市場がAIに対して「安全性への投資こそが最大の価値」と判断し始めた転換点を示しています。

---

## 3. Google DeepMindのAIエージェントが「RSA-1024暗号」の弱点を2つ発見

Google DeepMindは11月6日、AIエージェントが**旧来型の1024ビットRSA暗号**に2つの新しい弱点を発見したと発表しました（[InterestingEngineering報道](https://interestingengineering.com/ai-robotics/google-deepmind-agents-expose-older-encryption-flaws)）。

**発見内容:**
1. **署名偽造の可能性**: パディング（署名データの埋め込み方式）の保護が、攻撃者が署名ブロックの約半分を制御できる状況では機能しにくいことを特定。理論上の攻撃速度を従来の**1,600倍**高速化できる新手法を提示
2. **バッチ因数分解コスト削減**: 1024ビット鍵を複数処理する際のコストを、既存手法より**約30倍削減**できるアルゴリズムを発見
3. **実測値**: 既存のベンチマーク鍵で実行したテストでは、CPU時間を従来比**3.5分の1**に短縮

**重要な注意点:** DeepMindは「**2048ビット以上の現代的な鍵は安全**」と明言。今回の発見はあくまで「レガシー（旧式）環境」の脆弱性確認であり、現在主流の暗号標準への直接的な脅威ではありません。

**なぜ重要か:** AIがサイバー攻撃の「武器」になるだけでなく、「暗号学的な弱点を見つけるツール」としても機能し始めたことを示す事例です。今後、政府機関や金融機関が1024ビットRSAを使い続けるリスクが高まります。

---

## 4. NvidiaのCEO、「スパイ疑惑」で取締役会が独立調査を継続

Nvidia CEOジェンスン・フアン氏と中国のMegaspeed幹部アリス・フアン氏との関係について、**米国諜報機関が中国の対外情報機関（MSS）との関連を疑っている**との報道が続いています（[TechCrunch報道](https://techcrunch.com)）。

**現状:**
- 11月8日に報道が浮上し、Nvidiaの取締役会は独立した調査を継続中
- フアンCEOは交際関係の存在は認めたが、スパイ活動については否定
- AI半導体の圧倒的な支配力を持つNvidiaのCEOが地政学的リスクの中心に立つ

**なぜ重要か:** AIインフラを支える半導体企業のトップが「国家安全保障リスク」として調査対象になるのは前例のない事態。AI産業の地政学的リスクが経営者個人レベルにまで波及していることを示す警鐘です。

---

## 5. Rampデータ：「AI支出が横ばい」——AnthropicのIPO直前に冷水

企業カード・経費管理サービスのRampが公開した最新データによると、**AI関連の企業支出が横ばいになっている**ことが明らかになりました（[TechCrunch報道](https://techcrunch.com)）。

**背景:**
- AIツールへの企業支出が急拡大してきた2024〜2025年と比較して、2026年後半は伸びが鈍化
- 生産性向上の実感がある企業と「期待外れ」と感じる企業の格差が拡大

**なぜ重要か:** Anthropicがまさに上場しようとしているタイミングで「AI投資の実態」を示すデータが出てきたことは示唆的。資本市場が「AI成長ストーリー」に高い評価を与える一方で、現場の支出動向は必ずしも同調していません。「AIバブル」論の根拠として今後も引用されそうなデータです。

---

## 6. 米上院「PATIENT AI法」提出——医療AIを規制する新立法

米国上院でCassidy議員が「**PATIENT AI Act**」を提出したと報告されています。FDA（食品医薬品局）とMedicare（高齢者向け医療保険）におけるAI活用の規制枠組みを整備することが目的です。

**主な内容（報道ベース）:**
- FDA承認プロセスにおけるAI診断ツールの基準明確化
- Medicareが支払いを認めるAI医療アプリケーションの適格要件設定
- 患者の知る権利（AIによる診断判断の開示義務）

**なぜ重要か:** 医療分野でのAI活用は「誤診リスク」という命に直結する問題を持ちます。規制が整備されることで「医療AI市場の合法化・拡大」が起きる一方、既存の医療AIサービスには大規模な見直しが必要になる可能性があります。

---

## まとめ：「Anthropicの日」と「暗号の転換点」

11月10日は「**Anthropicが世界を動かした日**」として記録されるかもしれません。最新モデルFable 5.2/Mythos 5.2のリリースとIPO価格帯$70〜78の確定が同日に重なり、技術力と資本力の両面でAI業界のトップランナーとしての地位を誇示しました。

一方で、Google DeepMindのRSA-1024暗号突破は「AIが暗号学の壁を越える」という長年の懸念が現実に近づいていることを示します。今すぐ現代の暗号が危険になるわけではありませんが、「旧式システムを使い続けるリスク」の評価を急ぐ必要が出てきました。

Rampの支出横ばいデータが示すように、AI投資の「過熱」と「実態」の乖離は依然として続いています。Anthropicの上場は、その乖離をどう評価するかの試金石になるでしょう。

---

*参考ソース:*
- [Anthropic launches Fable 5.2 and Mythos 5.2 - Business Standard](https://business-standard.com/technology/artificial-intelligence/anthropic-launches-fable-5-2-and-mythos-5-2-with-faster-ai-capabilities-126111000263_1.html)
- [Anthropic sets IPO price range of $70 to $78 - CNBC](https://cnbc.com/2026/11/10/anthropic-sets-price-range-of-70-to-78-in-upcoming-ipo.html)
- [Google DeepMind agents expose older encryption flaws - InterestingEngineering](https://interestingengineering.com/ai-robotics/google-deepmind-agents-expose-older-encryption-flaws)
- [Google DeepMind AI agents find faster attacks on legacy RSA-1024 - LetsDataScience](https://letsdatascience.com/news/google-deepmind-ai-agents-find-faster-attacks-on-legacy-rsa-5d679013)
