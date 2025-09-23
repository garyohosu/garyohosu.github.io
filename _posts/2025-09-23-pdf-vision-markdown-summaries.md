---
layout: post
title: "スキャンPDFをOpenAI VisionでMarkdown要約するパイプラインを実装" 
date: 2025-09-23 15:45:00 +0900
categories: [Project, OCR]
tags: [OpenAI, Vision, PDF, Markdown, Automation]
toc: true
---

社内向け「図面変更通知」などのスキャンPDFを、人が読めるMarkdownへ自動要約するパイプラインを実装しました。従来のTesseract OCR＋正規表現でのCSV出力に加え、OpenAI Visionを使った“文書として読める”要約を出力します。

## 背景
- 目的: 100件規模のスキャンPDFを短時間でレビュー可能な形へ。
- 従来: `pdf2image → 前処理 → pytesseract → 正規表現 → CSV/Excel`。
- 課題: 低品質スキャンでは表構造の復元が難しく、「文書」としての読み心地が悪い。

## 対応方針（AGENTS.mdの更新）
- PDFをページ毎に画像化し、OpenAI Vision（例: `gpt-4o-mini`）に投げて要約をMarkdownで出力。
- 出力はページ毎の`_pageN.md`と、PDF毎の`_summary.md`を生成。
- 既存のOCR/CSVフローは併存（必要に応じて利用）。

## 実装
- 追加: `src/codex_pdf_read/vision.py`
  - `summarize_page_with_openai(img)` … 画像→Vision→Markdown。
  - `summarize_pdf_to_markdowns(pdf, out_dir, combine=True)` … ページ毎＋まとめを出力。
- CLI: `scripts/export_vision.py`
  - ディレクトリ（複数PDF）も一括要約。
- 参考（OCRレポート生成）: `scripts/export_doc.py`

コード: GitHub `garyohosu/codex_pdf_read`（リポジトリにプッシュ済み）

## 使い方（Vision要約）
```bash
# 仮想環境有効化
source codex_pdf_read/.venv/bin/activate

# OpenAIのAPIキー（必須）
export OPENAI_API_KEY="<your_api_key>"
# 任意: モデルを明示
export OPENAI_VISION_MODEL="gpt-4o-mini"

# 実行（PDFディレクトリをまとめて）
cd codex_pdf_read
PYTHONPATH=src python scripts/export_vision.py \
  --input pdf \
  --outdir outputs/vision \
  --dpi 300 \
  --combine \
  --log INFO
```

- 出力先: `outputs/vision/` に `<PDF名>_pageN.md` と `<PDF名>_summary.md` が生成されます。
- APIキー未設定時はフォールバックでOCR行の抜粋をMarkdownにします（検証用）。

## 成果例（抜粋）
- 「図面変更通知」PDFを要約し、発行日・設計/承認・変更対象（図番/Rev）・変更理由などを箇条書きで整理。
- 読む観点で重要な情報を先頭にまとめ、本文はページ単位の要約に分割して配置。

## 既知の注意点
- スキャン品質が低い場合、Vision側で「不鮮明」の注記が入ることがあります（DPIやコントラスト調整で改善）。
- 機密文書の扱いに留意（API送信前にモザイク等の自動マスキングも検討中）。
- コスト最適化: JPEG品質/解像度の動的調整、ページ範囲指定、並列度制御などを順次対応予定。

## 今後
- 章立てテンプレート（概要/変更点/影響/承認/実施時期）の固定化。
- 数表を含むページの重要数値抽出（表→要約への反映）。
- `.docx`など二次出力への対応（Pandoc等）。

---

従来のCSV/Excelも残しつつ、まずは“読める”Markdownを第一成果物にしていきます。
