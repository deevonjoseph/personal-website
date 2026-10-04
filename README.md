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

My partner and I split the work between us: one of us handled the HTML structure and content while the other handled the styling and images, and we looked over each other's work before committing.

The planning stage helped the most. Sketching the layout before coding kept the HTML and CSS aligned, and committing changes in separate steps made the history easy to follow.

If we did it again, we would agree on colours and spacing at the start rather than adjusting them halfway through, and leave more time to test the layout on different screen sizes.
