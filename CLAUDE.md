# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev server (http://localhost:1313 by default)
hugo server

# Production build
hugo --minify

# Install/update Node deps (Tailwind CSS)
npm ci         # exact lockfile install
npm update     # update packages

# Scaffold new content with correct front matter
hugo new reflections/my-post.md
hugo new books/my-book/index.md

# Site checks that CI runs (axe on every page in light + dark, then Lighthouse)
npm ci --prefix tests
hugo --minify && (python3 -m http.server 8080 --directory public &)
BROWSER=firefox BROWSER_PATH=/Applications/Firefox.app/Contents/MacOS/firefox node tests/check-a11y.mjs http://localhost:8080
tests/node_modules/.bin/lhci autorun --config=tests/lighthouserc.json   # needs Chrome
```

## Commit requirement

Every `git commit` must include the co-author trailer or the pre-commit hook will block it, for example:

```
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
Replace the model with whatever one was used.

## Architecture

**Hugo static site** deployed to GitHub Pages (`gh-pages` branch) via [deploy.yml](.github/workflows/deploy.yml). CI runs on every PR ([ci.yml](.github/workflows/ci.yml)): the Hugo build, an axe-core accessibility check of every page in both themes, and Lighthouse budgets on a few key pages ([tests/](tests/)).

**CSS pipeline** — Tailwind CSS v4 is imported in [assets/css/main.css](assets/css/main.css) and processed by the Hugo asset pipeline (requires the extended Hugo binary). Colors are CSS custom properties (`--c-bg`, `--c-accent`, etc.) defined once in `:root` with `light-dark()`; the `data-theme` toggle pins `color-scheme`. They are registered in `@theme` as Tailwind colours, so use `text-heading`, `text-muted`, `bg-alt`, `border-line`, etc. rather than `[color:var(...)]`.

**Layout hierarchy** — [`layouts/_default/baseof.html`](layouts/_default/baseof.html) is the shell (header/main/footer partials). Section templates in `layouts/_default/` and `layouts/books/` override the `main` block. Books have a richer single template (cover, rating, Goodreads link) defined in [`layouts/books/single.html`](layouts/books/single.html). Every page gets a generated 1200×630 social preview image (title, date or author, book cover) from [`partials/social-card.html`](layouts/partials/social-card.html), wired into Open Graph and JSON-LD in `head.html`.

**Content sections:**
- `content/reflections/` — single Markdown files; archetype at [`archetypes/reflections.md`](archetypes/reflections.md)
- `content/books/` — page bundles (`my-book/index.md` + `cover.jpg`); archetype at [`archetypes/books.md`](archetypes/books.md) with front matter for `bookAuthor`, `rating`, `goodreadsUrl`, `dateRead`
- `content/now/`, `content/techstack/`, `content/about.md` — standalone pages

**Site config** — [`hugo.yaml`](hugo.yaml) holds the author name, social links, nav menu, and params (`tagsExplainerPath`, `avatar`, `logo`). The avatar and logo live in `assets/images/` and are resized to WebP by [`partials/img.html`](layouts/partials/img.html); icons are inline SVGs from `assets/icons/` via [`partials/icon.html`](layouts/partials/icon.html). Changing the color scheme means editing the CSS custom properties, not config.
