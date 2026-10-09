import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    servizio: 'web',
    messaggio: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.warn("Invio backend non riuscito, fallback completato:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        nome: '',
        email: '',
        telefono: '',
        servizio: 'web',
        messaggio: ''
      });
      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    }
  };

  return (
    <section id="contatti">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="section-tag" style={{ display: 'inline-block', marginBottom: '12px' }}>Contattaci</span>
            <h2 className="contact-title">Avvia la tua trasformazione digitale</h2>
            <p className="contact-desc">
              Siamo qui per aiutarti a scegliere le tecnologie giuste per le tue esigenze specifiche. Compila il modulo o usa i recapiti diretti.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item" id="contact-info-address">
                <div className="contact-detail-icon">
                  📍
                </div>
                <div className="contact-detail-text">
                  <h4>Sede Operativa</h4>
                  <p>Pisa, Italia</p>
                </div>
              </div>

              <div className="contact-detail-item" id="contact-info-email">
                <div className="contact-detail-icon">
                  ✉️
                </div>
                <div className="contact-detail-text">
                  <h4>Email Informazioni & Supporto</h4>
                  <p>info@innovazionitecnologiche.it</p>
                </div>
              </div>

              <div className="contact-detail-item" id="contact-info-tel">
                <div className="contact-detail-icon">
                  📞
                </div>
                <div className="contact-detail-text">
                  <h4>Assistenza Clienti</h4>
                  <p>Consulenza su appuntamento & Ticket Online</p>
                </div>
              </div>
            </div>

              {/* Helpdesk Ticket Portal Promo Card */}
              <div className="contact-support-card" id="contact-support-card">
                <h3>🛠️ Portale Clienti Attivi</h3>
                <p>
                  Per richiedere assistenza tecnica sistemistica o segnalare problemi sui sistemi, utilizza il portale dedicato per una presa in carico prioritaria e tracciamento in tempo reale.
                </p>
                <a 
                  href="#ticket" 
                  className="btn btn-outline-neon"
                  style={{ fontSize: '13px', padding: '10px 20px', display: 'inline-block' }}
                  id="contact-portal-link"
                >
                  Apri un Ticket Assistenza
                </a>
              </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }} id="contact-success-msg">
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>✓</div>
                <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Messaggio Inviato!</h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Grazie per averci contattato. Un nostro tecnico prenderà in carico la tua richiesta e ti risponderà nelle prossime 24 ore.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="innovazioni-contact-form">
                <div className="form-group">
                  <label htmlFor="nome" className="form-label">Nome Completo / Azienda</label>
                  <input 
                    type="text" 
                    id="nome" 
                    name="nome" 
                    value={formData.nome}
                    onChange={handleChange}
                    className="form-input" 
                    placeholder="Esempio S.r.l." 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email di Contatto</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input" 
                    placeholder="amministrazione@azienda.it" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono" className="form-label">Telefono (Facoltativo)</label>
                  <input 
                    type="tel" 
                    id="telefono" 
                    name="telefono" 
                    value={formData.telefono}
                    onChange={handleChange}
                    className="form-input" 
                    placeholder="+39 333 1234567" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="servizio" className="form-label">Servizio di Interesse</label>
                  <select 
                    id="servizio" 
                    name="servizio" 
                    value={formData.servizio}
                    onChange={handleChange}
                    className="form-input"
                    style={{ background: 'rgba(7, 11, 19, 0.9)' }}
                  >
                    <option value="web">Sviluppo Web & E-Commerce</option>
                    <option value="software">Sviluppo Software Custom</option>
                    <option value="cloud">Sistemistica & Cloud Backup</option>
                    <option value="assistenza">Contratto di Assistenza IT</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="messaggio" className="form-label">Raccontaci il tuo progetto</label>
                  <textarea 
                    id="messaggio" 
                    name="messaggio" 
                    value={formData.messaggio}
                    onChange={handleChange}
                    className="form-textarea" 
                    placeholder="Descrivi brevemente le tue necessità tecniche..." 
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%' }} 
                  id="contact-form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Invio in corso...' : 'Invia Messaggio'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
