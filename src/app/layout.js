import './globals.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://soundofibiza.com'),
  title: 'Sound of Ibiza — Professional Audio Rentals, Setup, Delivery & Tuning',
  description: 'Nightclub-grade audio systems for professional events. Rentals, setup, delivery, and expert tuning—engineered for impact.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Sound of Ibiza',
    title: 'Sound of Ibiza — Professional Audio Rentals, Setup, Delivery & Tuning',
    description: 'Nightclub-grade audio systems for professional events. Rentals, setup, delivery, and expert tuning—engineered for impact.',
    url: 'https://soundofibiza.com/',
    images: [
      {
        url: '/THUMP210-210XT_3qtrR.png',
        alt: 'Sound of Ibiza professional audio system',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sound of Ibiza — Professional Audio Rentals, Setup, Delivery & Tuning',
    description: 'Nightclub-grade audio systems for professional events. Rentals, setup, delivery, and expert tuning—engineered for impact.',
    images: ['/THUMP210-210XT_3qtrR.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Professional audio system rental, setup, delivery, and tuning',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Sound of Ibiza',
    url: 'https://soundofibiza.com/',
    image: 'https://soundofibiza.com/THUMP210-210XT_3qtrR.png',
    priceRange: '$$',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Somerset County, NJ' },
    { '@type': 'City', name: 'Westfield, NJ' },
    { '@type': 'City', name: 'Morristown, NJ' },
    { '@type': 'City', name: 'Bridgewater, NJ' },
    { '@type': 'City', name: 'Brooklyn, NY' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@500;700;800&display=swap" rel="stylesheet" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T3Z6H11NJ6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T3Z6H11NJ6');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
} 