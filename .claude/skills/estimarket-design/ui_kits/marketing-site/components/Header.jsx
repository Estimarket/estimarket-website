function Header({ onNav, screen, compactSearch }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#fff',
        boxShadow: scrolled ? 'var(--shadow-xs)' : 'none',
        borderBottom: scrolled ? 0 : '1px solid var(--color-neutral-200)',
        transition: 'box-shadow var(--duration-instant) var(--ease-out)',
      }}
    >
      <div className="page-frame" style={{ display: 'flex', alignItems: 'center', gap: 32, height: 72 }}>
        <button
          onClick={() => onNav('home')}
          aria-label="Estimarket — home"
          style={{
            background: 'transparent', border: 0, cursor: 'pointer', padding: 0,
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
            color: 'var(--color-primary-darkest)', lineHeight: 1,
          }}
        >
          estimarket
        </button>

        <nav style={{ display: 'flex', gap: 24, flex: '0 0 auto' }}>
          {['Stays','Experiences','Trips','Inbox'].map((label, i) => {
            const active = (i === 0 && (screen === 'home' || screen === 'search' || screen === 'detail'));
            return (
              <a key={label} href="#" onClick={e => e.preventDefault()}
                style={{
                  textDecoration: 'none',
                  fontSize: 14, fontWeight: 600,
                  color: active ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  borderBottom: active ? '3px solid var(--color-primary)' : '3px solid transparent',
                  padding: '24px 0',
                }}
              >{label}</a>
            );
          })}
        </nav>

        <div style={{ flex: 1 }}>
          {compactSearch ? (
            <div style={{ maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              <SearchBar compact onSearch={() => onNav('search')} />
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="#" onClick={e => e.preventDefault()}
            style={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: 14, textDecoration: 'none', padding: '8px 12px' }}
          >List your property</a>
          <Button variant="primary" size="md" iconLeft="user">Sign in</Button>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
