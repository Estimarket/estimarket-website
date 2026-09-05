function HomePage({ onNav }) {
  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="photo warm" style={{ '--photo-h': 25, position: 'absolute', inset: 0 }} />
        <div className="scrim-dark" style={{ background: 'linear-gradient(0deg, rgba(14,33,75,0.55) 0%, rgba(14,33,75,0.20) 60%, rgba(14,33,75,0.35) 100%)' }} />
        <div className="page-frame" style={{ position: 'relative', paddingTop: 96, paddingBottom: 120, color: '#fff' }}>
          <div style={{ maxWidth: 640 }}>
            <h1 style={{
              fontFamily: 'var(--font-body)',
              fontSize: 60, lineHeight: 1.05, letterSpacing: '-0.02em',
              fontWeight: 700, color: '#fff', margin: 0,
            }}>
              Find your next <span className="display-italic" style={{ fontSize: 64 }}>adventure</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: 'rgba(255,255,255,0.92)', marginTop: 16, marginBottom: 0, maxWidth: 540 }}>
              Whole homes for every kind of trip — from cabins in the Rockies to coastal estates in Italy.
            </p>
          </div>
          <div style={{ marginTop: 40, maxWidth: 960 }}>
            <SearchBar onSearch={() => onNav('search')} />
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section">
        <div className="page-frame">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
            <h2 style={{ fontSize: 30, fontWeight: 600, margin: 0 }}>Popular destinations</h2>
            <a href="#" onClick={e => { e.preventDefault(); onNav('search'); }} className="link-ghost" style={{ textDecoration: 'none', fontSize: 14 }}>
              See all destinations →
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {DESTINATIONS.slice(0, 4).map(d => (
              <DestinationCard key={d.id} destination={d} onClick={() => onNav('search')} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="section-tight" style={{ background: '#fff', paddingTop: 64, paddingBottom: 64 }}>
        <div className="page-frame">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
            <h2 style={{ fontSize: 30, fontWeight: 600, margin: 0 }}>Featured stays this week</h2>
            <a href="#" onClick={e => { e.preventDefault(); onNav('search'); }} className="link-ghost" style={{ textDecoration: 'none', fontSize: 14 }}>
              See all stays →
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {LISTINGS.slice(0, 4).map(l => (
              <PropertyCard key={l.id} listing={l} onOpen={() => onNav('detail', l.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section">
        <div className="page-frame">
          <h2 style={{ fontSize: 30, fontWeight: 600, margin: '0 0 32px' }}>Why book with Estimarket</h2>
          <TrustRow />
        </div>
      </section>

      {/* EDITORIAL CTA */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 380, display: 'flex', alignItems: 'center' }}>
        <div className="photo cool" style={{ '--photo-h': 195, position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(14,33,75,0.78) 0%, rgba(14,33,75,0.40) 60%, rgba(14,33,75,0.10) 100%)' }} />
        <div className="page-frame" style={{ position: 'relative', color: '#fff', paddingTop: 64, paddingBottom: 64 }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.78, marginBottom: 12 }}>Seasonal · Spring 2026</div>
            <h2 style={{ fontSize: 44, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 16px', color: '#fff' }}>
              Coastal stays for the long weekend
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, opacity: 0.92, marginBottom: 24 }}>
              From Pacific Northwest cabins to Mediterranean villas, our editors have hand-picked thirty-two homes to make this season unforgettable.
            </p>
            <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => onNav('search')}>Explore coastal homes</Button>
          </div>
        </div>
      </section>

      {/* MORE PROPERTIES */}
      <section className="section">
        <div className="page-frame">
          <h2 style={{ fontSize: 30, fontWeight: 600, margin: '0 0 28px' }}>Stay longer, travel slower</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {LISTINGS.slice(2, 6).map(l => (
              <PropertyCard key={l.id} listing={l} onOpen={() => onNav('detail', l.id)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

window.HomePage = HomePage;
