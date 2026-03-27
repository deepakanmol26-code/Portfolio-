import React, { useState, useEffect, useRef } from 'react';
import './LoginPortal.css';

const LoginPortal = ({ onEnter }) => {
  const [greeting, setGreeting] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Time-based greeting effect
  useEffect(() => {
    const hour = new Date().getHours();
    let text = "Welcome, Explore the World of Deepak Anmol";
    
    if (hour >= 5 && hour < 12) {
      text = "Good Morning, Welcome to Deepak Anmol’s Digital World";
    } else if (hour >= 12 && hour < 17) {
      text = "Good Afternoon, Step into Deepak Anmol’s Portfolio";
    } else if (hour >= 17 && hour < 21) {
      text = "Good Evening, Explore the World of Deepak Anmol";
    } else {
      text = "Welcome, Night Explorer — Enter Deepak Anmol’s Universe";
    }
    
    setGreeting(text);

    // Initial sequence timing
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000); // 2s after greeting, show login panel

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorStatus(true);
      setTimeout(() => setErrorStatus(false), 600);
      return;
    }
    
    // Success sequence
    setIsEntering(true);
    setTimeout(() => {
      onEnter();
    }, 1500); // Wait for zoom animation to finish
  };

  const handleGuest = () => {
    setIsEntering(true);
    setTimeout(() => {
      onEnter();
    }, 1500);
  };

  const startScan = () => {
    if (isScanning || isEntering) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleGuest(); // Treat scan success as guest entry for now
    }, 2500);
  };

  return (
    <div className={`portal-container ${isEntering ? 'portal-entering' : ''}`}>
      
      {/* Background Particles */}
      <div className="portal-particles">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="portal-particle" style={{
            '--tx': `${(Math.random() - 0.5) * 100}vw`,
            '--ty': `${(Math.random() - 0.5) * 100}vh`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 2}s`
          }}></div>
        ))}
      </div>

      {/* Center Portal Rings */}
      <div className={`portal-rings ${isEntering ? 'rings-expand' : ''}`}>
        <div className="ring ring-outer"></div>
        <div className="ring ring-middle"></div>
        <div className="ring ring-inner">
          <div className="portal-core-glow"></div>
        </div>
      </div>

      <div className="portal-content">
        
        {/* Dynamic Greeting */}
        <div className={`portal-greeting ${isEntering ? 'hide' : ''}`}>
          <h1 className="greeting-text">{greeting}</h1>
        </div>

        {/* Login Panel */}
        <div className={`portal-login-panel ${isReady ? 'panel-ready' : ''} ${errorStatus ? 'panel-error' : ''} ${isEntering ? 'hide' : ''}`}>
          
          <div className="panel-header">
            <h2>ACCESS PORTAL</h2>
            <div className="status-indicator">
              <span className="dot pulse-dot"></span> System Online
            </div>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            
            <div className="input-group">
              <input 
                type="text" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              <label>Agent ID / Email</label>
              <div className="input-underline"></div>
            </div>

            <div className="input-group">
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <label>Access Code</label>
              <div className="input-underline"></div>
            </div>

            <div className="form-options">
              <label className="cyber-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember Identity
              </label>
            </div>

            <button type="submit" className="neon-btn login-btn">
              <span>ENTER EXPERIENCE</span>
              <div className="btn-glow"></div>
            </button>
          </form>

          <div className="alt-actions">
            <button className="scan-btn" onClick={startScan}>
              {isScanning ? (
                <div className="scanner-active">
                  <div className="scan-line"></div>
                  Scanning Biometrics...
                </div>
              ) : (
                <>👁️ Init Scan Mode</>
              )}
            </button>
            <button className="guest-link" onClick={handleGuest}>
              Request Guest Override [Enter]
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPortal;
