// Single source of truth for the business identity + service area used in JSON-LD
// (the homepage LocalBusiness/Service structured data). Keep this in sync with
// SEO_STRATEGY.md and the Google Business Profile. Only list towns/counties we
// ACTUALLY serve — truthful structured data is a trust signal; over-claiming lowers
// entity trust because answer engines cross-check the site against the Google
// Business Profile and reviews (see SEO_STRATEGY.md).

/**
 * Canonical host. The live site redirects the apex (soundofibiza.com) to www, so
 * www is the canonical origin. Everything that emits an absolute URL (canonical,
 * og:url, sitemap, robots, JSON-LD @id) derives from this so signals never drift.
 */
export const SITE_ORIGIN = 'https://www.soundofibiza.com';

export const BUSINESS = {
  name: 'Sound of Ibiza',
  /** Short descriptor used in structured data + meta. */
  serviceType: 'Professional audio system rental, setup, delivery, and tuning',
  // --- NAP (Name / Address / Phone) ---------------------------------------
  // Phone confirmed by owner (2026-10-23). E.164 format for schema consistency.
  telephone: '+1-917-655-7373',
  // Owner has not published a public email; intentionally omitted. Email is NOT
  // a local-SEO/AEO ranking signal (NAP = name/phone/area is what matters), and
  // an absent email is cleaner than an inconsistent one. Leave null unless/until
  // a single canonical public email exists.
  email: null,
  priceRange: '$$',
  /** Site-relative; callers resolve against SITE_ORIGIN (www canonical host). */
  imagePath: '/THUMP210-210XT_3qtrR.png',
  logoPath: '/icon-512.png',
};

/**
 * Entity-corroboration profiles. `sameAs` is how the site ASSERTS that these
 * external profiles are the same real-world entity as this website. For the
 * assertion to count as corroboration it must be MUTUAL: each profile's own
 * "website" field must point back to SITE_ORIGIN, and NAP + category must match
 * across the site, the Facebook Page, and the Google Business Profile.
 * See SEO_STRATEGY.md "Entity corroboration" for the off-site steps.
 *
 * Only real, confirmed URLs belong here — a sameAs pointing at the wrong page
 * HURTS entity trust. Entries left null are intentionally omitted from the output.
 */
export const PROFILES = {
  // Canonical Facebook Page URL (owner-supplied share link resolved to its
  // canonical form 2026-10-23; tracking params stripped). Page ID 61578814337702,
  // title "Sound of Ibiza". For bidirectional corroboration, set this Page's
  // "Website" field to SITE_ORIGIN (see SEO_STRATEGY.md / SEO_TICKETS.md Task 2.2).
  facebook: 'https://www.facebook.com/people/Sound-of-Ibiza/61578814337702/',
  // TODO(user): paste the Google Business Profile / Google Maps URL for the
  // business (the "Share" link from the Maps listing). This is the single
  // biggest local-ranking lever and the GBP side of the entity corroboration.
  googleBusinessProfile: null,
  // Optional — fill in if/when they exist.
  instagram: null,
  youtube: null,
  linkedin: null,
};

/**
 * Confirmed service area — real customers / genuine coverage only.
 * North Plainfield, NJ is where the business is based and operates from; the
 * remaining entries are the existing claimed coverage (kept per the owner's
 * decision). Keep this list in sync with the Google Business Profile service area.
 */
export const AREA_SERVED = [
  { '@type': 'City', name: 'North Plainfield, NJ' },
  { '@type': 'AdministrativeArea', name: 'Somerset County, NJ' },
  { '@type': 'City', name: 'Westfield, NJ' },
  { '@type': 'City', name: 'Morristown, NJ' },
  { '@type': 'City', name: 'Bridgewater, NJ' },
  { '@type': 'City', name: 'Brooklyn, NY' },
];

/** Resolve a site-relative path to an absolute URL on the canonical (www) host. */
export const abs = (path) => new URL(path, SITE_ORIGIN).href;

/** Non-null external profile URLs, in a stable order, for JSON-LD `sameAs`. */
export function sameAs() {
  return [
    PROFILES.facebook,
    PROFILES.googleBusinessProfile,
    PROFILES.instagram,
    PROFILES.youtube,
    PROFILES.linkedin,
  ].filter(Boolean);
}

/**
 * Build the homepage JSON-LD: a `Service` whose `provider` is a `LocalBusiness`
 * carrying a stable `@id` (so the entity can be referenced/merged), the real NAP
 * (only fields that are set), the truthful `areaServed`, and `sameAs` linking the
 * corroborating external profiles. All absolute URLs derive from SITE_ORIGIN (www).
 */
export function homepageJsonLd() {
  const businessId = `${SITE_ORIGIN}/#business`;

  const provider = {
    '@type': 'LocalBusiness',
    '@id': businessId,
    name: BUSINESS.name,
    url: abs('/'),
    image: abs(BUSINESS.imagePath),
    logo: abs(BUSINESS.logoPath),
    priceRange: BUSINESS.priceRange,
    areaServed: AREA_SERVED,
  };
  if (BUSINESS.telephone) provider.telephone = BUSINESS.telephone;
  if (BUSINESS.email) provider.email = BUSINESS.email;

  const links = sameAs();
  if (links.length) provider.sameAs = links;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: BUSINESS.serviceType,
    provider,
    areaServed: AREA_SERVED,
  };
}
