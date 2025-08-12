'use client';

import { useState } from 'react';

export default function RentalForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [selectedItems, setSelectedItems] = useState({
    speakers: false,
    tent: false
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 5000);
  };

  const handleItemChange = (item) => {
    setSelectedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const getSelectedItemsText = () => {
    const items = [];
    if (selectedItems.speakers) items.push('Party Speakers w/ Bluetooth ($89/night)');
    if (selectedItems.tent) items.push('Party Tent ($129/night)');
    return items.join(' + ');
  };

  const getTotalPrice = () => {
    let total = 0;
    if (selectedItems.speakers) total += 89;
    if (selectedItems.tent) total += 129;
    return total;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || !date) {
      showMessage('Please fill out all fields.', 'error');
      setIsSubmitting(false);
      return;
    }

    if (!selectedItems.speakers && !selectedItems.tent) {
      showMessage('Please select at least one item to rent.', 'error');
      setIsSubmitting(false);
      return;
    }

    const itemsText = getSelectedItemsText();
    const totalPrice = getTotalPrice();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          date, 
          item: itemsText,
          totalPrice: totalPrice
        }),
      });

      if (response.ok) {
        showMessage(`Thank you, ${name}! Your rental request for ${itemsText} on ${date} (Total: $${totalPrice}/night) has been received. We will contact you at ${email} shortly.`, 'success');
        setName('');
        setEmail('');
        setDate('');
        setSelectedItems({ speakers: false, tent: false });
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
        <fieldset className="item-selection">
          <legend>Select Items to Rent:</legend>
          
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="speakers"
              checked={selectedItems.speakers}
              onChange={() => handleItemChange('speakers')}
            />
            <label htmlFor="speakers" className="checkbox-label">
              Party Speakers - $89/night
              <span className="item-details">2 x Mackie Thump Speakers w/ Bluetooth (stands included)</span>
            </label>
          </div>

          <div className="checkbox-item">
            <input
              type="checkbox"
              id="tent"
              checked={selectedItems.tent}
              onChange={() => handleItemChange('tent')}
            />
            <label htmlFor="tent" className="checkbox-label">
              Party Tent - $129/night
              <span className="item-details">10ft by 8ft, suitable for up to 3 tables</span>
            </label>
          </div>

          {(selectedItems.speakers || selectedItems.tent) && (
            <div className="total-price">
              Total: ${getTotalPrice()}/night
            </div>
          )}
        </fieldset>

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