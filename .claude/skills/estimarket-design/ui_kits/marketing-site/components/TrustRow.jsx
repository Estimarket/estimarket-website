function TrustRow() {
  const items = [
    { icon: 'home',          title: 'Whole homes',     copy: 'Every property is the entire place — no shared spaces.' },
    { icon: 'shield-check',  title: 'Book with Confidence', copy: '24/7 support and full refunds within 48 hours.' },
    { icon: 'tag',           title: 'Best price guarantee', copy: 'Find a lower price elsewhere? We\u2019ll match it.' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
      {items.map(it => (
        <div key={it.title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: 'var(--color-primary-lightest)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={it.icon} size={28} stroke={2} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)' }}>{it.title}</div>
          <div style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.5, maxWidth: 320 }}>{it.copy}</div>
        </div>
      ))}
    </div>
  );
}

window.TrustRow = TrustRow;
