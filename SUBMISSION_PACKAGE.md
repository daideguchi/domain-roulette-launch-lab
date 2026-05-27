# Domain Roulette Launch Lab — Submission Package

## Devpost Title

Domain Roulette Launch Lab

## Tagline

Turn three random name.com domains into a scored product choice, MVP plan, and judge-ready submission copy.

## Track

name.com — Domain Roulette, DeveloperWeek New York 2026 Hackathon.

## Live Links

- Live app: https://daideguchi.github.io/domain-roulette-launch-lab/
- GitHub: https://github.com/daideguchi/domain-roulette-launch-lab
- Demo video: `media/domain-roulette-launch-lab-demo.mp4`
- Screenshot: `media/domain-roulette-launch-lab-full.png`

## Short Description

Domain Roulette Launch Lab is a launch workbench for the name.com Domain Roulette track. After a team receives three random domains, the app helps them compare the names, choose the strongest product direction, map the idea to judging criteria, plan a three-day MVP, and generate Devpost-ready copy.

## Long Description

### Inspiration

The name.com Domain Roulette track is interesting because the domain is not only a URL. It becomes the creative constraint. A random name can either become a small joke or it can force a team to sharpen the product idea quickly.

Domain Roulette Launch Lab was built for that moment. It helps a team turn three random domains into a focused product decision before they lose time debating names.

### What it does

The app accepts three domains and a target market, then generates:

- explainable domain scores
- a winning candidate
- a product brief
- a three-day MVP plan
- first validation checks
- a judging-criteria fit section
- a copy-ready Devpost pitch

The goal is not to pretend the app knows the future. The goal is to help a hackathon team make a clearer human decision faster.

### How it maps to the name.com track

- Creative interpretation: the domain becomes the product constraint.
- Technical execution: scoring, comparison, MVP planning, and submission copy run in one browser app.
- Product polish: the app includes Japanese/English UI, a 30-second review path, and a visible claim boundary.
- Strength of concept: every output is forced into one user, one pain, and one action.
- Connection to the domain: the selected domain shapes the audience, first feature, MVP scope, and pitch.

### How I built it

The product is a static HTML/CSS/JavaScript app published on GitHub Pages. It uses deterministic scoring logic so the user can understand why each domain ranked the way it did. I also added verification scripts for UI behavior, Japanese support, claim boundaries, and no-secrets checks.

### Claim boundary

This app does not claim access to the official name.com random draw. It is built for the step after a team receives its official three domains. The current public app uses sample domains so the workflow can be reviewed before the final draw values are known.

### What's next

Before final submission, replace the sample domains with the official three assigned domains, rerun the app, and update the Devpost copy with the actual winning candidate.

## 30-Second Judge Path

1. Open the live app.
2. Press `Analyze`.
3. Check the winning domain and score explanation.
4. Open the `Judge fit` tab.
5. Open the `Submission copy` tab.

## Final-Submit Checklist

- [ ] Confirm the official three domains assigned by name.com.
- [ ] Enter the official domains in the app.
- [ ] Press `Analyze`.
- [ ] Copy the new submission copy.
- [ ] Update Devpost description if the winning candidate changes.
- [ ] Attach the current screenshot.
- [ ] Verify live app URL and GitHub URL.
- [ ] Submit before `2026-06-10 10:00 EDT`.
