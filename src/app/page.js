import Image from 'next/image';
import RentalForm from './RentalForm';
import DailyRandomizer from './DailyRandomizer';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Party Speakers for Rent</h1>
      <h2 className="subtitle">We bring the club to your house.</h2>
      <Image
        src="/THUMP210-210XT_3qtrR.png"
        alt="Mackie Thump Speakers on stands"
        width={300}
        height={300}
        className="speaker-image"
        priority
      />
      <p>2 x Mackie Thump Speakers</p>
      <p className="free-items">Speaker stands and microphone included for free!</p>
      <p className="price" style={{ fontSize: '2rem', fontWeight: 'bold' }}>$59/night</p>
      <DailyRandomizer />
      <RentalForm />
      <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', marginTop: '2rem' }}>
        Based out of North Plainfield, NJ
      </p>
    </div>
  );
} 