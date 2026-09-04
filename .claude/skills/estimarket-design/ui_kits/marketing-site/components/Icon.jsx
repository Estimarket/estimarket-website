// Lucide icon wrapper — renders an inline SVG so we don't depend on createIcons reflow.
// Uses the data attribute pattern that Lucide UMD exposes via createIcons().

function Icon({ name, size = 20, stroke = 2, color = 'currentColor', style, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) window.lucide.createIcons({ icons: window.lucide.icons, attrs: { 'stroke-width': stroke }, nameAttr: 'data-lucide' });
  }, [name, stroke]);
  return (
    <i
      ref={ref}
      data-lucide={name}
      style={{ width: size, height: size, color, display: 'inline-flex', flex: '0 0 ' + size + 'px', ...style }}
      {...rest}
    />
  );
}

window.Icon = Icon;
