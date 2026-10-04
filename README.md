# Personal Website

A personal portfolio site built for the Web Design coursework. Hand-written HTML5 and CSS3 — no frameworks, no build tools — published with GitHub Pages.

**Live site:** https://deevonjoseph.github.io/personal-website/

## What's on the page

- **Navigation** — a `nav` with an unordered list linking to the four sections (`#home`, `#about`, `#portfolio`, `#contact`) with hover effects.
- **Home** — hero with profile photo, name and tagline.
- **About** — short bio plus a **table** listing skills, proficiency and the tools behind them.
- **Portfolio** — three project cards: a YouTube video embedded with an `<iframe>`, and two screenshots of previous work.
- **Contact** — email, GitHub and YouTube links.

## File structure

```
personal-website/
├── index.html          # single page, all four sections
├── style.css           # external stylesheet (dark + teal theme)
├── images/             # profile photo, portfolio screenshots
└── README.md
```

All image paths are relative (`images/...`), so the site works from any directory and on GitHub Pages.

## Running it locally

Open `index.html` in a browser, or use Live Server in VS Code. The external stylesheet is linked with `<link rel="stylesheet" href="style.css">`.

## Styling notes

The stylesheet follows the patterns from the CSS lab: `nav ul` is reset (`list-style: none; padding: 0; margin: 0`) and centered on a dark bar, `nav li` uses `inline-block` with right margin, and `nav a:hover` changes color. Beyond that: CSS custom properties for the palette (`--accent: #27dcc4`), card grid with `gap`, table row hover states, and a media query for small screens.

## Publishing

The site is published with GitHub Pages from the `main` branch (root). Commits are structured by concern — markup, styles, images, docs — so the history reads as a progression rather than one dump.

## Collaboration & reflection

We split the work simply: one person focused on the HTML structure and content, and the other on the stylesheet and images, then we reviewed each other's work before committing.

What went well: planning the layout first kept the HTML and CSS in sync, and using separate commits made it easy to see what changed and why.

What we would improve: we would agree on the colour palette and spacing before writing any code, and start earlier so there is more time to test on different screen sizes.
