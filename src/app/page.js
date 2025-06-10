import Image from 'next/image';
import RentalForm from './RentalForm';
import DailyRandomizer from './DailyRandomizer';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Party Speakers for Rent</h1>
      <Image
        src="/THUMP210-210XT_3qtrR.png"
        alt="Mackie Thump Speakers on stands"
        width={300}
        height={300}
        className="speaker-image"
        priority
      />
      <p>2 x Mackie Thump Speakers with Subwoofer</p>
      <p className="free-stands">Speaker stands included free of charge</p>
      <p className="price" style={{ fontSize: '2rem', fontWeight: 'bold' }}>$59/night</p>
      <DailyRandomizer />
      <RentalForm />
    </div>
  );
} 