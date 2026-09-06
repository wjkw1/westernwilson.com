#!/usr/bin/env node
// Scaffolds a Hugo page bundle under content/books/<slug>/ : index.md + cover image.
// Zero dependencies (Node 18+ global fetch). Run from the repo root.
//
//   node .claude/skills/add-book/new-book.mjs \
//     --goodreads https://www.goodreads.com/book/show/62047984-yellowface \
//     --rating 5 --date-read 2026-01-17
//
// --goodreads always records the link. It is also scraped for title, author,
// description and cover; anything it finds is overridden by an explicit flag,
// and if Goodreads refuses to answer the run still succeeds as long as you
// passed --title yourself.

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const BOOL_FLAGS = new Set(["no-cover", "force", "dry-run", "help", "h"]);

function die(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

// Every option is a --flag. Value flags must actually get a value, so a bare
// `--rating` is an error rather than silently becoming 1.
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) die(`unexpected argument "${a}" — every option is a --flag`);
    const eq = a.indexOf("=");
    const key = eq === -1 ? a.slice(2) : a.slice(2, eq);
    if (BOOL_FLAGS.has(key)) {
      out[key] = true;
      continue;
    }
    const val = eq === -1 ? argv[++i] : a.slice(eq + 1);
    if (val === undefined || val.startsWith("--")) die(`--${key} needs a value`);
    out[key] = val;
  }
  return out;
}

function slugify(s) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // "Les Misérables" -> les-miserables
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// "Babel: An Arcane History" keeps its subtitle; "A New Earth: Awakening to
// Your Life's Purpose" does not. The existing bundles split at roughly 40 chars.
function defaultSlug(t) {
  const full = slugify(t);
  if (full.length <= 40) return full;
  return slugify(t.split(/\s*[:\u2014-]\s+/)[0]) || full.slice(0, 40).replace(/-+$/, "");
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

// Goodreads returns HTML-encoded text: "Good Habits &amp; Break Bad Ones".
const ENTITIES = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
function decodeEntities(s) {
  return String(s)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

function stripHtml(s) {
  return decodeEntities(String(s).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

// Publisher blurbs run past 2000 chars and render inline on the books list
// page. Keep the first sentence; it is a placeholder to rewrite by hand anyway.
function firstSentence(s, max = 320) {
  const first = s.split(/(?<=[.!?])\s/)[0];
  return first.length <= max
    ? first
    : first.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Goodreads throttles by IP: after a handful of requests it answers 202 with a
// zero-byte body instead of a 429. Returns null once it has given up.
async function fetchBookPage(url, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    let why;
    try {
      const res = await fetch(url, { headers: { "user-agent": UA } });
      const html = await res.text();
      if (res.ok && html.length > 2000) return html;
      why = html.length === 0
        ? `HTTP ${res.status}, empty body (rate limited)`
        : `HTTP ${res.status}, ${html.length} bytes`;
    } catch (e) {
      why = e.message; // bad hostname, DNS failure, offline
    }
    if (i === attempts) {
      process.stderr.write(`  goodreads did not answer: ${why}\n`);
      return null;
    }
    process.stderr.write(`  ${why} — retrying in ${i * 2}s\n`);
    await sleep(i * 2000);
  }
}

async function scrapeGoodreads(url) {
  const html = await fetchBookPage(url);
  if (!html) return {};
  const meta = {};

  // JSON-LD carries name + author reliably.
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (ld) {
    try {
      const d = JSON.parse(ld[1]);
      if (d.name) meta.title = decodeEntities(d.name);
      if (d.image) meta.cover = d.image;
      const authors = [d.author].flat().filter(Boolean);
      const names = authors.map((a) => a.name).filter(Boolean);
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
          if (v.description) meta.description = firstSentence(stripHtml(v.description));
          break;
        }
      }
    } catch { /* optional */ }
  }

  const og = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (og) meta.cover ||= og[1];

  return meta;
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

  // Sniff magic bytes — a throttled Goodreads has served text with a 200 before.
  let ext;
  if (buf[0] === 0xff && buf[1] === 0xd8) ext = "jpg";
  else if (buf.subarray(0, 8).toString("hex") === "89504e470d0a1a0a") ext = "png";
  else if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") ext = "webp";
  else die(`cover is not an image (content-type: ${contentType || "unknown"}, first bytes: ${buf.subarray(0, 8).toString("hex")})`);

  return { name: `cover.${ext}`, buf };
}

const HELP = `usage: node .claude/skills/add-book/new-book.mjs --goodreads <url> [options]

  --goodreads <url>    Goodreads book page. Recorded as goodreadsUrl, and
                       scraped for title, author, description and cover.
                       Scraping is best-effort: if Goodreads is throttling,
                       the run still succeeds when you pass --title yourself.
  --title <str>        book title (required if the scrape found nothing)
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
  --dry-run            print the index.md it would write, touch nothing
`;

const args = parseArgs(process.argv.slice(2));
if (args.help || args.h) {
  console.log(HELP);
  process.exit(0);
}

let meta = {};
if (args.goodreads) {
  process.stderr.write(`fetching ${args.goodreads} ...\n`);
  meta = await scrapeGoodreads(args.goodreads);
}

const title = args.title || meta.title;
if (!title) {
  die(
    "no title. Goodreads did not answer (it throttles by IP and stays blocked\n" +
    "  for a while) and --title was not given. Re-run with the details filled\n" +
    "  in by hand, keeping --goodreads so the link is still recorded:\n\n" +
    "    --goodreads <url> --title \"...\" --author \"...\" --cover <url|path>\n\n" +
    "  Cover images live on m.media-amazon.com, a different host, and are NOT\n" +
    "  throttled — right-click the cover on Goodreads, Copy Image Address."
  );
}

const book = {
  title,
  author: args.author || meta.author || "",
  description: args.description || meta.description || "",
  goodreadsUrl: args.goodreads || "",
  rating: args.rating === undefined ? 0 : Number(args.rating),
  dateRead: assertDate("date-read", args["date-read"] || today()),
  date: assertDate("date", args.date || today()),
  tags: args.tags ? args.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
};

if (Number.isNaN(book.rating) || book.rating < 0 || book.rating > 5) {
  die(`--rating must be between 0 and 5, got "${args.rating}"`);
}

const slug = args.slug || defaultSlug(title);
const dir = path.join("content", "books", slug);
const indexPath = path.join(dir, "index.md");

if (fs.existsSync(indexPath) && !args.force) {
  die(`${indexPath} already exists — pass --force to overwrite`);
}

const coverSrc = args["no-cover"] ? null : (args.cover || meta.cover);

function render(coverName) {
  return [
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
  ].join("\n");
}

if (args["dry-run"]) {
  console.log(`would create ${dir}/`);
  if (coverSrc) console.log(`would fetch cover from ${coverSrc}`);
  console.log(`--- ${indexPath}`);
  console.log(render(coverSrc && `cover.${(coverSrc.match(/\.(png|webp)(?:\?|$)/i)?.[1] ?? "jpg").toLowerCase()}`));
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
console.log("  2. rewrite bookDescription in your own words (Goodreads blurbs are marketing copy)");
console.log(`  3. hugo --quiet && test -f public/books/${slug}/index.html`);
