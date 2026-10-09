import { useState } from 'react';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('tutti');

  const categories = [
    { id: 'tutti', label: 'Tutti' },
    { id: 'web', label: 'Web & E-Commerce' },
    { id: 'software', label: 'Software Custom' },
    { id: 'cloud', label: 'Cloud & Sistemistica' }
  ];

  const projects = [
    {
      id: "project-1",
      title: "E-Commerce Luxury Food",
      category: "web",
      categoryLabel: "Web & E-Commerce",
      desc: "Sviluppo di uno store online ultra-rapido con caricamento asincrono dei prodotti e checkout ottimizzato.",
      iconCode: "🛒"
    },
    {
      id: "project-2",
      title: "Portale Partner B2B",
      category: "software",
      categoryLabel: "Software Custom",
      desc: "Piattaforma riservata per la gestione degli ordini rivenditori e sincronizzazione automatica del magazzino.",
      iconCode: "💼"
    },
    {
      id: "project-3",
      title: "Migrazione Cluster Cloud",
      category: "cloud",
      categoryLabel: "Cloud & Sistemistica",
      desc: "Spostamento e ottimizzazione di un ecosistema server su un'infrastruttura ridondata in alta affidabilità.",
      iconCode: "☁️"
    },
    {
      id: "project-4",
      title: "CRM Gestione Interventi",
      category: "software",
      categoryLabel: "Software Custom",
      desc: "Software gestionale interno per la pianificazione degli interventi tecnici e monitoraggio SLA in tempo reale.",
      iconCode: "🔧"
    },
    {
      id: "project-5",
      title: "Sito Corporate & Ottimizzazione SEO",
      category: "web",
      categoryLabel: "Web & E-Commerce",
      desc: "Riprogettazione completa di un portale aziendale industriale con incremento del 120% del traffico organico.",
      iconCode: "🖥️"
    },
    {
      id: "project-6",
      title: "Monitoraggio Proattivo Infrastruttura",
      category: "cloud",
      categoryLabel: "Cloud & Sistemistica",
      desc: "Sistema di telemetria e alert automatico in caso di anomalie di rete, installato per un importante gruppo manifatturiero.",
      iconCode: "📈"
    }
  ];

  const filteredProjects = activeTab === 'tutti' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">I Nostri Lavori</span>
          <h2 className="section-title">Success Stories</h2>
          <p className="section-desc">
            Esplora alcuni dei progetti realizzati dai nostri dipartimenti che hanno permesso ai clienti di digitalizzarsi e rendere più efficiente il proprio business.
          </p>
        </div>

        <div className="portfolio-tabs">
          {categories.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              id={`portfolio-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div className="portfolio-card" key={project.id} id={project.id}>
              <div className="portfolio-img-wrapper">
                <div className="portfolio-img-placeholder">
                  {project.iconCode}
                </div>
              </div>
              <div className="portfolio-info">
                <span className="portfolio-category">{project.categoryLabel}</span>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="dept-desc" style={{ fontSize: '13px', margin: '0 0 16px' }}>{project.desc}</p>
                <a href="#contatti" className="portfolio-link">
                  Richiedi Informazioni <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
