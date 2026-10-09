import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
          <a href="#" className="logo" onClick={closeMobileMenu}>
            <div className="logo-icon">
              <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="22" r="9" stroke="#00f2fe" strokeWidth="5" fill="none" />
                <path d="M 47 37 L 38 37 C 42 39 44 42 44 46 L 44 80 L 37 80 L 37 84 L 47 84 Z" fill="#94a3b8" />
                <path d="M 44 49 L 34 43" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="33" cy="42" r="3.5" stroke="#94a3b8" strokeWidth="2" fill="#070b13" />
                <path d="M 44 59 L 30 52" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="29" cy="51" r="3.5" stroke="#94a3b8" strokeWidth="2" fill="#070b13" />
                <path d="M 52 37 L 57 37 L 57 80 L 63 80 L 63 84 L 52 84 Z" fill="#00f2fe" />
                <path d="M 57 49 L 66 54" stroke="#00f2fe" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="67" cy="55" r="3.5" stroke="#00f2fe" strokeWidth="2" fill="#070b13" />
                <path d="M 57 60 L 71 67" stroke="#00f2fe" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="72" cy="68" r="3.5" stroke="#00f2fe" strokeWidth="2" fill="#070b13" />
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-main">INNOVAZIONI</span>
              <span className="logo-sub">TECNOLOGICHE <small>SRLS</small></span>
            </div>
          </a>

          <nav>
            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
              <li>
                <a href="#dipartimenti" className="nav-link" onClick={closeMobileMenu}>
                  Dipartimenti
                </a>
              </li>
              <li>
                <a href="#metodo" className="nav-link" onClick={closeMobileMenu}>
                  Metodo
                </a>
              </li>
              <li>
                <a href="#portfolio" className="nav-link" onClick={closeMobileMenu}>
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#ticket" className="nav-link" onClick={closeMobileMenu}>
                  Assistenza Ticket
                </a>
              </li>
              <li>
                <a href="#contatti" className="nav-link" onClick={closeMobileMenu}>
                  Contatti
                </a>
              </li>
              {mobileMenuOpen && (
                <li style={{ marginTop: '20px', width: '100%' }}>
                  <a 
                    href="#ticket" 
                    onClick={closeMobileMenu}
                    className="btn btn-outline-neon"
                    style={{ width: '100%' }}
                  >
                    Portale Ticket
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <div className="nav-cta">
            <a 
              href="#ticket" 
              className="btn btn-outline-neon"
              id="nav-ticket-btn"
            >
              Portale Ticket
            </a>
            <a href="#contatti" className="btn btn-primary" id="nav-contact-btn">
              Contattaci
            </a>
          </div>

          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle mobile menu"
            id="mobile-nav-toggle"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
