import { SITE_ORIGIN } from '../lib/business';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
