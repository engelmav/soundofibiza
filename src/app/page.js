import Image from 'next/image';
import RentalForm from './RentalForm';
import DailyRandomizer from './DailyRandomizer';
import TentInventory from './TentInventory';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Party Equipment for Rent</h1>
      
      {/* Speakers Section */}
      <div className="rental-item">
        <Image
          src="/THUMP210-210XT_3qtrR.png"
          alt="Mackie Thump Speakers on stands"
          width={300}
          height={300}
          className="rental-image"
          priority
        />
        <h2>Party Speakers</h2>
        <p>2x Mackie Thump Speakers</p>
        <p className="free-stands">Speaker stands included for free!</p>
        <p className="price">$89/night</p>
        <DailyRandomizer />
      </div>

      {/* Tent Section */}
      <div className="rental-item">
        <Image
          src="/tent.webp"
          alt="Party Tent"
          width={300}
          height={300}
          className="rental-image"
        />
        <h2>Party Tent</h2>
        <p>Outdoor party tent, suitable for up to 3 tables. 10ft by 8ft.</p>
        <p className="price">$129/night</p>
        <TentInventory />
      </div>

      <RentalForm />
      <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', marginTop: '2rem' }}>
        Proudly serving you from North Plainfield, NJ
      </p>
    </div>
  );
} 