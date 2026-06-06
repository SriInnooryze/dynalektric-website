/* page-home.jsx */

const HOME_INDUSTRY_CARDS = [
  { id: 'railways',   name: 'Railway & Traction',              desc: 'Power and control systems for rolling stock OEMs and railway infrastructure projects.',       img: 'src/assets/facility-teaser.jpg',   bg: '#0d1929' },
  { id: 'renewables', name: 'Renewable Energy',                desc: 'Electrical systems supporting solar, wind and energy storage applications.',                   img: 'src/assets/winding-floor.jpg',     bg: '#0d2217' },
  { id: 'powergrid',  name: 'Power & Utilities',               desc: 'Transformers, reactors and control systems for utilities and EPC contractors.',                 img: 'src/assets/test-bay.jpg',          bg: '#101828' },
  { id: 'heavy',      name: 'Heavy Industries',                desc: 'Power and control solutions for steel, cement, mining and process industries.',                 img: 'src/assets/facility-wide.jpg',     bg: '#201408' },
  { id: 'mhe',        name: 'Material Handling & Warehousing', desc: 'Electrical systems supporting forklifts, AGVs and warehouse automation.',                      img: 'src/assets/power-electronics.jpg', bg: '#0d1e2e' },
  { id: 'datacenter', name: 'Data Centers',                    desc: 'Power conversion and backup infrastructure for mission-critical facilities.',                   img: 'src/assets/test-bay2.jpg',         bg: '#080f1c' },
];

const HOME_CAP_DETAIL = [
  {
    id: 'magnetics', num: '01', name: 'Magnetics',
    sub: 'Foundation of critical electrical systems',
    desc: 'Transformers, reactors and magnetic components designed and manufactured in-house. Engineering from specification through winding, assembly and type testing.',
    tags: ['Distribution & special transformers', 'Dry-type and oil-cooled designs', 'Reactor design & manufacture'],
    img: 'src/assets/magnetics.jpg',
  },
  {
    id: 'control-panels', num: '02', name: 'Control Panel Assemblies',
    sub: 'Power distribution and control intelligence',
    desc: 'Engineered control and power distribution panels for rolling stock and industrial installations. Built and tested to IEC 61439 in a dedicated assembly bay.',
    tags: ['Rolling stock & industrial panels', 'IEC 61439 qualified', 'Custom switchgear assemblies'],
    img: 'src/assets/control-panel.jpg',
  },
  {
    id: 'power-electronics', num: '03', name: 'Power Electronics Systems',
    sub: 'Power conversion, charging and energy management',
    desc: 'Industrial battery chargers and power conversion systems for fleet, utility and specialist applications. Designed for continuous duty in demanding environments.',
    tags: ['Industrial battery chargers', 'DC power conversion systems', 'Custom power supplies'],
    img: 'src/assets/power-electronics.jpg',
  },
  {
    id: 'cross-segment', num: '04', name: 'Integrated Solutions',
    sub: 'Application-ready systems combining multiple technologies',
    desc: 'Sub-systems and assemblies engineered for OEM integration, combining magnetics, control and power electronics into customer-specified configurations.',
    tags: ['OEM sub-system supply', 'Multi-technology integration', 'Application engineering support'],
    img: 'src/assets/cross-segment.jpg',
  },
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

function CapabilityShowcase({ navigate }) {
  const [active, setActive] = React.useState(0);
  const [fading, setFading] = React.useState(false);
  const timerRef = React.useRef(null);

  const switchTo = (i) => {
    if (i === active || fading) return;
    setFading(true);
    timerRef.current = setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 200);
  };

  React.useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const cap = HOME_CAP_DETAIL[active];

  return (
    <div className="cap-showcase">
      <div className="cap-tabs" role="tablist" aria-label="Engineering capabilities">
        {HOME_CAP_DETAIL.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={i === active}
            className={'cap-tab' + (i === active ? ' cap-tab--active' : '')}
            onClick={() => switchTo(i)}
          >
            <span className="mono cap-tab-num">{c.num}</span>
            <span className="cap-tab-name">{c.name}</span>
          </button>
        ))}
      </div>
      <div className={'cap-panel' + (fading ? ' cap-panel--fade' : '')}>
        <div className="cap-panel-text">
          <div className="mono cap-panel-sub">{cap.sub}</div>
          <h3 className="cap-panel-title">{cap.name}</h3>
          <p className="cap-panel-desc">{cap.desc}</p>
          <ul className="cap-panel-tags">
            {cap.tags.map((t, i) => (
              <li key={i} className="cap-panel-tag">{t}</li>
            ))}
          </ul>
          <button
            className="btn btn-ghost cap-panel-cta"
            onClick={() => navigate('products', cap.id)}
          >
            Explore {cap.name} <span className="arrow">→</span>
          </button>
        </div>
        <div className="cap-panel-img" aria-hidden="true">
          <img src={cap.img} alt={cap.name} />
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
            <div className="eyebrow"><span className="dot" /><span className="mono">Industries served</span></div>
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

      {/* SECTION 3 — ENGINEERING CAPABILITIES */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">Manufacturing capabilities</span></div>
            <div>
              <h2>Engineering Capabilities Under One Roof</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)', maxWidth: '60ch' }}>
                From magnetic components and control systems to power conversion and integrated assemblies, Dynalektric delivers complete electrical solutions for critical industries.
              </p>
            </div>
          </div>
          <CapabilityShowcase navigate={navigate} />
        </div>
      </section>

      {/* SECTION 4 — INNOVATION PORTFOLIO */}
      <section className="section reveal">
        <div className="container">
          <div className="rnd-teaser">
            <div className="rnd-teaser-copy">
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: 24 }}>Innovation Portfolio</div>
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

      {/* SECTION 5 — ENGINEERING SOLUTIONS IN ACTION */}
      <section className="section cred-section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">Engineering applications</span></div>
            <div>
              <h2>Engineering Solutions In Action</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)', maxWidth: '60ch' }}>
                Electrical systems engineered for the specific demands of rail, energy, utilities and industrial operations.
              </p>
            </div>
          </div>

          <div className="cred-grid">
            <div className="cred-row">
              <div className="cred-card cred-card--wide">
                <img src="src/assets/facility-teaser.jpg" alt="" aria-hidden="true" />
                <div className="cred-overlay" />
                <div className="cred-body">
                  <span className="mono cred-tag">Railway &amp; Traction</span>
                  <h3>Powering Modern Rail Networks</h3>
                  <p className="cred-desc">Traction transformers, auxiliary converters and onboard control systems supplied to rolling stock OEMs and rail infrastructure projects.</p>
                  <div className="cred-insights">
                    <div className="cred-insight">
                      <span className="cred-insight-k">Challenge</span>
                      <span className="cred-insight-v">Space-constrained, high-vibration environments requiring compact, robust electrical assemblies.</span>
                    </div>
                    <div className="cred-insight">
                      <span className="cred-insight-k">Solution</span>
                      <span className="cred-insight-v">Custom-engineered magnetics and control panels built to EN 50155 and IEC 61373 railway standards.</span>
                    </div>
                    <div className="cred-insight">
                      <span className="cred-insight-k">Outcome</span>
                      <span className="cred-insight-v">Qualified components integrated into fleet programs, subject to OEM acceptance testing.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cred-card">
                <img src="src/assets/winding-floor.jpg" alt="" aria-hidden="true" />
                <div className="cred-overlay" />
                <div className="cred-body">
                  <span className="mono cred-tag">Renewable Energy</span>
                  <h3>Supporting Utility-Scale Renewable Energy</h3>
                  <p className="cred-desc">Transformers and reactor systems engineered for solar parks, wind farms and grid-tied energy storage installations.</p>
                  <div className="cred-insights">
                    <div className="cred-insight">
                      <span className="cred-insight-k">Challenge</span>
                      <span className="cred-insight-v">Variable load profiles and outdoor installation requiring high thermal performance.</span>
                    </div>
                    <div className="cred-insight">
                      <span className="cred-insight-k">Solution</span>
                      <span className="cred-insight-v">Oil-cooled and dry-type transformers designed for cyclic loading, with IP-rated enclosures where applicable.</span>
                    </div>
                    <div className="cred-insight">
                      <span className="cred-insight-k">Outcome</span>
                      <span className="cred-insight-v">Systems integrated into EPC-led renewable projects, delivering reliable power conversion at the point of generation.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cred-row">
              <div className="cred-card">
                <img src="src/assets/test-bay.jpg" alt="" aria-hidden="true" />
                <div className="cred-overlay" />
                <div className="cred-body">
                  <span className="mono cred-tag">Power &amp; Utilities</span>
                  <h3>Strengthening Critical Power Infrastructure</h3>
                  <p className="cred-desc">Distribution transformers and reactor systems supplied to utilities, EPC contractors and substation projects across domestic and export markets.</p>
                  <div className="cred-insights">
                    <div className="cred-insight">
                      <span className="cred-insight-k">Challenge</span>
                      <span className="cred-insight-v">Long service life requirements with minimal maintenance access in live network environments.</span>
                    </div>
                    <div className="cred-insight">
                      <span className="cred-insight-k">Solution</span>
                      <span className="cred-insight-v">Type-tested transformers manufactured to IEC 60076, with documented quality plans per project.</span>
                    </div>
                    <div className="cred-insight">
                      <span className="cred-insight-k">Outcome</span>
                      <span className="cred-insight-v">Products accepted by utility procurement teams and integrated into substation upgrade programs.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cred-card cred-card--wide">
                <img src="src/assets/power-electronics.jpg" alt="" aria-hidden="true" />
                <div className="cred-overlay" />
                <div className="cred-body">
                  <span className="mono cred-tag">Material Handling &amp; Automation</span>
                  <h3>Keeping Industrial Operations Moving</h3>
                  <p className="cred-desc">Battery chargers, power conversion systems and control panels supporting forklift fleets, AGVs and warehouse automation infrastructure.</p>
                  <div className="cred-insights">
                    <div className="cred-insight">
                      <span className="cred-insight-k">Challenge</span>
                      <span className="cred-insight-v">Continuous duty cycles requiring reliable power delivery with minimal downtime.</span>
                    </div>
                    <div className="cred-insight">
                      <span className="cred-insight-k">Solution</span>
                      <span className="cred-insight-v">Industrial battery chargers and distribution panels engineered for 24-hour operation in warehouse environments.</span>
                    </div>
                    <div className="cred-insight">
                      <span className="cred-insight-k">Outcome</span>
                      <span className="cred-insight-v">Deployed across logistics and warehousing operations, supporting fleet uptime for materials handling customers.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
