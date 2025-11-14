'use client';

import { useState } from 'react';

export default function RentalForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || !date) {
      showMessage('Please fill out all fields.', 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, date }),
      });

      if (response.ok) {
        // Track conversion
        if (typeof gtag !== 'undefined') {
          gtag('event', 'conversion', {
            'send_to': 'AW-347513819/_b9ECNC62L8bENvH2qUB',
            'value': 1.0,
            'currency': 'USD'
          });
        }
        showMessage(`Thank you, ${name}! Your rental request for ${date} has been received. We will contact you at ${email} shortly.`, 'success');
        setName('');
        setEmail('');
        setDate('');
      } else {
        const result = await response.json();
        showMessage(result.error || 'An error occurred. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showMessage('An unexpected error occurred. Please check the console and try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form id="rental-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="date">Rental Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Rental Request'}
        </button>
      </form>
      <div
        id="response-message"
        className={`message ${message.type} ${!message.text ? 'hidden' : ''}`}
      >
        {message.text}
      </div>
    </>
  );
} 