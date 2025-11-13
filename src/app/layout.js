import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Rent Party Speakers',
  description: 'Rent 2 mackie thump speakers with subwoofer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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