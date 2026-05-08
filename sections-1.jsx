// Sections part 1: Header, AtAGlance, DailyPerformance, HeroProduct

const NAV_ITEMS = [
  ["overview", "Overview"],
  ["daily", "Daily"],
  ["hero", "Hero"],
  ["wins", "Wins"],
  ["lessons", "Lessons"],
  ["story", "Story"],
  ["geography", "Geography"],
  ["skus", "SKUs"],
  ["email", "Email"],
];

function Header() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const ids = NAV_ITEMS.map(([id]) => id);
    const obs = new IntersectionObserver((entries) => {
      // Find the entry closest to top while still in view
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-30% 0px -55% 0px", threshold: 0 });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header style={{
      borderBottom: "1px solid rgba(201,169,110,0.10)",
      padding: "16px 56px",
      display: "flex", alignItems: "center", gap: 32,
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(10,14,26,0.82)", backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
    }}>
      <div style={{
        fontSize: 13, fontWeight: 700, color: "#C9A96E",
        letterSpacing: "0.28em", whiteSpace: "nowrap",
      }}>BRAWN &nbsp;&amp;&nbsp; FOX</div>

      <nav className="header-nav" style={{
        display: "flex", gap: 22, alignItems: "center",
        flex: 1, justifyContent: "center",
      }}>
        {NAV_ITEMS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={`navlink ${active === id ? "active" : ""}`}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-meta" style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#8B8B95",
            boxShadow: "0 0 8px rgba(139,139,149,0.6)",
          }}/>
          <span style={{ fontSize: 11, color: "#9CA3AF", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
            Ended
          </span>
        </span>
        <span style={{ fontSize: 12, color: "#6B7280" }}>Apr 24 – May 5</span>
      </div>
    </header>
  );
}

function HeroBand() {
  return (
    <section style={{ padding: "96px 56px 40px", position: "relative" }}>
      {/* decorative oversized monogram */}
      <div aria-hidden="true" style={{
        position: "absolute", right: 56, top: 60,
        fontSize: 360, fontWeight: 800, lineHeight: 1,
        color: "rgba(201,169,110,0.04)",
        letterSpacing: "-0.06em",
        pointerEvents: "none", userSelect: "none",
        background: "linear-gradient(180deg, rgba(201,169,110,0.06) 0%, rgba(201,169,110,0) 70%)",
        WebkitBackgroundClip: "text", backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }} className="hero-monogram">TN</div>

      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <span style={{ width: 32, height: 1, background: "linear-gradient(90deg, transparent, #C9A96E)" }}/>
          <span className="eyebrow" style={{ color: "#C9A96E" }}>Campaign Report</span>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h1 style={{
          fontSize: "clamp(56px, 7vw, 96px)",
          fontWeight: 700, letterSpacing: "-0.035em",
          color: "#E8E9EE", margin: 0, lineHeight: 0.96,
          position: "relative",
        }}>
          Tennessee <span className="shimmer-text">Campaign</span>
        </h1>
      </Reveal>
      <Reveal delay={260}>
        <p style={{
          marginTop: 22, fontSize: 19, color: "#9CA3AF",
          maxWidth: 640, lineHeight: 1.55,
        }}>
          How the Tennessee Collection performed across paid ads and email.
        </p>
      </Reveal>
      <Reveal delay={380}>
        <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Pill tone="gold">11 active days</Pill>
          <Pill tone="neutral">$75 / day budget</Pill>
          <Pill tone="neutral">12 hat SKUs</Pill>
          <Pill tone="neutral">2 email blasts</Pill>
        </div>
      </Reveal>
    </section>
  );
}

function MetricCard({ value, prefix, suffix, label, sub, indicator, glow, icon }) {
  return (
    <Card style={{ position: "relative", minHeight: 200 }}>
      <div style={{
        position: "absolute", top: 22, right: 22,
        width: 36, height: 36, borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(201,169,110,0.08)",
        border: "1px solid rgba(201,169,110,0.15)",
        color: "#C9A96E",
      }}>{icon}</div>
      <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 22 }}>{label}</div>
      <NumberDisplay value={value} prefix={prefix || ""} suffix={suffix || ""} glow="none" size={56} />
      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        {indicator}
        <span style={{ fontSize: 13, color: "#9CA3AF" }}>{sub}</span>
      </div>
    </Card>
  );
}

function AtAGlance() {
  const dollarIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
  const bagIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
  const trendIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
  const targetIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;

  return (
    <section style={{ padding: "32px 56px 88px" }}>
      <SectionHeader
        eyebrow="At a glance"
        title="Headline numbers"
        subtitle="The campaign at four metrics. Eleven days, twenty direct sales, breaking even on attributed revenue."
      />
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
      }} className="metrics-grid">
        <Reveal delay={0}>
          <MetricCard
            value={799} prefix="$" label="Total Ad Spend"
            sub="Over 11 days at $75 / day"
            indicator={<Pill tone="neutral">Meta paid</Pill>}
            glow="gold" icon={dollarIcon}
          />
        </Reveal>
        <Reveal delay={100}>
          <MetricCard
            value={20} label="Direct Sales from Ads"
            sub="Tracked through Meta pixel"
            indicator={<Pill tone="green">+20 vs baseline</Pill>}
            glow="indigo" icon={bagIcon}
          />
        </Reveal>
        <Reveal delay={200}>
          <MetricCard
            value={1897} prefix="$" label="Total Store Revenue"
            sub="During campaign window"
            indicator={<Pill tone="green">+80% vs baseline</Pill>}
            glow="gold" icon={trendIcon}
          />
        </Reveal>
        <Reveal delay={300}>
          <MetricCard
            value={1.008} suffix="×" decimals={3} label="Return on Ad Spend"
            sub="Breaking even on attributed sales"
            indicator={<Pill tone="silver">Break-even</Pill>}
            glow="gold" icon={targetIcon}
          />
        </Reveal>
      </div>
    </section>
  );
}

// ---- Daily Performance chart ----
function DailyPerformance() {
  const data = window.campaign.daily;
  const [ref, inView] = useInView();
  const [hover, setHover] = useState(null);
  const maxSpend = 100;
  const maxOrders = 5;

  const chartW = 820, chartH = 320, padL = 56, padR = 56, padT = 36, padB = 44;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;
  const colW = innerW / data.length;
  const barW = colW * 0.42;

  // smooth catmull-rom spline for orders
  const linePts = data.map((d, i) => ({
    x: padL + colW * i + colW / 2,
    y: padT + innerH - (d.orders / maxOrders) * innerH,
    orders: d.orders,
  }));
  function spline(pts) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }
  const linePath = spline(linePts);
  // total path length approximation for stroke draw
  const lineLen = 1400;
  // area path under line
  const areaPath = linePath
    + ` L ${linePts[linePts.length-1].x} ${padT + innerH}`
    + ` L ${linePts[0].x} ${padT + innerH} Z`;

  return (
    <section style={{ padding: "24px 56px 96px" }}>
      <SectionHeader eyebrow="Daily performance" title="Spend and sales day by day"
        subtitle="Bars: daily ad spend in dollars. Gold curve: orders attributed to Meta that day." />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }} className="daily-grid">
        <Card hover={false}>
          <div ref={ref} style={{ width: "100%", overflow: "visible", position: "relative" }}>
            <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
              <defs>
                <linearGradient id="bargrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8689F9" stopOpacity="0.95"/>
                  <stop offset="55%" stopColor="#5B5EE8" stopOpacity="0.90"/>
                  <stop offset="100%" stopColor="#3A3D9C" stopOpacity="0.65"/>
                </linearGradient>
                <linearGradient id="bargradHover" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#A5A8FF"/>
                  <stop offset="100%" stopColor="#5054D5"/>
                </linearGradient>
                <linearGradient id="areagrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#E8C77E" stopOpacity="0.32"/>
                  <stop offset="100%" stopColor="#C9A96E" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="linegrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#A6864F"/>
                  <stop offset="50%" stopColor="#F2D89A"/>
                  <stop offset="100%" stopColor="#A6864F"/>
                </linearGradient>
                <filter id="barglow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="lineglow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* y gridlines */}
              {[0, 25, 50, 75, 100].map(v => {
                const y = padT + innerH - (v / maxSpend) * innerH;
                return (
                  <g key={v}>
                    <line x1={padL} x2={chartW - padR} y1={y} y2={y}
                      stroke="rgba(232,233,238,0.045)" strokeWidth="1" strokeDasharray={v === 0 ? "0" : "2 4"}/>
                    <text x={padL - 12} y={y + 4} fill="#6B7280" fontSize="10" textAnchor="end" fontFamily="Inter" letterSpacing="0.04em">${v}</text>
                  </g>
                );
              })}
              {/* right (orders) axis labels */}
              {[0, 1, 2, 3, 4, 5].map(v => {
                const y = padT + innerH - (v / maxOrders) * innerH;
                return (
                  <text key={v} x={chartW - padR + 12} y={y + 4} fill="rgba(201,169,110,0.55)" fontSize="10" textAnchor="start" fontFamily="Inter" letterSpacing="0.04em">{v}</text>
                );
              })}

              {/* hover lane */}
              {hover !== null && (() => {
                const x = padL + colW * hover + colW / 2;
                return (
                  <line x1={x} x2={x} y1={padT} y2={padT + innerH}
                    stroke="rgba(201,169,110,0.25)" strokeWidth="1" strokeDasharray="3 3"/>
                );
              })()}

              {/* bars */}
              {data.map((d, i) => {
                const fullH = (d.spend / maxSpend) * innerH;
                const h = inView ? fullH : 0;
                const x = padL + colW * i + (colW - barW) / 2;
                const y = padT + innerH - h;
                const isHover = hover === i;
                return (
                  <g key={i}>
                    {/* shadow */}
                    <rect x={x} y={y + 2} width={barW} height={h}
                      rx="6" fill="#000" opacity={inView ? 0.35 : 0}
                      style={{ filter: "blur(6px)", transition: `opacity 700ms ${i * 70 + 200}ms` }}
                    />
                    {/* main bar */}
                    <rect x={x} y={y} width={barW} height={h}
                      rx="6" fill={isHover ? "url(#bargradHover)" : "url(#bargrad)"}
                      style={{
                        transition: `height 800ms cubic-bezier(0.2,0.9,0.2,1) ${i * 70}ms, y 800ms cubic-bezier(0.2,0.9,0.2,1) ${i * 70}ms, fill 200ms`,
                        filter: isHover ? "drop-shadow(0 0 14px rgba(124,127,247,0.55))" : "drop-shadow(0 4px 10px rgba(99,102,241,0.18))",
                        cursor: "pointer",
                      }}
                    />
                    {/* glossy top highlight */}
                    <rect x={x + 1} y={y + 1} width={barW - 2} height={Math.min(h * 0.35, 40)}
                      rx="5" fill="rgba(255,255,255,0.10)"
                      style={{ transition: `height 800ms cubic-bezier(0.2,0.9,0.2,1) ${i * 70}ms, y 800ms cubic-bezier(0.2,0.9,0.2,1) ${i * 70}ms`, pointerEvents: "none" }}
                    />
                    {/* hover hit area */}
                    <rect x={padL + colW * i} y={padT} width={colW} height={innerH}
                      fill="transparent" style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                    />
                    <text x={padL + colW * i + colW / 2} y={chartH - 16}
                      fill={isHover ? "#E8E9EE" : "#9CA3AF"} fontSize="10.5" textAnchor="middle" fontFamily="Inter"
                      style={{ transition: "fill 200ms", fontWeight: isHover ? 600 : 400 }}>
                      {d.date}
                    </text>
                  </g>
                );
              })}

              {/* area under orders line */}
              <path d={areaPath} fill="url(#areagrad)" opacity={inView ? 1 : 0}
                style={{ transition: "opacity 800ms ease-out 1100ms" }}/>

              {/* orders line */}
              <path d={linePath} fill="none" stroke="url(#linegrad)" strokeWidth="2.5" strokeLinecap="round"
                strokeDasharray={lineLen} strokeDashoffset={inView ? 0 : lineLen}
                style={{ transition: "stroke-dashoffset 1400ms cubic-bezier(0.4,0.0,0.2,1) 700ms" }}
                filter="url(#lineglow)"
              />

              {/* dots */}
              {linePts.map((p, i) => {
                const isHover = hover === i;
                const r = p.orders > 0 ? (isHover ? 6 : 4.5) : (isHover ? 3.5 : 2.5);
                return (
                  <g key={i} style={{ opacity: inView ? 1 : 0, transition: `opacity 300ms ease-out ${1500 + i * 50}ms` }}>
                    {p.orders > 0 && (
                      <circle cx={p.x} cy={p.y} r={r + 4}
                        fill="#C9A96E" opacity={isHover ? 0.30 : 0.18}
                        style={{ transition: "all 200ms" }}
                      />
                    )}
                    <circle cx={p.x} cy={p.y} r={r}
                      fill={p.orders > 0 ? "#F2D89A" : "#4B5563"}
                      stroke="#0A0E1A" strokeWidth="2"
                      style={{ transition: "all 200ms", cursor: "pointer" }}
                    />
                  </g>
                );
              })}

              {/* axis labels */}
              <text x={padL - 12} y={padT - 14} fill="#6366F1" fontSize="10" textAnchor="end" fontFamily="Inter" letterSpacing="0.10em" fontWeight="600">SPEND</text>
              <text x={chartW - padR + 12} y={padT - 14} fill="#C9A96E" fontSize="10" textAnchor="start" fontFamily="Inter" letterSpacing="0.10em" fontWeight="600">ORDERS</text>

              {/* tooltip */}
              {hover !== null && (() => {
                const d = data[hover];
                const x = padL + colW * hover + colW / 2;
                const tipW = 140, tipH = 64;
                let tx = x - tipW / 2;
                tx = Math.max(padL, Math.min(tx, chartW - padR - tipW));
                const ty = padT - 4;
                return (
                  <g style={{ pointerEvents: "none" }}>
                    <rect x={tx} y={ty} width={tipW} height={tipH} rx="8"
                      fill="rgba(10,14,26,0.96)" stroke="rgba(201,169,110,0.30)" strokeWidth="1"
                      style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.6))" }}/>
                    <text x={tx + 12} y={ty + 18} fill="#9CA3AF" fontSize="10" fontFamily="Inter" letterSpacing="0.06em">{d.date.toUpperCase()}</text>
                    <text x={tx + 12} y={ty + 36} fill="#8689F9" fontSize="11" fontFamily="Inter">Spend</text>
                    <text x={tx + tipW - 12} y={ty + 36} fill="#E8E9EE" fontSize="11.5" fontFamily="Inter" textAnchor="end" fontWeight="600">${d.spend.toFixed(2)}</text>
                    <text x={tx + 12} y={ty + 54} fill="#C9A96E" fontSize="11" fontFamily="Inter">Orders</text>
                    <text x={tx + tipW - 12} y={ty + 54} fill="#E8E9EE" fontSize="11.5" fontFamily="Inter" textAnchor="end" fontWeight="600">{d.orders}{d.roas ? ` · ${d.roas.toFixed(2)}×` : ""}</text>
                  </g>
                );
              })()}
            </svg>
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 18, fontSize: 12, color: "#9CA3AF", paddingLeft: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 12, height: 12, background: "linear-gradient(180deg, #8689F9, #4548B5)", borderRadius: 3, display: "inline-block", boxShadow: "0 0 8px rgba(99,102,241,0.40)" }}/> Daily spend
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 18, height: 2.5, background: "linear-gradient(90deg, #A6864F, #F2D89A, #A6864F)", display: "inline-block", borderRadius: 2, boxShadow: "0 0 6px rgba(201,169,110,0.50)" }}/> Orders
            </span>
            <span style={{ marginLeft: "auto", color: "#6B7280", fontSize: 11, letterSpacing: "0.04em" }}>Hover any day for detail</span>
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card accent="gold" hover={false}>
            <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 8 }}>Best day</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: "#E8E9EE" }}>May 1</div>
            <div style={{ marginTop: 6, fontSize: 14, color: "#9CA3AF" }}>4 orders · ROAS 2.32×</div>
          </Card>
          <Card hover={false}>
            <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 8 }}>Highest spend</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: "#E8E9EE" }}>May 3</div>
            <div style={{ marginTop: 6, fontSize: 14, color: "#9CA3AF" }}>$86.36 · 3 orders</div>
          </Card>
          <Card hover={false}>
            <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 8 }}>Pattern</div>
            <div style={{ fontSize: 14, color: "#E8E9EE", lineHeight: 1.5 }}>
              Strong middle, soft tail — paused May 5 when economics turned.
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ---- Hero Product ----
function HeroProduct() {
  const [ref, inView] = useInView();
  const r = 90, c = 2 * Math.PI * r;
  const pct = 38;
  const offset = inView ? c * (1 - pct / 100) : c;

  return (
    <section style={{ padding: "24px 56px 96px" }}>
      <SectionHeader eyebrow="The hero" title="One hat carried the campaign"
        subtitle="Out of 12 Tennessee SKUs, a single hat produced 38% of the line's revenue." />
      <Card hover={false}>
        <div ref={ref} style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1.4fr",
          gap: 32, alignItems: "center", padding: "24px 8px",
        }} className="hero-grid">
          <div>
            <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 14 }}>Top-selling SKU</div>
            <h3 style={{
              fontSize: 38, fontWeight: 600, lineHeight: 1.05, margin: 0,
              color: "#C9A96E", letterSpacing: "-0.02em",
              textShadow: "0 0 28px rgba(201,169,110,0.30)",
            }}>Tennessee<br/>Camo Homage</h3>
            <p style={{ marginTop: 16, fontSize: 14, color: "#9CA3AF", lineHeight: 1.55, maxWidth: 320 }}>
              Same hero pattern as Georgia — Azalea White carried 47% of that collection. Every state line produces one breakout SKU.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="ringg" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#E8C77E"/>
                  <stop offset="100%" stopColor="#A6864F"/>
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(201,169,110,0.12)" strokeWidth="10"/>
              <g className="ring-orbit" style={{ transformOrigin: "100px 100px" }}>
                <circle cx="100" cy="100" r={r} fill="none" stroke="url(#ringg)" strokeWidth="10"
                  strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
                  transform="rotate(-90 100 100)"
                  style={{ transition: "stroke-dashoffset 2000ms cubic-bezier(0.2,0.8,0.2,1) 200ms",
                    filter: "drop-shadow(0 0 10px rgba(201,169,110,0.55))" }}
                />
              </g>
              <text x="100" y="95" textAnchor="middle" fill="#E8E9EE" fontSize="42" fontWeight="700" fontFamily="Inter" letterSpacing="-1">38%</text>
              <text x="100" y="118" textAnchor="middle" fill="#9CA3AF" fontSize="11" fontFamily="Inter" letterSpacing="2">OF TN HAT REVENUE</text>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div>
              <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 6 }}>Units sold</div>
              <NumberDisplay value={11} glow="gold" size={48} />
            </div>
            <div>
              <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 6 }}>Revenue</div>
              <NumberDisplay value={330} prefix="$" glow="gold" size={48} />
            </div>
            <div>
              <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 6 }}>Share of TN line</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: "#E8E9EE" }}>38%</div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

Object.assign(window, { Header, HeroBand, AtAGlance, DailyPerformance, HeroProduct });
