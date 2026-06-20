# profile-website

## Setup

Make sure to install the dependencies:

```bash
brew install hugo
```

Start the development server on `http://localhost:3000`

```bash
hugo server
```

### Production

Build the application for production:

```bash
hugo
```

## Updating packages

```bash
npm update
```

## Forking this as your own site

This repo is set up so you can fork it and make it your own without touching `layouts/`.

**Files you'll likely want to edit:**
- `hugo.yaml` — your name, social links, menu items, and params (avatar, colors handled in CSS, `tagsExplainerPath`, `bookDisclaimer`, etc).
- `content/_index.md` — your homepage bio.
- `content/reflections/_index.md`, `content/books/_index.md` — your section blurbs (or delete the corresponding `content/<section>/` directory entirely if you don't want that section — the homepage and nav only show what has content/menu entries, so nothing breaks).
- `content/` — replace with your own posts/pages. Use `hugo new reflections/my-post.md` or `hugo new books/my-book/index.md` to scaffold new entries with the right front matter automatically (see `archetypes/`).
- `static/images/` — swap in your own avatar and favicon, then update `avatarURL`/`favicon` in `hugo.yaml` if you rename the files.
- `assets/css/main.css` — recolor by editing the `:root` CSS custom properties (`--c-bg`, `--c-accent`, etc.) near the top of the file.

**Files you generally won't need to touch:** `layouts/` — personal copy lives in content files and params; the templates are intentionally generic.

The code/templates in this repo are MIT licensed (see `LICENSE`). The written content under `content/` is © Western Wilson — feel free to use it as a structural example, but please don't republish it verbatim.

## Tag strategy for reflections

[How I use tags](/reflections/how-i-use-tags/)
