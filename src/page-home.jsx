/* page-home.jsx */

const HOME_PRODUCT_IMAGES = {
  'magnetics':         'src/assets/magnetics.jpg',
  'control-panels':    'src/assets/control-panel.jpg',
  'power-electronics': 'src/assets/power-electronics.jpg',
  'cross-segment':     'src/assets/cross-segment.jpg',
};

function PageHome({ navigate, tweaks }) {
  useReveal();
  const headline = HERO_HEADLINES[tweaks.heroVariant || 0];

  return (
    <main className="page-enter">
      {/* HERO */}
      <section className="hero" style={{ paddingTop: 80, paddingBottom: 120 }}>
        <div className="container">
          {/* Tech metadata strip */}
          <div className="hero-meta">
            <span className="mono">Index 01 / 06</span>
            <span className="mono">Power · Motion · Safety</span>
            <span className="mono">Established 1980 · India</span>
            <span className="mono">ISO 9001 · IEC · IS</span>
          </div>
          <hr className="rule-soft" style={{ margin: '24px 0 56px' }} />

          <div className="hero-grid">
            <div className="hero-copy">
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: 24 }}>{headline.pre}</div>
              <h1>{headline.main}</h1>
              <p className="lead" style={{ marginTop: 32, maxWidth: '56ch' }}>{headline.sub}</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => navigate('contact')}>
                  Submit RFQ <span className="arrow">→</span>
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('products')}>
                  Browse products
                </button>
              </div>
              <div className="hero-quickfacts">
                <div>
                  <div className="mono">Buyers we work with</div>
                  <div className="val">OEMs, EPCs, utilities, railways, automation</div>
                </div>
                <div>
                  <div className="mono">Export markets</div>
                  <div className="val">Europe, Middle East, Asia</div>
                </div>
                <div>
                  <div className="mono">Typical RFQ turnaround</div>
                  <div className="val">One business day</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-frame">
                <img
                  src="src/assets/facility-teaser.jpg"
                  alt="Dynalektric manufacturing facility"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/*<div className="hero-visual-badge">
                  {/* <span className="mono" style={{ color: 'var(--ink-muted)' }}></span>
                  <span className="mono-num" style={{ fontSize: 11, color: 'var(--ink)' }}></span>
                </div>*/}
                <div className="hero-visual-corner top-left">+</div>
                <div className="hero-visual-corner top-right">+</div>
                <div className="hero-visual-corner bottom-left">+</div>
                <div className="hero-visual-corner bottom-right">+</div>
              </div>
            </div>
          </div>

          {/* Hero footer ticker */}
          <hr className="rule-soft" style={{ margin: '64px 0 24px' }} />
          <div className="hero-ticker">
            <div className="hero-ticker-item"><span className="mono num">01</span><span>Magnetics</span></div>
            <div className="hero-ticker-item"><span className="mono num">02</span><span>Control Panel Assemblies</span></div>
            <div className="hero-ticker-item"><span className="mono num">03</span><span>Power Electronics Systems</span></div>
            <div className="hero-ticker-item"><span className="mono num">04</span><span>Cross-Segment Solutions</span></div>
          </div>
        </div>
      </section>

      {/* PRODUCTS OVERVIEW */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">02 / Products and Solutions</span></div>
            <div>
              <h2>Four product groups, designed to specification.</h2>
              <p className="lead" style={{ marginTop: 16 }}>Magnetics, control panel assemblies, power electronics systems and cross-segment solutions. Designed, manufactured and tested under one roof.</p>
            </div>
          </div>

          <div className="product-grid product-grid-4">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                className="product-card card reveal"
                onClick={() => navigate('products', p.id)}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className="product-card-num mono">{p.num}</div>
                <div className="product-card-img">
                  <img
                    src={HOME_PRODUCT_IMAGES[p.id]}
                    alt={`${p.name} product group`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div className="product-card-body">
                  <h3>{p.name}</h3>
                  <p style={{ marginTop: 8, fontSize: 14 }}>{p.tagline}</p>
                  <div className="product-card-subs mono">
                    {p.subcategories.length} sub-categories
                  </div>
                  <div className="product-card-foot">
                    <span className="mono">View group</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* CORPORATE VIDEO SECTION */}
       <section className="section reveal">
        <div className="container">
    
         <div className="section-head">
          <div className="eyebrow">
           <span className="dot" />
           <span className="mono">03 / Manufacturing Overview</span>
         </div>

         <div>
          <h2>Inside Dynalektric Manufacturing</h2>

          <p
          style={{
            marginTop: 16,
            fontSize: 15,
            color: 'var(--ink-soft)',
            maxWidth: '60ch'
          }}
        >
          A quick overview of our engineering, manufacturing,
          testing and assembly capabilities across transformers,
          control panels and power electronics systems.
        </p>
      </div>
    </div>

    <div
      style={{
        marginTop: 40,
        borderRadius: 24,
        overflow: 'hidden',
        border: '1px solid var(--rule-soft)',
        background: '#000'
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        controls
        onError={(e) => { e.stopPropagation(); }}
        style={{
          width: '100%',
          display: 'block',
          aspectRatio: '16/6.5',
          objectFit: 'cover'
        }}
      >
        <source
          src="uploads/dynalektric-video.mp4"
          type="video/mp4"
          onError={(e) => { e.stopPropagation(); }}
        />
      </video>
    </div>

  </div>
</section>

      {/* INDUSTRIES STRIP */}
      <section className="section reveal" style={{ background: 'var(--ink)', color: 'var(--bg)', margin: '0' }}>
        <div className="container">
          <div className="section-head" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="eyebrow"><span className="dot" /><span className="mono" style={{ color: 'rgba(246,244,239,0.6)' }}>04 / Industries served</span></div>
            <div>
              <h2 style={{ color: 'var(--bg)' }}>Built for industrial buyers and project teams.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'rgba(246,244,239,0.7)', maxWidth: '60ch' }}>
                Five sectors where Dynalektric supplies OEMs, EPC contractors, utilities and procurement teams.
              </p>
            </div>
          </div>
          <div className="industry-strip industry-strip-6">
            {INDUSTRIES.map((ind, i) => (
              <button key={ind.id} className="industry-strip-item reveal" onClick={() => navigate('industries', ind.id)} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="mono num" style={{ color: 'var(--accent)' }}>{ind.num}</div>
                <h3 style={{ color: 'var(--bg)' }}>{ind.name}</h3>
                <p style={{ color: 'rgba(246,244,239,0.65)', fontSize: 14, marginTop: 12 }}>{ind.short}</p>
                <span className="mono" style={{ color: 'rgba(246,244,239,0.5)', marginTop: 24, display: 'block' }}>View applications →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPLIER QUALIFICATION */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">05 / Supplier qualification</span></div>
            <div>
              <h2>Built for procurement and quality teams.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)', maxWidth: '60ch' }}>
                What we provide on every project: standards, documentation, in-house testing and export readiness. Useful for procurement, supplier quality and project engineering.
              </p>
            </div>
          </div>
          <div className="why-grid">
            {QUALIFICATION.map(q => (
              <div className="why-item" key={q.num}>
                <div className="mono num">{q.num}</div>
                <h3>{q.title}</h3>
                <p>{q.body}</p>
              </div>
            ))}
          </div>

          <div className="qual-cta">
            <div>
              <div className="mono" style={{ color: 'var(--accent)', fontWeight: 600 }}>Vendor registration</div>
              <h3 style={{ marginTop: 8 }}>Request our supplier qualification pack.</h3>
              <p style={{ marginTop: 8, fontSize: 14, color: 'var(--ink-soft)', maxWidth: '60ch' }}>
                Company profile, ISO certificates, sample test reports, capability statement and reference list. Available on email request for procurement and SCM teams.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => navigate('contact')}>
                Request pack <span className="arrow">→</span>
              </button>
              <button className="btn btn-ghost" onClick={() => navigate('export')}>
                View export support →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* R&D TEASER */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="rnd-teaser">
            <div className="rnd-teaser-copy">
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: 24 }}>06 / Innovation Portfolio</div>
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

      {/* TRUST / CERTS / STATS */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">07 / Standards and testing</span></div>
            <div>
              <h2>Type-tested designs, full documentation, traceable processes.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                Every product ships with routine and type test reports, QAP documentation and material traceability. Designs validated against IEC, IS and customer specifications.
              </p>
            </div>
          </div>

          <div className="standards-grid">
            <div>
              <div className="mono" style={{ marginBottom: 24, color: 'var(--accent)', fontWeight: 600 }}>Certifications and standards</div>
              <div className="cert-row">
                {CERTIFICATIONS.map(c => (
                  <div className="cert-item" key={c.code}>
                    <div className="cert-code">{c.code}</div>
                    <div className="cert-label mono">{c.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }} className="mono">Certificate copies available on request</div>
            </div>
            <div className="qa-card">
              <div className="mono" style={{ marginBottom: 16, color: 'var(--accent)', fontWeight: 600 }}>Quality process</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 13, paddingBottom: 12, borderBottom: '1px solid var(--rule-soft)' }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>Routine testing</div>
                  <div style={{ color: 'var(--ink-soft)' }}>100% electrical validation on every unit</div>
                </li>
                <li style={{ fontSize: 13, paddingBottom: 12, borderBottom: '1px solid var(--rule-soft)' }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>Type testing</div>
                  <div style={{ color: 'var(--ink-soft)' }}>On-site labs plus accredited externals</div>
                </li>
                <li style={{ fontSize: 13, paddingBottom: 12, borderBottom: '1px solid var(--rule-soft)' }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>FAT support</div>
                  <div style={{ color: 'var(--ink-soft)' }}>Customer factory acceptance testing</div>
                </li>
                <li style={{ fontSize: 13 }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>Documentation</div>
                  <div style={{ color: 'var(--ink-soft)' }}>QAP, GA drawings, test reports, BoM</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="stats-row" style={{ marginTop: 56 }}>
            {STATS.map((s, i) => (
              <div className="stats-item reveal" key={i} style={{ transitionDelay: `${i * 80}ms`, textAlign: 'center' }}>
                <div className="big-num">
                  {s.value.includes('+')
                    ? <><Counter to={parseInt(s.value)} />+</>
                    : s.value
                  }
                </div>
                <div className="mono" style={{ marginTop: 12, color: 'var(--ink-muted)' }}>{s.sub}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANONYMOUS CASE STUDIES */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">08 / Case style references</span></div>
            <div>
              <h2>Buyer-grade examples, kept anonymous.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                Indicative application references across rail, renewables, utilities, automation, material handling and data centres. Project names are not shown. Detailed references available under NDA on request.
              </p>
            </div>
          </div>
          <CaseStudyGrid limit={6} />
        </div>
      </section>

      {/* RFQ STRIP */}
      <section className="section-tight reveal">
        <div className="container">
          <div className="brochure-strip">
            <div>
              <div className="mono" style={{ color: 'var(--accent)', fontWeight: 600 }}>Technical resources</div>
              <h3 style={{ marginTop: 12 }}>Capability statement and product datasheets</h3>
              <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>Send your application and ratings. We respond with relevant datasheets and a brief engineering view within one business day.</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('contact')}>
              Request datasheets <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      <FinalCTA navigate={navigate} />
      <Footer navigate={navigate} />
    </main>
  );
}

window.PageHome = PageHome;
