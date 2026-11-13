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
}());
