import { useState } from 'react';

export default function TicketPortal() {
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'search'

  // Create Ticket Form State
  const [formData, setFormData] = useState({
    title: '',
    referente: '',
    email: '',
    telefono: '',
    tipo_intervento: 'assistenza_tecnica',
    priority: 'urgent',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTicket, setCreatedTicket] = useState(null);
  const [createError, setCreateError] = useState('');

  // Search Ticket State
  const [searchCode, setSearchCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCreateError('');
    setCreatedTicket(null);

    try {
      const res = await fetch('/ticket_api.php?action=create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.status === 'success') {
        setCreatedTicket(data);
        setFormData({
          title: '',
          referente: '',
          email: '',
          telefono: '',
          tipo_intervento: 'assistenza_tecnica',
          priority: 'urgent',
          description: ''
        });
      } else {
        setCreateError(data.message || 'Errore durante la creazione del ticket.');
      }
    } catch (err) {
      console.error(err);
      setCreateError('Impossibile comunicare con il server. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setIsSearching(true);
    setSearchError('');
    setSearchResult(null);

    try {
      const res = await fetch(`/ticket_api.php?action=search&code=${encodeURIComponent(searchCode.trim())}`);
      const data = await res.json();
      if (data.status === 'success' && data.ticket) {
        setSearchResult(data.ticket);
      } else {
        setSearchError(data.message || 'Nessun ticket trovato con questo codice.');
      }
    } catch (err) {
      console.error(err);
      setSearchError('Errore di connessione durante la ricerca.');
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.4)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>● Aperto</span>;
      case 'in_progress':
        return <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>⚡ In Lavorazione</span>;
      case 'resolved':
        return <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>✓ Risolto</span>;
      case 'closed':
        return <span style={{ background: 'rgba(156, 163, 175, 0.2)', color: '#9ca3af', border: '1px solid rgba(156, 163, 175, 0.4)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>✔ Chiuso</span>;
      default:
        return <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{status}</span>;
    }
  };

  return (
    <section id="ticket" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">Helpdesk & Supporto</span>
          <h2 className="section-title">Portale Assistenza Clienti</h2>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
            Invia una richiesta di intervento tecnico o controlla in tempo reale lo stato dei ticket assegnati al team di Innovazioni Tecnologiche.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          <button
            onClick={() => setActiveTab('create')}
            className={`btn ${activeTab === 'create' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '12px 28px', fontSize: '15px' }}
          >
            🛠️ Apri Nuovo Ticket
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`btn ${activeTab === 'search' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '12px 28px', fontSize: '15px' }}
          >
            🔍 Verifica Stato Ticket
          </button>
        </div>

        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          {/* TAB 1: CREATE TICKET */}
          {activeTab === 'create' && (
            <div className="glass-card" style={{ padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              {createdTicket ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: '50px', marginBottom: '16px', color: 'var(--primary)' }}>🎉</div>
                  <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Ticket Creato con Successo!</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    La tua richiesta è stata registrata nel sistema centrale di assistenza Innovazioni Tecnologiche.
                  </p>
                  <div style={{ 
                    background: 'rgba(0, 242, 254, 0.08)', 
                    border: '1px dashed var(--primary)', 
                    padding: '20px', 
                    borderRadius: '12px', 
                    display: 'inline-block',
                    marginBottom: '24px'
                  }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Codice di Riferimento</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-headings)', marginTop: '4px' }}>
                      {createdTicket.codice}
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>
                    Conserva questo codice per verificare lo stato di avanzamento dell'intervento o citarlo al telefono con i nostri tecnici.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <button 
                      onClick={() => {
                        setSearchCode(createdTicket.codice);
                        setActiveTab('search');
                        setCreatedTicket(null);
                      }}
                      className="btn btn-primary"
                    >
                      Visualizza Dettagli Ticket
                    </button>
                    <button 
                      onClick={() => setCreatedTicket(null)}
                      className="btn btn-outline"
                    >
                      Apri un Altro Ticket
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCreateSubmit}>
                  <h3 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--primary)' }}>Modulo di Richiesta Assistenza</h3>
                  
                  {createError && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
                      {createError}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Oggetto / Titolo del Problema *</label>
                      <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleFormChange} 
                        className="form-input" 
                        placeholder="Es. Mancato accesso al gestionale" 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Nominativo Referente *</label>
                      <input 
                        type="text" 
                        name="referente" 
                        value={formData.referente} 
                        onChange={handleFormChange} 
                        className="form-input" 
                        placeholder="Nome Cognome / Azienda" 
                        required 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email di Contatto *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleFormChange} 
                        className="form-input" 
                        placeholder="referente@azienda.it" 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Telefono di Riferimento</label>
                      <input 
                        type="tel" 
                        name="telefono" 
                        value={formData.telefono} 
                        onChange={handleFormChange} 
                        className="form-input" 
                        placeholder="+39 0587 123456" 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Tipo di Intervento Richiesto</label>
                      <select 
                        name="tipo_intervento" 
                        value={formData.tipo_intervento} 
                        onChange={handleFormChange} 
                        className="form-input"
                        style={{ background: 'rgba(7, 11, 19, 0.9)' }}
                      >
                        <option value="assistenza_tecnica">Assistenza Tecnica Sistemistica / Hardware</option>
                        <option value="amministrazione">Amministrazione & Contratti</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Priorità Segnalazione</label>
                      <select 
                        name="priority" 
                        value={formData.priority} 
                        onChange={handleFormChange} 
                        className="form-input"
                        style={{ background: 'rgba(7, 11, 19, 0.9)' }}
                      >
                        <option value="urgent">🔴 Urgente (Blocco Totale)</option>
                        <option value="high">🟠 Alta</option>
                        <option value="medium">🟡 Media</option>
                        <option value="low">🟢 Bassa</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '24px' }}>
                    <label className="form-label">Descrizione Dettagliata del Problema *</label>
                    <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleFormChange} 
                      className="form-textarea" 
                      rows="4" 
                      placeholder="Descrivi cosa è accaduto, messaggi di errore o postazioni coinvolte..." 
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '14px' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registrazione in corso...' : 'Invia e Apri Ticket Assistenza'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: SEARCH / STATUS */}
          {activeTab === 'search' && (
            <div className="glass-card" style={{ padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <form onSubmit={handleSearchSubmit} style={{ marginBottom: searchResult || searchError ? '30px' : 0 }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary)' }}>Cerca Ticket per Codice</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                  Inserisci il codice identificativo rilasciato al momento dell'apertura (es. <code>AB-2026-00004</code> o <code>#4</code>).
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="text" 
                    value={searchCode} 
                    onChange={(e) => setSearchCode(e.target.value)} 
                    className="form-input" 
                    placeholder="Es. AB-2026-00004 oppure #4" 
                    style={{ flex: 1 }}
                    required 
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ whiteSpace: 'nowrap', padding: '0 28px' }}
                    disabled={isSearching}
                  >
                    {isSearching ? 'Ricerca...' : 'Cerca'}
                  </button>
                </div>
              </form>

              {searchError && (
                <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '14px 18px', borderRadius: '10px', marginTop: '20px' }}>
                  {searchError}
                </div>
              )}

              {searchResult && (
                <div style={{ 
                  marginTop: '30px', 
                  borderTop: '1px solid var(--border-color)', 
                  paddingTop: '30px' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.5px' }}>
                        {searchResult.codice_riferimento || `#${searchResult.id}`}
                      </div>
                      <h4 style={{ fontSize: '22px', marginTop: '4px' }}>{searchResult.title}</h4>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Referente: <strong>{searchResult.referente || 'Non specificato'}</strong> &bull; Aperto il: {searchResult.created_at_formatted}
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(searchResult.status)}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '18px', borderRadius: '10px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Descrizione Segnalata</div>
                    <p style={{ color: 'var(--text-main)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>{searchResult.description}</p>
                  </div>

                  {/* Updates Section */}
                  <div>
                    <h5 style={{ fontSize: '16px', marginBottom: '14px', color: 'var(--primary)' }}>Aggiornamenti & Note Tecniche</h5>
                    {searchResult.updates && searchResult.updates.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {searchResult.updates.map((upd, idx) => (
                          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '14px 18px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                              <span>Tecnico: <strong>{upd.author}</strong></span>
                              <span>{upd.created_at_formatted}</span>
                            </div>
                            <p style={{ fontSize: '14px', color: 'var(--text-main)', margin: 0 }}>{upd.note}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        Nessuna nota aggiuntiva al momento. Il ticket è stato preso in carico dallo staff.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
