/* app.jsx — Dynalektric SPA shell */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#B8602C",
  "typography": "sohne",
  "heroVariant": 0,
  "texture": "clean",
  "density": "comfortable"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  ['#B8602C', '#1F3A5F'], // copper + ink-blue (default)
  ['#1F3A5F', '#B8602C'], // ink-blue primary
  ['#0E1116', '#B8602C'], // monochrome ink
  ['#2A5F3F', '#B8602C'], // engineering green
];

const NAV = [
  { id: 'home',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'products',   label: 'Products & Solutions' },
  { id: 'rnd',        label: 'Innovation Portfolio' },
  { id: 'industries', label: 'Industries & Applications' },
  { id: 'export',     label: 'Export' },
  { id: 'contact',    label: 'Contact' },
];

/* SEO metadata per route */
const PAGE_META = {
  home: {
    title: 'Dynalektric | Electrical and Electronics Solutions for Industrial Applications',
    description: 'Dynalektric provides engineered electrical and electronics solutions for railways, renewables, utilities, material handling and industrial applications.',
    path: '/',
  },
  about: {
    title: 'About Dynalektric | Engineering-Led Electrical Manufacturing',
    description: 'Learn about Dynalektric engineering, manufacturing, quality and documentation capabilities for industrial and export-focused buyers.',
    path: '/about',
  },
  products: {
    title: 'Products & Solutions | Transformers, Panels, Chargers and Power Electronics',
    description: 'Explore Dynalektric product groups including magnetics, control panel assemblies, power electronics systems and cross-segment industrial solutions.',
    path: '/products',
  },
  rnd: {
    title: 'Innovation Portfolio | Custom Electrical and Power Solutions',
    description: 'Explore Dynalektric innovation and R&D focus across traction products, renewable applications, IoT communication systems and power modules.',
    path: '/innovation-rnd',
  },
  industries: {
    title: 'Industries & Applications | Railways, Renewables, Utilities and Industrial Sectors',
    description: 'See how Dynalektric products support railway, renewable energy, power utility, heavy industry, material handling and data center applications.',
    path: '/industries',
  },
  export: {
    title: 'Export | Supplier Readiness for Global Industrial Buyers',
    description: 'Dynalektric supports export-focused buyers with documentation, inspection coordination, testing support and product-specific compliance inputs.',
    path: '/export',
  },
  contact: {
    title: 'Contact Dynalektric | Submit RFQ or Enquiry',
    description: 'Submit an RFQ or enquiry for transformers, control panels, chargers, power electronics systems and cross-segment solutions.',
    path: '/contact',
  },
};

const SITE_ORIGIN = 'https://www.dynalektric.com';

function updateDocumentMeta(pageId) {
  const meta = PAGE_META[pageId] || PAGE_META.home;
  document.title = meta.title;

  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('meta[property="og:title"]', 'content', meta.title);
  setMeta('meta[property="og:description"]', 'content', meta.description);
  setMeta('meta[property="og:url"]', 'content', SITE_ORIGIN + meta.path);
  setMeta('meta[name="twitter:title"]', 'content', meta.title);
  setMeta('meta[name="twitter:description"]', 'content', meta.description);
  setMeta('link[rel="canonical"]', 'href', SITE_ORIGIN + meta.path);
}

function App() {
  const tw = useTweaks(TWEAK_DEFAULTS);
  const t = tw.values;
  const setTweak = tw.set;

  const [page, setPage] = React.useState('home');
  const [focusId, setFocusId] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // SEO: update document title + meta per route
  React.useEffect(() => {
    updateDocumentMeta(page);
  }, [page]);

  // Apply tweaks to body
  React.useEffect(() => {
    const accent = ACCENT_OPTIONS[t.accent] || ACCENT_OPTIONS[0];
    const root = document.documentElement;
    if (typeof t.accent === 'number') {
      root.style.setProperty('--accent', accent[0]);
      root.style.setProperty('--accent-2', accent[1]);
    } else if (typeof t.accent === 'string') {
      root.style.setProperty('--accent', t.accent);
    }
    document.body.dataset.texture = t.texture || 'clean';
    document.body.dataset.density = t.density || 'comfortable';

    // Typography
    const typo = t.typography || 'sohne';
    if (typo === 'sohne') {
      root.style.setProperty('--font-display', "'Söhne', 'Inter Display', 'Inter', 'Helvetica Neue', sans-serif");
      root.style.setProperty('--font-body', "'Inter', 'Helvetica Neue', sans-serif");
    } else if (typo === 'haas') {
      root.style.setProperty('--font-display', "'Neue Haas Grotesk Display', 'Inter Display', 'Inter', sans-serif");
      root.style.setProperty('--font-body', "'Inter', sans-serif");
    } else if (typo === 'inter') {
      root.style.setProperty('--font-display', "'Inter', 'Helvetica Neue', sans-serif");
      root.style.setProperty('--font-body', "'Inter', sans-serif");
    } else if (typo === 'editorial') {
      root.style.setProperty('--font-display', "'GT Sectra', 'Times New Roman', serif");
      root.style.setProperty('--font-body', "'Inter', sans-serif");
    }
  }, [t.accent, t.texture, t.density, t.typography]);

  const navigate = (id, focus = null) => {
    setPage(id);
    setFocusId(focus);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderPage = () => {
    const props = { navigate, focusId, tweaks: t };
    switch (page) {
      case 'home':       return <PageHome {...props} />;
      case 'about':      return <PageAbout {...props} />;
      case 'products':   return <PageProducts {...props} />;
      case 'industries': return <PageIndustries {...props} />;
      case 'rnd':        return <PageRnd {...props} />;
      case 'export':     return <PageExport {...props} />;
      case 'contact':    return <PageContact {...props} />;
      default:           return <PageHome {...props} />;
    }
  };

  return (
    <>
      <header className="topbar" role="banner">
        <div className="topbar-inner">
         <div className="topbar-logo">
           <img 
              src="src/assets/logo.png"
              alt="Dynalektric logo"
               style={{ 
                        width: '70px',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
          />
         </div>
          <nav className="topbar-nav" aria-label="Main navigation">
            {NAV.map(n => (
              <button
                key={n.id}
                className="nav-link"
                aria-current={page === n.id ? 'page' : undefined}
                onClick={() => navigate(n.id)}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="topbar-cta">
           
            <button className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13 }} onClick={() => navigate('contact')} aria-label="Submit RFQ on contact page">
              Submit RFQ <span className="arrow" aria-hidden="true">→</span>
            </button>
            <button className="menu-btn" onClick={() => setDrawerOpen(true)} aria-label="Open menu">Menu</button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${drawerOpen ? 'is-open' : ''}`} role="dialog" aria-label="Mobile navigation" aria-hidden={!drawerOpen}>
        <button className="menu-btn close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close menu">Close</button>
        {NAV.map(n => (
          <button
            key={n.id}
            className="nav-link"
            aria-current={page === n.id ? 'page' : undefined}
            onClick={() => navigate(n.id)}
          >
            {n.label}
          </button>
        ))}
      </div>

      {renderPage()}

      <DynaTweaksPanel t={t} setTweak={setTweak} />
    </>
  );
}

function DynaTweaksPanel({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent palette">
        <TweakColor
          label="Accent pair"
          value={typeof t.accent === 'number' ? t.accent : 0}
          options={ACCENT_OPTIONS}
          onChange={v => setTweak('accent', v)}
        />
      </TweakSection>

      <TweakSection title="Typography">
        <TweakSelect
          label="Type pairing"
          value={t.typography}
          options={[
            { label: 'Söhne + Inter (default)', value: 'sohne' },
            { label: 'Neue Haas + Inter', value: 'haas' },
            { label: 'Inter only', value: 'inter' },
            { label: 'Editorial serif + Inter', value: 'editorial' },
          ]}
          onChange={v => setTweak('typography', v)}
        />
      </TweakSection>

      <TweakSection title="Hero headline">
        <TweakRadio
          label="Variant"
          value={t.heroVariant}
          options={[
            { label: 'A', value: 0 },
            { label: 'B', value: 1 },
            { label: 'C', value: 2 },
          ]}
          onChange={v => setTweak('heroVariant', v)}
        />
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 8 }}>
          {t.heroVariant === 0 && 'OEM and EPC focused'}
          {t.heroVariant === 1 && 'Specification first'}
          {t.heroVariant === 2 && 'Supplier qualification ready'}
        </div>
      </TweakSection>

      <TweakSection title="Background texture">
        <TweakRadio
          label="Surface"
          value={t.texture}
          options={[
            { label: 'Clean', value: 'clean' },
            { label: 'Grid', value: 'grid' },
            { label: 'Dots', value: 'dots' },
          ]}
          onChange={v => setTweak('texture', v)}
        />
      </TweakSection>

      <TweakSection title="Density">
        <TweakRadio
          label="Spacing"
          value={t.density}
          options={[
            { label: 'Comfortable', value: 'comfortable' },
            { label: 'Compact', value: 'compact' },
          ]}
          onChange={v => setTweak('density', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
