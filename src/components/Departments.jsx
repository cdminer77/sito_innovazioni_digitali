export default function Departments() {
  const departmentsData = [
    {
      id: "dept-web",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      title: "Sviluppo Web & E-Commerce",
      desc: "Creiamo siti vetrina e portali e-commerce moderni, ultra-rapidi e ottimizzati per convertire i visitatori in clienti attivi.",
      items: ["Siti Web Corporate", "E-Commerce Professionali", "Ottimizzazione SEO & Core Web Vitals", "UX / UI Design Responsivo"]
    },
    {
      id: "dept-software",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      ),
      title: "Software Personalizzato & API",
      desc: "Progettiamo e sviluppiamo software gestionali e applicativi web su misura per digitalizzare i tuoi flussi e ottimizzare i processi.",
      items: ["Software Gestionali Custom", "Sviluppo Portali Web & SAAS", "Integrazioni e Sviluppo API", "Automazione Flussi di Lavoro"]
    },
    {
      id: "dept-cloud",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a6 6 0 0 0 0-12z" />
        </svg>
      ),
      title: "Sistemistica & Cloud",
      desc: "Configuriamo e gestiamo infrastrutture cloud sicure e performanti, garantendo la continuità operativa del tuo business.",
      items: ["Architetture Cloud Dedicate", "Backup & Disaster Recovery", "Server & Posta Aziendale", "Audit Sicurezza e GDPR"]
    },
    {
      id: "dept-support",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: "Assistenza & Helpdesk",
      desc: "Forniamo supporto tecnico specializzato tempestivo. Risolviamo problemi hardware, software e di rete direttamente o da remoto.",
      items: ["Supporto Ticket H24", "Assistenza Sistemistica Live", "Manutenzione Server Preventiva", "SLA di Intervento Garantiti"]
    }
  ];

  return (
    <section id="dipartimenti">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">Competenze Verticali</span>
          <h2 className="section-title">I Nostri Dipartimenti</h2>
          <p className="section-desc">
            Organizziamo la nostra operatività in team specializzati per garantire la massima efficacia tecnica su ogni aspetto del tuo progetto.
          </p>
        </div>

        <div className="departments-grid">
          {departmentsData.map((dept) => (
            <div className="dept-card" key={dept.id} id={dept.id}>
              <div className="dept-icon">
                {dept.icon}
              </div>
              <h3 className="dept-title">
                {dept.title}
                <span className="dept-arrow">→</span>
              </h3>
              <p className="dept-desc">{dept.desc}</p>
              <ul className="dept-list">
                {dept.items.map((item, idx) => (
                  <li className="dept-item" key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
