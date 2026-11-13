/* ==========================================================================
   Deevon Joseph - personal website
   All of the page's behaviour lives in this one deferred file. Nothing is
   written inline in index.html.

   01. Theme toggle
   02. Project filter and search
   03. FAQ accordion
   04. Back-to-top button
   05. Live date, time and greeting

   Each feature looks up its own elements and stops quietly when they are not
   on the page, so one missing section never breaks the rest of the script.
   ========================================================================== */

'use strict';

(function () {

    /* ----------------------------------------------------------------------
       01. Theme toggle
       The visitor's choice is saved in localStorage. When nothing is saved
       yet the operating system setting is used, and the page keeps following
       it until the visitor picks a theme for themselves.
       ---------------------------------------------------------------------- */

    const THEME_KEY = 'dj-theme';
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeColour = document.querySelector('meta[name="theme-color"]');
    const darkPreference = window.matchMedia('(prefers-color-scheme: dark)');

    const THEME_COLOURS = {
        light: '#f5f1e8',
        dark: '#14140f'
    };

    /* Storage can throw in private windows and in some file:// setups, so
       every read and write is guarded instead of assumed to work. */
    function readSavedTheme() {
        try {
            const saved = window.localStorage.getItem(THEME_KEY);
            return saved === 'light' || saved === 'dark' ? saved : null;
        } catch (error) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            window.localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            // Saving is a convenience; the theme still applies for this visit.
        }
    }

    /* One function changes every surface that depends on the theme: the
       data-theme attribute the stylesheet reads, the browser toolbar colour
       and the pressed state of the button. */
    function paintTheme(theme) {
        const isDark = theme === 'dark';

        root.dataset.theme = theme;

        if (themeColour) {
            themeColour.setAttribute('content', THEME_COLOURS[theme]);
        }

        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', String(isDark));
            themeToggle.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        }
    }

    paintTheme(readSavedTheme() || (darkPreference.matches ? 'dark' : 'light'));

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';

            paintTheme(nextTheme);
            saveTheme(nextTheme);
        });
    }

    darkPreference.addEventListener('change', function (event) {
        if (!readSavedTheme()) {
            paintTheme(event.matches ? 'dark' : 'light');
        }
    });


    /* ----------------------------------------------------------------------
       02. Project filter and search
       The category buttons and the search box work together: a project is
       shown only when it matches both the chosen category and the typed
       words. The search text is prepared once, at start-up, so typing never
       re-reads the whole page.
       ---------------------------------------------------------------------- */

    function normalise(text) {
        return text.toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function textOf(card, selector) {
        const element = card.querySelector(selector);
        return element ? element.textContent : '';
    }

    const filterGroup = document.getElementById('project-filters');
    const searchField = document.getElementById('project-search');
    const filterStatus = document.getElementById('project-status');
    const emptyMessage = document.getElementById('project-empty');

    /* Only the words that describe a project are searchable: its title, its
       kicker, its description and the keywords on the article. The tag list is
       left out, so a search for "JavaScript" does not match a card tagged
       "No JavaScript". */
    const projects = Array.from(document.querySelectorAll('.project[data-category]')).map(function (card) {
        return {
            card: card,
            category: card.dataset.category,
            searchText: normalise([
                textOf(card, 'h3'),
                textOf(card, '.project-kicker'),
                textOf(card, '.project-copy p:not(.project-kicker)'),
                card.dataset.keywords || ''
            ].join(' '))
        };
    });

    let activeCategory = 'all';

    function countProjects(category) {
        return projects.filter(function (project) {
            return category === 'all' || project.category === category;
        }).length;
    }

    function describeResults(shown, query) {
        const total = projects.length;

        if (shown === total && query === '') {
            return 'Showing all ' + total + ' projects.';
        }

        if (shown === 0) {
            return query === ''
                ? 'No projects in this category.'
                : 'No projects match \u201c' + query + '\u201d.';
        }

        return 'Showing ' + shown + ' of ' + total + ' projects' +
            (query === '' ? '.' : ' for \u201c' + query + '\u201d.');
    }

    function applyFilters() {
        const query = searchField ? normalise(searchField.value) : '';
        let shown = 0;

        projects.forEach(function (project) {
            const inCategory = activeCategory === 'all' || project.category === activeCategory;
            const matchesText = query === '' || project.searchText.indexOf(query) !== -1;
            const isVisible = inCategory && matchesText;

            project.card.hidden = !isVisible;

            if (isVisible) {
                shown += 1;
            }
        });

        if (filterStatus) {
            filterStatus.textContent = describeResults(shown, query);
        }

        if (emptyMessage) {
            emptyMessage.hidden = shown !== 0;
        }
    }

    if (projects.length > 0 && filterGroup) {

        /* The counts are read from the markup rather than typed twice, so a
           new project card only has to be added in one place. */
        filterGroup.querySelectorAll('[data-count]').forEach(function (output) {
            const count = countProjects(output.dataset.count);
            output.textContent = count > 0 ? String(count) : '';
        });

        filterGroup.addEventListener('click', function (event) {
            const button = event.target.closest('[data-filter]');

            if (!button || !filterGroup.contains(button)) {
                return;
            }

            activeCategory = button.dataset.filter;

            filterGroup.querySelectorAll('[data-filter]').forEach(function (other) {
                const isActive = other === button;

                other.classList.toggle('is-active', isActive);
                other.setAttribute('aria-pressed', String(isActive));
            });

            applyFilters();
        });

        if (searchField) {
            searchField.addEventListener('input', applyFilters);

            /* Escape clears the box and restores the full list, which is the
               behaviour people expect from a search field. */
            searchField.addEventListener('keydown', function (event) {
                if (event.key === 'Escape' && searchField.value !== '') {
                    searchField.value = '';
                    applyFilters();
                }
            });
        }

        applyFilters();
    }


    /* ----------------------------------------------------------------------
       03. FAQ accordion
       One panel is open at a time. The button carries aria-expanded and the
       panel is made inert while closed, so its text is skipped by screen
       readers and by the Tab key even though it is still in the page.
       ---------------------------------------------------------------------- */

    const faqItems = Array.from(document.querySelectorAll('.faq-item'));

    function setFaqItem(item, isOpen) {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');

        item.classList.toggle('is-open', isOpen);

        if (trigger) {
            trigger.setAttribute('aria-expanded', String(isOpen));
        }

        if (panel) {
            panel.inert = !isOpen;
        }
    }

    faqItems.forEach(function (item) {
        const trigger = item.querySelector('.faq-trigger');

        setFaqItem(item, false);

        if (!trigger) {
            return;
        }

        trigger.addEventListener('click', function () {
            const willOpen = trigger.getAttribute('aria-expanded') !== 'true';

            faqItems.forEach(function (other) {
                if (other !== item) {
                    setFaqItem(other, false);
                }
            });

            setFaqItem(item, willOpen);
        });
    });


    /* ----------------------------------------------------------------------
       04. Back-to-top button
       The button stays out of the way until the page has been scrolled, then
       fades in at the bottom right. Focus moves back to the main content so a
       keyboard user does not have to tab from the bottom of the page again.
       ---------------------------------------------------------------------- */

    const toTopButton = document.getElementById('to-top');

    if (toTopButton) {
        const SHOW_AFTER = 480;

        /* The browser already fires scroll at most once per frame, so the
           check runs directly instead of being wrapped in requestAnimationFrame. */
        function updateToTop() {
            toTopButton.classList.toggle('is-visible', window.scrollY > SHOW_AFTER);
        }

        window.addEventListener('scroll', updateToTop, { passive: true });

        toTopButton.addEventListener('click', function () {
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });

            const main = document.getElementById('main');

            if (main) {
                main.focus({ preventScroll: true });
            }
        });

        updateToTop();
    }


    /* ----------------------------------------------------------------------
       05. Live date, time and greeting
       The hero shows the current day and time in Grenada (the site's home
       time zone) and a greeting that changes through the day. The year in the
       eyebrow and the footer is filled from the same date.
       ---------------------------------------------------------------------- */

    const TIME_ZONE = 'America/Grenada';

    const greetingOutput = document.getElementById('hero-greeting');
    const dateOutput = document.getElementById('hero-date');
    const timeOutput = document.getElementById('hero-time');
    const yearOutputs = document.querySelectorAll('[data-year]');

    const dateFormat = new Intl.DateTimeFormat('en-GB', {
        timeZone: TIME_ZONE,
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const timeFormat = new Intl.DateTimeFormat('en-GB', {
        timeZone: TIME_ZONE,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const hourFormat = new Intl.DateTimeFormat('en-GB', {
        timeZone: TIME_ZONE,
        hour: 'numeric',
        hour12: false
    });

    function hourInGrenada(now) {
        const hourPart = hourFormat.formatToParts(now).find(function (part) {
            return part.type === 'hour';
        });

        return hourPart ? Number(hourPart.value) % 24 : now.getHours();
    }

    function greetingForHour(hour) {
        if (hour < 5) {
            return 'Working late';
        }

        if (hour < 12) {
            return 'Good morning';
        }

        if (hour < 17) {
            return 'Good afternoon';
        }

        if (hour < 21) {
            return 'Good evening';
        }

        return 'Good night';
    }

    function updateClock() {
        const now = new Date();

        if (greetingOutput) {
            greetingOutput.textContent = greetingForHour(hourInGrenada(now));
        }

        if (dateOutput) {
            dateOutput.textContent = dateFormat.format(now);
        }

        if (timeOutput) {
            timeOutput.textContent = timeFormat.format(now);
            timeOutput.setAttribute('datetime', now.toISOString());
        }
    }

    if (greetingOutput || dateOutput || timeOutput) {
        updateClock();
        window.setInterval(updateClock, 1000);
    }

    const currentYear = new Intl.DateTimeFormat('en-GB', {
        timeZone: TIME_ZONE,
        year: 'numeric'
    }).format(new Date());

    yearOutputs.forEach(function (output) {
        output.textContent = currentYear;

        if (output.tagName === 'TIME') {
            output.setAttribute('datetime', currentYear);
        }
    });
}());
