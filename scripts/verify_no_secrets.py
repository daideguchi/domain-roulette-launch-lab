from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

patterns = [
    "api_key=",
    "apikey=",
    "secret_key=",
    "access_token=",
    "refresh_token=",
    "AIza",
    "sk-",
    "ghp_",
]

for path in ROOT.rglob("*"):
    if path.is_dir() or "node_modules" in path.parts or ".git" in path.parts:
        continue
    if path.name == "verify_no_secrets.py":
        continue
    if path.suffix.lower() not in {".html", ".md", ".js", ".py", ".json", ".txt"}:
        continue
    text = path.read_text(errors="ignore")
    lower = text.lower()
    for pattern in patterns:
        if pattern.lower() in lower:
            raise SystemExit(f"possible secret marker {pattern} in {path.relative_to(ROOT)}")

print("domain_roulette_launch_lab_no_secrets_ok")
