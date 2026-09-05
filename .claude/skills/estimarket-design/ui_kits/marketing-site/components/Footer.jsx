function Footer() {
  const columns = [
    { title: 'Vacation rentals', links: ['Cabins', 'Beach houses', 'Lake houses', 'Cottages', 'Villas with pools'] },
    { title: 'Company',          links: ['About', 'Careers', 'Press', 'Investor relations', 'Newsroom'] },
    { title: 'Support',          links: ['Help center', 'Book with Confidence', 'Cancellation policy', 'Trust & safety', 'Contact'] },
    { title: 'Partner with us',  links: ['List your property', 'Property manager portal', 'Affiliate program', 'Advertise', 'API'] },
  ];
  return (
    <footer style={{ background: 'var(--color-primary-darkest)', color: '#fff', paddingTop: 64, paddingBottom: 24, marginTop: 80 }}>
      <div className="page-frame">
        <div style={{ display: 'flex', gap: 64, marginBottom: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 240px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36, lineHeight: 1, marginBottom: 12 }}>estimarket</div>
            <div style={{ fontSize: 14, opacity: 0.78, lineHeight: 1.5 }}>Travel better together.</div>
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {columns.map(col => (
              <div key={col.title}>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.78, marginBottom: 14 }}>{col.title}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" onClick={e => e.preventDefault()} style={{ color: '#fff', textDecoration: 'none', fontSize: 14, opacity: 0.9 }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.14)', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 13, opacity: 0.6 }}>© 2026 Estimarket · Privacy · Terms · Sitemap</div>
          <div style={{ display: 'flex', gap: 14 }}>
            {['instagram','facebook','twitter','youtube'].map(n => (
              <a key={n} href="#" onClick={e => e.preventDefault()} style={{ color: '#fff', opacity: 0.8 }}>
                <Icon name={n} size={20} stroke={2} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
