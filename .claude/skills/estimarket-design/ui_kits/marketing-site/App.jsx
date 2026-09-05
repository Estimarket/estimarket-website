function App() {
  const [screen, setScreen] = React.useState('home');
  const [listingId, setListingId] = React.useState(null);

  const nav = (s, id) => {
    setScreen(s);
    if (id) setListingId(id);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  };

  const listing = LISTINGS.find(l => l.id === listingId);

  return (
    <div data-screen-label={
      screen === 'home' ? '01 Home' :
      screen === 'search' ? '02 Search results' :
      '03 Property detail'
    }>
      <Header onNav={nav} screen={screen} compactSearch={screen !== 'home'} />
      {screen === 'home'   && <HomePage onNav={nav} />}
      {screen === 'search' && <SearchResults onNav={nav} />}
      {screen === 'detail' && <PropertyDetail listing={listing || LISTINGS[0]} onNav={nav} />}
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Re-init Lucide icons after each render tick (data-lucide elements show up after mount).
const observer = new MutationObserver(() => {
  if (window.lucide && document.querySelector('[data-lucide]:not([data-lucide-init])')) {
    window.lucide.createIcons();
    document.querySelectorAll('[data-lucide] svg').forEach(svg => svg.parentElement.setAttribute('data-lucide-init', '1'));
  }
});
observer.observe(document.body, { childList: true, subtree: true });
