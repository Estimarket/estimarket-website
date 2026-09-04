function FilterBar({ filters, active, onToggle }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
      {filters.map(f => {
        const on = active.includes(f.key);
        return (
          <button
            key={f.key}
            onClick={() => onToggle(f.key)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 36, padding: '0 14px', borderRadius: 9999,
              border: on ? '1px solid var(--color-primary)' : '1px solid var(--color-neutral-300)',
              background: on ? 'var(--color-primary-lightest)' : '#fff',
              color: on ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
              transition: 'background var(--duration-instant) var(--ease-out)',
            }}
          >
            <Icon name={f.icon} size={14} stroke={2.2} />
            {f.label}
            {f.count ? <span style={{ opacity: 0.6, marginLeft: 4 }}>· {f.count}</span> : null}
          </button>
        );
      })}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 9999, border: '1px solid var(--color-neutral-300)', background: '#fff', color: 'var(--color-text-primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
          <Icon name="sliders-horizontal" size={14} stroke={2.2} />
          All filters
        </button>
      </div>
    </div>
  );
}

window.FilterBar = FilterBar;
