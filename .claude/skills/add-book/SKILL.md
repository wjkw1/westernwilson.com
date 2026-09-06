---
name: add-book
description: Add a new book to the site's reading notes — scaffold content/books/<slug>/ with index.md front matter and a cover image, then verify it builds and renders. Use when asked to add a book, log a book you've read, create book notes, or write up a Goodreads book for the site.
---

# Add a book

Books on this site are Hugo **page bundles**: `content/books/<slug>/index.md` plus a
`cover.jpg` sitting next to it. The front matter drives
[`layouts/books/single.html`](../../../layouts/books/single.html) (cover, star rating,
Goodreads link) and the summary row in [`layouts/books/list.html`](../../../layouts/books/list.html).

Do not hand-write the bundle. Use the driver — it gets the front matter shape right,
downloads and validates the cover, and refuses to clobber an existing book.

All paths below are relative to the repo root. Run everything from there.

## 1. Scaffold the bundle

The driver is [`new-book.mjs`](new-book.mjs). Node only, no dependencies, no `npm install`.

**Preferred — let it read Goodreads:**

```bash
node .claude/skills/add-book/new-book.mjs \
  --goodreads "https://www.goodreads.com/book/show/62047984-yellowface" \
  --rating 5 --date-read 2026-01-17
```

That pulls title, author, description and cover off the page. **It often fails** —
see Gotchas. When it does, use the manual path, which is just as good:

**Manual — always works:**

```bash
node .claude/skills/add-book/new-book.mjs \
  --title "Atomic Habits" --author "James Clear" \
  --description "A practical framework for building good habits and breaking bad ones by focusing on tiny, compounding changes to your systems rather than your goals." \
  --goodreads-url "https://www.goodreads.com/book/show/40121378-atomic-habits" \
  --cover "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg" \
  --rating 4.5 --date-read 2026-08-30 --tags "habits,productivity"
```

Output:

```
cover  content/books/atomic-habits/cover.jpg (163 KB)
wrote  content/books/atomic-habits/index.md
```

Add `--dry-run` to print the `index.md` it would write without touching the disk.
`--help` lists every flag.

Flags worth knowing:

| Flag | Notes |
|---|---|
| `--rating` | 0–5, halves allowed. `4.5` renders 4 full stars + 1 half. |
| `--date-read` | `YYYY-MM-DD`, rejected otherwise. Renders as "Read Aug 2026". |
| `--slug` | Override the directory name. |
| `--cover` | Local path **or** URL. `--no-cover` skips it. |
| `--tags` | Comma-separated. Omit it and no `tags:` key is written — most books here have none. |
| `--force` | Overwrite an existing bundle. Without it, a duplicate is refused. |

## 2. Write the notes

The driver leaves a skeleton with HTML-comment placeholders:

```markdown
## Notes on Atomic Habits

<!-- Replace this with the reading notes. -->

## Quotes
```

Replace both placeholders. Match the voice of the existing books — first person,
plain, opinionated, what the book changed for the reader. `content/books/clean-code/index.md`
is the fullest example of the notes-plus-quotes shape; `content/books/yellowface/index.md`
is the shorter prose-only shape. Quotes go under `### Chapter N` headings as `>` blocks.

**Rewrite `bookDescription` in your own words.** When it came from Goodreads it is
publisher marketing copy. It renders on the books list page, so keep it to one or two
sentences, like the existing entries.

## 3. Verify it builds and renders

```bash
rm -rf public && hugo --quiet && test -f public/books/atomic-habits/index.html && echo "BUILD OK"
```

Then check the page actually rendered the front matter, rather than trusting the exit code:

```bash
python3 - <<'EOF'
import re
h = open('public/books/atomic-habits/index.html', encoding='utf-8').read()
print("title  :", re.findall(r'<h1[^>]*>\s*([^<]+?)\s*</h1>', h))
print("cover  :", re.findall(r'<img src="([^"]+)"', h))
print("stars  :", h.count("fa-solid fa-star "), "full,", h.count("fa-star-half-stroke"), "half")
print("read   :", re.findall(r'>Read ([A-Z][a-z]+ \d{4})<', h))
print("gr link:", "goodreads.com/book" in h)
EOF
```

Verified output for the Atomic Habits example:

```
title  : ['Atomic Habits']
cover  : ['cover.jpg']
stars  : 4 full, 1 half
read   : ['Aug 2026']
gr link: True
```

To eyeball it in a browser:

```bash
hugo server --port 1314 --disableFastRender
```

then open `http://localhost:1314/books/atomic-habits/`. Confirmed serving the page and
the cover (`http=200`, `image/jpeg`, 167422 bytes).

## 4. Commit

Every commit here needs the trailer or the pre-commit hook rejects it:

```
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## Gotchas

- **Goodreads rate-limits by IP and does not say so.** After a handful of requests it
  answers **HTTP 202 with a zero-byte body** — not 429, not 403. `res.ok` is true, so a
  naive scraper sees an empty page and reports "no title". The driver detects this,
  retries twice with backoff, then tells you to switch to `--title`/`--author`/`--cover`.
  The throttle is global to the IP, not per-book: once you are blocked, every book URL
  returns 202. It clears on its own after a while. Don't fight it — use the manual path.
- **The cover image URLs are not throttled.** They live on `m.media-amazon.com`, a
  different host. So even while the book page is blocked, `--cover <url>` downloads fine.
  Get the URL by right-clicking the cover on Goodreads → Copy Image Address.
- **Goodreads titles arrive HTML-encoded.** The JSON-LD `name` field contains literal
  `&amp;` ("Good Habits &amp; Break Bad Ones"). The driver decodes entities; if you
  hand-write front matter, do it yourself.
- **Publisher blurbs are enormous.** The raw Goodreads description for Atomic Habits is
  over 2000 characters and renders in full on the list page. The driver truncates to the
  first sentences under 320 chars — treat that as a placeholder to rewrite, not a result.
- **Slug defaults split on the subtitle only when long.** Full-title slug if it is ≤40
  characters, otherwise the part before the colon. That reproduces every existing
  directory: `babel-an-arcane-history` keeps its subtitle, `a-new-earth` drops it.
  Pass `--slug` when you disagree.
- **A cover that isn't an image is caught by magic bytes, not content-type.** Non-JPEG/
  PNG/WebP input aborts before anything is written, so a failed run leaves no empty
  directory. (An empty `content/books/test-book/` in the repo was the residue of an
  earlier tool that didn't do this; it has been removed.)
- **`draft: false` is written explicitly.** The default archetype for other sections
  writes `draft = true`, which would silently hide the book from a production build.
- **Books use no tags by default.** The layout supports them and `/tags/` pages generate,
  but no existing book sets any. Only pass `--tags` if you mean it.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `error: goodreads would not serve ... (HTTP 202, empty body (rate limited))` | Expected. Use the manual path in step 1. |
| `error: could not read a title from that Goodreads page` | Same throttle, different shape — the page loaded but was a stub. Manual path. |
| `error: content/books/<slug>/index.md already exists` | The book is already there. Edit it, or pass `--force`. |
| `error: downloaded cover is not an image (... first bytes: 6e6f7420616e2069)` | The `--cover` source returned HTML or text. Those bytes are ASCII — decode them to see what came back. |
| `error: --date-read must be YYYY-MM-DD, got "aug 2026"` | Dates are strict; `time.Format` in the layout needs a real date. |
| Book builds but doesn't appear on `/books/` | Check `draft:` is `false` and the bundle is `<slug>/index.md`, not `<slug>.md` — a plain file is not a page bundle and the cover won't resolve. |
| Cover 404s on the page | The image must sit *inside* the bundle directory next to `index.md`, and `bookCover` is a bare filename (`"cover.jpg"`), not a path. |
