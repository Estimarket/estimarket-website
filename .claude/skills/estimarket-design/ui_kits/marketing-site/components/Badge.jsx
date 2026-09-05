const badgePalettes = {
  default:  { bg: 'var(--color-neutral-100)',          fg: 'var(--color-neutral-700)' },
  primary:  { bg: 'var(--color-primary-lightest)',     fg: 'var(--color-primary-dark)' },
  success:  { bg: '#DCFCE7',                           fg: '#166534' },
  warning:  { bg: '#FEF3C7',                           fg: '#92400E' },
  error:    { bg: '#FEE2E2',                           fg: '#991B1B' },
  orange:   { bg: '#FEE9DF',                           fg: '#C04E18' },
  dark:     { bg: 'var(--color-primary-darkest)',      fg: '#fff' },
};
function Badge({ children, variant = 'default', icon, style }) {
  const p = badgePalettes[variant] || badgePalettes.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      height: 24, padding: '0 10px', borderRadius: 9999,
      background: p.bg, color: p.fg,
      fontSize: 12, fontWeight: 600, letterSpacing: '0.02em',
      ...style,
    }}>
      {icon ? <Icon name={icon} size={14} stroke={2.2} /> : null}
      {children}
    </span>
  );
}
window.Badge = Badge;

// Quick palette derived from listing badge strings -> variant
window.badgeVariant = (label) => ({
  'Superhost': 'success',
  'Verified': 'success',
  'Popular': 'orange',
  'Last chance': 'warning',
  'Unavailable': 'error',
}[label] || 'default');
