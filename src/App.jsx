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

// Protocol Matrices Data
const protocolsData = [
  { id: '01', title: 'Project Management', issuer: 'Kaivalya Education Foundation', desc: 'Expertise in agile and waterfall methodologies for educational ecosystems and community empowerment programs.' },
  { id: '02', title: 'Lean Six Sigma', issuer: 'Quality Management', desc: 'Process improvement techniques for eliminating defects, optimizing workflows, and enhancing overall system efficiency.' },
  { id: '03', title: 'Soft Skill Master Trainer', issuer: 'NIST', desc: 'Advanced certification in training facilitation, professional development, and high-impact leadership strategies.' },
  { id: '04', title: 'Evaluation of Training', issuer: 'VVGNLI', desc: 'Metrics-driven approach to assessing the impact and return on investment (ROI) of targeted capacity-building programs.' },
  { id: '05', title: 'Digital Marketing', issuer: 'NSDC', desc: 'Comprehensive digital ecosystem strategies, scalable outreach optimization, and sustainable online community building.' },
  { id: '06', title: 'Chat GPT Workshop', issuer: 'AI Integration', desc: 'Practical application of generative AI tools for productivity enhancement, rapid content generation, and strategic planning.' }
];

const MatrixAccordion = () => {
  const [openId, setOpenId] = useState('01');

  return (
    <div className="matrix-accordion">
      {protocolsData.map(p => (
        <div 
          key={p.id} 
          className={`matrix-item ${openId === p.id ? 'active' : ''}`}
          onClick={() => setOpenId(p.id === openId ? null : p.id)}
        >
          <div className="matrix-header">
            <span className="matrix-id">{p.id}</span>
            <span className="matrix-title">{p.title} <span className="matrix-issuer">// {p.issuer}</span></span>
            <span className="matrix-toggle">{openId === p.id ? '−' : '+'}</span>
          </div>
          <div className="matrix-content">
            <div className="matrix-inner">
              <p>{p.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════
// NETFLIX EXPERIENCE UNIVERSE - DATA & COMPONENTS
// ═══════════════════════════════════════════
const experienceData = [
  {
    id: 1, category: 'leadership',
    title: 'School Excellence & Community Integration',
    role: 'Project Mgr & Asst Regional Manager',
    org: 'Kshamtalaya Foundation',
    duration: '2022 — Present',
    tagline: 'Transforming education at the grassroots level',
    description: 'Spearheading comprehensive program implementation across Samastipur and Himachal Pradesh. Driving macro-level educational transformations in collaboration with state education systems.',
    achievements: [
      'Led holistic program implementation in direct collaboration with state education frameworks.',
      'Drove community-centric approaches to elevate baseline learning environments.',
      'Oversaw strategic budget localization and managed fellowship recruitment funnels.',
    ],
    skills: ['Strategy', 'Capacity Building', 'Recruitment', 'Government Liaison'],
    impact: '150+ Schools Transformed',
    gradient: 'linear-gradient(135deg, #1a0000 0%, #330011 50%, #0a0d1c 100%)',
  },
  {
    id: 2, category: 'leadership',
    title: 'Digital Synapse & Ed-Tech Deployment',
    role: 'Training & Development Lead',
    org: 'Magic Bus India Foundation',
    duration: '2021 — 2022',
    tagline: 'Engineering capacity-building interface layers',
    description: 'Overseeing blended learning deployments to optimize last-mile education delivery. Engineering AI-based learning modules and structured training pathways.',
    achievements: [
      'Engineered AI-based learning modules and structured training pathways for teaching staff.',
      'Trained educators on integrating AI tools, digital presentation techniques, and tech systems.',
      'Implemented comprehensive LMS tracking mechanisms to monitor outcome metrics.',
    ],
    skills: ['AI Tools', 'Ed-Tech', 'LMS Monitoring', 'Digital Training'],
    impact: '500+ Educators Trained',
    gradient: 'linear-gradient(135deg, #0d001a 0%, #1a0033 50%, #0a0d1c 100%)',
  },
  {
    id: 3, category: 'projects',
    title: 'Urban Entrepreneurship Fellowship',
    role: 'Fellow & Trainer',
    org: 'Piramal Foundation',
    duration: '2020 — 2021',
    tagline: 'Designing future-ready curriculum for 40K+ children',
    description: 'Urban Entrepreneurship Fellowship, Pune. Designed and developed contextualized content for FLN, Life Skills, and Employability across 45+ structured training sessions.',
    achievements: [
      'Designed contextualized content for FLN, Life Skills, and Employability.',
      'Conducted 45+ structured training sessions across diverse communities.',
      'Impacted 40,000+ children through scalable curriculum frameworks.',
    ],
    skills: ['Curriculum Design', 'Mentoring', 'Data Review', 'Content Dev'],
    impact: '40K+ Children Impacted',
    gradient: 'linear-gradient(135deg, #001a0d 0%, #003322 50%, #0a0d1c 100%)',
  },
  {
    id: 4, category: 'projects',
    title: 'Strategic Partnerships & ESIC Integration',
    role: 'Partnership Coordinator',
    org: 'ESIC / Government',
    duration: '2019 — 2021',
    tagline: 'Building bridges between government and communities',
    description: 'Built collaborative partnerships with ESIC and local governance. Partnered with 65+ companies to integrate services and LMS-based modules. Mentored field teams.',
    achievements: [
      'Insured 5,000+ persons through ESIC integration programs.',
      'Partnered with 65+ companies for service integration.',
      'Mentored field teams for processing registrations and claims.',
    ],
    skills: ['Gov Liaison', 'Partnerships', 'Field Operations', 'LMS'],
    impact: '5,000+ Insured',
    gradient: 'linear-gradient(135deg, #0d0a1c 0%, #1a1133 50%, #0a0d1c 100%)',
  },
];

// Netflix-style Experience Card
const NxCard = ({ item, onExpand }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 15;
    cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.08)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    setIsHovered(false);
  }, []);

  return (
    <div className="nx-card-wrap">
      <div
        ref={cardRef}
        className={`nx-card ${isHovered ? 'nx-card-hovered' : ''}`}
        style={{background: item.gradient}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onExpand(item)}
      >
        <div className="nx-card-shine"></div>
        <div className="nx-card-content">
          <span className="nx-card-duration">{item.duration}</span>
          <h3 className="nx-card-title">{item.title}</h3>
          <p className="nx-card-org">{item.org}</p>
          <div className="nx-card-impact">{item.impact}</div>
        </div>
        {/* Hover Preview Panel */}
        <div className="nx-preview">
          <p className="nx-preview-tagline">{item.tagline}</p>
          <div className="nx-preview-skills">
            {item.skills.map((s, i) => <span key={i} className="nx-skill-tag">{s}</span>)}
          </div>
          <button className="nx-play-btn" onClick={(e) => { e.stopPropagation(); onExpand(item); }}>
            ▶ Play Experience
          </button>
        </div>
      </div>
    </div>
  );
};

// Netflix Row with horizontal scroll
const NetflixRow = ({ title, items }) => {
  const [expandedItem, setExpandedItem] = useState(null);
  const rowRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - rowRef.current.offsetLeft;
    scrollLeft.current = rowRef.current.scrollLeft;
    rowRef.current.style.cursor = 'grabbing';
  };
  const handleMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    rowRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };
  const handleUp = () => {
    isDragging.current = false;
    if (rowRef.current) rowRef.current.style.cursor = 'grab';
  };

  return (
    <>
      <div className="nx-row-section reveal r-up d2">
        <h2 className="nx-row-title">{title}</h2>
        <div
          className="nx-row-scroll"
          ref={rowRef}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
        >
          {items.map(item => (
            <NxCard key={item.id} item={item} onExpand={setExpandedItem} />
          ))}
        </div>
      </div>

      {/* Full-Screen Modal - Movie Mode */}
      {expandedItem && (
        <div className="nx-modal-backdrop" onClick={() => setExpandedItem(null)}>
          <div className="nx-modal" onClick={e => e.stopPropagation()}>
            <button className="nx-modal-close" onClick={() => setExpandedItem(null)}>✕</button>
            <div className="nx-modal-hero" style={{background: expandedItem.gradient}}>
              <div className="nx-modal-hero-content">
                <span className="nx-modal-duration">{expandedItem.duration}</span>
                <h1 className="nx-modal-title">{expandedItem.title}</h1>
                <p className="nx-modal-role">{expandedItem.role} — {expandedItem.org}</p>
                <p className="nx-modal-tagline">{expandedItem.tagline}</p>
              </div>
            </div>
            <div className="nx-modal-body">
              <div className="nx-modal-section">
                <h3>The Story</h3>
                <p>{expandedItem.description}</p>
              </div>
              <div className="nx-modal-section">
                <h3>Key Achievements</h3>
                <ul>
                  {expandedItem.achievements.map((a, i) => (
                    <li key={i} className="nx-achievement" style={{animationDelay: `${i * 0.15}s`}}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="nx-modal-section">
                <h3>Skills Deployed</h3>
                <div className="nx-modal-skills">
                  {expandedItem.skills.map((s, i) => (
                    <span key={i} className="nx-skill-tag-lg" style={{animationDelay: `${i * 0.1}s`}}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="nx-modal-impact">
                <span className="nx-impact-label">IMPACT METRIC</span>
                <span className="nx-impact-value">{expandedItem.impact}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  const [isDark, setIsDark] = useState(false);

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
              <span className="hero-tag">Social Impact Professional | Government Liaisoning & Inter-Departmental Convergence | Curriculum Design | Ex-Piramal & Magic Bus</span>
              <h2>Central University of South Bihar</h2>
            </div>
          </div>
          <div className="hero-banner-glow"></div>
        </section>

        {/* ═══════════════════════════════════════════
            NETFLIX-STYLE EXPERIENCE UNIVERSE
            ═══════════════════════════════════════════ */}
        <section className="nx-universe reveal r-up d1">
          <div className="nx-particles">
            {[...Array(30)].map((_,i) => <span key={i} className="nx-particle" style={{
              left: `${Math.random()*100}%`, top: `${Math.random()*100}%`,
              animationDelay: `${Math.random()*8}s`, animationDuration: `${6+Math.random()*6}s`
            }}/>)}
          </div>

          <h1 className="nx-section-title reveal r-up d1">Experience Universe</h1>
          <p className="nx-section-sub reveal r-up d2">Browse stories of impact — each role a chapter worth exploring.</p>

          <NetflixRow title="Leadership Roles" items={experienceData.filter(d => d.category === 'leadership')} />
          <NetflixRow title="Projects & Impact" items={experienceData.filter(d => d.category === 'projects')} />
        </section>

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

        {/* 3D Matrix Accordion */}
        <div className="temporal-log reveal r-up d1" style={{marginTop: '4rem', textAlign: 'center', color: 'var(--primary-red)', textShadow: '0 0 10px rgba(255, 7, 58, 0.5)', fontSize: '1.1rem', fontWeight: 'bold'}}>
          CERTIFIED PROTOCOL MATRICES
        </div>
        <section className="matrix-section reveal r-scale d2">
          <MatrixAccordion />
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
