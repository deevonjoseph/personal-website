# Deevon Joseph — Personal Website

A personal portfolio for **Deevon Joseph**, an Information Technology student at T. A. Marryshow Community College and a video editor. The site introduces me, lists the tools I use, shows one video edit and two web builds, answers a few common questions, and gives ways to get in touch.

**Live site:** https://deevonjoseph.github.io/personal-website/
**Repository:** https://github.com/deevonjoseph/personal-website
**JavaScript branch:** `feature/javascript-enhancements`

## JavaScript enhancements

The page began as an HTML and CSS redesign. This version adds five features, all written by hand in one external file, `js/script.js`, which is loaded with `defer`. There is no inline JavaScript, no library and no build step.

| # | Feature | What it does |
|---|---------|--------------|
| 1 | **Light and dark theme** | A button in the header swaps the whole colour scheme. The choice is saved in `localStorage` and restored on the next visit. |
| 2 | **Project filter and search** | Category buttons and a search box narrow the three project cards. The result count updates as you type. |
| 3 | **FAQ accordion** | Four questions open and close in place, one at a time, without leaving the page. |
| 4 | **Back-to-top button** | A floating button appears once the page has been scrolled and returns to the top, moving focus back to the main content. |
| 5 | **Live date, time and greeting** | The hero shows the current day and time in Grenada and a greeting that changes through the day. The year in the eyebrow and the footer is filled from the same date. |

### 1. Light and dark theme

The header button writes `data-theme="light"` or `data-theme="dark"` on the `<html>` element. Every colour on the page comes from a custom property, so the stylesheet only has to redefine those properties for the dark version. The script also updates `<meta name="theme-color">`, so the browser toolbar matches the page.

`localStorage` can throw in private windows, so reads and writes are wrapped in `try`/`catch` and the page falls back to the operating system setting. If no choice has been saved, a `matchMedia('(prefers-color-scheme: dark)')` listener keeps the page in step with the system. The stylesheet contains the same dark values inside a `prefers-color-scheme` media query, which means the first paint is correct even before the script runs.

### 2. Project filter and search

Each `<article class="project">` carries a `data-category` (`web` or `video`) and a `data-keywords` list. At start-up the script collects the words that describe each project — title, kicker, description and keywords — into one lower-case string, so typing never has to re-read the page.

A card is shown only when it matches both the active category and the typed text. The tag list is deliberately left out of the search text, so a search for “JavaScript” does not match the CSS lab card that is tagged “No JavaScript”. The counts in the buttons (`All 3`, `Web 2`, `Video 1`) are counted from the cards rather than typed by hand.

The status line uses `role="status"`, so a screen reader hears “Showing 2 of 3 projects for ‘css’” after each change without focus moving. `Escape` clears the search box.

### 3. FAQ accordion

Each question is a real `<button>` inside a heading, with `aria-expanded` and `aria-controls`. The answer panel is a `role="region"` labelled by its button. Closed panels are set to `inert`, which keeps their text out of the Tab order and out of the accessibility tree even though the text is still in the page.

The opening animation uses `grid-template-rows: 0fr` to `1fr` on a grid container with an `overflow: hidden` child. That slides the panel to its natural height without a hard-coded `max-height`, so longer answers cannot be cut off. Opening one question closes the others.

### 4. Back-to-top button

The button is fixed in the bottom corner and starts hidden with `visibility: hidden`, so it cannot be focused until it appears. A passive `scroll` listener adds a class once `window.scrollY` passes 480 pixels; CSS handles the fade and the slide. `prefers-reduced-motion` removes the animation, and the scroll itself switches from `smooth` to `auto`.

After scrolling, focus moves to `<main>` with `preventScroll: true`, so a keyboard user continues from the top of the content instead of tabbing from the bottom of the page.

### 5. Live date, time and greeting

`Intl.DateTimeFormat` is given the `America/Grenada` time zone, so the clock is right for the site's home even when a visitor is in another country. The greeting is chosen from the hour there: morning, afternoon, evening, night, or “Working late” after midnight.

The line updates once a second and the `<time>` element's `datetime` attribute is refreshed with an ISO string at the same time. It is not an `aria-live` region on purpose: a clock that announced itself every second would interrupt a screen reader. The same script fills every `[data-year]` element, so the copyright year and the eyebrow never go stale.

### How the five features meet the brief

- **DOM manipulation:** the theme attribute, the `hidden` property on project cards, `aria-expanded`, the `inert` property, the button class and the clock text are all changed from JavaScript.
- **User interaction:** the theme button, the filter buttons, the search field, the FAQ buttons and the back-to-top button all respond to clicks, typing or scrolling.
- **Information processing:** the project data is read from the markup and searched, the counts are calculated, and dates are formatted and compared against the hour to choose a greeting.

## Technologies used

- **HTML5** — `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `figcaption`, `address`, `dl`, `time`, `button` and `input type="search"`.
- **CSS3** — custom properties, flexbox, CSS grid, `clamp()`, `aspect-ratio`, `grid-template-rows` animation, `prefers-color-scheme` and `prefers-reduced-motion`.
- **JavaScript (ES6+)** — `const`/`let`, arrow-free named functions for readability, `Array.from`, `forEach`, `map`, `filter`, `dataset`, `classList`, `matchMedia`, `Intl.DateTimeFormat`, `localStorage` and `try`/`catch`.
- **Google Fonts** — Fraunces and Inter.
- **Git and GitHub** — feature branch, small commits, pull request.
- **GitHub Pages** — publishing from `main`.

## Directory structure

```
personal-website/
├── index.html              # single page: hero, about, work, FAQ, contact
├── css/
│   └── style.css           # all styles, mobile-first, light and dark themes
├── js/
│   └── script.js           # all five features, loaded with defer
├── images/
│   ├── favicon.svg         # DJ monogram
│   ├── profile.jpg         # portrait used in the hero
│   ├── portfolio-amv.jpg   # still from the AMV edit
│   ├── portfolio-css-lab.png
│   └── portfolio-site.jpg  # screenshot of this site
└── README.md
```

The stylesheet lives in `css/`, the script in `js/` and every image in `images/`. All references are relative (`css/style.css`, `js/script.js`, `images/profile.jpg`), so the site works from a local folder and from GitHub Pages without changes. The harbour photo is the one exception: it is linked by URL and is not stored in the repository.

## Viewing the site

No installation or build step is needed.

1. Clone the repository:

   ```bash
   git clone https://github.com/deevonjoseph/personal-website.git
   ```

2. Open `index.html` in a browser, or serve the folder:

   ```bash
   cd personal-website
   python -m http.server 8000
   ```

   Then visit `http://localhost:8000/`.

The live version is published with GitHub Pages from the root of the `main` branch: https://deevonjoseph.github.io/personal-website/

The theme preference is stored per browser, so a fresh profile starts from the operating system setting. To see the light version on a machine set to dark, press the button in the header.

## Testing and responsiveness

I checked every feature by hand and then measured the page at ten widths in Chrome.

- **Theme:** toggled in both directions, reloaded the page, and confirmed the choice was remembered and that `<meta name="theme-color">` changed with it.
- **Filter and search:** tried each category, each search term (`css`, `video`, `github`, `javascript`, a term with no match) and `Escape` to clear the box. Confirmed the count, the status line and the empty message.
- **FAQ:** opened each question, confirmed the others closed, and confirmed the closed panels are `inert`.
- **Back-to-top:** scrolled past the threshold, clicked, and confirmed the page returned to `scrollY = 0` with focus on `<main>`.
- **Clock:** compared the displayed time with the system clock and watched the seconds update.

| Width (px) | `scrollWidth` | `clientWidth` | Horizontal overflow |
|---|---|---|---|
| 320 | 305 | 305 | none |
| 375 | 360 | 360 | none |
| 390 | 375 | 375 | none |
| 414 | 399 | 399 | none |
| 480 | 465 | 465 | none |
| 640 | 625 | 625 | none |
| 768 | 753 | 753 | none |
| 1024 | 1009 | 1009 | none |
| 1280 | 1265 | 1265 | none |
| 1440 | 1410 | 1410 | none |

The difference between the two columns is the scrollbar. At every width `scrollWidth` matched `clientWidth`, so the page never scrolls sideways. The header stays on one row at all sizes: 64px tall on phones and tablets, 72px from 1024px up, with 18px to spare between the monogram and the navigation at 320px. The four links and the theme button fit without a hamburger menu.

The browser console is clean on load and after using every feature. The only warning in the earlier version came from the YouTube embed's `allow` attribute and was removed.

## Accessibility notes

- Every control is a real button or input, reachable with Tab and usable with Enter or Space.
- The theme button uses `aria-pressed` with a constant name, so its state is announced instead of its label changing.
- Closed FAQ panels are `inert`, so their answers are not read out while hidden.
- The clock is not a live region, to avoid interrupting a screen reader every second.
- `prefers-reduced-motion` turns off smooth scrolling and every transition and animation.
- The skip link, visible focus rings and the dark-mode focus colour are unchanged from the redesign.

## Redesign summary

The first version of the site was a dark page with a teal accent, a centred hero and three cards in a flex row. The redesign turned it into a light, print-inspired portfolio:

- warm paper background, dark ink text and a burnt-orange accent;
- Fraunces for headings and Inter for body text;
- a two-column hero on desktop with a framed portrait and a facts strip;
- numbered sections (`01`–`04`) with a left-hand title rail on desktop;
- a full-width photo of St. George's harbour, loaded from Wikimedia Commons;
- a featured video card and two project cards;
- a dark contact band with the email address as the main call to action.

The JavaScript work sits on top of that design without replacing it. The new controls use the same type, colours, borders and spacing, and the dark theme reuses the same palette rather than introducing a second one.

## Image credits

- `images/profile.jpg` — personal photo of Deevon Joseph.
- `images/portfolio-amv.jpg` — still from my own *Naruto vs Sasuke* AMV edit.
- `images/portfolio-css-lab.png` — screenshot of my CSS selectors lab.
- `images/portfolio-site.jpg` — screenshot of this site.
- Harbour photo: **St. George's Inner Harbour, Grenada** by **dpursoo**, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:St._George%27s_Inner_Harbour_2.JPG), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The credit also appears in the page's `<figcaption>`.

## Reflection

The JavaScript work changed how I think about a page I had already finished. Adding a theme toggle meant the stylesheet had to describe every colour twice, and I found several hard-coded greys in the contact band that had to become variables before dark mode looked right. That was more useful than writing new CSS from scratch, because it forced me to read my own file.

The filter and search were the hardest to keep simple. My first version rebuilt the list on every keystroke and searched the whole card, so a search for “JavaScript” matched a card that said “No JavaScript”. Storing a prepared search string once, and combining the category with the text, made the behaviour predictable and the code shorter.

Accessibility took the most care. The FAQ buttons needed `aria-expanded`, the panels needed to be `inert` while closed, and the live clock could not use `aria-live` or it would interrupt a screen reader every second. Testing at 320 pixels also showed the header was one link away from wrapping, which is why the mobile type is slightly smaller.

Working on a branch kept `main` usable throughout. Small commits, one per feature, made the pull request readable and let me go back when the back-to-top button stopped responding in a background tab.

## Branch and pull request

The JavaScript work was built on `feature/javascript-enhancements`, not on `main`. Each feature was committed separately, the branch was pushed and a pull request was opened against `main`, reviewed, and merged. `main` stayed on the published redesign until the merge.

The earlier redesign was built the same way on `feature/personal-website-redesign` and merged through pull request #1.
