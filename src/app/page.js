import Image from 'next/image';
import RentalForm from './RentalForm';
import DailyRandomizer from './DailyRandomizer';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Premium Sound for Your Event</h1>
      <h2 className="subtitle">Weddings • Corporate Events • Launch Parties</h2>
      <Image
        src="/THUMP210-210XT_3qtrR.png"
        alt="Mackie Thump Speakers on stands"
        width={300}
        height={300}
        className="speaker-image"
        priority
      />
      <p>High Quality, Pro Audio Systems</p>
      <p className="free-items">Complimentary delivery & setup</p>
      <p className="price" style={{ fontSize: '2rem', fontWeight: '300', letterSpacing: '1px' }}>starting at $199 per night</p>
      <DailyRandomizer />
      <RentalForm />
      <p style={{ textAlign: 'center', color: '#b0b0b0', fontSize: '0.9rem', marginTop: '2rem', fontStyle: 'italic' }}>
        Serving North Plainfield, NJ & surrounding areas
      </p>
    </div>
  );
} 