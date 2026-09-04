function SearchBar({ compact = false, onSearch, value = {} }) {
  const [v, setV] = React.useState({
    where: value.where || 'Aspen, Colorado',
    checkin: value.checkin || 'May 14',
    checkout: value.checkout || 'May 21',
    guests: value.guests || '6 guests',
  });
  const [active, setActive] = React.useState(null);

  const fieldStyle = (key) => ({
    flex: 1, minWidth: 0,
    padding: compact ? '8px 14px' : '14px 20px',
    background: active === key ? 'var(--color-primary-lightest)' : 'transparent',
    borderRight: '1px solid var(--color-neutral-200)',
    cursor: 'pointer',
    transition: 'background var(--duration-instant) var(--ease-out)',
  });

  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      background: '#fff', borderRadius: compact ? 12 : 16,
      boxShadow: compact ? 'var(--shadow-md)' : 'var(--shadow-lg)',
      overflow: 'hidden',
      border: '1px solid var(--color-neutral-200)',
    }}>
      <FieldButton compact={compact} icon="map-pin"  label="Where"     value={v.where}    active={active==='where'}    onSet={() => setActive('where')} />
      <FieldButton compact={compact} icon="calendar" label="Check in"  value={v.checkin}  active={active==='checkin'}  onSet={() => setActive('checkin')} />
      <FieldButton compact={compact} icon="calendar" label="Check out" value={v.checkout} active={active==='checkout'} onSet={() => setActive('checkout')} />
      <FieldButton compact={compact} icon="users"    label="Guests"    value={v.guests}   active={active==='guests'}   onSet={() => setActive('guests')} last />
      <div style={{ display: 'flex', alignItems: 'center', padding: compact ? 6 : 8 }}>
        <Button
          variant="primary"
          size={compact ? 'md' : 'lg'}
          iconLeft="search"
          onClick={() => onSearch && onSearch(v)}
          style={{ borderRadius: 12 }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

function FieldButton({ icon, label, value, active, onSet, compact, last }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onSet}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: 1, minWidth: 0,
        padding: compact ? '8px 14px' : '14px 20px',
        background: active ? 'var(--color-primary-lightest)' : hover ? 'var(--color-neutral-50)' : 'transparent',
        borderRight: last ? '0' : '1px solid var(--color-neutral-200)',
        cursor: 'pointer',
        transition: 'background var(--duration-instant) var(--ease-out)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}
    >
      <Icon name={icon} size={18} stroke={2} style={{ color: active ? 'var(--color-primary)' : 'var(--color-text-muted)' }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-primary)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: compact ? 13 : 14, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
      </div>
    </div>
  );
}

window.SearchBar = SearchBar;
