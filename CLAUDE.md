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
```

## Commit requirement

Every `git commit` must include the co-author trailer or the pre-commit hook will block it:

```
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## Architecture

**Hugo static site** deployed to GitHub Pages (`gh-pages` branch) via [deploy.yml](.github/workflows/deploy.yml). CI runs on PRs to `main` ([ci.yml](.github/workflows/ci.yml)).

**CSS pipeline** — Tailwind CSS v4 is imported in [assets/css/main.css](assets/css/main.css) and processed by the Hugo asset pipeline (requires the extended Hugo binary). Colors are CSS custom properties (`--c-bg`, `--c-accent`, etc.) in `:root` with dark-mode overrides and a `data-theme` toggle.

**Layout hierarchy** — [`layouts/_default/baseof.html`](layouts/_default/baseof.html) is the shell (header/main/footer partials). Section templates in `layouts/_default/` and `layouts/books/` override the `main` block. Books have a richer single template (cover, rating, Goodreads link) defined in [`layouts/books/single.html`](layouts/books/single.html).

**Content sections:**
- `content/reflections/` — single Markdown files; archetype at [`archetypes/reflections.md`](archetypes/reflections.md)
- `content/books/` — page bundles (`my-book/index.md` + `cover.jpg`); archetype at [`archetypes/books.md`](archetypes/books.md) with front matter for `bookAuthor`, `rating`, `goodreadsUrl`, `dateRead`
- `content/now/`, `content/techstack/`, `content/about.md` — standalone pages

**Site config** — [`hugo.yaml`](hugo.yaml) holds the author name, social links, nav menu, and params (`bookDisclaimer`, `tagsExplainerPath`, avatar, favicon). Changing the color scheme means editing the CSS custom properties, not config.
