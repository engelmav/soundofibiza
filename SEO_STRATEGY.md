# Local SEO & AEO Strategy — Sound of Ibiza

How we optimize soundofibiza.com to be found by local customers via search engines
(Google) **and** answer engines (Google AI Overviews, ChatGPT, Perplexity, voice
assistants).

Sound of Ibiza is a **service-area business (SAB)**: we rent, deliver, set up, and tune
audio systems at the customer's venue. The business is based in **North Plainfield, NJ**
and has **no public retail storefront** customers visit. All geographic targeting must
reflect that.

> **Scope note (2026-10):** this strategy targets the **currently deployed** homepage —
> the single-column rental page (H1 "Premium Sound for Your Event", the Name/Email/Rental
> Date form posting to `/api/send-email`, "Serving North Plainfield, NJ & surrounding
> areas"). A richer multi-section draft exists at `src/app/page.js` but is **not live**
> (Vercel serves the simpler page). If that draft is ever promoted to `/`, revisit the
> visible-prose and FAQ sections below — the structured-data strategy still applies.

---

## Core principles (research-backed)

1. **Visible text, never hidden tags.**
   Google does **not** use the `keywords` meta tag, and there is no hidden geo/location
   meta tag that helps ranking. Hidden/invisible location text (white-on-white, off-screen
   town lists, stuffed hidden divs) is a **spam-policy violation** (keyword stuffing /
   cloaking) and risks a penalty. Location signals must be **visible, natural prose** that
   users and crawlers see identically.

2. **Towns in prose, lightly; towns in structured data, exhaustively (but truthfully).**
   - Humans don't want a wall of town names. Visible copy names a **home base + a few
     anchor areas + "surrounding areas"** in a natural sentence (the live page already does
     this: "Serving North Plainfield, NJ & surrounding areas").
   - The full coverage list lives in **JSON-LD `areaServed`** — a sanctioned,
     machine-readable channel (this is NOT "hidden text"). It carries the complete footprint
     with zero visual clutter.

3. **Truthfulness is a ranking/trust signal — do not over-claim.**
   `areaServed` must list only places we **actually serve**. Structured data is subject to
   Google's quality/spam policies; inaccurate markup is ignored at best and a manual-action
   risk at worst. Answer engines cross-check the site against the Google Business Profile,
   reviews, and real signals — padding `areaServed` with places we don't serve **lowers**
   entity trust and **dilutes** the strong, true signals.

4. **Lead with the customer's search language.**
   People search "speaker rental in North Plainfield" or "sound system rental near me," not
   "audio rental in Somerset County." Town/city names map to real intent; counties add
   legitimate breadth. Use both, the home base and nearby towns first.

5. **AEO = answer-first + explicit service+location + consistency.**
   To get cited by AI/voice for "sound system rental near me / in <town>": concise factual
   sentences that explicitly pair **service + place**, optional short visible Q&A phrasing
   (an FAQ), and **NAP consistency** (identical business name / phone / URL across the site,
   the Facebook Page, and the Google Business Profile).

6. **One source of truth for identity + area.**
   `src/lib/business.js` is the single module that emits the business NAP, `areaServed`, and
   `sameAs`. The homepage JSON-LD (and any future page) consume it, so the service area and
   identity never drift between pages. Keep it in sync with this doc and the Google Business
   Profile.

---

## Our service area (source of truth)

Keep this in sync with the Google Business Profile and `src/lib/business.js` `AREA_SERVED`.

### Current `areaServed`

| Place | Type | Note |
|-------|------|------|
| North Plainfield, NJ | City | **Home base** — business is based and operates here |
| Somerset County, NJ | AdministrativeArea | |
| Westfield, NJ | City | |
| Morristown, NJ | City | |
| Bridgewater, NJ | City | |
| Brooklyn, NY | City | |

> **Known reconciliation item (owner's call):** the towns above were kept per the owner's
> decision. Before this list is a *maximally* trustworthy signal, confirm the business
> genuinely serves each one (and consider whether the home county is **Somerset** or
> **Union** — North Plainfield is in Somerset County, but it borders Plainfield in Union
> County, so both may be legitimate). Remove anything not genuinely served; truthfulness is
> the trust lever (principle #3).

---

## Entity corroboration — Facebook Page ↔ Google Business Profile ↔ website

This is the mechanism that makes search/answer engines confident that
"Sound of Ibiza" is **one specific real-world business**, and attach the site, the Facebook
Page, and the Google Business Profile (GBP) to that single entity. Strong corroboration is
one of the highest-leverage local/AEO signals.

### How it works (three mechanisms)

1. **`sameAs` in JSON-LD — the explicit assertion.**
   The homepage `LocalBusiness` carries a stable `@id` (`https://www.soundofibiza.com/#business`)
   and a `sameAs` array listing the business's external profiles (Facebook Page, GBP/Maps
   URL, Instagram, etc.). This is the site *asserting*: "all of these are the same entity as
   this website." It is wired in `src/lib/business.js` (`PROFILES` → `sameAs()`), so adding a
   URL is a one-line change.

2. **Bidirectional confirmation — the assertion must be mutual.**
   A one-way claim is weak. Corroboration counts when the links point **both** ways:
   - Website `sameAs` → Facebook Page, and the Facebook Page's **"Website" field** → `https://www.soundofibiza.com`.
   - Website `sameAs` → GBP/Maps listing, and the GBP **"Website" field** → `https://www.soundofibiza.com`.
   - The Facebook Page and the GBP agree with each other (and the site) on **name,
     category, phone, and service area**.
   When all three mutually reference each other with identical details, the engine merges
   them into one high-confidence entity.

3. **NAP + category consistency — the entity "fingerprint."**
   Business **N**ame, **A**ddress/area, **P**hone, and category must be identical across the
   site, the Facebook Page, and the GBP (byte-for-byte: same phone format, same business
   name spelling). Contradictions (e.g. two different phone numbers, or a county on the site
   that the GBP doesn't list) *lower* confidence. Because this is an SAB, "Address" is the
   **service area**, not a storefront — set the GBP as a service-area business and mirror the
   same towns/counties as `areaServed`.

### Expectation-setting (important)

There is **no** JSON-LD field or meta tag that *directly verifies* a Facebook Page or a GBP
the way a DNS record verifies domain ownership. Entity corroboration is **probabilistic** —
it is the accumulated weight of consistent, mutually-referencing signals. So the work is
concrete and off-page-heavy:

- **On-site (done / in code):** `sameAs` + `@id` + truthful NAP, all from one source of
  truth. Currently the Facebook and GBP URLs are `null` placeholders in
  `src/lib/business.js` (the real Facebook URL was not discoverable via web search, and the
  owner no longer has the link). They are intentionally omitted from output until real URLs
  are supplied — a `sameAs` pointing at the **wrong** page actively hurts trust.
- **Off-site (owner action):**
  1. Obtain the real **Facebook Page URL** and set `PROFILES.facebook`.
  2. Set the Facebook Page's **Website** field to `https://www.soundofibiza.com`.
  3. Create/claim the **Google Business Profile** as a **service-area business** (no public
     address), set its service area to match `areaServed`, set its **Website** to
     `https://www.soundofibiza.com`, and set `PROFILES.googleBusinessProfile` to the Maps
     share URL.
  4. Make **NAP + category identical** across site, Facebook, and GBP.
  5. Encourage **reviews that name real towns** ("great sound system rental in North
     Plainfield") — these reinforce the entity + local relevance.

> **Optional upgrade:** once the GBP exists, the `LocalBusiness` can also carry Google's
> place identifiers and an explicit `Organization` node; but the `sameAs` + mutual
> website-field links above are the core, and are sufficient for strong corroboration.

---

## Implementation status

### Done (in this repo)
- **Single source of truth:** `src/lib/business.js` (`BUSINESS`, `PROFILES`, `AREA_SERVED`,
  `homepageJsonLd()`).
- **Homepage JSON-LD:** `Service` → `LocalBusiness` with stable `@id`, truthful
  `areaServed` (incl. North Plainfield), `telephone` `+1-917-655-7373`, and `sameAs`
  linking the Facebook Page (`.../people/Sound-of-Ibiza/61578814337702/`) — consumed by
  `src/app/layout.js`.
- **Canonical/host consistency:** `metadataBase`, `canonical`, `og:url`, `sitemap.js`, and
  `robots.js` all derive from the live **www** canonical origin (the server already
  redirects apex → www).

### Pending
- **Email:** intentionally **not** published — not a ranking signal; `BUSINESS.email` stays
  null (absent is cleaner than inconsistent).
- **Facebook "Website" field (owner, off-site):** set the Page's Website to
  `https://www.soundofibiza.com` so the `sameAs` link is **bidirectional**.
- **Google Business Profile:** create/claim as SAB + set Website to the site + Maps URL into
  `PROFILES.googleBusinessProfile` (the GBP half of corroboration; biggest local lever).
- A small visible **FAQ** + `FAQPage` JSON-LD for AEO (answer-first service+place phrasing).
- Reconcile the `areaServed` town list against genuine coverage.

---

## Do / Don't quick reference

**Do**
- Keep visible copy natural: home base + a few anchor areas + "surrounding areas."
- Put the full, **true** footprint in JSON-LD `areaServed` (one source of truth).
- Keep NAP identical across site + Facebook Page + Google Business Profile.
- Make `sameAs` links **mutual** (profiles link back to the site).

**Don't**
- Use the `keywords` meta tag or any hidden/invisible location text.
- Stuff long comma-lists of towns into visible prose.
- List places in `areaServed` we don't actually serve.
- Point `sameAs` at an unverified/guessed profile URL.
- Let canonical/og/sitemap drift back to the apex host.

---

## Sources (2025–2026)
- Google does not use the keywords meta tag:
  https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag
- Google spam policies (hidden text, keyword stuffing, cloaking):
  https://developers.google.com/search/docs/essentials/spam-policies
- LocalBusiness structured data (Google):
  https://developers.google.com/search/docs/appearance/structured-data/local-business
- `areaServed` accepts City / AdministrativeArea: https://schema.org/areaServed
- `sameAs` (entity disambiguation): https://schema.org/sameAs
- GBP for service-area businesses (BrightLocal):
  https://www.brightlocal.com/learn/gbp-for-service-area-businesses/
- AEO / FAQ phrasing for AI citations (Frase):
  https://www.frase.io/blog/faq-schema-ai-search-geo-aeo
