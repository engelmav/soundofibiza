import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Premium Event Sound Rental',
  description: 'Professional Mackie Thump speaker system for weddings, corporate events, and launch parties',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&display=swap" rel="stylesheet" />
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