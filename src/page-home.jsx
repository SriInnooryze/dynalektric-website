/* page-home.jsx */

const HOME_PRODUCT_IMAGES = {
  'magnetics':         'src/assets/magnetics.jpg',
  'control-panels':    'src/assets/control-panel.jpg',
  'power-electronics': 'src/assets/power-electronics.jpg',
  'cross-segment':     'src/assets/cross-segment.jpg',
};

const HOME_INDUSTRY_CARDS = [
  { id: 'railways',   name: 'Railway & Traction',              desc: 'Power and control systems for rolling stock OEMs and railway infrastructure projects.',       img: 'src/assets/facility-teaser.jpg',   bg: '#0d1929' },
  { id: 'renewables', name: 'Renewable Energy',                desc: 'Electrical systems supporting solar, wind and energy storage applications.',                   img: 'src/assets/winding-floor.jpg',     bg: '#0d2217' },
  { id: 'powergrid',  name: 'Power & Utilities',               desc: 'Transformers, reactors and control systems for utilities and EPC contractors.',                 img: 'src/assets/test-bay.jpg',          bg: '#101828' },
  { id: 'heavy',      name: 'Heavy Industries',                desc: 'Power and control solutions for steel, cement, mining and process industries.',                 img: 'src/assets/facility-wide.jpg',     bg: '#201408' },
  { id: 'mhe',        name: 'Material Handling & Warehousing', desc: 'Electrical systems supporting forklifts, AGVs and warehouse automation.',                      img: 'src/assets/power-electronics.jpg', bg: '#0d1e2e' },
  { id: 'datacenter', name: 'Data Centers',                    desc: 'Power conversion and backup infrastructure for mission-critical facilities.',                   img: 'src/assets/test-bay2.jpg',         bg: '#080f1c' },
];

const HOME_CAPABILITIES = [
  { id: 'magnetics',         name: 'Magnetics',                 desc: 'Transformers, reactors and magnetic components for industrial, utility, railway and renewable installations. Engineered in-house from winding to type testing.' },
  { id: 'control-panels',    name: 'Control Panel Assemblies',  desc: 'Engineered control and power distribution panels for rolling stock and industrial installations, built and tested to IEC 61439.' },
  { id: 'power-electronics', name: 'Power Electronics Systems', desc: 'Industrial battery chargers and power conversion systems for fleet, utility and special applications.' },
  { id: 'cross-segment',     name: 'Cross-Segment Solutions',   desc: 'Components and sub-systems engineered for OEM integration across rolling stock, industrial and power applications.' },
];

function useVisibleCount() {
  const [vc, setVc] = React.useState(3);
  React.useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 600) setVc(1);
      else if (window.innerWidth <= 900) setVc(2);
      else setVc(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return vc;
}

const SLIDE_GAP = 24;

function IndustryCarousel({ navigate }) {
  const [idx, setIdx] = React.useState(0);
  const vc = useVisibleCount();
  const viewportRef = React.useRef(null);
  const [vpWidth, setVpWidth] = React.useState(0);

  const count = HOME_INDUSTRY_CARDS.length;
  const max = count - vc;
  const safeIdx = Math.min(idx, max);

  const slideWidth = vpWidth > 0 ? (vpWidth + SLIDE_GAP) / vc : 0;
  const offset = Math.min(safeIdx * slideWidth, max * slideWidth);

  const measure = React.useCallback(() => {
    if (viewportRef.current) setVpWidth(viewportRef.current.clientWidth);
  }, []);

  React.useLayoutEffect(() => { measure(); }, [vc]);
  React.useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(max, i + 1));

  return (
    <div>
      <div ref={viewportRef} style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${count}, calc((100% - ${(vc - 1) * SLIDE_GAP}px) / ${vc}))`,
          columnGap: `${SLIDE_GAP}px`,
          transition: slideWidth > 0 ? 'transform 450ms cubic-bezier(.2,.8,.2,1)' : 'none',
          transform: `translateX(-${offset}px)`,
        }}>
          {HOME_INDUSTRY_CARDS.map((ind) => (
            <button
              key={ind.id}
              className="ind-card"
              style={{ background: ind.bg }}
              onClick={() => navigate('industries', ind.id)}
            >
              <div className="ind-card-bg">
                <img src={ind.img} alt="" aria-hidden="true" />
              </div>
              <div className="ind-card-overlay" />
              <div className="ind-card-body">
                <h3>{ind.name}</h3>
                <p>{ind.desc}</p>
                <span className="mono ind-card-cta">Learn More →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="ind-carousel-nav">
        <span className="mono" style={{ color: 'var(--ink-muted)', fontSize: 10 }}>
          {safeIdx + 1}&thinsp;—&thinsp;{Math.min(safeIdx + vc, count)} of {count} industries
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="ind-nav-btn"
            onClick={prev}
            disabled={safeIdx === 0}
            aria-label="Previous industry"
          >←</button>
          <button
            className="ind-nav-btn ind-nav-btn-fwd"
            onClick={next}
            disabled={safeIdx >= max}
            aria-label="Next industry"
          >→</button>
        </div>
      </div>
    </div>
  );
}

function PageHome({ navigate, tweaks }) {
  useReveal();

  return (
    <main className="page-enter">

      {/* SECTION 1 — CORPORATE HERO */}
      <section className="corp-hero">
        <div className="corp-hero-media">
          <img src="src/assets/facility-wide.jpg" alt="" aria-hidden="true" />
        </div>
        <div className="corp-hero-overlay" />

        <div className="container corp-hero-inner">
          <div className="corp-hero-top">
            <div className="corp-video-badge">
              <span className="mono">Corporate Manufacturing Video Coming Soon</span>
            </div>
          </div>

          <div className="corp-hero-copy">
            <h1>Engineering Critical Electrical Systems for Modern Industry</h1>
            <p>
              Designing, manufacturing and testing electrical systems for transportation, energy and industrial infrastructure.
            </p>
            <button className="btn corp-hero-btn" onClick={() => navigate('about')}>
              Explore Dynalektric <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="corp-stats-strip reveal">
        <div className="container">
          <div className="corp-stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="corp-stats-item">
                <div className="corp-stats-val">{s.value}</div>
                <div className="mono corp-stats-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — INDUSTRIES */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">01 / Industries served</span></div>
            <div>
              <h2>Powering Critical Industries</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)', maxWidth: '60ch' }}>
                Electrical systems engineered for transportation, energy, utility and industrial infrastructure applications.
              </p>
            </div>
          </div>
          <IndustryCarousel navigate={navigate} />
        </div>
      </section>

      {/* SECTION 3 — MANUFACTURING CAPABILITIES */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">02 / Manufacturing capabilities</span></div>
            <div>
              <h2>Integrated Manufacturing Capabilities</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)', maxWidth: '60ch' }}>
                From magnetic components and control systems to power electronics and custom-engineered assemblies, Dynalektric delivers end-to-end electrical manufacturing capabilities under one roof.
              </p>
            </div>
          </div>

          <div className="home-cap-grid">
            {HOME_CAPABILITIES.map((cap) => (
              <button
                key={cap.id}
                className="home-cap-card reveal"
                onClick={() => navigate('products', cap.id)}
              >
                <div className="home-cap-img">
                  <img src={HOME_PRODUCT_IMAGES[cap.id]} alt={cap.name} />
                  <div className="home-cap-img-overlay" />
                </div>
                <div className="home-cap-body">
                  <h3>{cap.name}</h3>
                  <p>{cap.desc}</p>
                  <div className="home-cap-foot">
                    <span className="mono">Learn More</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — INNOVATION PORTFOLIO */}
      <section className="section reveal">
        <div className="container">
          <div className="rnd-teaser">
            <div className="rnd-teaser-copy">
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: 24 }}>03 / Innovation Portfolio</div>
              <h2>Custom requirements engineered in-house.</h2>
              <p className="lead" style={{ marginTop: 24 }}>
                Our engineering and new product development teams take a customer specification through feasibility, design, prototyping, validation and pilot production. One team, one process.
              </p>
              <button className="btn btn-ghost" style={{ marginTop: 32 }} onClick={() => navigate('rnd')}>
                View Innovation Portfolio →
              </button>
            </div>
            <div className="rnd-teaser-visual">
              <img
                src="src/assets/rnd-bench.jpg"
                alt="Dynalektric engineering and NPD workstation"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CASE STUDIES */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">04 / Application references</span></div>
            <div>
              <h2>Proven across sectors.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                Indicative application references across rail, renewables, utilities, automation, material handling and data centres. Project names are not shown. Detailed references available under NDA on request.
              </p>
            </div>
          </div>
          <CaseStudyGrid limit={6} />
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="home-final-cta reveal">
        <div className="container home-final-cta-inner">
          <h2>Let's Discuss Your Project Requirements</h2>
          <p>
            Share your application, ratings, environment and timeline. Our engineering team will respond within one business day.
          </p>
          <div className="home-final-cta-btns">
            <button className="btn home-btn-contact" onClick={() => navigate('contact')}>
              Contact Us <span className="arrow">→</span>
            </button>
            <button className="btn home-btn-profile" onClick={() => navigate('contact')}>
              Download Corporate Profile
            </button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </main>
  );
}

window.PageHome = PageHome;
