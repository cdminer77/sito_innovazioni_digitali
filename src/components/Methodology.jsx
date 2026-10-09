export default function Methodology() {
  const steps = [
    {
      number: "01",
      title: "Analisi e Strategia",
      desc: "Studiamo i processi interni della tua azienda per proporre le tecnologie migliori, evitando sprechi e ottimizzando i flussi esistenti."
    },
    {
      number: "02",
      title: "Sviluppo Agile",
      desc: "Scriviamo codice pulito e manutenibile utilizzando standard moderni. Condividiamo versioni di test intermedie per raccogliere feedback continui."
    },
    {
      number: "03",
      title: "Cloud & Sicurezza",
      desc: "Distribuiamo il progetto su infrastrutture cloud sicure, ridondate e scalabili. Proteggiamo i dati aziendali con crittografia e backup continui."
    },
    {
      number: "04",
      title: "Assistenza & Evoluzione",
      desc: "Non ti lasciamo solo. Il nostro helpdesk integrato risolve i problemi tempestivamente e garantisce il costante aggiornamento del sistema."
    }
  ];

  return (
    <section id="metodo" style={{ background: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">Come Lavoriamo</span>
          <h2 className="section-title">Il Nostro Metodo</h2>
          <p className="section-desc">
            Dall'analisi iniziale fino all'assistenza ordinaria, seguiamo un approccio focalizzato sull'affidabilità, sulla trasparenza e sulla velocità di esecuzione.
          </p>
        </div>

        <div className="method-grid">
          {steps.map((step, index) => (
            <div className="method-card" key={index} id={`method-step-${index + 1}`}>
              <div className="method-number">{step.number}</div>
              <h3 className="method-title">{step.title}</h3>
              <p className="method-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
