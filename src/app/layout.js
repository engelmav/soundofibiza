import './globals.css';

export const metadata = {
  title: 'Rent Party Equipment - Sound of Ibiza',
  description: 'Rent party speakers and tents for your next event',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 