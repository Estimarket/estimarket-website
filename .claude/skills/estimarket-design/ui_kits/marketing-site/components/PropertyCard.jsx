function PropertyCard({ listing, onOpen }) {
  const [saved, setSaved] = React.useState(false);
  return (
    <article
      className="card"
      onClick={() => onOpen && onOpen(listing)}
      style={{
        background: '#fff', borderRadius: 12, overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)', cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          className={'photo ' + (listing.warm ? 'warm' : '')}
          style={{ aspectRatio: '4 / 3', '--photo-h': listing.hue }}
        />
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 36, height: 36, borderRadius: 9999, border: 0,
            background: 'rgba(255,255,255,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform var(--duration-fast) var(--ease-spring)',
            transform: saved ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          <Icon
            name="heart"
            size={18}
            stroke={2.2}
            style={{ color: saved ? 'var(--color-accent-orange)' : 'var(--color-primary)' }}
          />
        </button>
        {listing.badges?.length ? (
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
            {listing.badges.map(b => <Badge key={b} variant={badgeVariant(b)}>{b}</Badge>)}
          </div>
        ) : null}
      </div>
      <div style={{ padding: 16 }}>
        <Rating value={listing.rating} reviews={listing.reviews} size="sm" />
        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: '4px 0 2px', lineHeight: 1.35 }}>
          {listing.title}
        </h3>
        <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          {listing.guests} guests · {listing.beds} beds · {listing.baths} baths
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          ${listing.price} <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--color-text-muted)' }}>/ night</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>
          ${listing.total.toLocaleString()} total before taxes
        </div>
      </div>
    </article>
  );
}

window.PropertyCard = PropertyCard;
