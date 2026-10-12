# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A static website intended for GitHub Pages (`matika2/cindy_website_2`, served from `main` at the repo root). Currently it is just a single hello-world `index.html` used to test Pages deployment.

There is no build system, package manager, linter, or test suite. To preview, open `index.html` directly in a browser. Deploying is just pushing to `main`; the site is published at https://matika2.github.io/cindy_website_2/.

## Conventions

- Keep the site plain static HTML/CSS/JS with no build step, since GitHub Pages serves the repo root as-is. Use relative asset paths, because the site lives under the `/cindy_website_2/` subpath.
