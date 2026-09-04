function BookingWidget({ listing }) {
  const nights = 6;
  const subtotal = listing.price * nights;
  const cleaning = 95;
  const fees = 142;
  const total = subtotal + cleaning + fees;
  return (
    <aside style={{
      background: '#fff', borderRadius: 16, padding: 24,
      boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-neutral-200)',
      position: 'sticky', top: 96, width: 360,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
        <span style={{ fontSize: 24, fontWeight: 700 }}>${listing.price}</span>
        <span style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>/ night</span>
        <span style={{ marginLeft: 'auto' }}><Rating value={listing.rating} reviews={listing.reviews} size="sm" /></span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 8, border: '1px solid var(--color-neutral-300)', overflow: 'hidden', marginBottom: 8 }}>
        {[['CHECK-IN','May 14'],['CHECKOUT','May 21']].map(([l,v], i) => (
          <div key={l} style={{ padding: '10px 12px', borderRight: i === 0 ? '1px solid var(--color-neutral-300)' : 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--color-text-primary)' }}>{l}</div>
            <div style={{ fontSize: 14 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 12px', border: '1px solid var(--color-neutral-300)', borderRadius: 8, marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--color-text-primary)' }}>GUESTS</div>
        <div style={{ fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {listing.guests} guests <Icon name="chevron-down" size={16} stroke={2.2} style={{ color: 'var(--color-text-muted)' }}/>
        </div>
      </div>

      <Button variant="primary" size="lg" style={{ width: '100%', borderRadius: 8 }}>Book now</Button>

      <div style={{ fontSize: 13, color: 'var(--color-text-muted)', textAlign: 'center', margin: '12px 0 16px' }}>You won't be charged yet</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
        <Row label={`$${listing.price} × ${nights} nights`} value={`$${subtotal.toLocaleString()}`} />
        <Row label="Cleaning fee" value={`$${cleaning}`} />
        <Row label="Service fee"  value={`$${fees}`} />
        <div style={{ height: 1, background: 'var(--color-neutral-200)', margin: '8px 0' }} />
        <Row label="Total before taxes" value={`$${total.toLocaleString()}`} bold />
      </div>

      <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: 'var(--color-bg-subtle)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Icon name="shield-check" size={18} stroke={2.2} style={{ color: 'var(--color-status-success)', marginTop: 1 }} />
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Book with Confidence.</strong> Full refund within 48 hours of booking.
        </div>
      </div>
    </aside>
  );
}

function Row({ label, value, bold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
      <span style={{ fontWeight: bold ? 700 : 400, color: bold ? 'var(--color-text-primary)' : undefined }}>{label}</span>
      <span style={{ fontWeight: bold ? 700 : 400, color: bold ? 'var(--color-text-primary)' : undefined }}>{value}</span>
    </div>
  );
}

window.BookingWidget = BookingWidget;
