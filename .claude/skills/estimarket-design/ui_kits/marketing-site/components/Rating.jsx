function Rating({ value, reviews, size = 'md' }) {
  const sizes = { sm: { star: 12, label: 13 }, md: { star: 14, label: 14 }, lg: { star: 18, label: 18 } };
  const s = sizes[size];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: s.label, color: 'var(--color-text-primary)', fontWeight: 600 }}>
      <span style={{ color: 'var(--color-accent-yellow)', fontSize: s.star + 4, lineHeight: 1 }}>★</span>
      {value.toFixed(2).replace(/\.?0+$/,'')}
      {reviews != null ? <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>· {reviews} reviews</span> : null}
    </span>
  );
}
window.Rating = Rating;
