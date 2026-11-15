# Submission — Adding features: JavaScript Enhancements

Everything required by the brief, with the values filled in. The brief asks for the following items, so they are reproduced here in the same order.

## Requirements copied from the assignment

> **9. Moodle Submission Requirements**
>
> Submit the following items through Moodle:
>
> - **GitHub Repository URL:** Link to your existing repository.
> - **JavaScript Branch Name:** The name of the branch used for this assignment.
> - **Pull Request URL:** Direct link to your Pull Request.
> - **GitHub Pages URL:** Link to your updated personal website.
> - **Screenshots:** Evidence showing your five JavaScript features working correctly. Include screenshots that demonstrate the functionality of the features.
> - **README.md:** Ensure the updated README is available in your repository.
>
> Ensure that your GitHub repository and Pull Request are accessible to your lecturer. If your repository is private, grant the necessary access.

## Answers

| Item | Value |
|---|---|
| GitHub Repository URL | https://github.com/deevonjoseph/personal-website |
| JavaScript Branch Name | `feature/javascript-enhancements` |
| Pull Request URL | https://github.com/deevonjoseph/personal-website/pull/2 |
| GitHub Pages URL | https://deevonjoseph.github.io/personal-website/ |
| Screenshots | [`screenshots/`](screenshots) — seven files, listed below |
| README.md | [README.md](README.md) — updated, including a 214-word reflection |

The repository is public, so both the repository and the pull request are readable without an account.

## The five features

All five are written by hand in one external file, [`js/script.js`](js/script.js), loaded with `defer`. There is no inline JavaScript, no library and no build step.

1. **Light and dark theme toggle.** The header button writes `data-theme` on the `<html>` element and the stylesheet swaps its colour tokens. The choice is saved in `localStorage`; with nothing saved the page follows the operating system setting.
2. **Project filter and live search.** The category buttons (`All 3`, `Web 2`, `Video 1`) and the search box narrow the same cards, so a card shows only when it matches both. The status line and the empty message update as you type, and `Escape` clears the box.
3. **FAQ accordion.** Four questions open in place, one at a time, with `aria-expanded`, `aria-controls` and `inert` on the closed panels.
4. **Back-to-top button.** Appears after the page has been scrolled, returns to the top and moves focus back to `<main>`.
5. **Live date, time and greeting.** `Intl.DateTimeFormat` in `America/Grenada`, plus a greeting chosen from the hour and the year filled in the eyebrow and the footer.

## Screenshots

All seven were taken from the live GitHub Pages site at 1440×900 (the phone shot at 390×844).

| # | Feature | File |
|---|---|---|
| 1 | Light theme | [`screenshots/01-light-theme.png`](screenshots/01-light-theme.png) |
| 2 | Dark theme | [`screenshots/02-dark-theme.png`](screenshots/02-dark-theme.png) |
| 3 | Project filter and search | [`screenshots/03-project-filter.png`](screenshots/03-project-filter.png) |
| 4 | FAQ accordion | [`screenshots/04-faq-accordion.png`](screenshots/04-faq-accordion.png) |
| 5 | Back-to-top button | [`screenshots/05-back-to-top.png`](screenshots/05-back-to-top.png) |
| — | Live date, time and greeting (close-up) | [`screenshots/06-live-clock.png`](screenshots/06-live-clock.png) |
| — | Mobile layout at 390px | [`screenshots/07-mobile-390.png`](screenshots/07-mobile-390.png) |

## How the work was done

The five features were built on `feature/javascript-enhancements`, one commit per feature, and merged into `main` through pull request #2. `main` kept the published redesign working the whole time.

```
a321796  feat: add a light and dark theme toggle
643da0f  feat: filter and search the project cards
4e0db73  feat: add an FAQ accordion
62239ad  feat: add a back-to-top button
19aaf01  feat: show the live date, time and greeting
ce3ebf0  docs: document the JavaScript features, testing and reflection
7e7a74f  Merge pull request #2 from deevonjoseph/feature/javascript-enhancements
```

## Testing summary

- Every feature exercised in Chrome; the console is clean on load and after each interaction.
- No horizontal overflow at 320, 375, 390, 414, 480, 640, 768, 1024, 1280 or 1440px.
- The header stays on one row at every width (64px tall, 72px from 1024px up), with 18px to spare at 320px.
- Keyboard: every control is reachable and operable, and the closed FAQ answers are skipped by the Tab key.

The full test table and the accessibility notes are in the [README](README.md#testing-and-responsiveness).
