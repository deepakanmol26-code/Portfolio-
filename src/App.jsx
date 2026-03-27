import React, { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';

// SVG Icons
const IconDNA = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.5a3 3 0 0 1 3-3"/>
    <path d="M4 17.5a3 3 0 0 0 3-3"/>
    <path d="M8 12a3 3 0 0 1 3-3"/>
    <path d="M8 15a3 3 0 0 0 3-3"/>
    <path d="M12 9.5a3 3 0 0 1 3-3"/>
    <path d="M12 12.5a3 3 0 0 0 3-3"/>
    <path d="M16 7a3 3 0 0 1 3-3"/>
    <path d="M16 10a3 3 0 0 0 3-3"/>
    <path d="M4 9a5 5 0 0 1 10 0 5 5 0 0 0 10 0"/>
    <path d="M4 15a5 5 0 0 0 10 0 5 5 0 0 1 10 0"/>
  </svg>
);

const IconNetwork = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const IconCube = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const IconSignal = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>
  </svg>
);

const IconSun = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const IconMoon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// 3D Card Wrapper Component
const Card3D = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.transition = 'none';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
  }, []);

  return (
    <div ref={cardRef} className={`card-3d ${className || ''}`}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

function App() {
  const [isDark, setIsDark] = useState(true);

  // Apply theme class to the root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
    }
  }, [isDark]);

  // Intersection Observer for scroll reveal
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Parallax for hero banner
  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector('.hero-banner-img');
      if (banner) {
        const scrollY = window.scrollY;
        banner.style.transform = `translateY(${scrollY * 0.35}px) scale(1.08)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-canvas">

      {/* LEFT SIDEBAR OMITTED BASED ON USER REQUEST */}

      {/* TOP NAVIGATION */}
      <header className="topbar">
        <div className="logo-brand">Deepak Anmol</div>
        <div className="top-icons">
          <button className="theme-toggle" onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme">
            {isDark ? <IconSun /> : <IconMoon />}
          </button>
          <img src="/deepak_profile.jpg" alt="Deepak Anmol" className="avatar" />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* HERO BANNER */}
        <section className="hero-banner reveal r-scale">
          <div className="hero-banner-wrap">
            <img src="/hero_banner.jpg" alt="Deepak Anmol - Vision" className="hero-banner-img" />
            <div className="hero-banner-overlay"></div>
            <div className="hero-banner-text reveal r-up d2">
              <span className="hero-tag">VISIONARY ARCHITECT</span>
              <h2>Empathy · Leadership · Resilience · Growth · Community</h2>
            </div>
          </div>
          <div className="hero-banner-glow"></div>
        </section>

        {/* Header */}
        <h1 className="page-title reveal r-up d1">Work Experience</h1>
        <p className="page-subtitle reveal r-up d2">
          An archival record of technological deployments, capacity building,
          and social integration projects across public systems and communities.
          Tracking impact parameters from 2022 to present.
        </p>

        {/* Profile Intro */}
        <div className="profile-intro reveal r-up d3">
          "Seeking a highly responsible position where I can leverage my strong communication, leadership, and problem-solving skills—honed through extensive training and professional development initiatives—to drive team success and contribute positively to organizational goals."
        </div>

        {/* PRIMARY GRID */}
        <div className="grid-layout">

          {/* Card 1: Kshamtalaya Foundation */}
          <Card3D className="active-card highlight-card span-col reveal r-slide-right d1">
            <div className="meta-row">
              <span>PROJECT MGR & ASST REGIONAL MANAGER // KSHAMTALAYA</span>
              <IconNetwork />
            </div>
            <h2 className="card-title">School Excellence & Community Integration</h2>
            <p className="card-desc">
              Spearheading comprehensive program implementation across Samastipur and Himachal Pradesh.
              Driving macro-level educational transformations in collaboration with state systems.
            </p>
            <ul className="card-bullets">
              <li>Led holistic program implementation in direct collaboration with state education frameworks.</li>
              <li>Drove community-centric approaches to elevate baseline learning environments.</li>
              <li>Oversaw strategic budget localization and managed fellowship recruitment funnels.</li>
            </ul>
            <div className="pills-row">
              <span className="pill active">STRATEGY</span>
              <span className="pill active">CAPACITY BUILDING</span>
              <span className="pill active">RECRUITMENT</span>
            </div>
          </Card3D>

          {/* Card 1.5: Magic Bus India Foundation */}
          <Card3D className="active-card highlight-card span-col reveal r-slide-left d2" style={{marginTop: '1rem'}}>
            <div className="meta-row">
              <span>TRAINING & DEVELOPMENT // MAGIC BUS INDIA</span>
              <IconCube />
            </div>
            <h2 className="card-title">Digital Synapse & Ed-Tech Deployment</h2>
            <p className="card-desc">
              Engineering capacity-building interface layers and overseeing blended learning
              deployments to optimize last-mile education delivery.
            </p>
            <ul className="card-bullets">
              <li>Engineered AI-based learning modules and structured training pathways for teaching staff.</li>
              <li>Trained educators on integrating AI tools, digital presentation techniques, and tech systems.</li>
              <li>Implemented comprehensive LMS tracking mechanisms to monitor outcome metrics.</li>
            </ul>
            <div className="pills-row">
              <span className="pill active">AI TOOLS</span>
              <span className="pill active">ED-TECH</span>
              <span className="pill active">LMS MONITORING</span>
            </div>
          </Card3D>

          {/* Card 2: Piramal Foundation */}
          <Card3D className="reveal r-slide-left d2">
            <div className="meta-row">
              <IconDNA />
              <span className="meta-link">ACTIVE LINK</span>
            </div>
            <h2 className="card-title" style={{fontSize: '1.6rem'}}>Fellow & Trainer<br/>(Piramal Foundation)</h2>
            <p className="card-desc" style={{fontSize: '0.9rem'}}>
              Urban Entrepreneurship Fellowship, Pune. Designed and developed contextualized content for FLN, Life Skills, and Employability across 45+ structured training sessions.
            </p>
            <div className="skills-grid">
              <span className="skill-tag highlight">Curriculum Design</span>
              <span className="skill-tag highlight">Mentoring</span>
              <span className="skill-tag highlight">Data Review</span>
            </div>
            <div className="stats-row">
              <div className="stat-block">
                <div className="stat-value purple">40K+</div>
                <div className="stat-label">Children Impacted</div>
              </div>
            </div>
          </Card3D>

          {/* Card 3: ESIC */}
          <Card3D className="reveal r-slide-right d3">
            <div className="meta-row">
              <span>2019 — 2021 (APPROX LOGS)</span>
            </div>
            <h2 className="card-title" style={{fontSize: '1.6rem'}}>Strategic Partnerships & ESIC Integration</h2>
            <p className="card-desc" style={{fontSize: '0.9rem'}}>
              Built collaborative partnerships with ESIC and local governance. Partnered with 65+ companies to integrate services and LMS-based modules.
              Mentored field teams for processing registrations and claims.
            </p>
            <div className="stats-row">
              <div className="stat-block">
                <div className="stat-value">5,000+</div>
                <div className="stat-label">Insured Persons</div>
              </div>
              <div className="stat-block">
                <div className="stat-value">65+</div>
                <div className="stat-label">Corporate Partners</div>
              </div>
            </div>
          </Card3D>

        </div>

        {/* Education + Certifications */}
        <div className="grid-layout" style={{marginBottom: 0}}>
          <Card3D className="highlight-card reveal r-up d1 span-col">
            <h2 className="card-title" style={{fontSize: '1.5rem'}}>Academic Databanks</h2>
            <p className="card-desc">Records of formal education vectors.</p>
            <ul className="card-bullets">
              <li><strong>MA (Sociology)</strong> — Central University of South Bihar, Gaya. Report: "Liquor and its negative impact on social fabric in Bihar"</li>
              <li><strong>Bachelor of Business Administration</strong> — LNMU, Darbhanga</li>
            </ul>
          </Card3D>
        </div>

        {/* 3D Spider Web Protocol Matrices */}
        <div className="temporal-log reveal r-up d1" style={{marginTop: '4rem', textAlign: 'center', color: 'var(--primary-red)', textShadow: '0 0 10px rgba(255, 7, 58, 0.5)', fontSize: '1.1rem', fontWeight: 'bold'}}>
          CERTIFIED PROTOCOL MATRICES
        </div>
        <section className="spider-section reveal r-scale d2">
          <div className="spider-web">
            <div className="spider-center">PROTOCOLS</div>
            <div className="spider-node node-1">Project Mgmt<br/>(Kaivalya)</div>
            <div className="spider-node node-2">Lean Six<br/>Sigma</div>
            <div className="spider-node node-3">Soft Skill Master<br/>Trainer (NIST)</div>
            <div className="spider-node node-4">Training Eval<br/>(VVGNLI)</div>
            <div className="spider-node node-5">NSDC Digital<br/>Marketing</div>
            <div className="spider-node node-6">Chat GPT<br/>Workshop</div>
          </div>
        </section>

        {/* MAP - Deployments - Avatar 3D Card */}
        <div className="deployments-map reveal r-scale d1">
          <div className="temporal-log">GEOSPATIAL DEPLOYMENTS</div>
          <h2 className="page-title" style={{fontSize: '3rem', marginBottom: '2rem'}}>Operational Zones</h2>

          <div className="map-avatar-wrapper"
            onMouseMove={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
              const y = -((e.clientY - rect.top) / rect.height - 0.5) * 28;
              e.currentTarget.querySelector('.map-avatar-card').style.transform =
                `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.04)`;
              const glow = e.currentTarget.querySelector('.map-avatar-glow');
              glow.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,7,58,0.28), transparent 70%)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector('.map-avatar-card').style.transform =
                'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
              e.currentTarget.querySelector('.map-avatar-glow').style.background = 'none';
            }}
          >
            <div className="map-avatar-card">
              {/* Glow layer that follows the cursor */}
              <div className="map-avatar-glow"></div>

              {/* Floating HUD badges */}
              <div className="map-hud-badge top-left">📍 LIVE NODE</div>
              <div className="map-hud-badge top-right">MADHUBANI, BR</div>

              {/* The actual iframe */}
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.2185590933!2d85.9329!3d26.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edeb0a69b0a4e3%3A0xc4053f4776a1e3bf!2sMadhubani%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Deployment Map"
                ></iframe>
              </div>

              {/* Bottom stats bar */}
              <div className="map-stats-bar">
                <div className="map-stat"><span className="map-stat-val">26.35°N</span><span className="map-stat-lbl">LATITUDE</span></div>
                <div className="map-stat"><span className="map-stat-val">85.93°E</span><span className="map-stat-lbl">LONGITUDE</span></div>
                <div className="map-stat"><span className="map-stat-val">BIHAR</span><span className="map-stat-lbl">STATE</span></div>
                <div className="map-stat"><span className="map-stat-val">INDIA</span><span className="map-stat-lbl">TERRITORY</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tree of Connections */}
        <section className="tree-section reveal r-up d1">
          <div className="temporal-log">NEURAL TREE</div>
          <h2 className="page-title" style={{fontSize: '3rem', marginBottom: '3rem'}}>Connect With Me</h2>

          <div className="tree-trunk">
            <div className="trunk-line"></div>

            {/* LEFT BRANCHES */}
            <div className="tree-branch left reveal r-slide-left d1">
              <div className="branch-line left"></div>
              <div className="leaf">
                <div className="leaf-icon">📧</div>
                <div className="leaf-label">EMAIL</div>
                <div className="leaf-value">deepakanmol26@gmail.com</div>
              </div>
            </div>

            <div className="tree-branch right reveal r-slide-right d2">
              <div className="branch-line right"></div>
              <div className="leaf">
                <div className="leaf-icon">📞</div>
                <div className="leaf-label">PHONE</div>
                <div className="leaf-value">+91 9509603144</div>
              </div>
            </div>

            <div className="tree-branch left reveal r-slide-left d3">
              <div className="branch-line left"></div>
              <div className="leaf">
                <div className="leaf-icon">💼</div>
                <div className="leaf-label">LINKEDIN</div>
                <a className="leaf-value leaf-link" href="https://www.linkedin.com/in/deepakanmol" target="_blank" rel="noopener noreferrer">linkedin.com/in/deepakanmol</a>
              </div>
            </div>

            <div className="tree-branch right reveal r-slide-right d4">
              <div className="branch-line right"></div>
              <div className="leaf">
                <div className="leaf-icon">🌍</div>
                <div className="leaf-label">LOCATION</div>
                <div className="leaf-value">Madhubani, Bihar — India</div>
              </div>
            </div>

            <div className="tree-branch left reveal r-slide-left d2">
              <div className="branch-line left"></div>
              <div className="leaf">
                <div className="leaf-icon">🗣️</div>
                <div className="leaf-label">LANGUAGES</div>
                <div className="leaf-value">Hindi · English · Maithili</div>
              </div>
            </div>

            <div className="tree-branch right reveal r-slide-right d3">
              <div className="branch-line right"></div>
              <div className="leaf">
                <div className="leaf-icon">🎯</div>
                <div className="leaf-label">CORE FOCUS</div>
                <div className="leaf-value">Training · Leadership · Impact</div>
              </div>
            </div>

            {/* Root Pulse */}
            <div className="tree-root reveal r-scale d4">
              <span className="root-dot"></span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
