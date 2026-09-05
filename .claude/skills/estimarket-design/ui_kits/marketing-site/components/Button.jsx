const btnBase = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  border: 0, cursor: 'pointer',
  fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.01em',
  transition: 'filter var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)',
};
const btnSizes = {
  sm: { height: 32, padding: '0 12px', fontSize: 12, borderRadius: 4, letterSpacing: '0.02em' },
  md: { height: 40, padding: '0 16px', fontSize: 14, borderRadius: 4 },
  lg: { height: 48, padding: '0 24px', fontSize: 16, borderRadius: 4 },
  xl: { height: 56, padding: '0 32px', fontSize: 18, borderRadius: 8 },
};
const btnVariants = {
  primary:    { background: 'var(--color-accent-orange)', color: '#fff' },
  secondary:  { background: 'var(--color-primary)',       color: '#fff' },
  outline:    { background: 'transparent', color: 'var(--color-primary)', boxShadow: 'inset 0 0 0 2px var(--color-primary)' },
  ghost:      { background: 'transparent', color: 'var(--color-primary)' },
  destructive:{ background: 'var(--color-status-error)',  color: '#fff' },
};

function Button({ children, variant = 'primary', size = 'md', iconLeft, iconRight, disabled, onClick, style, type = 'button' }) {
  const [pressed, setPressed] = React.useState(false);
  const merged = {
    ...btnBase,
    ...btnSizes[size],
    ...btnVariants[variant],
    ...(disabled ? { background: 'var(--color-neutral-300)', color: 'var(--color-neutral-500)', cursor: 'not-allowed', boxShadow: 'none' } : null),
    ...(pressed && !disabled ? { transform: 'scale(0.98)', filter: 'brightness(0.88)' } : null),
    ...style,
  };
  return (
    <button
      type={type}
      style={merged}
      onClick={disabled ? undefined : onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onMouseEnter={e => !disabled && (e.currentTarget.style.filter = 'brightness(0.92)')}
      onMouseOut={e => !disabled && (e.currentTarget.style.filter = '')}
    >
      {iconLeft ? <Icon name={iconLeft} size={size === 'sm' ? 14 : 16} stroke={2.4} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={size === 'sm' ? 14 : 16} stroke={2.4} /> : null}
    </button>
  );
}

window.Button = Button;
