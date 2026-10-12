# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A static copy of the Köteles Cindy website (the owner's own site, originally https://kotelescindy.hu, a server-rendered Java/Spring app). The original was converted to plain static files.

There is no build system, package manager, linter, or test suite.

## Hosting and deployment

- Repo: `matika2/cindy_website_2` on GitHub, branch `main`.
- Live site: https://matika2.github.io/cindy_website_2/ (GitHub Pages, so it lives under the `/cindy_website_2/` subpath).
- Deployment is a GitHub Actions workflow (`.github/workflows/pages.yml`) that runs on every push to `main`. It checks out with `lfs: true` and publishes the repo root. The Pages source in repo Settings must be "GitHub Actions".
- Pages deployed straight from the branch does NOT serve Git LFS files (browsers get the text pointer instead of the image). That is why the workflow exists. Do not switch the Pages source back to "Deploy from a branch".
- Pages sends `Cache-Control: max-age=600`. After a deploy, a browser may show stale files for up to ~10 minutes; use a hard refresh (Ctrl+Shift+R) before concluding something is broken.
- Original site, for comparison: https://kotelescindy.hu (routes have no trailing slash, e.g. `/tour`; `/tour/` returns 404 there).

## Layout

- `index.html` is the news page (home). `tour/`, `music/`, `about/`, `contact/`, `info/` each hold an `index.html` (one folder per route).
- `css/`, `js/`, `images/`, `favicon.ico` at the root. Subpages reference them as `../css`, `../js`, `../images`.
- `css/` uses `@import` chains that are not visible from the HTML (e.g. `news.css` imports `common.css` and `photo.css`; `common.css` imports `globals.css` and `menubar.css`). When adding or checking CSS, follow the imports. Fonts (Trade Gothic Next LT Pro Cn) live in `css/fonts/`.
- `images/**/*.{jpg,jpeg,png}` are tracked with Git LFS (see `.gitattributes`). Run `git lfs install` once per machine. Commit `.gitattributes` changes before adding new photos. File names contain spaces and accents; percent-encode them when requesting by URL.

## Conventions

- Keep the site plain static HTML/CSS/JS with no build step. Use relative asset paths, never root-absolute ones (`/css/...`), because of the subpath.
- Known limitations of the static copy:
  - The contact form posts to `https://kotelescindy.hu/contactFormSubmitted` (CSRF input removed) and reCAPTCHA cannot work, so the form does not function on this host.
  - The WEBSHOP links go to https://mgrecords.hu/koteles-cindy. They still carry an `onclick="invalidateUnavailableItems(...)"` attribute from the original site.

## Testing

There are no automated tests. Verify changes in a real browser:

- Local preview: serve the repo root with any static server (e.g. a small Node script, or `npx serve`) and open it. Opening files directly also works, but a server is closer to Pages.
- Compare with the original using Playwright (the Playwright MCP server, `claude mcp add playwright npx @playwright/mcp@latest`). The method used so far: load the live original and the local copy at 1366, 768 and 390 px wide, take full-height screenshots, and compare pixel by pixel. All six pages (`/`, tour, music, about, contact, info) were pixel-identical at the time of the copy. Notes:
  - The pages scroll inside an inner container, not the document, so a plain full-page screenshot only captures the viewport. Measure the largest element `scrollHeight` and resize the viewport to it.
  - Freeze CSS animations and transitions before screenshots.
  - Also check for failed requests (4xx), which is how missing `@import`ed CSS and fonts were found.
- File-level checks of HTML-referenced assets are not enough, since they miss `@import`ed CSS and fonts. Browser rendering is the real test.
- After a deploy, check the live site in a browser (not only with `curl`): confirm `document.images` all have `naturalWidth > 0`. A `curl` of an image can look fine while a browser still has a stale cached LFS pointer.
- Not covered by the comparison: JavaScript behavior (cookie banner, analytics, menu toggles, the tour page script), the contact form and reCAPTCHA, and Chromium-only coverage.
