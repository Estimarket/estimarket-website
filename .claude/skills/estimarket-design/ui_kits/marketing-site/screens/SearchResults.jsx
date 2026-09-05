function SearchResults({ onNav }) {
  const [active, setActive] = React.useState([]);
  const toggle = (k) => setActive(a => a.includes(k) ? a.filter(x => x !== k) : [...a, k]);

  const filters = [
    { key: 'price',    icon: 'tag',                label: 'Price' },
    { key: 'bedrooms', icon: 'bed-double',         label: 'Bedrooms' },
    { key: 'pool',     icon: 'waves',              label: 'Pool' },
    { key: 'hottub',   icon: 'bath',               label: 'Hot tub' },
    { key: 'pets',     icon: 'paw-print',          label: 'Pet-friendly' },
    { key: 'wifi',     icon: 'wifi',               label: 'Wifi' },
    { key: 'view',     icon: 'mountain-snow',      label: 'View' },
    { key: 'type',     icon: 'home',               label: 'Property type' },
  ];

  return (
    <div className="page-frame" style={{ paddingTop: 24, paddingBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>
            Stays in Aspen, Colorado
          </h1>
          <div style={{ fontSize: 14, color: 'var(--color-text-muted)', marginTop: 4 }}>
            May 14 – May 21 · 6 guests · 187 homes
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={pillBtnStyle()}><Icon name="map" size={14} stroke={2.2} />Show map</button>
          <button style={pillBtnStyle()}>Sort: Recommended <Icon name="chevron-down" size={14} stroke={2.2} /></button>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <FilterBar filters={filters} active={active} onToggle={toggle} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 460px', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {LISTINGS.map(l => (
            <PropertyCard key={l.id} listing={l} onOpen={() => onNav('detail', l.id)} />
          ))}
        </div>

        {/* Map placeholder */}
        <div style={{
          position: 'sticky', top: 96,
          height: 'calc(100vh - 120px)',
          borderRadius: 16, overflow: 'hidden',
          background: 'linear-gradient(135deg, #E8F2FF 0%, #A8CEFF 100%)',
          border: '1px solid var(--color-neutral-200)', boxShadow: 'var(--shadow-sm)',
          position: 'relative',
        }}>
          <MapPlaceholder onPin={() => onNav('detail', LISTINGS[0].id)} />
        </div>
      </div>
    </div>
  );
}

function pillBtnStyle() {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    height: 36, padding: '0 14px', borderRadius: 9999,
    border: '1px solid var(--color-neutral-300)', background: '#fff',
    color: 'var(--color-text-primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer',
  };
}

function MapPlaceholder({ onPin }) {
  // Sketched-out neighborhood map: roads, lake, pins
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 0H40V40" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="400" height="600" fill="url(#grid)"/>
        {/* lake */}
        <path d="M40 220 Q120 180 200 240 T360 280 L360 380 Q280 420 200 380 T40 360 Z" fill="rgba(255,255,255,0.55)"/>
        {/* roads */}
        <path d="M0 100 L400 140" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
        <path d="M80 0 L120 600" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
        <path d="M260 0 L320 600" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
        <path d="M0 480 L400 520" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
      </svg>
      {/* Pins */}
      {[
        [60, 120, '$320'], [180, 180, '$540'], [300, 300, '$285'],
        [120, 380, '$210'], [240, 480, '$395'], [80, 520, '$720'],
      ].map(([x,y,p], i) => (
        <button
          key={i}
          onClick={onPin}
          style={{
            position: 'absolute', left: x + '%', top: y/6 + '%',
            transform: 'translate(-50%, -50%)',
            background: i === 0 ? 'var(--color-primary-darkest)' : '#fff',
            color: i === 0 ? '#fff' : 'var(--color-text-primary)',
            border: '2px solid #fff',
            boxShadow: 'var(--shadow-md)',
            height: 32, padding: '0 12px', borderRadius: 9999,
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center',
          }}
        >{p}</button>
      ))}
    </div>
  );
}

window.SearchResults = SearchResults;
