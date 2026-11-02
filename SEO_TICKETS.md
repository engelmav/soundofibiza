# SEO / AEO Implementation Tickets — Sound of Ibiza

Phased, point-estimated work to supercharge local SEO + answer-engine optimization for
soundofibiza.com, following the strategy in **[SEO_STRATEGY.md](SEO_STRATEGY.md)**.

**Target surface:** the **currently deployed** homepage — the simple rental page
(`src/app/page.backup.js`-equivalent served at `/`; H1 "Premium Sound for Your Event",
Name/Email/Rental Date form → `/api/send-email`, "Serving North Plainfield, NJ &
surrounding areas"). The richer `src/app/page.js` draft is **not live** and is out of scope
until promoted.

**Stack:** Next.js 15 (App Router) on Vercel. Apex `soundofibiza.com` → `www` (307) at the
edge; **www is canonical**.

---

## ⏯️ RESUME HERE — cold-start snapshot (last updated 2026-10-26)

> **This file is the source of truth for progress.** Any in-session TODO list is ephemeral
> and does NOT survive a restart — trust the per-task **Status** lines below, and re-derive
> actual state from the repo (commands in "How to re-confirm state"). Nothing has been
> committed to git or deployed yet unless a later edit to this file says otherwise.

**Where we are:** Phase 1 code is **done + build-verified** (source-of-truth module, upgraded
JSON-LD, www canonical). Entity corroboration is **wired in code** for phone + Facebook; the
Google Business Profile and the off-site bidirectional steps are the main outstanding work.
**No deploy has happened** (Task 1.4 pending) and **no git commit has been made** by the agent.

**Done (code, verified via `npm run build`):**
- 1.1 `src/lib/business.js` created (single source of truth).
- 1.2 `src/app/layout.js` JSON-LD → `homepageJsonLd()` (`Service`→`LocalBusiness`, `@id`, conditional `sameAs`).
- 1.3 `metadataBase`/`og:url`/`sitemap.js`/`robots.js` all on **www**.
- 2.1 `BUSINESS.telephone = '+1-917-655-7373'` (email intentionally null).
- 2.2 `PROFILES.facebook = 'https://www.facebook.com/people/Sound-of-Ibiza/61578814337702/'` (→ `sameAs`).
- Docs: `SEO_STRATEGY.md` + this file written.

**Outstanding (in rough priority order):**
1. **Task 1.4** — deploy to Vercel + verify live (crawl-affecting www canonical change; was awaiting owner go-ahead).
2. **Task 3.1 / 3.2** — FAQ + `FAQPage` schema, and tighten service+place prose. **No external facts needed — safe to do now.**
3. **Task 2.3** — create/claim Google Business Profile + wire `PROFILES.googleBusinessProfile` (needs owner to create GBP + supply Maps URL).
4. **Task 2.4** — NAP/category consistency audit across site + FB + GBP (after 2.3).
5. **Task 4.1** — reconcile `areaServed` vs genuine coverage (owner decision).
6. **Task 4.2** — rotate the exposed Gmail app password in `.env.local` (owner/security action).

**Immediate next action if resuming now:** either (a) do **Task 3.1** (FAQ + `FAQPage`) — the
highest-value work that needs nothing from the owner — or (b) if the owner has given the
go-ahead, do **Task 1.4** (deploy + live-verify). Confirm which with the owner if unsure.

**Owner actions we're waiting on (off-repo, can't be done by an agent):**
- Set the Facebook Page's **"Website" field** → `https://www.soundofibiza.com` (makes the 2.2 `sameAs` link bidirectional).
- Create/claim the **Google Business Profile** (service-area business) + send its **Maps URL**.
- Confirm which `areaServed` towns are genuinely served (Task 4.1).
- Rotate the Gmail app password (Task 4.2).

**How to re-confirm state (don't trust memory — run these):**
```bash
cd /Users/vengelmann/repos/personal/soundofibiza
npm run build            # must exit 0
# phone + facebook + www should all be present in the prerendered homepage JSON-LD:
grep -o '<script type="application/ld+json"[^<]*</script>' .next/server/app/index.html
# expect: telephone "+1-917-655-7373", sameAs [facebook .../61578814337702/],
#         @id https://www.soundofibiza.com/#business, North Plainfield in areaServed
grep -c 'https://soundofibiza.com' .next/server/app/index.html   # apex leak check → expect 0
git status               # see what is staged/committed vs. working-tree only
```
Also eyeball `src/lib/business.js` directly — its `BUSINESS`, `PROFILES`, and `AREA_SERVED`
constants are the literal current state regardless of what any task note claims.

---

## Status legend
`pending` | `in_progress` | `complete` | `blocked (needs owner facts)`

## Working context for a new contributor
- **Single source of truth:** `src/lib/business.js` — `BUSINESS` (NAP), `PROFILES`
  (`sameAs` URLs), `AREA_SERVED`, and `homepageJsonLd()`. Everything that emits identity,
  area, or an absolute URL goes through here so signals never drift.
- **Consumed by:** `src/app/layout.js` (metadata + JSON-LD), `src/app/sitemap.js`,
  `src/app/robots.js`.
- **Canonical host:** `SITE_ORIGIN = https://www.soundofibiza.com` in `business.js`.
- **Verify a change:** `npm run build` (exit 0), then inspect the prerendered output under
  `.next/server/app/` (e.g. `index.html`, `sitemap.xml.body`, `robots.txt.body`) or curl the
  live site after deploy. Check for: single JSON-LD block, www-only URLs (no apex leak),
  correct `areaServed`, canonical == og:url == www.

---

## Phase 1 — Source of truth, schema, host consistency (foundational)

### Task 1.1 — Single source-of-truth business module — 2pt
**Status:** complete
Create `src/lib/business.js` holding NAP, `areaServed`, external-profile `sameAs` slots,
and a `homepageJsonLd()` builder, so identity/area never drift across pages.
- **Created:** `src/lib/business.js`.

> **Done:** `business.js` exports `SITE_ORIGIN` (www), `BUSINESS` (name, serviceType,
> `telephone`/`email` = `null` TODO, priceRange, image/logo paths), `PROFILES`
> (`facebook`/`googleBusinessProfile`/`instagram`/`youtube`/`linkedin` = `null` TODO),
> `AREA_SERVED` (North Plainfield + Somerset County + Westfield/Morristown/Bridgewater +
> Brooklyn NY), plus `abs()`, `sameAs()` (drops null entries), and `homepageJsonLd()`.
> Null NAP/profile fields are **omitted** from output rather than emitting placeholders
> (a wrong value is worse than an absent one for NAP/entity trust).

### Task 1.2 — Upgrade homepage JSON-LD (LocalBusiness + @id + sameAs) — 2pt
**Status:** complete
Replace the hand-maintained inline `jsonLd` in `layout.js` with the module builder;
give the business a stable `@id` and a conditional `sameAs` for entity corroboration.
- **Changed:** `src/app/layout.js`.

> **Done:** `layout.js` imports `{ SITE_ORIGIN, homepageJsonLd }`; `jsonLd =
> homepageJsonLd()`. Output is `Service` → `provider` `LocalBusiness` with
> `@id = https://www.soundofibiza.com/#business`, www URLs for `url`/`image`/`logo`,
> truthful `areaServed`, and `sameAs` **only when** profile URLs exist (currently omitted).
> **Verified** (`npm run build`, exit 0): prerendered `/` has one `application/ld+json`
> block, valid JSON, `@type` `Service`/provider `LocalBusiness`, `@id` present, North
> Plainfield first in `areaServed`, no `sameAs`/`telephone`/`email` keys (all null), zero
> apex URLs.

### Task 1.3 — Align canonical/host signals to www — 1pt
**Status:** complete
The edge redirects apex → www, but metadata/sitemap/robots pointed at the apex — a
conflicting canonical signal. Make them all www.
- **Changed:** `src/app/layout.js` (`metadataBase`, `og:url`), `src/app/sitemap.js`,
  `src/app/robots.js`.

> **Done:** `metadataBase = new URL(SITE_ORIGIN)`, `og:url` = `https://www.soundofibiza.com/`,
> `alternates.canonical = '/'` (resolves to www via metadataBase). `sitemap.js` and
> `robots.js` derive from `SITE_ORIGIN`. **Verified** (`npm run build`): prerendered
> `canonical` and `og:url` both `https://www.soundofibiza.com`; `sitemap.xml` `<loc>` =
> `https://www.soundofibiza.com/`; `robots.txt` Sitemap = `https://www.soundofibiza.com/sitemap.xml`.
> Grep for apex `https://soundofibiza.com` in prerendered `/` → zero matches.

### Task 1.4 — Deploy + verify live — 1pt
**Status:** pending
Deploy to Vercel and confirm the live site reflects the above.
- **Changed:** live deployment only.

> **Verification (run after deploy):**
> - `curl -s https://www.soundofibiza.com/ | grep -o '<link rel="canonical"[^>]*>'` → www.
> - `curl -s https://www.soundofibiza.com/ | grep -o 'application/ld+json.*</script>'` →
>   `LocalBusiness` `@id` www, North Plainfield in `areaServed`.
> - `curl -s https://www.soundofibiza.com/sitemap.xml` and `.../robots.txt` → www host.
> - `curl -s https://www.soundofibiza.com/ | grep -c 'https://soundofibiza.com'` (apex) → 0.
> - Validate the JSON-LD in Google's Rich Results Test.

---

## Phase 2 — Entity corroboration (Facebook Page ↔ GBP ↔ site)

> The core on-site plumbing (`sameAs` + `@id`) already exists (Task 1.2). Phase 2 fills in
> the real URLs and does the off-site, bidirectional work. See SEO_STRATEGY.md "Entity
> corroboration." These are **probabilistic** trust signals — the value is in *mutual,
> consistent* links, not in any single tag.

### Task 2.1 — Supply the real NAP — 1pt
**Status:** complete (code); off-site NAP consistency tracked in 2.4
Fill `BUSINESS.telephone` (and `email` if one exists) with the single canonical value(s).
- **Changed:** `src/lib/business.js`.

> **Done (2026-10-23):** `BUSINESS.telephone = '+1-917-655-7373'` (owner-confirmed, E.164).
> **Email intentionally omitted** — the owner never published a public email; email is **not**
> a local-SEO/AEO ranking signal (NAP = name/phone/area), and an absent email is cleaner
> than an inconsistent one, so `email` stays `null` and is omitted from output.
> **Verified** (`npm run build`, exit 0): prerendered `/` JSON-LD `provider.telephone` =
> `+1-917-655-7373`; no `email` key. Phone must match the Facebook Page + GBP (Task 2.4).

### Task 2.2 — Supply + wire the Facebook Page URL — 1pt
**Status:** complete (code); off-site "Website" field = owner action
Set `PROFILES.facebook` to the real Facebook Page URL; it then appears in `sameAs`.
- **Changed:** `src/lib/business.js`.

> **Done (2026-10-23):** owner supplied a share link
> (`facebook.com/share/1GWQL3Bp9H/?mibextid=wwXIfr`), which was resolved by following
> redirects to the canonical Page (ID `61578814337702`, title "Sound of Ibiza"). Tracking
> params stripped; stored the clean canonical form
> `https://www.facebook.com/people/Sound-of-Ibiza/61578814337702/` in `PROFILES.facebook`.
> **Verified** (`npm run build`): prerendered `/` JSON-LD `provider.sameAs` =
> `["https://www.facebook.com/people/Sound-of-Ibiza/61578814337702/"]`.
> - **OWNER ACTION (off-site, for bidirectional corroboration):** set the Facebook Page's
>   **"Website" / Contact Info** field to `https://www.soundofibiza.com`, and confirm the
>   Page's name + phone match the site NAP (Task 2.4).

### Task 2.3 — Create/claim the Google Business Profile (SAB) + wire URL — 2pt
**Status:** blocked (needs owner facts)
Create or claim the GBP as a **service-area business** (no public address), set its service
area to match `AREA_SERVED`, set its Website to `https://www.soundofibiza.com`, set its
category (e.g. "Audio visual equipment rental service"), and set
`PROFILES.googleBusinessProfile` to the Maps share URL.
- **Changed:** `src/lib/business.js` + off-site GBP setup.
- **Verify:** `npm run build`; `sameAs` contains the GBP/Maps URL. Confirm GBP Website →
  site, GBP name/phone/area == site NAP + `areaServed`.

### Task 2.4 — NAP + category consistency audit — 1pt
**Status:** blocked (depends on 2.1–2.3)
Confirm business **name, phone, category, and service area are byte-identical** across site
JSON-LD, the Facebook Page, and the GBP. Fix any drift.
- **Verify:** side-by-side check of the three surfaces; same phone format, same name spelling,
  same town/county set.

---

## Phase 3 — AEO content (answer-engine optimization)

### Task 3.1 — Add a visible FAQ + `FAQPage` JSON-LD — 2pt
**Status:** pending
Add a short, visible FAQ to the homepage answering real service+place questions
("Do you rent sound systems in North Plainfield, NJ?", "What's included in the $199/night
rental?", "Do you deliver and set up?"), and emit matching `FAQPage` JSON-LD (built from a
new helper in `business.js` so Q&A text has one source). Answer-first phrasing is what AI
Overviews / ChatGPT / Perplexity cite.
- **Changed:** `src/app/page.backup.js` (or whichever component is live at `/`),
  `src/lib/business.js` (add `faqJsonLd()`).
- **Verify:** `npm run build`; prerendered `/` has a `FAQPage` block whose questions match
  the visible text verbatim; validate in Google's Rich Results Test (FAQ eligibility).
- **Note:** keep Q&A copy truthful and consistent with the live offer; don't invent services.

### Task 3.2 — Tighten visible service+place prose — 1pt
**Status:** pending
Ensure the visible copy pairs the **service** ("sound system / audio rental, delivery,
setup") with the **place** ("North Plainfield, NJ & surrounding areas") in at least one
natural sentence near the top — the live tagline is close; make the service noun explicit
for intent matching. **Preserve the owner's wording**; propose edits, don't silently rewrite.
- **Changed:** the live homepage component.
- **Verify:** visible sentence contains an explicit service term + the place; no keyword
  stuffing.

---

## Phase 4 — Reconciliation & hygiene

### Task 4.1 — Reconcile `areaServed` against genuine coverage — 1pt
**Status:** pending (owner decision)
Confirm each entry in `AREA_SERVED` is genuinely served; remove any that aren't. Decide the
correct home county (North Plainfield is **Somerset**, bordering **Union**/Plainfield —
both may be legitimate). Truthfulness is the trust lever.
- **Changed:** `src/lib/business.js` + SEO_STRATEGY.md table.

### Task 4.2 — Rotate the exposed Gmail app password — 1pt
**Status:** pending (security, owner action)
`.env.local` contains a Gmail app password in plaintext. It is gitignored, but treat it as
exposed (it has been read into tooling). Rotate it in the Google Account, update the Vercel
env var, and confirm `/api/send-email` still works.
- **Changed:** Google app password + Vercel env; no repo change.
- **Verify:** submit the rental form; confirm email delivery still succeeds.

---

## Out of scope (future upgrade paths)
- Promoting the richer `src/app/page.js` (services/portfolio/booking) to `/` — would expand
  the surfaces to optimize (per-service sections, portfolio `ItemList`, review schema). The
  structured-data strategy here still applies; revisit visible-prose/FAQ tickets.
- A blog/posts engine for local long-tail AEO content (as done for norascleaning) — larger
  effort; only worth it if content will actually be produced.
- `Review`/`AggregateRating` schema — only once real, verifiable reviews exist (never fake).
