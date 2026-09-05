function PropertyDetail({ listing, onNav }) {
  if (!listing) return null;
  return (
    <div className="page-frame" style={{ paddingTop: 24, paddingBottom: 64 }}>
      <button
        onClick={() => onNav('search')}
        style={{ background: 'transparent', border: 0, color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 6 }}
      >
        <Icon name="chevron-left" size={16} stroke={2.4} /> Back to search
      </button>

      <ImageMosaic listing={listing} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 64, marginTop: 32, alignItems: 'flex-start' }}>
        <div>
          {/* Title block */}
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 }}>{listing.title}</h1>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 14, color: 'var(--color-text-secondary)', flexWrap: 'wrap' }}>
              <Rating value={listing.rating} reviews={listing.reviews} />
              <span>·</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon name="map-pin" size={14} stroke={2.2} /> {listing.location}
              </span>
              {listing.badges.map(b => <Badge key={b} variant={badgeVariant(b)} icon={b === 'Superhost' ? 'medal' : null}>{b}</Badge>)}
            </div>
          </div>

          {/* Host strip */}
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--color-neutral-200)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 9999, background: 'linear-gradient(135deg, #245ABC, #0E214B)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22 }}>
              {listing.host.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Hosted by {listing.host.name}</div>
              <div style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Hosting since {listing.host.joined} · Response: {listing.host.response}</div>
            </div>
          </div>

          {/* Specs */}
          <div style={{ marginTop: 24, paddingTop: 24, paddingBottom: 24, borderTop: '1px solid var(--color-neutral-200)', borderBottom: '1px solid var(--color-neutral-200)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              ['users',       listing.guests + ' guests'],
              ['bed-double',  listing.bedrooms + ' bedrooms'],
              ['bed',         listing.beds + ' beds'],
              ['bath',        listing.baths + ' baths'],
            ].map(([icon, label]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                <Icon name={icon} size={22} stroke={1.8} />
                <div style={{ fontSize: 15, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 12px' }}>About this home</h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--color-text-secondary)', margin: 0, maxWidth: 680 }}>
              {listing.description}
            </p>
            <button style={{ marginTop: 12, background: 'transparent', border: 0, padding: 0, color: 'var(--color-primary)', fontWeight: 600, fontSize: 15, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 4 }}>
              Read more
            </button>
          </section>

          {/* Amenities */}
          <section style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--color-neutral-200)' }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 20px' }}>What this place offers</h2>
            <AmenityList amenities={listing.amenities} />
            <button style={{ marginTop: 24, height: 48, padding: '0 24px', background: 'transparent', border: '2px solid var(--color-text-primary)', borderRadius: 4, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
              Show all {listing.amenities.length} amenities
            </button>
          </section>

          {/* Reviews */}
          <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--color-neutral-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ color: 'var(--color-accent-yellow)', fontSize: 28, lineHeight: 1 }}>★</span>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{listing.rating.toFixed(2)} · {listing.reviews} reviews</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {REVIEWS.map((r, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 9999, background: 'var(--color-primary-lightest)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{r.name[0]}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{r.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{r.date}</div>
                    </div>
                  </div>
                  <div style={{ color: 'var(--color-accent-yellow)', marginBottom: 6, fontSize: 14 }}>{'★'.repeat(r.rating)}<span style={{ color: 'var(--color-neutral-300)' }}>{'★'.repeat(5 - r.rating)}</span></div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--color-text-secondary)' }}>{r.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <BookingWidget listing={listing} />
      </div>
    </div>
  );
}

window.PropertyDetail = PropertyDetail;
