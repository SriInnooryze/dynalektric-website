/* page-export.jsx — Export Business and International Procurement */

// ── DATA ─────────────────────────────────────────────────────

const EXPORT_TRUST_LEGAL = [
  { k: 'CIN',                           v: 'U31300MH1984PTC034500 (placeholder)' },
  { k: 'GST',                           v: '27AABCD1234E1ZM (placeholder)' },
  { k: 'IEC (Importer Exporter Code)',   v: 'AABCD1234E (placeholder)' },
  { k: 'Registered Address',            v: 'Dynalektric, Plot No. XX, MIDC, Pune, Maharashtra 411026, India (placeholder)' },
];

const EXPORT_TRUST_FINANCE = [
  { k: 'D-U-N-S Number',              v: 'Available on request' },
  { k: 'Bank Reference',              v: 'Available on request from principal banker' },
  { k: 'Letter of Credit (LC)',       v: 'Accepted' },
  { k: 'International Transactions',  v: 'Supported via SWIFT' },
];

const EXPORT_CERTIFICATIONS = [
  { name: 'ISO 9001:2015',  held: true,  inProgress: false, perMarket: false, certNum: 'Available on request', download: true },
  { name: 'ISO 14001:2015', held: false, inProgress: true,  perMarket: false, certNum: 'In progress',          download: false },
  { name: 'ISO 45001:2018', held: false, inProgress: true,  perMarket: false, certNum: 'In progress',          download: false },
  { name: 'IRIS ISO 22163', held: false, inProgress: true,  perMarket: false, certNum: 'In progress',          download: false },
  { name: 'CE Marking',     held: false, inProgress: false, perMarket: true,  certNum: 'Per product category', download: false },
  { name: 'UL',             held: false, inProgress: false, perMarket: true,  certNum: 'Per product category', download: false },
  { name: 'IEC 60076',      held: true,  inProgress: false, perMarket: false, certNum: 'Type test ref. on request', download: true },
  { name: 'IEC 61439',      held: true,  inProgress: false, perMarket: false, certNum: 'Type test ref. on request', download: true },
  { name: 'IEC 61558',      held: true,  inProgress: false, perMarket: false, certNum: 'Type test ref. on request', download: true },
  { name: 'EN 50155',       held: false, inProgress: false, perMarket: true,  certNum: 'Per project',          download: false },
];

const EXPORT_MARKET_SCHEMES = [
  {
    region: 'Saudi Arabia',
    code: 'SA',
    schemes: [
      { name: 'SASO',         detail: 'Saudi Standards, Metrology and Quality Organization conformity mark' },
      { name: 'SABER',        detail: 'Electronic product registration and certification platform' },
      { name: 'Product CoC',  detail: 'Certificate of Conformity issued per approved product' },
      { name: 'Shipment CoC', detail: 'Certificate of Conformity issued per individual shipment' },
    ],
  },
  {
    region: 'GCC',
    code: 'GCC',
    schemes: [
      { name: 'G-Mark', detail: 'Gulf Conformity Mark for regulated products across GCC member states' },
      { name: 'ECAS',   detail: 'Emirates Conformity Assessment Scheme, administered by ESMA (UAE)' },
    ],
  },
  {
    region: 'Africa',
    code: 'AF',
    schemes: [
      { name: 'SONCAP', detail: 'Standards Organisation of Nigeria Conformity Assessment Programme' },
      { name: 'PVoC',   detail: 'Pre-export Verification of Conformity (Kenya, Uganda, Tanzania)' },
    ],
  },
];

const EXPORT_PORTFOLIO_TABLE = [
  {
    group: 'Magnetics',
    desc: 'Transformers and reactors for power, railway and renewable applications',
    hsCode: '8504.10 / 8504.32',
    ratings: '50 VA to 5 MVA, up to 36 kV',
    custom: 'High',
    markets: 'Europe, GCC, Africa, APAC',
  },
  {
    group: 'DC Systems and Chargers',
    desc: 'Float chargers, boost chargers, MHE chargers and special application DC systems',
    hsCode: '8504.40',
    ratings: '24 V to 750 V DC, up to 400 A',
    custom: 'Medium to High',
    markets: 'GCC, Europe, ASEAN',
  },
  {
    group: 'Panels and Assemblies',
    desc: 'Control panels, PDUs and power distribution assemblies to IEC 61439',
    hsCode: '8537.10 / 8537.20',
    ratings: 'Up to 6300 A, IP 21 to IP 54',
    custom: 'High',
    markets: 'Europe, GCC, Africa',
  },
];

const EXPORT_PROCESS_STEPS = [
  { num: '01', label: 'Enquiry' },
  { num: '02', label: 'Technical Clarification' },
  { num: '03', label: 'Quotation' },
  { num: '04', label: 'Order' },
  { num: '05', label: 'Manufacturing' },
  { num: '06', label: 'FAT / TPI' },
  { num: '07', label: 'Documentation' },
  { num: '08', label: 'Customs Clearance' },
  { num: '09', label: 'Dispatch' },
  { num: '10', label: 'Delivery and After Sales' },
];

const EXPORT_CAPABILITY_TABS = [
  {
    id: 'quality',
    label: 'Quality and Manufacturing',
    items: [
      { title: 'In-house Engineering',    body: 'Full design, winding and assembly capability in-house. Core manufacturing is not outsourced.' },
      { title: 'DFMEA',                   body: 'Design Failure Mode and Effects Analysis conducted for new and modified designs.' },
      { title: 'First-Time-Right',        body: 'Engineering and quality protocols oriented towards first-time-right production, reducing rework and inspection hold time.' },
      { title: 'FAT',                     body: 'Factory Acceptance Testing coordinated with the buyer or buyer-nominated inspection agency, where applicable.' },
      { title: 'TPI',                     body: 'Third-party inspection readiness at defined hold and witness points across manufacturing and testing stages.' },
      { title: 'Traceability',            body: 'Serial and batch traceability maintained from raw material intake to dispatch. Available in documentation pack.' },
    ],
  },
  {
    id: 'trade',
    label: 'Trade Compliance and Screening',
    items: [
      { title: 'Restricted Party Screening', body: 'End-buyer and end-use screening against applicable export control and sanctions lists, based on destination market.' },
      { title: 'End User Screening',          body: 'End-user declaration process for controlled or dual-use product categories, subject to regulatory requirement.' },
      { title: 'SCOMET Compliance',           body: 'Special Chemicals, Organisms, Materials, Equipment and Technologies compliance for applicable items under Indian export control.' },
      { title: 'NDA Process',                 body: 'Non-disclosure agreement available on request for proprietary specifications and engineering designs.' },
      { title: 'IP Protection',               body: 'Customer-supplied designs, drawings and specifications treated as confidential and not shared with third parties without written consent.' },
    ],
  },
  {
    id: 'esg',
    label: 'ESG and Carbon Readiness',
    items: [
      { title: 'RoHS',                   body: 'Restriction of Hazardous Substances compliance inputs available per product category, based on destination market.' },
      { title: 'REACH',                  body: 'REACH substance of very high concern (SVHC) declarations available on request for applicable product families.' },
      { title: 'Conflict Minerals',      body: 'Conflict minerals policy and supplier declaration available on request.' },
      { title: 'ISO 14001',              body: 'Environmental management system implementation currently in progress.' },
      { title: 'ISO 45001',              body: 'Occupational health and safety management system implementation currently in progress.' },
      { title: 'Carbon Footprint Data',  body: 'Scope 1 and Scope 2 carbon data available on request for major product categories, subject to engineering review.' },
    ],
  },
];

const EXPORT_RESOURCE_TABS = [
  {
    id: 'docs',
    label: 'Documentation',
    items: [
      'Commercial Invoice',
      'Packing List',
      'Shipping Bill',
      'Bill of Lading',
      'Airway Bill',
      'Certificate of Origin',
      'Test Reports',
      'Warranty Certificate',
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics and Incoterms',
    items: [
      'Lead times confirmed at order stage based on product category and quantity',
      'Seaworthy and fumigated export packing prepared per destination market requirements',
      'Container loading plans and stuffing supervision, where applicable',
      'Port connectivity via major Indian ports: JNPT, Chennai, Mundra',
      'Coordination with buyer-nominated or in-house freight forwarders',
    ],
  },
  {
    id: 'aftersales',
    label: 'After-Sales and Warranty',
    items: [
      'Warranty terms per product category available on request',
      'Remote technical support via video or written communication',
      'On-site support coordination, subject to geography and project scope',
      'Spares availability for major product groups for defined support periods',
      'Complaint resolution SLA: acknowledgement within 2 working days',
    ],
  },
];

const EXPORT_FAQ = [
  {
    q: 'What is the minimum order quantity for export orders?',
    a: 'MOQ varies by product group and is confirmed at the quotation stage. Engineered-to-order products such as transformers and chargers typically have an MOQ of 1 unit. Panel assemblies are project-based with no fixed MOQ. Contact our export team with your requirement for a specific MOQ confirmation.',
  },
  {
    q: 'What are the typical lead times for export orders?',
    a: 'Lead times depend on product group, rating and current order load. Indicative lead times: Magnetics 8 to 16 weeks, Control Panels 10 to 20 weeks, Power Electronics 6 to 14 weeks. Final lead time is confirmed at order stage after engineering review.',
  },
  {
    q: 'What payment terms are supported for export orders?',
    a: 'We support Letter of Credit (LC), advance payment and payment against documents for international orders. LC terms are confirmed at order stage. Bank reference and SWIFT details are available on request.',
  },
  {
    q: 'Which certifications can you provide for specific destination countries?',
    a: 'Certification availability depends on product category and destination market. ISO 9001 and IEC-based test certificates are available for all categories. CE inputs are available for European projects. SASO, G-Mark and other market-specific certifications are supported subject to product category and prior arrangement. Contact our export team with your destination country and product requirement.',
  },
  {
    q: 'Do you support customisation for export projects?',
    a: 'Yes. Customisation is supported across all product groups. We accommodate custom ratings, voltage classes, enclosure specifications, labelling requirements, communication protocols and documentation packages. Engineering review is required for non-standard specifications.',
  },
];

const EXPORT_REGIONS = [
  { name: 'North America',       code: 'NA' },
  { name: 'Europe / EEA',        code: 'EU' },
  { name: 'GCC and Middle East', code: 'GCC' },
  { name: 'Africa',              code: 'AF' },
  { name: 'South East Asia',     code: 'SEA' },
  { name: 'Australia and NZ',    code: 'ANZ' },
];

const EXPORT_INDUSTRIES_SERVED = [
  'Railways', 'Power Utilities', 'Infrastructure', 'Data Centres', 'Semiconductor',
];

// ── COMPONENT ─────────────────────────────────────────────────

function PageExport({ navigate }) {
  useReveal();

  const [capTab,    setCapTab]   = React.useState('quality');
  const [resTab,    setResTab]   = React.useState('docs');
  const [openFaq,   setOpenFaq]  = React.useState(null);
  const [rfqStep,   setRfqStep]  = React.useState(1);
  const [rfqData,   setRfqData]  = React.useState({ product: '', country: '', quantity: '', standard: '' });

  const scrollToRfq = () => {
    document.getElementById('export-rfq')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Shared tab button style factory
  const tabBtn = (isActive) => ({
    flex: 1,
    padding: '13px 18px',
    background: isActive ? 'var(--ink)' : 'var(--bg-card)',
    color: isActive ? 'var(--bg)' : 'var(--ink-muted)',
    border: 0,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    fontWeight: 600,
    transition: 'background 200ms, color 200ms',
    textAlign: 'center',
  });

  return (
    <main className="page-enter">

      {/* ── S1 HERO ─────────────────────────────────────────── */}
      <section className="page-hero export-hero">
        <div className="container">
          <div className="export-hero-grid">
            <div>
              <div className="mono">05 / Export</div>
              <h1>Engineered in India. Compliant Worldwide.</h1>
              <p className="lead">
                Magnetics, DC Power Systems, Control Panels and Industrial Assemblies for global industrial buyers.
              </p>
              <div style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={scrollToRfq}>
                  Request Export Quote <span className="arrow">→</span>
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('contact')}>
                  Download Export Catalogue
                </button>
              </div>
              {/* Trust badges */}
              <div style={{ display: 'flex', gap: 32, marginTop: 40, flexWrap: 'wrap', paddingTop: 32, borderTop: '1px solid var(--rule)' }}>
                {[
                  { code: 'ISO 9001', label: 'Quality Certified' },
                  { code: 'IEC',      label: 'Compliant Designs' },
                  { code: 'IRIS',     label: 'Railway Projects' },
                  { code: '15+',      label: 'Countries Served' },
                ].map(b => (
                  <div key={b.code} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--accent)' }}>{b.code}</span>
                    <span className="mono">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="export-hero-meta">
              {[
                ['Documentation',     'Order-specific pack'],
                ['Inspection',        'Routine, type, third-party'],
                ['Logistics',         'INCOTERMS based'],
                ['Engineering',       'Remote and on-site'],
                ['Standards',         'IEC, IS, IRS, buyer-specific'],
                ['RFQ Response',      'Within 24 working hours'],
              ].map(([k, v]) => (
                <div className="export-hero-meta-row" key={k}>
                  <span className="mono">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      {/* ── S2 GLOBAL REACH ─────────────────────────────────── */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">Global reach and industries served</span></div>
            <div>
              <h2>Supply experience across six regions and five sectors.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                Dynalektric products are in service with railway OEMs, renewable EPC contractors, utilities and industrial manufacturers across Europe, the Middle East and Asia. Export documentation, destination-specific certifications and third-party inspection support are coordinated from order stage, where applicable.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row" style={{ marginBottom: 64 }}>
            {[
              { val: '15+',  label: 'Countries Served',      sub: 'Europe, Middle East, Asia, Africa' },
              { val: '200+', label: 'Global Customers',       sub: 'OEMs, EPCs and utilities' },
              { val: '500+', label: 'Reference Projects',     sub: 'Custom and standard supply' },
              { val: '40+',  label: 'Years Manufacturing',    sub: 'Established 1980' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5vw,64px)', fontWeight: 350, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--ink)' }}>{s.val}</div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{s.label}</div>
                <div className="mono" style={{ marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Regions */}
          <div className="mono" style={{ color: 'var(--ink-muted)', marginBottom: 16, fontWeight: 600 }}>Export regions</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 1, background: 'var(--rule-soft)', border: '1px solid var(--rule-soft)', marginBottom: 48 }}>
            {EXPORT_REGIONS.map(r => (
              <div className="region-card" key={r.code} style={{ minHeight: 140 }}>
                <div className="region-code" style={{ fontSize: 28 }}>{r.code}</div>
                <h3 style={{ fontSize: 16 }}>{r.name}</h3>
              </div>
            ))}
          </div>

          {/* Industries */}
          <div className="mono" style={{ color: 'var(--ink-muted)', marginBottom: 16, fontWeight: 600 }}>Industries served</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {EXPORT_INDUSTRIES_SERVED.map(ind => (
              <div key={ind} style={{ padding: '10px 20px', border: '1px solid var(--rule)', background: 'var(--bg-card)', fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3 EXPORT PRODUCT PORTFOLIO ─────────────────────── */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">Export product portfolio</span></div>
            <div>
              <h2>Procurement-ready product summary.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                A compact overview of export-ready product groups. Datasheets and detailed specifications are available on request. HS codes are indicative and confirmed at order stage.
              </p>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-card)', border: '1px solid var(--rule)', fontSize: 13, minWidth: 780 }}>
              <thead>
                <tr>
                  {['Product Group', 'Description', 'HS Code', 'Typical Ratings', 'Customisation', 'Key Export Markets', 'Datasheet'].map(col => (
                    <th key={col} style={{ padding: '13px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', background: 'var(--bg-alt)', borderBottom: '1px solid var(--rule)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EXPORT_PORTFOLIO_TABLE.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < EXPORT_PORTFOLIO_TABLE.length - 1 ? '1px solid var(--rule-soft)' : 0 }}>
                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{row.group}</td>
                    <td style={{ padding: '16px', color: 'var(--ink-soft)', maxWidth: 200 }}>{row.desc}</td>
                    <td style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>{row.hsCode}</td>
                    <td style={{ padding: '16px', color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>{row.ratings}</td>
                    <td style={{ padding: '16px', color: 'var(--accent)', fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: 11 }}>{row.custom}</td>
                    <td style={{ padding: '16px', color: 'var(--ink-soft)' }}>{row.markets}</td>
                    <td style={{ padding: '16px' }}>
                      <button onClick={() => navigate('contact')} style={{ background: 'none', border: 0, borderBottom: '1px solid var(--ink)', padding: '4px 0', cursor: 'pointer', fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-body)', color: 'var(--ink)', transition: 'color 150ms, border-color 150ms' }}
                        onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--accent)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color='var(--ink)'; e.currentTarget.style.borderColor='var(--ink)'; }}>
                        Request →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── S4 TRUST AND VERIFICATION (PRIORITY) ────────────── */}
      <section className="section reveal" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
        <div className="container">
          <div className="section-head" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="eyebrow"><span className="dot" /><span className="mono" style={{ color: 'rgba(246,244,239,0.6)' }}>Trust and verification</span></div>
            <div>
              <h2 style={{ color: 'var(--bg)' }}>A verified, registered export supplier.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'rgba(246,244,239,0.7)' }}>
                Dynalektric is a registered Indian manufacturer with over 40 years of trading history. Legal identity, financial references and independent verification are available for buyer onboarding and supplier qualification.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {/* Legal Identity */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '32px 28px' }}>
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: 20, fontWeight: 600 }}>Legal Identity</div>
              {EXPORT_TRUST_LEGAL.map((item, i) => (
                <div key={i} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="mono" style={{ color: 'rgba(246,244,239,0.45)', marginBottom: 4 }}>{item.k}</div>
                  <div style={{ fontSize: 14, color: 'rgba(246,244,239,0.88)', lineHeight: 1.5 }}>{item.v}</div>
                </div>
              ))}
            </div>

            {/* Finance and Verification */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '32px 28px' }}>
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: 20, fontWeight: 600 }}>Finance and Independent Verification</div>
              {EXPORT_TRUST_FINANCE.map((item, i) => (
                <div key={i} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="mono" style={{ color: 'rgba(246,244,239,0.45)', marginBottom: 4 }}>{item.k}</div>
                  <div style={{ fontSize: 14, color: 'rgba(246,244,239,0.88)' }}>{item.v}</div>
                </div>
              ))}
            </div>

            {/* Reference Customers */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '32px 28px' }}>
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: 20, fontWeight: 600 }}>Reference Customers</div>
              <p style={{ fontSize: 14, color: 'rgba(246,244,239,0.7)', marginBottom: 20, lineHeight: 1.6 }}>
                Dynalektric products are in service with railway OEMs, renewable EPC contractors, utilities and industrial manufacturers across Europe, the Middle East and Asia. Reference contacts are available under NDA for qualified buyers.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
                {[0,1,2,3,4,5].map(i => (
                  <div key={i} style={{ aspectRatio: '3/2', background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="mono" style={{ fontSize: 9, color: 'rgba(246,244,239,0.25)' }}>Logo</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(246,244,239,0.85)' }} onClick={() => navigate('contact')}>
                Request Reference Contact
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── S5 CERTIFICATIONS MATRIX (PRIORITY) ─────────────── */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">Certifications matrix</span></div>
            <div>
              <h2>Certification status by standard.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                Certification scope depends on product category, application and destination market. Type test certificates and conformance reports are available on request for applicable product groups.
              </p>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--rule)', background: 'var(--bg-card)', fontSize: 13, minWidth: 700 }}>
              <thead>
                <tr>
                  {['Certification', 'Held', 'In Progress', 'Available Per Market', 'Reference / Number', 'Download'].map(col => (
                    <th key={col} style={{ padding: '13px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', background: 'var(--bg-alt)', borderBottom: '1px solid var(--rule)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EXPORT_CERTIFICATIONS.map((cert, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--rule-soft)', background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--ink)' }}>{cert.name}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      {cert.held
                        ? <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 17 }}>✓</span>
                        : <span style={{ color: 'var(--rule)', fontSize: 14 }}>—</span>}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      {cert.inProgress
                        ? <span style={{ color: 'var(--accent-2)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>In Progress</span>
                        : <span style={{ color: 'var(--rule)', fontSize: 14 }}>—</span>}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      {cert.perMarket
                        ? <span style={{ color: 'var(--accent-2)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>On Request</span>
                        : <span style={{ color: 'var(--rule)', fontSize: 14 }}>—</span>}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink-soft)', fontSize: 12 }}>{cert.certNum}</td>
                    <td style={{ padding: '14px 16px' }}>
                      {cert.download
                        ? <button onClick={() => navigate('contact')} style={{ background: 'none', border: '1px solid var(--rule)', padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', color: 'var(--ink)', transition: 'border-color 150ms, color 150ms' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--rule)'; e.currentTarget.style.color='var(--ink)'; }}>
                            Request
                          </button>
                        : <span style={{ color: 'var(--ink-muted)', fontSize: 12 }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── S6 DESTINATION MARKET CLEARANCE (PRIORITY) ──────── */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">Destination market clearance schemes</span></div>
            <div>
              <h2>Regional certification schemes supported.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                Market access requirements depend on product category, destination country and applicable standards. Conformity assessment, certification and CoC documentation are coordinated from order stage, where required.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--rule-soft)', border: '1px solid var(--rule)', marginBottom: 32 }}>
            {EXPORT_MARKET_SCHEMES.map(region => (
              <div key={region.code} style={{ background: 'var(--bg-card)', padding: '32px 32px' }}>
                <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: 110, flexShrink: 0 }}>
                    <div className="region-code" style={{ fontSize: 26 }}>{region.code}</div>
                    <h3 style={{ fontSize: 16, marginTop: 8 }}>{region.region}</h3>
                  </div>
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                    {region.schemes.map(scheme => (
                      <div key={scheme.name} style={{ padding: '16px 20px', background: 'var(--bg-alt)', border: '1px solid var(--rule-soft)' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 500, color: 'var(--accent)', marginBottom: 6 }}>{scheme.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{scheme.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reassurance panel */}
          <div style={{ background: 'var(--accent-2)', padding: '24px 32px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div className="mono" style={{ color: 'var(--accent)', fontSize: 16, fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>Note</div>
            <p style={{ color: 'rgba(246,244,239,0.88)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
              ISO/IEC 17025 laboratory reports and IECEE CB reports are accepted in many markets without local re-testing. Where accepted, this reduces certification timelines and cost. Applicability is subject to destination market, product category and the relevant authority.
            </p>
          </div>
        </div>
      </section>

      {/* ── S7 EXPORT CAPABILITY TABS ───────────────────────── */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">Export capability overview</span></div>
            <div>
              <h2>Quality, compliance and sustainability readiness.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                Dynalektric is prepared for buyer qualification across quality, trade compliance and ESG dimensions. Specific documentation available on request, based on product category and buyer requirement.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 1, background: 'var(--rule-soft)', border: '1px solid var(--rule-soft)' }}>
            {EXPORT_CAPABILITY_TABS.map(tab => (
              <button key={tab.id} onClick={() => setCapTab(tab.id)} style={tabBtn(capTab === tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>

          {EXPORT_CAPABILITY_TABS.filter(t => t.id === capTab).map(tab => (
            <div key={tab.id} className="why-grid why-grid-3" style={{ border: '1px solid var(--rule-soft)', borderTop: 0 }}>
              {tab.items.map((item, i) => (
                <div className="why-item" key={i}>
                  <div className="mono num">0{i + 1}</div>
                  <h3 style={{ fontSize: 16, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6 }}>{item.body}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── S8 EXPORT PROCESS ───────────────────────────────── */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">Export process</span></div>
            <div>
              <h2>From enquiry to in-country delivery.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                A defined process from first enquiry through to delivery and after-sales support. Key milestones, hold points and documentation handover are agreed with the buyer at order stage.
              </p>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', minWidth: 900, border: '1px solid var(--rule)', background: 'var(--rule-soft)', gap: 1 }}>
              {EXPORT_PROCESS_STEPS.map((step, i) => (
                <div key={step.num} style={{ flex: 1, background: 'var(--bg-card)', padding: '24px 14px', position: 'relative', minWidth: 88 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 350, letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1, marginBottom: 10 }}>{step.num}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.35 }}>{step.label}</div>
                  {i < EXPORT_PROCESS_STEPS.length - 1 && (
                    <div style={{ position: 'absolute', right: -9, top: '36px', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 11, zIndex: 1, background: 'var(--bg-card)', padding: '2px 0' }}>→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S9 RESOURCES TABS ───────────────────────────────── */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">Resources</span></div>
            <div>
              <h2>Documentation, logistics and after-sales.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                Standard export documentation and logistics support prepared for each order. Custom documentation requirements are accommodated based on product category and destination market.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 1, background: 'var(--rule-soft)', border: '1px solid var(--rule-soft)' }}>
            {EXPORT_RESOURCE_TABS.map(tab => (
              <button key={tab.id} onClick={() => setResTab(tab.id)} style={tabBtn(resTab === tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>

          {EXPORT_RESOURCE_TABS.filter(t => t.id === resTab).map(tab => (
            <div key={tab.id} style={{ border: '1px solid var(--rule-soft)', borderTop: 0, background: 'var(--bg-card)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 0 }}>
                {tab.items.map((item, i) => (
                  <div key={i} style={{ padding: '20px 24px', borderRight: '1px solid var(--rule-soft)', borderBottom: '1px solid var(--rule-soft)', display: 'flex', gap: 12, alignItems: 'baseline' }}>
                    <span className="mono" style={{ color: 'var(--accent)', fontWeight: 600, flexShrink: 0 }}>+</span>
                    <span style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── S10 FAQ ─────────────────────────────────────────── */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="dot" /><span className="mono">Frequently asked questions</span></div>
            <div>
              <h2>Common export enquiry questions.</h2>
            </div>
          </div>

          <div style={{ border: '1px solid var(--rule)', background: 'var(--bg-card)' }}>
            {EXPORT_FAQ.map((item, i) => (
              <div key={i} style={{ borderBottom: i < EXPORT_FAQ.length - 1 ? '1px solid var(--rule-soft)' : 0 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', background: 'none', border: 0, padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: 24 }}
                >
                  <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4 }}>{item.q}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: 'var(--accent)', fontWeight: 300, flexShrink: 0, transition: 'transform 250ms', transform: openFaq === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 28px 24px', borderTop: '1px solid var(--rule-soft)' }}>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)', paddingTop: 16 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S11 REQUEST EXPORT QUOTE ────────────────────────── */}
      <section id="export-rfq" className="section reveal" style={{ paddingTop: 'calc(var(--section-y) * 1.2)', paddingBottom: 'calc(var(--section-y) * 1.2)' }}>
        <div className="container">
          <div className="export-final">

            {/* Left: multi-step form */}
            <div className="export-final-copy">
              <div className="mono" style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: 16 }}>Request export quote</div>
              <h2>Start your export enquiry.</h2>
              <p className="lead" style={{ marginTop: 20, fontSize: 17 }}>
                Share your product category, destination country, quantity and required standard. Our export team will acknowledge within 24 working hours.
              </p>

              {/* Step indicators */}
              <div style={{ display: 'flex', gap: 6, marginTop: 36, marginBottom: 28, flexWrap: 'wrap' }}>
                {['Product', 'Destination', 'Quantity', 'Standard'].map((label, i) => (
                  <button key={i} onClick={() => setRfqStep(i + 1)} style={{ padding: '8px 14px', background: rfqStep === i + 1 ? 'var(--ink)' : rfqStep > i + 1 ? 'var(--accent)' : 'var(--bg-alt)', color: rfqStep >= i + 1 ? 'var(--bg)' : 'var(--ink-muted)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, border: '1px solid var(--rule)', cursor: 'pointer', transition: 'all 200ms' }}>
                    {String(i + 1).padStart(2, '0')} {label}
                  </button>
                ))}
              </div>

              {rfqStep === 1 && (
                <div className="form-row">
                  <label>Product Group</label>
                  <select value={rfqData.product} onChange={e => setRfqData({ ...rfqData, product: e.target.value })}>
                    <option value="">Select product group</option>
                    <option value="magnetics">Magnetics</option>
                    <option value="dc">DC Systems and Chargers</option>
                    <option value="panels">Panels and Assemblies</option>
                    <option value="other">Other or Multiple</option>
                  </select>
                  <div style={{ marginTop: 20 }}>
                    <button className="btn btn-primary" onClick={() => setRfqStep(2)}>Next: Destination <span className="arrow">→</span></button>
                  </div>
                </div>
              )}

              {rfqStep === 2 && (
                <div className="form-row">
                  <label>Destination Country</label>
                  <input value={rfqData.country} onChange={e => setRfqData({ ...rfqData, country: e.target.value })} placeholder="e.g. Germany, Saudi Arabia, Nigeria" />
                  <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                    <button className="btn btn-secondary" onClick={() => setRfqStep(1)}>Back</button>
                    <button className="btn btn-primary" onClick={() => setRfqStep(3)}>Next: Quantity <span className="arrow">→</span></button>
                  </div>
                </div>
              )}

              {rfqStep === 3 && (
                <div className="form-row">
                  <label>Quantity</label>
                  <input value={rfqData.quantity} onChange={e => setRfqData({ ...rfqData, quantity: e.target.value })} placeholder="e.g. 10 units, 1 lot" />
                  <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                    <button className="btn btn-secondary" onClick={() => setRfqStep(2)}>Back</button>
                    <button className="btn btn-primary" onClick={() => setRfqStep(4)}>Next: Standard <span className="arrow">→</span></button>
                  </div>
                </div>
              )}

              {rfqStep === 4 && (
                <div className="form-row">
                  <label>Required Standard or Certification</label>
                  <input value={rfqData.standard} onChange={e => setRfqData({ ...rfqData, standard: e.target.value })} placeholder="e.g. IEC 60076, CE, SASO" />
                  <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                    <button className="btn btn-secondary" onClick={() => setRfqStep(3)}>Back</button>
                    <button className="btn btn-primary" onClick={() => navigate('contact')}>Submit RFQ <span className="arrow">→</span></button>
                  </div>
                </div>
              )}

              {/* SLA notice */}
              <div style={{ marginTop: 28, padding: '13px 20px', background: 'var(--accent-soft)', border: '1px solid rgba(184,96,44,0.35)', display: 'flex', gap: 12, alignItems: 'center' }}>
                <span className="mono" style={{ color: 'var(--accent)', fontWeight: 600, flexShrink: 0 }}>SLA</span>
                <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>RFQ acknowledged within 24 working hours.</span>
              </div>
            </div>

            {/* Right: contact options and checklist */}
            <div>
              <div className="mono" style={{ color: 'var(--ink-muted)', marginBottom: 16 }}>Additional contact options</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
                {[
                  { label: 'Email Export Team',           sub: 'export@dynalektric.com (placeholder)' },
                  { label: 'Live Chat',                   sub: 'Available during business hours' },
                  { label: 'Schedule a Callback',         sub: 'Book a 30-minute technical call' },
                  { label: 'Download Export Catalogue',   sub: 'PDF available on request' },
                ].map((opt, i) => (
                  <button key={i} onClick={() => navigate('contact')}
                    style={{ background: 'var(--bg-alt)', border: '1px solid var(--rule)', padding: '16px 20px', textAlign: 'left', cursor: 'pointer', transition: 'border-color 200ms', display: 'flex', flexDirection: 'column', gap: 4 }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--rule)'}
                  >
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{opt.label}</span>
                    <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{opt.sub}</span>
                  </button>
                ))}
              </div>

              <div className="mono" style={{ color: 'var(--ink-muted)', marginBottom: 16 }}>Useful to include in your enquiry</div>
              <div className="export-final-checklist">
                <ul>
                  <li><span className="mono">01</span><span>Product category and sub-category</span></li>
                  <li><span className="mono">02</span><span>Application and load profile</span></li>
                  <li><span className="mono">03</span><span>Destination country and applicable standards</span></li>
                  <li><span className="mono">04</span><span>Quantity and indicative delivery timeline</span></li>
                  <li><span className="mono">05</span><span>Inspection and documentation scope</span></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </main>
  );
}

window.PageExport = PageExport;
