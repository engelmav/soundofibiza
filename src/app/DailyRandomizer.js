'use client';

import { useState, useEffect } from 'react';

export default function DailyRandomizer() {
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    // Get today's date as a string (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    
    // Use the date string to create a simple hash for seeding
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      const char = today.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Generate a number between 2 and 4 based on the hash
    const number = 2 + (Math.abs(hash) % 3);
    setRandomNumber(number);
  }, []);

  // Don't render anything until we have the number to avoid hydration issues
  if (randomNumber === null) {
    return null;
  }

  return (
    <p style={{ color: 'red', textAlign: 'center', margin: '0.5rem 0 2rem', fontSize: '0.9rem' }}>
      Available in inventory: {randomNumber}
    </p>
  );
} 