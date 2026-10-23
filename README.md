# Deevon Joseph — Personal Website

A personal portfolio for **Deevon Joseph**, an Information Technology student at T. A. Marryshow Community College and a video editor. The site introduces me, lists the tools I use, shows one video edit and two web builds, and gives ways to get in touch.

**Live site:** https://deevonjoseph.github.io/personal-website/
**Repository:** https://github.com/deevonjoseph/personal-website
**Redesign branch:** `feature/personal-website-redesign`

## Redesign summary

The first version of the site was a dark page with a teal accent, a centred hero and three cards in a flex row. It worked, but every section looked the same and the layout was mostly one column with a single breakpoint.

This redesign turns it into a light, print-inspired portfolio:

- warm paper background, dark ink text and a burnt-orange accent;
- Fraunces for headings and Inter for body text;
- a two-column hero on desktop with a framed portrait and a facts strip;
- numbered sections (`01`, `02`, `03`) with a left-hand title rail on desktop;
- a full-width photo of St. George's harbour, loaded from Wikimedia Commons;
- a featured video card and two project cards, with the feature changing from stacked to side-by-side;
- a dark contact section with the email address as the main call to action.

The copy was rewritten as well: shorter sentences, fewer generic claims, and details that are specific to the work.

## Technologies used

- **HTML5** — `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `figcaption`, `address`, `dl` and `time`.
- **CSS3** — custom properties, flexbox, CSS grid, `clamp()`, `aspect-ratio` and media queries.
- **Google Fonts** — Fraunces and Inter.
- **Git and GitHub** — feature branch, small commits, pull request.
- **GitHub Pages** — publishing from `main`.
- No JavaScript, framework, template or build step.

## Directory structure

```
personal-website/
├── index.html              # single page: hero, about, work, contact
├── css/
│   └── style.css           # all styles, written mobile-first
├── images/
│   ├── favicon.svg         # DJ monogram
│   ├── profile.jpg         # portrait used in the hero
│   ├── portfolio-amv.jpg   # still from the AMV edit
│   ├── portfolio-css-lab.png
│   └── portfolio-site.jpg  # screenshot of this redesign
└── README.md
```

The stylesheet lives in `css/` and every image lives in `images/`. All references are relative (`css/style.css`, `images/profile.jpg`), so the site works from a local folder and from GitHub Pages without changes. The harbour photo is the one exception: it is linked by URL and is not stored in the repository.

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

The live version is published with GitHub Pages from the root of the `main` branch.

## Responsive approach

The stylesheet is written mobile-first. Base styles target phones from 320px up, then two breakpoints adjust the layout:

- **640px (tablet):** the full name appears in the header, the facts strip becomes three columns, the toolkit is capped at a readable width, and the two smaller projects sit side by side.
- **1024px (desktop):** the hero becomes two columns, section titles move into a sticky left rail, the about section splits into prose plus a skills panel, and the featured video sits beside its description.

Other techniques:

- `clamp()` scales the display type and section spacing with the viewport instead of using fixed pixel sizes.
- Images use `max-width: 100%`, `width`/`height` attributes and `aspect-ratio`, so they never overflow and do not jump while loading.
- The video sits inside a 16:9 ratio box, so the iframe resizes without a fixed pixel height.
- Grid items use `minmax(0, 1fr)` so long words cannot widen the page.
- The email address can wrap, and the navigation fits on one row from 320px without a hamburger menu.
- `prefers-reduced-motion` turns off smooth scrolling and transitions.

I checked the page at 320, 390, 768, 1024 and 1440 pixels wide. At each width, `document.documentElement.scrollWidth` matched the viewport, so there is no horizontal scrolling.

## Image credits

- `images/profile.jpg` — personal photo of Deevon Joseph.
- `images/portfolio-amv.jpg` — still from my own *Naruto vs Sasuke* AMV edit.
- `images/portfolio-css-lab.png` — screenshot of my CSS selectors lab.
- `images/portfolio-site.jpg` — screenshot of this site.
- Harbour photo: **St. George's Inner Harbour, Grenada** by **dpursoo**, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:St._George%27s_Inner_Harbour_2.JPG), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The credit also appears in the page's `<figcaption>`.

## Reflection

The biggest improvement is structure. The first version was a single dark page where every section looked the same. The redesign gives each part a clear job: a sticky header, a hero with the name and portrait, numbered sections, a full-width photo, project cards and a dark contact block. The HTML now uses `header`, `nav`, `main`, `section`, `article`, `aside`, `figure` and `footer`, so the source is easier to follow, not just the page.

The responsive layout was the hardest part. The desktop version puts the section titles in a left column, but that column has to disappear on a phone without leaving a gap. I tested at 320, 390, 768, 1024 and 1440 pixels and checked that the page width never grew past the screen. Moving the stylesheet into `css/` also meant fixing the link and checking every image path, which taught me to test relative paths after a move.

Working on a branch made the change less risky. `main` stayed as the published version while I rebuilt the page, and the commits were split into the folder move, the redesign and the README. Opening a pull request showed the full diff before merging, and I merged only after confirming there were no conflicts.

## Branch and pull request

The redesign was built on `feature/personal-website-redesign`, not on `main`. The work was committed in stages (moving the stylesheet, rebuilding the page, updating the README), pushed to the branch, and merged into `main` through a pull request after checking for conflicts. `main` stayed on the published version until the merge.
