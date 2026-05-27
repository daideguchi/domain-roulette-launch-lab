# Domain Roulette Launch Lab

Live app: `https://daideguchi.github.io/domain-roulette-launch-lab/`

GitHub: `https://github.com/daideguchi/domain-roulette-launch-lab`

Demo video: `media/domain-roulette-launch-lab-demo.mp4`

Screenshot: `media/domain-roulette-launch-lab-full.png`

## One-Sentence Pitch

Domain Roulette Launch Lab helps name.com Domain Roulette teams turn three random domains into a clear product choice, MVP plan, risk check, and judge-ready submission copy.

## Who / Problem / How

Who: hackathon teams who receive three random domains from name.com.

Problem: a random domain can become a funny gimmick instead of a focused product.

How: the app scores each domain with explainable criteria, chooses a working candidate, and generates a launch brief, three-day MVP plan, validation checklist, and Devpost copy.

## 30-Second Review Path

1. Open the live app.
2. Check the three sample domains or enter your own.
3. Press `Analyze`.
4. Review the winner, scores, MVP plan, and submission copy.

## Why It Fits The name.com Track

The track is not only about finding a clever domain. The product needs to show how a domain can shape an idea.

Domain Roulette Launch Lab maps the workbench to that goal:

- creative interpretation: the domain becomes a product constraint
- technical execution: scoring, comparison, MVP planning, and copy generation run in one browser app
- product polish: Japanese/English UI, 30-second review path, and clear claim boundaries are visible on the first screen
- concept strength: one user, one pain, one action
- domain connection: the selected domain shapes the target user, first feature, and pitch

## Claim Boundary

This app does not claim access to the official name.com random domain draw.

It is a public prototype for what a team can do after receiving its three official domains. The scores are working hypotheses, not objective business truth.

Before final submission, replace the sample domains with the three official assigned domains.

## Japanese Support

The app includes an `EN / 日本語` language switch. Japanese is first-class because the builder is Japanese and the portfolio is meant to be readable by Japanese reviewers too.

Japanese README: `README.ja.md`

## Verify

```bash
npm install
npm run verify
```

Record the local demo video:

```bash
npm run record-demo
```

Expected markers:

```text
domain_roulette_launch_lab_app_verify_ok
domain_roulette_launch_lab_japanese_support_ok
domain_roulette_launch_lab_claim_boundary_ok
domain_roulette_launch_lab_no_secrets_ok
```
