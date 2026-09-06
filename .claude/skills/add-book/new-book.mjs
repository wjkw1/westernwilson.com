#!/usr/bin/env node
// Scaffolds a Hugo page bundle under content/books/<slug>/ : index.md + cover image.
// Zero dependencies (Node 18+ global fetch). Run from the repo root.
//
//   node .claude/skills/add-book/new-book.mjs \
//     --goodreads https://www.goodreads.com/book/show/62047984-yellowface \
//     --rating 5 --date-read 2026-01-17
//
// Anything fetched from Goodreads can be overridden with an explicit flag.

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const eq = a.indexOf("=");
      if (eq !== -1) out[a.slice(2, eq)] = a.slice(eq + 1);
      else if (argv[i + 1] && !argv[i + 1].startsWith("--")) out[a.slice(2)] = argv[++i];
      else out[a.slice(2)] = true;
    } else out._.push(a);
  }
  return out;
}

function die(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

function slugify(s) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function assertDate(name, v) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) die(`--${name} must be YYYY-MM-DD, got "${v}"`);
  return v;
}

// YAML double-quoted scalar. Front matter here is always double-quoted strings.
function yq(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Goodreads throttles by IP: after a handful of requests it answers 202 with a
// zero-byte body instead of a 429. Back off, then send the caller to --title.
async function fetchBookPage(url, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    const res = await fetch(url, { headers: { "user-agent": UA } });
    const html = await res.text();
    if (res.ok && html.length > 2000) return html;
    const why = res.status === 202 || html.length === 0
      ? `HTTP ${res.status}, empty body (rate limited)`
      : `HTTP ${res.status}, ${html.length} bytes`;
    if (i === attempts) {
      die(
        `goodreads would not serve ${url} (${why}).\n` +
        "  It throttles by IP and stays throttled for a while. Either wait, or\n" +
        "  fill the metadata in by hand:\n\n" +
        "    node .claude/skills/add-book/new-book.mjs \\\n" +
        '      --title "Atomic Habits" --author "James Clear" \\\n' +
        '      --description "..." --rating 4.5 --date-read 2026-08-30 \\\n' +
        "      --cover <cover-url-or-local-path>\n\n" +
        "  The cover URL is on the Goodreads page in your browser: right-click the\n" +
        "  cover image, Copy Image Address (a m.media-amazon.com/... .jpg URL).\n" +
        "  Those image URLs are NOT throttled."
      );
    }
    process.stderr.write(`  ${why} — retrying in ${i * 2}s\n`);
    await sleep(i * 2000);
  }
}

async function scrapeGoodreads(url) {
  const html = await fetchBookPage(url);
  const meta = {};

  // JSON-LD carries name + author reliably.
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (ld) {
    try {
      const d = JSON.parse(ld[1]);
      if (d.name) meta.title = decodeEntities(d.name);
      if (d.image) meta.cover = d.image;
      const authors = Array.isArray(d.author) ? d.author : d.author ? [d.author] : [];
      const names = authors.map((a) => a && a.name).filter(Boolean);
      if (names.length) meta.author = decodeEntities(names.join(", "));
    } catch { /* fall through to the other sources */ }
  }

  // __NEXT_DATA__ apolloState carries the untruncated publisher blurb.
  const nd = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (nd) {
    try {
      const apollo = JSON.parse(nd[1])?.props?.pageProps?.apolloState ?? {};
      for (const v of Object.values(apollo)) {
        if (v && v.__typename === "Book" && v.title) {
          meta.title ||= decodeEntities(v.title);
          meta.cover ||= v.imageUrl;
          if (v.description) meta.description = trimDescription(stripHtml(v.description));
          break;
        }
      }
    } catch { /* optional */ }
  }

  const og = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (og) meta.cover ||= og[1];

  if (!meta.title) die("could not read a title from that Goodreads page — pass --title/--author manually");
  return meta;
}

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  rsquo: "\u2019", lsquo: "\u2018", rdquo: "\u201d", ldquo: "\u201c",
  mdash: "\u2014", ndash: "\u2013", hellip: "\u2026",
};

// Goodreads double-encodes: JSON-LD titles arrive as "Good Habits &amp; Break Bad".
function decodeEntities(s) {
  return String(s).replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, body) => {
    if (body[0] === "#") {
      const cp = body[1] === "x" || body[1] === "X"
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : m;
    }
    return ENTITIES[body.toLowerCase()] ?? m;
  });
}

function stripHtml(s) {
  return decodeEntities(
    String(s).replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "")
  ).replace(/\s+/g, " ").trim();
}

// Publisher blurbs run to 2000+ characters; bookDescription renders inline on
// the books list page, so keep it to the first sentence or two.
const DESC_MAX = 320;
function trimDescription(s) {
  if (s.length <= DESC_MAX) return s;
  let out = "";
  for (const sentence of s.split(/(?<=[.!?])\s+/)) {
    if (out && (out + " " + sentence).length > DESC_MAX) break;
    out = out ? out + " " + sentence : sentence;
    if (out.length >= DESC_MAX) break;
  }
  if (!out || out.length > DESC_MAX) out = s.slice(0, DESC_MAX).replace(/\s+\S*$/, "") + "\u2026";
  return out;
}

async function loadCover(src) {
  let buf, contentType = "";
  if (/^https?:\/\//.test(src)) {
    const res = await fetch(src, { headers: { "user-agent": UA, referer: "https://www.goodreads.com/" } });
    if (!res.ok) die(`cover download failed: HTTP ${res.status} for ${src}`);
    contentType = res.headers.get("content-type") || "";
    buf = Buffer.from(await res.arrayBuffer());
  } else {
    if (!fs.existsSync(src)) die(`cover file not found: ${src}`);
    buf = fs.readFileSync(src);
  }

  // Sniff magic bytes — Goodreads has served HTML error pages with a 200 before.
  let ext;
  if (buf[0] === 0xff && buf[1] === 0xd8) ext = "jpg";
  else if (buf.slice(0, 8).toString("hex") === "89504e470d0a1a0a") ext = "png";
  else if (buf.slice(0, 4).toString("ascii") === "RIFF" && buf.slice(8, 12).toString("ascii") === "WEBP") ext = "webp";
  else die(`downloaded cover is not an image (content-type: ${contentType || "unknown"}, first bytes: ${buf.slice(0, 8).toString("hex")})`);

  return { name: `cover.${ext}`, buf };
}

const HELP = `usage: node .claude/skills/add-book/new-book.mjs [options]

  --goodreads <url>    Goodreads book page; fills title, author, description, cover
  --goodreads-url <u>  record the Goodreads link without scraping it (manual path)
  --title <str>        book title (required if no --goodreads)
  --author <str>       author name(s)
  --description <str>  one- or two-sentence blurb for bookDescription
  --rating <0-5>       stars; halves allowed (4.5). default 0
  --date-read <date>   YYYY-MM-DD. default today
  --date <date>        publish date for the post. default today
  --tags a,b,c         optional tag list
  --slug <str>         directory name. default: slugified title
  --cover <path|url>   override the cover source (local file or URL)
  --no-cover           skip the cover entirely
  --force              overwrite an existing bundle
  --dry-run            print the plan and the index.md, write nothing
`;

const args = parseArgs(process.argv.slice(2));
if (args.help || args.h) { console.log(HELP); process.exit(0); }

let meta = {};
if (args.goodreads) {
  if (typeof args.goodreads !== "string") die("--goodreads needs a URL");
  process.stderr.write(`fetching ${args.goodreads} ...\n`);
  meta = await scrapeGoodreads(args.goodreads);
  meta.goodreadsUrl = args.goodreads;
}

const title = args.title || meta.title;
if (!title) die("need --title (or --goodreads to look one up)");

const book = {
  title,
  author: args.author || meta.author || "",
  description: args.description || meta.description || "",
  goodreadsUrl: (typeof args.goodreads === "string" && args.goodreads) || args["goodreads-url"] || "",
  rating: args.rating === undefined ? 0 : Number(args.rating),
  dateRead: assertDate("date-read", args["date-read"] || today()),
  date: assertDate("date", args.date || today()),
  tags: args.tags && typeof args.tags === "string"
    ? args.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [],
};

if (Number.isNaN(book.rating) || book.rating < 0 || book.rating > 5) {
  die(`--rating must be between 0 and 5, got "${args.rating}"`);
}

// "Babel: An Arcane History" keeps its subtitle; "A New Earth: Awakening to
// Your Life's Purpose" does not. The existing bundles split at roughly 40 chars.
function defaultSlug(t) {
  const full = slugify(t);
  if (full.length <= 40) return full;
  const main = slugify(t.split(/\s*[:\u2014-]\s+/)[0]);
  return main || full.slice(0, 40).replace(/-+$/, "");
}

const slug = (typeof args.slug === "string" && args.slug) || defaultSlug(title);
const dir = path.join("content", "books", slug);
const indexPath = path.join(dir, "index.md");

if (fs.existsSync(indexPath) && !args.force) {
  die(`${indexPath} already exists — pass --force to overwrite`);
}

const coverSrc = args["no-cover"] ? null : (typeof args.cover === "string" ? args.cover : meta.cover);

function render(coverName) {
  const fm = [
    "---",
    `title: ${yq(book.title)}`,
    `date: ${book.date}`,
    "draft: false",
    `bookAuthor: ${yq(book.author)}`,
    `bookDescription: ${yq(book.description)}`,
    `goodreadsUrl: ${yq(book.goodreadsUrl)}`,
    `dateRead: ${book.dateRead}`,
    `rating: ${book.rating}`,
    ...(coverName ? [`bookCover: ${yq(coverName)}`] : []),
    ...(book.tags.length ? [`tags: [${book.tags.map(yq).join(", ")}]`] : []),
    "---",
    "",
    `## Notes on ${book.title}`,
    "",
    "<!-- Replace this with the reading notes. -->",
    "",
    "## Quotes",
    "",
    "<!-- > quote",
    "",
    "     Keep quotes grouped under `### Chapter N` headings, as in clean-code. -->",
    "",
  ];
  return fm.join("\n");
}

if (args["dry-run"]) {
  console.log(`would create ${dir}/`);
  if (coverSrc) console.log(`would fetch cover from ${coverSrc}`);
  console.log(`--- ${indexPath}`);
  console.log(render(coverSrc ? "cover.jpg" : null));
  process.exit(0);
}

// Fetch and validate the cover BEFORE touching the filesystem — a bad cover
// used to leave an empty content/books/<slug>/ behind.
const cover = coverSrc ? await loadCover(coverSrc) : null;

fs.mkdirSync(dir, { recursive: true });

if (cover) {
  fs.writeFileSync(path.join(dir, cover.name), cover.buf);
  console.log(`cover  ${path.join(dir, cover.name)} (${(cover.buf.length / 1024).toFixed(0)} KB)`);
} else {
  console.log("cover  skipped");
}

fs.writeFileSync(indexPath, render(cover && cover.name));
console.log(`wrote  ${indexPath}`);
console.log(`\nnext:\n  1. write the notes into ${indexPath}`);
console.log(`  2. rewrite bookDescription in your own words (Goodreads blurbs are marketing copy)`);
console.log(`  3. hugo --quiet && test -f public/books/${slug}/index.html`);
