import React, { useState, useEffect } from 'react';
import './LoginPortal.css';

// Powerful quotes rotating on the entry screen
const QUOTES = [
  "Small actions in classrooms create big changes in society.",
  "Education is not just learning, it is transformation.",
  "Impact begins where intention meets action."
];

const LoginPortal = ({ onEnter }) => {
  const [greeting, setGreeting] = useState('');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isFadingQuote, setIsFadingQuote] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  // Time-based greeting effect
  useEffect(() => {
    const hour = new Date().getHours();
    let text = "Welcome";
    
    if (hour >= 5 && hour < 12) {
      text = "Good Morning — Ready to explore impact?";
    } else if (hour >= 12 && hour < 17) {
      text = "Good Afternoon — Step into the journey";
    } else if (hour >= 17 && hour < 21) {
      text = "Good Evening — Step into the journey";
    } else {
      text = "Welcome — Ready to explore impact?";
    }
    
    setGreeting(text);
  }, []);

  // Rotating quotes logic
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      // Start fade out
      setIsFadingQuote(true);
      
      // Wait for fade out, then swap text and fade back in
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        setIsFadingQuote(false);
      }, 800); // 800ms fade transition duration

    }, 5000); // Show each quote for 5 seconds

    return () => clearInterval(quoteInterval);
  }, []);

  const handleEnterClick = () => {
    setIsEntering(true);
    // Wait for the exit animation (zoom+fade) to finish before unmounting
    setTimeout(() => {
      onEnter();
    }, 1200); 
  };

  return (
    <div className={`thought-portal-container ${isEntering ? 'portal-exiting' : ''}`}>
      
      {/* Soft Ambient Background Elements */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>
      <div className="ambient-blob blob-3"></div>

      <div className="thought-portal-content">
        
        {/* Time-based Greeting */}
        <p className="time-greeting">{greeting}</p>
        
        {/* Rotating Quote Area */}
        <div className="quote-container">
          <h1 className={`rotating-quote ${isFadingQuote ? 'quote-hidden' : 'quote-visible'}`}>
            "{QUOTES[currentQuoteIndex]}"
          </h1>
        </div>

        {/* Call to Action Button */}
        <div className="entry-action">
          <button className="minimal-enter-btn" onClick={handleEnterClick}>
            Enter Portfolio
            <div className="btn-ripple"></div>
          </button>
          
          <p className="welcome-subtext">
            Welcome to the journey of Deepak Anmol
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPortal;
