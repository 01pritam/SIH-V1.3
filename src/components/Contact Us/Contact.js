import React, { useState } from 'react';
import './contact.css';
import axios from 'axios';

const ContactUs = () => {
  const initialMessage = {
    name: '',
    email: '',
    message: '',
  };

  const [messageData, setMessageData] = useState(initialMessage);
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessageData({
      ...messageData,
      [name]: value,
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9002/contact', messageData);
      if (response.status === 200) {
        setIsMessageSent(true);
        // Clear the form after sending the message
        setMessageData(initialMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={sendMessage}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={messageData.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={messageData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={messageData.message}
            onChange={handleInputChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
        {isMessageSent && <p className="success-message">Message sent successfully!</p>}
      </div>
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>
          <strong>Address:</strong> 707 Park Street, Kolkata
        </p>
        <p>
          <strong>Email:</strong> contact@innogen.com
        </p>
        <p>
          <strong>Phone:</strong> (+91) 9314567890
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
