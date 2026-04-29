import Image from 'next/image';
import RentalForm from '../RentalForm';

export const metadata = {
  title: 'Balloon Palace — Sound Rental',
  description: 'Professional sound system rental for Balloon Palace events',
};

export default function BalloonPalacePage() {
  return (
    <div className="container">
      <Image
        src="/ballroom-logo.webp"
        alt="Balloon Palace logo"
        width={300}
        height={150}
        className="speaker-image"
        priority
        style={{ objectFit: 'contain' }}
      />
      <h1>Premium Sound for Your Event</h1>
      <p className="price" style={{ fontSize: '2rem', fontWeight: '300', letterSpacing: '1px' }}>starting at $199 per night</p>
      <RentalForm />
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a href="https://balloonpalace.net/" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
          Click here to go to our main page
        </a>
      </p>
    </div>
  );
}
