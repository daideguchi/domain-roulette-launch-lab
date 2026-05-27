from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

readme = (ROOT / "README.md").read_text()
readme_ja = (ROOT / "README.ja.md").read_text()
index = (ROOT / "index.html").read_text()

required = [
    (readme, "README.ja.md"),
    (readme_ja, "一言でいうと"),
    (readme_ja, "はじめての使い方"),
    (readme_ja, "30秒レビュー手順"),
    (readme_ja, "画面の見方"),
    (readme_ja, "主張の境界"),
    (index, 'data-lang-button="ja"'),
    (index, "3つのランダムドメインを、提出できる事業案に変える。"),
    (index, "30秒レビュー手順"),
]

missing = [marker for text, marker in required if marker not in text]
if missing:
    raise SystemExit("missing Japanese support markers: " + ", ".join(missing))

print("domain_roulette_launch_lab_japanese_support_ok")

