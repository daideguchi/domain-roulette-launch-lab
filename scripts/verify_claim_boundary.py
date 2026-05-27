from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

joined = "\n".join(
    [
        (ROOT / "README.md").read_text(),
        (ROOT / "README.ja.md").read_text(),
        (ROOT / "index.html").read_text(),
    ]
)

required = [
    "does not claim access to the official name.com random domain draw",
    "official domain draw",
    "スコアは作業仮説",
    "公式ルーレットそのものではありません",
]

for marker in required:
    if marker not in joined:
        raise SystemExit(f"missing claim boundary marker: {marker}")

for forbidden in [
    "official winner",
    "guaranteed revenue",
    "real user validation",
    "正式な受賞",
    "収益保証",
]:
    if forbidden in joined:
        raise SystemExit(f"forbidden claim found: {forbidden}")

print("domain_roulette_launch_lab_claim_boundary_ok")

