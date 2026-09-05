function DestinationCard({ destination, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card"
      style={{
        background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
        textAlign: 'left', borderRadius: 12, overflow: 'hidden',
      }}
    >
      <div
        className={'photo ' + (destination.hue > 0 && destination.hue < 60 ? 'warm' : '')}
        style={{ aspectRatio: '1 / 1', '--photo-h': destination.hue, borderRadius: 12, overflow: 'hidden' }}
      />
      <div style={{ padding: '12px 4px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>{destination.name}</div>
        <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{destination.homes.toLocaleString()} homes</div>
      </div>
    </button>
  );
}

window.DestinationCard = DestinationCard;
