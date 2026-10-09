export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-subtitle">
              <span>Innovazione Digitale & Ingegneria Software</span>
            </div>
            <h1 className="hero-title" id="main-hero-title">
              Soluzioni Software & <span>Infrastrutture IT</span> su misura.
            </h1>
            <p className="hero-desc" id="main-hero-desc">
              Sviluppiamo architetture cloud affidabili, applicativi personalizzati e soluzioni web ad alte prestazioni per accelerare la crescita e la sicurezza del tuo business.
            </p>
            <div className="hero-buttons">
              <a href="#dipartimenti" className="btn btn-primary" id="hero-btn-primary">
                Esplora i Servizi
              </a>
              <a href="#contatti" className="btn btn-secondary" id="hero-btn-secondary">
                Parla con un Tecnico
              </a>
            </div>
          </div>

          <div className="hero-visual">
            {/* Custom Interactive Tech SVG Graphic */}
            <svg 
              className="hero-animation" 
              viewBox="0 0 500 500" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Rappresentazione grafica flussi di dati Innovazioni Tecnologiche"
            >
              {/* Central Core */}
              <circle cx="250" cy="250" r="70" fill="url(#coreGradient)" opacity="0.8" />
              <circle cx="250" cy="250" r="55" stroke="url(#accentGradient)" strokeWidth="1.5" strokeDasharray="10, 5" />
              <circle cx="250" cy="250" r="40" fill="#070b13" />
              <circle cx="250" cy="250" r="10" fill="var(--primary)" />

              {/* Orbit Lines */}
              <circle cx="250" cy="250" r="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
              <circle cx="250" cy="250" r="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />

              {/* Data Nodes */}
              <g id="nodes">
                {/* Node 1 - Web */}
                <circle cx="150" cy="150" r="18" fill="#070b13" stroke="var(--primary)" strokeWidth="2" />
                <circle cx="150" cy="150" r="6" fill="var(--primary)" />
                <line x1="162" y1="162" x2="215" y2="215" stroke="var(--primary)" strokeWidth="1" strokeDasharray="5,5" />

                {/* Node 2 - Cloud */}
                <circle cx="350" cy="150" r="18" fill="#070b13" stroke="var(--secondary)" strokeWidth="2" />
                <circle cx="350" cy="150" r="6" fill="var(--secondary)" />
                <line x1="338" y1="162" x2="285" y2="215" stroke="var(--secondary)" strokeWidth="1" strokeDasharray="5,5" />

                {/* Node 3 - Software */}
                <circle cx="130" cy="310" r="18" fill="#070b13" stroke="var(--secondary)" strokeWidth="2" />
                <circle cx="130" cy="310" r="6" fill="var(--secondary)" />
                <line x1="145" y1="300" x2="210" y2="265" stroke="var(--secondary)" strokeWidth="1" strokeDasharray="5,5" />

                {/* Node 4 - Support */}
                <circle cx="370" cy="310" r="18" fill="#070b13" stroke="var(--primary)" strokeWidth="2" />
                <circle cx="370" cy="310" r="6" fill="var(--primary)" />
                <line x1="355" y1="300" x2="290" y2="265" stroke="var(--primary)" strokeWidth="1" strokeDasharray="5,5" />
              </g>

              {/* Dynamic streams (animated path overlays) */}
              <path 
                d="M 150 150 L 250 250 M 350 150 L 250 250 M 130 310 L 250 250 M 370 310 L 250 250" 
                stroke="url(#streamGradient)" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                className="dash-stream"
              />
              <path 
                d="M 350 150 L 250 250 M 370 310 L 250 250" 
                stroke="url(#streamGradient2)" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                className="dash-stream stream-delayed"
              />

              {/* Floating tech elements */}
              <circle cx="250" cy="50" r="4" fill="var(--primary)" opacity="0.6" />
              <circle cx="90" cy="230" r="3" fill="var(--secondary)" opacity="0.4" />
              <circle cx="410" cy="230" r="5" fill="var(--primary)" opacity="0.5" />
              <circle cx="250" cy="450" r="4" fill="var(--secondary)" opacity="0.7" />

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0, 242, 254, 0.4)" />
                  <stop offset="100%" stopColor="rgba(79, 172, 254, 0.1)" />
                </linearGradient>
                <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--secondary)" />
                </linearGradient>
                <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--secondary)" />
                </linearGradient>
                <linearGradient id="streamGradient2" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="var(--secondary)" />
                  <stop offset="100%" stopColor="var(--primary)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
