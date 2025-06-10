import './globals.css';

export const metadata = {
  title: 'Rent Party Speakers',
  description: 'Rent 2 mackie thump speakers with subwoofer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 