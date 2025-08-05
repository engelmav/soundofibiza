'use client';

import { useState, useEffect } from 'react';

export default function TentInventory() {
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    // Get today's date as a string (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    
    // Use the date string + 'tent' to create a different hash for seeding
    const seedString = today + 'tent';
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      const char = seedString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Generate a number between 1 and 3 based on the hash (different range than speakers)
    const number = 1 + (Math.abs(hash) % 3);
    setRandomNumber(number);
  }, []);

  // Don't render anything until we have the number to avoid hydration issues
  if (randomNumber === null) {
    return null;
  }

  return (
    <p style={{ color: 'red', textAlign: 'center', margin: '0.5rem 0 1rem', fontSize: '0.9rem' }}>
      Available in inventory: {randomNumber}
    </p>
  );
} 