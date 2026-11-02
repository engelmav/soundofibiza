import { SITE_ORIGIN } from '../lib/business';

export default function sitemap() {
  return [
    {
      url: `${SITE_ORIGIN}/`,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
