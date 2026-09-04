function ImageMosaic({ listing }) {
  const hues = [0, -10, 8, 14, -4].map(d => listing.hue + d);
  const cls = listing.warm ? 'photo warm' : 'photo';
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 8,
        height: 460,
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        <div className={cls} style={{ gridRow: '1 / span 2', '--photo-h': hues[0] }} />
        <div className={cls} style={{ '--photo-h': hues[1] }} />
        <div className={cls} style={{ '--photo-h': hues[2] }} />
        <div className={cls} style={{ '--photo-h': hues[3] }} />
        <div className={cls} style={{ '--photo-h': hues[4], position: 'relative' }}>
          <button style={{
            position: 'absolute', bottom: 16, right: 16,
            background: '#fff', border: 0, padding: '10px 14px', borderRadius: 8,
            display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13,
            color: 'var(--color-text-primary)', cursor: 'pointer', boxShadow: 'var(--shadow-md)',
          }}>
            <Icon name="grid-3x3" size={14} stroke={2.2} /> Show all photos
          </button>
        </div>
      </div>
      <button aria-label="Save" style={{
        position: 'absolute', top: 16, right: 16,
        background: 'rgba(255,255,255,0.95)', border: 0, height: 40, padding: '0 14px',
        borderRadius: 9999, display: 'inline-flex', alignItems: 'center', gap: 6,
        fontWeight: 600, fontSize: 13, cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
      }}>
        <Icon name="heart" size={16} stroke={2.2} style={{ color: 'var(--color-primary)' }} />
        Save
      </button>
      <button aria-label="Share" style={{
        position: 'absolute', top: 16, right: 92,
        background: 'rgba(255,255,255,0.95)', border: 0, height: 40, padding: '0 14px',
        borderRadius: 9999, display: 'inline-flex', alignItems: 'center', gap: 6,
        fontWeight: 600, fontSize: 13, cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
      }}>
        <Icon name="share-2" size={16} stroke={2.2} style={{ color: 'var(--color-primary)' }} />
        Share
      </button>
    </div>
  );
}

window.ImageMosaic = ImageMosaic;
