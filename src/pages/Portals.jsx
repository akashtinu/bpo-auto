import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ALL_PORTALS = [
  { name: 'Voxtur', type: 'BPO & Appraisal', status: 'active' },
  { name: 'Xome', type: 'BPO', status: 'active' },
  { name: 'Clear Capital', type: 'BPO & Valuation', status: 'active' },
  { name: 'Solidifi', type: 'BPO & Appraisal', status: 'active' },
  { name: 'LRES', type: 'BPO', status: 'active' },
  { name: 'Valuation Connect', type: 'Appraisal', status: 'active' },
  { name: 'Proteck', type: 'BPO', status: 'active' },
  { name: 'First American', type: 'Valuation', status: 'active' },
  { name: 'Realty Pilot', type: 'BPO', status: 'active' },
  { name: 'Estreet Appraisal', type: 'Appraisal', status: 'active' },
  { name: 'Valuenet Groundworks', type: 'BPO & Appraisal', status: 'active' },
  { name: 'RRR', type: 'BPO', status: 'active' },
  { name: 'National BPO Group', type: 'BPO', status: 'active' },
  { name: 'ServiceLink', type: 'Valuation', status: 'active' },
  { name: 'Altisource', type: 'BPO & REO', status: 'active' },
  { name: 'Ocwen/PHH', type: 'BPO', status: 'active' },
  { name: 'FiServ', type: 'BPO & Appraisal', status: 'active' },
  { name: 'Five Brothers', type: 'BPO', status: 'active' },
  { name: 'Asset Valuation & Marketing', type: 'BPO', status: 'active' },
  { name: 'FrontLine', type: 'BPO', status: 'active' },
  { name: 'MCS', type: 'REO & BPO', status: 'coming-soon' },
  { name: 'Chronos Solutions', type: 'Valuation', status: 'coming-soon' },
  { name: 'Class Valuation', type: 'Appraisal', status: 'coming-soon' },
  { name: 'Nationwide Appraisal Network', type: 'Appraisal', status: 'coming-soon' },
];

const Portals = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = ALL_PORTALS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero */}
      <section className="hero-section container" style={{ paddingBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>Supported BPO Portals</h1>
        <p className="hero-subtitle">
          We integrate with all major BPO, appraisal, and REO vendor portals. New portals are added regularly based on client demand.
        </p>
      </section>

      {/* Search & Filter Bar */}
      <section className="container" style={{ marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              id="portal-search"
              className="form-input"
              type="text"
              placeholder="Search portals..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['all', 'active', 'coming-soon'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', textTransform: 'capitalize' }}
              >
                {f === 'coming-soon' ? 'Coming Soon' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Grid */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Showing {filtered.length} of {ALL_PORTALS.length} portals
        </p>
        <div className="portals-grid">
          {filtered.map((portal) => (
            <div key={portal.name} className="portal-item" style={{ position: 'relative' }}>
              {portal.status === 'coming-soon' && (
                <span className="badge badge-warning" style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', fontSize: '0.65rem' }}>
                  SOON
                </span>
              )}
              {portal.status === 'active' && (
                <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 6px var(--success)' }} />
              )}
              <div className="portal-logo-mock" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{portal.name}</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{portal.type}</p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <p>No portals matched your search. Try a different term.</p>
          </div>
        )}
      </section>

      {/* Request a Portal */}
      <section className="container">
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(3, 76, 98, 0.3) 0%, rgba(6, 11, 19, 0.9) 100%)', borderColor: 'rgba(4, 146, 194, 0.3)' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>Don't See Your Portal?</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            We constantly expand our portal support. Contact us to request integration with any BPO or appraisal platform you work with.
          </p>
          <a href="/contact" className="btn btn-primary">Request a Portal</a>
        </div>
      </section>
    </div>
  );
};

export default Portals;
