export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <a href="#" className="logo footer-info-logo">
              <div className="logo-icon">
                <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <p className="footer-info-desc">
              Soluzioni tecnologiche all'avanguardia, sviluppo software personalizzato e infrastrutture cloud scalabili per la trasformazione digitale del tuo business.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="LinkedIn">in</a>
              <a href="#" className="footer-social-link" aria-label="Facebook">fb</a>
              <a href="#" className="footer-social-link" aria-label="GitHub">git</a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-links-title">Azienda</h4>
            <ul className="footer-links-list">
              <li className="footer-links-item">
                <a href="#dipartimenti">Dipartimenti</a>
              </li>
              <li className="footer-links-item">
                <a href="#metodo">Metodo</a>
              </li>
              <li className="footer-links-item">
                <a href="#portfolio">Portfolio</a>
              </li>
              <li className="footer-links-item">
                <a href="#contatti">Contatti</a>
              </li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-links-title">Risorse</h4>
            <ul className="footer-links-list">
              <li className="footer-links-item">
                <a href="#ticket">Portale Assistenza Ticket</a>
              </li>
              <li className="footer-links-item">
                <a href="#contatti">Contatti Rapidi</a>
              </li>
              <li className="footer-links-item">
                <a href="#dipartimenti">SLA di Assistenza</a>
              </li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4 className="footer-links-title">Rimani Aggiornato</h4>
            <p className="footer-newsletter-desc">
              Iscriviti alla nostra newsletter per ricevere novità tecnologiche e consigli sulla sicurezza IT.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()} id="footer-newsletter-form">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="la-tua@email.it" 
                required 
                aria-label="Email per newsletter"
              />
              <button type="submit" className="newsletter-btn" id="footer-newsletter-submit">
                Invia
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {currentYear} Innovazioni Tecnologiche S.r.l.s. - Pisa, Italia. Tutti i diritti riservati.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
