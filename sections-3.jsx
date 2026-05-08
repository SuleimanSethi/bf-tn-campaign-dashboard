// Sections part 3: Geography, PerSKU, EmailPerformance, Footer, Glossary

// Simple SVG US map: rectangular grid layout (not geographically accurate but legible).
// We'll lay out states as a stylized cartogram — common in editorial dashboards.
const STATE_GRID = {
  // [col, row]
  AK:[0,7], ME:[10,0], VT:[9,1], NH:[10,1], MA:[10,2], RI:[10,3], CT:[9,3], NY:[8,2], NJ:[9,4],
  PA:[8,3], DE:[9,5], MD:[8,5], WV:[7,4], VA:[8,4], NC:[7,5], SC:[7,6], GA:[6,6], FL:[7,7],
  OH:[6,3], MI:[6,2], IN:[5,3], KY:[6,4], TN:[5,5], AL:[5,6], MS:[4,6], LA:[4,7],
  IL:[5,2], WI:[5,1], MN:[4,1], IA:[4,2], MO:[4,3], AR:[4,5], TX:[3,7],
  KS:[3,4], OK:[3,5], NE:[3,3], SD:[3,2], ND:[3,1],
  MT:[2,1], WY:[2,2], CO:[2,4], NM:[2,5],
  ID:[1,1], UT:[1,3], AZ:[1,5],
  WA:[0,1], OR:[0,2], NV:[0,3], CA:[0,4],
  HI:[0,8],
};

function USMap() {
  const geo = window.campaign.geography;
  const byCode = Object.fromEntries(geo.map(g => [g.code, g]));
  const [hovered, setHovered] = useState(null);
  const [ref, inView] = useInView();

  const cell = 56, gap = 5, pad = 24;
  const cols = 11, rows = 9;
  const w = cols * (cell + gap) + pad * 2;
  const h = rows * (cell + gap) + pad * 2;

  // Order-volume → glow intensity scale
  function styleFor(orders, isTN) {
    if (isTN) {
      // Hero state — strongest indigo glow
      return {
        fill: "rgba(99,102,241,0.55)",
        stroke: "#8689F9",
        strokeWidth: 1.4,
        textColor: "#FFFFFF",
        glow: "0 0 24px rgba(99,102,241,0.85), 0 0 8px rgba(99,102,241,0.95)",
        innerGlow: "rgba(124,127,247,0.70)",
      };
    }
    if (orders >= 3) {
      return {
        fill: "rgba(63,191,176,0.40)",
        stroke: "rgba(63,191,176,0.85)",
        strokeWidth: 1.3,
        textColor: "#C8F4ED",
        glow: "0 0 22px rgba(63,191,176,0.65), 0 0 6px rgba(63,191,176,0.55)",
        innerGlow: "rgba(63,191,176,0.55)",
      };
    }
    if (orders === 2) {
      return {
        fill: "rgba(63,191,176,0.25)",
        stroke: "rgba(63,191,176,0.55)",
        strokeWidth: 1.1,
        textColor: "#9DE6DC",
        glow: "0 0 14px rgba(63,191,176,0.40)",
        innerGlow: "rgba(63,191,176,0.30)",
      };
    }
    if (orders === 1) {
      return {
        fill: "rgba(63,191,176,0.10)",
        stroke: "rgba(63,191,176,0.30)",
        strokeWidth: 1,
        textColor: "#7FB8AE",
        glow: "0 0 6px rgba(63,191,176,0.18)",
        innerGlow: "transparent",
      };
    }
    return {
      fill: "rgba(232,233,238,0.025)",
      stroke: "rgba(232,233,238,0.06)",
      strokeWidth: 1,
      textColor: "#4B5563",
      glow: "none",
      innerGlow: "transparent",
    };
  }

  return (
    <Card hover={false} style={{ position: "relative", overflow: "hidden" }}>
      <div ref={ref} style={{ position: "relative" }}>
        <div style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${w} / ${h}`,
        }}>
        {Object.entries(STATE_GRID).map(([code, [c, r]]) => {
          const xPct = ((pad + c * (cell + gap)) / w) * 100;
          const yPct = ((pad + r * (cell + gap)) / h) * 100;
          const wPct = (cell / w) * 100;
          const hPct = (cell / h) * 100;
          const data = byCode[code];
          const orders = data?.orders || 0;
          const isTN = code === "TN";
          const s = styleFor(orders, isTN);
          const isHover = hovered === code;
          // staggered entrance
          const delay = (c + r) * 40;
          const glowClass = isTN ? "glow-tn" : orders >= 3 ? "glow-3" : orders === 2 ? "glow-2" : orders === 1 ? "glow-1" : "";
          return (
            <div key={code}
              className={inView ? glowClass : ""}
              onMouseEnter={() => setHovered(code)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                left: `${xPct}%`, top: `${yPct}%`,
                width: `${wPct}%`, height: `${hPct}%`,
                borderRadius: 8,
                background: `radial-gradient(circle at 50% 60%, ${s.innerGlow} 0%, transparent 70%), ${s.fill}`,
                border: `${s.strokeWidth}px solid ${s.stroke}`,
                outline: isHover && orders > 0 ? "2px solid rgba(255,255,255,0.18)" : "none",
                outlineOffset: 2,
                cursor: orders > 0 ? "pointer" : "default",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                opacity: inView ? 1 : 0,
                transform: inView
                  ? (isHover ? "scale(1.12) translateY(-2px)" : "scale(1)")
                  : "scale(0.85)",
                animationDelay: `${delay + 400}ms`,
                animationPlayState: isHover ? "paused" : "running",
                zIndex: isHover ? 10 : 1,
              }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: s.textColor,
                letterSpacing: "0.02em",
                textShadow: orders > 0 ? "0 0 6px rgba(0,0,0,0.5)" : "none",
              }}>{code}</div>
              {orders > 0 && (
                <div style={{
                  fontSize: 10, color: s.textColor, opacity: 0.85,
                  marginTop: 1, fontVariantNumeric: "tabular-nums",
                }}>{orders}</div>
              )}
            </div>
          );
        })}
        </div>
        {hovered && byCode[hovered] && (
          <div style={{
            position: "absolute", top: 12, left: 12,
            padding: "12px 16px", borderRadius: 10,
            background: "rgba(10,14,26,0.92)",
            border: "1px solid rgba(201,169,110,0.20)",
            backdropFilter: "blur(8px)", pointerEvents: "none",
          }}>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>{byCode[hovered].state}</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#E8E9EE" }}>
              {byCode[hovered].orders} order{byCode[hovered].orders !== 1 ? 's' : ''} · ${byCode[hovered].revenue}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: 22, fontSize: 11, color: "#9CA3AF", letterSpacing: "0.06em", textTransform: "uppercase", flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(99,102,241,0.55)", border: "1px solid #8689F9", boxShadow: "0 0 10px rgba(99,102,241,0.70)" }}/> Tennessee
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(63,191,176,0.40)", boxShadow: "0 0 10px rgba(63,191,176,0.55)" }}/> 3+ orders
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(63,191,176,0.25)", boxShadow: "0 0 6px rgba(63,191,176,0.30)" }}/> 2 orders
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(63,191,176,0.10)" }}/> 1 order
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(232,233,238,0.04)" }}/> No orders
        </span>
      </div>
    </Card>
  );
}

function Geography() {
  const geo = window.campaign.geography;
  const sorted = [...geo].sort((a,b) => b.orders - a.orders || b.revenue - a.revenue);
  return (
    <section id="geography" style={{ padding: "96px 56px" }}>
      <SectionHeader eyebrow="Where buyers came from" title="Geographic distribution"
        subtitle="41% of orders shipped to Tennessee — almost double the baseline 26%. The state-themed creative pulled hard on in-state pride." />
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24 }} className="geo-grid">
        <Reveal><USMap/></Reveal>
        <Reveal delay={120}>
          <Card hover={false}>
            <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 16 }}>Top states by orders</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {sorted.slice(0, 8).map((s, i) => {
                const max = sorted[0].orders;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 0",
                    borderBottom: i < 7 ? "1px solid rgba(232,233,238,0.04)" : "none",
                  }}>
                    <span style={{ width: 28, fontSize: 13, color: "#6B7280", fontVariantNumeric: "tabular-nums" }}>
                      {String(i+1).padStart(2,'0')}
                    </span>
                    <span style={{ flex: 1, fontSize: 14, color: "#E8E9EE" }}>{s.state}</span>
                    <div style={{ width: 80, height: 6, background: "rgba(99,102,241,0.08)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{
                        width: `${(s.orders / max) * 100}%`, height: "100%",
                        background: i === 0 ? "linear-gradient(90deg, #4F52D6, #6366F1)" : "linear-gradient(90deg, #2A9C90, #3FBFB0)",
                      }}/>
                    </div>
                    <span style={{ width: 36, fontSize: 13, color: "#E8E9EE", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{s.orders}</span>
                    <span style={{ width: 56, fontSize: 12, color: "#9CA3AF", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${s.revenue}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(232,233,238,0.04)", fontSize: 12, color: "#6B7280" }}>
              + 10 other states with 1 order each
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function PerSKU() {
  const skus = window.campaign.skus;
  const max = skus[0].units;
  const [ref, inView] = useInView();

  return (
    <section id="skus" style={{ padding: "24px 56px 96px" }}>
      <SectionHeader eyebrow="The 12-hat lineup" title="Every Tennessee hat ranked"
        subtitle="One hat carried 38%. Two sold zero. The middle nine produced 1–4 units each — the normal shape for state collections." />
      <Card hover={false}>
        <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {skus.map((s, i) => {
            const w = max > 0 && inView ? (s.units / max) * 100 : 0;
            const isHero = s.isHero;
            const isZero = s.isZero;
            return (
              <div key={s.rank} style={{
                display: "grid", gridTemplateColumns: "32px 1fr 200px 56px 70px",
                alignItems: "center", gap: 16, padding: "13px 8px",
                borderBottom: i < skus.length - 1 ? "1px solid rgba(232,233,238,0.04)" : "none",
                opacity: isZero ? 0.55 : 1,
              }}>
                <span style={{ fontSize: 12, color: "#6B7280", fontVariantNumeric: "tabular-nums" }}>
                  {String(s.rank).padStart(2,'0')}
                </span>
                <span style={{
                  fontSize: 15, color: isHero ? "#C9A96E" : "#E8E9EE",
                  fontWeight: isHero ? 600 : 500,
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  {s.name}
                  {isHero && <Pill tone="gold">Hero</Pill>}
                </span>
                <div style={{ height: 10, background: isZero ? "rgba(139,139,149,0.06)" : "rgba(99,102,241,0.06)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    width: `${w}%`, height: "100%",
                    background: isHero
                      ? "linear-gradient(90deg, #A6864F, #E8C77E)"
                      : s.units >= 2
                        ? "linear-gradient(90deg, #4F52D6, #6366F1)"
                        : s.units === 1
                          ? "linear-gradient(90deg, #2A9C90, #3FBFB0)"
                          : "rgba(139,139,149,0.30)",
                    boxShadow: isHero ? "0 0 14px rgba(201,169,110,0.50)" : "none",
                    transition: `width 1100ms cubic-bezier(0.2,0.8,0.2,1) ${i * 80}ms`,
                  }}/>
                </div>
                <span style={{ fontSize: 15, color: "#E8E9EE", textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>
                  {s.units}
                </span>
                <span style={{ fontSize: 14, color: "#9CA3AF", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                  ${s.revenue}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}

function EmailPerformance() {
  const e = window.campaign.emails;

  function BlastCard({ blast, accent, label }) {
    const tone = accent === "gold" ? {
      fg: "#C9A96E", bg: "rgba(201,169,110,0.06)", border: "rgba(201,169,110,0.25)", glow: "rgba(201,169,110,0.40)",
    } : {
      fg: "#B8B8C2", bg: "rgba(139,139,149,0.06)", border: "rgba(139,139,149,0.20)", glow: "rgba(139,139,149,0.20)",
    };
    return (
      <Card accent={accent === "gold" ? "gold" : "silver"} hover={false} style={{ height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <Pill tone={accent === "gold" ? "gold" : "silver"}>{label}</Pill>
          <span style={{ fontSize: 12, color: "#6B7280" }}>{blast.sent}</span>
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 600, color: "#E8E9EE", margin: "0 0 24px", lineHeight: 1.3 }}>
          "{blast.subject}"
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
          <Stat label="Recipients" v={blast.recipients.toLocaleString()} />
          <Stat label="Open rate" v={`${blast.openRate}%`} />
          <Stat label="Click rate" v={`${blast.clickRate}%`} />
          <Stat label="Conversions" v={blast.conversions} />
        </div>
        <div style={{
          padding: "20px 22px", borderRadius: 12,
          background: tone.bg, border: `1px solid ${tone.border}`,
        }}>
          <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 6 }}>Revenue</div>
          <div style={{
            fontSize: 44, fontWeight: 700, color: tone.fg, letterSpacing: "-0.025em",
            textShadow: `0 0 28px ${tone.glow}`, fontVariantNumeric: "tabular-nums",
          }}>${blast.revenue}</div>
        </div>
      </Card>
    );
  }
  function Stat({ label, v }) {
    return (
      <div>
        <div style={{ fontSize: 11, color: "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#E8E9EE", fontVariantNumeric: "tabular-nums" }}>{v}</div>
      </div>
    );
  }

  return (
    <section id="email" style={{ padding: "24px 56px 96px" }}>
      <SectionHeader eyebrow="Email performance" title="Two blasts, very different outcomes"
        subtitle="Same audience, similar open rates. The discovery format outperformed the hero spotlight 12-fold." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="grid-2">
        <Reveal><BlastCard blast={e.blast1} accent="gold" label="Launch · Blast #1" /></Reveal>
        <Reveal delay={120}><BlastCard blast={e.blast2} accent="silver" label="Hero spotlight · Blast #2" /></Reveal>
      </div>
      <Reveal delay={240}>
        <p style={{
          marginTop: 28, fontSize: 14, color: "#9CA3AF", lineHeight: 1.65,
          maxWidth: 900,
        }}>
          Both blasts hit the same audience and got similar open rates. The discovery format ("here are all 12") outperformed the hero spotlight 12-fold. For the next campaign I'll keep the discovery launch and replace the hero spotlight with something different — customer photos, scarcity messaging, or skip the second blast entirely.
        </p>
      </Reveal>
    </section>
  );
}

function Glossary() {
  const [open, setOpen] = useState(false);
  const items = [
    ["Return on Ad Spend (ROAS)", "For every $1 spent on ads, how much revenue came back. 1.0× = break even."],
    ["Direct sales / Pixel-attributed", "Sales Meta could trace back to its ads."],
    ["Add to Cart / Reached Checkout", "Steps in the customer journey from first ad view to purchase."],
    ["Click rate", "Of people who saw the ad, what % clicked it."],
    ["Click-to-buy rate", "Of people who clicked, what % bought."],
  ];
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 100,
      maxWidth: 360,
    }}>
      <div style={{
        background: "rgba(20,25,37,0.92)",
        border: "1px solid rgba(201,169,110,0.24)",
        borderRadius: 14,
        backdropFilter: "blur(12px)",
        boxShadow: "0 12px 48px -12px rgba(0,0,0,0.6)",
        overflow: "hidden",
      }}>
        <button onClick={() => setOpen(!open)} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 18px", width: "100%",
          background: "transparent", border: "none", cursor: "pointer",
          color: "#C9A96E", fontFamily: "inherit",
          fontSize: 12, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Glossary
          <span style={{ marginLeft: "auto", color: "#9CA3AF", fontSize: 14 }}>{open ? "−" : "+"}</span>
        </button>
        {open && (
          <div style={{ padding: "0 18px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
            {items.map(([term, def], i) => (
              <div key={i}>
                <div style={{ fontSize: 12, color: "#E8E9EE", fontWeight: 600, marginBottom: 3 }}>{term}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.5 }}>{def}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "64px 56px 48px" }}>
      <GoldRule/>
      <div style={{
        marginTop: 32,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
      }} className="footer-row">
        <div style={{ fontSize: 12, color: "#C9A96E", letterSpacing: "0.20em", fontWeight: 600 }}>
          BRAWN &nbsp;&amp;&nbsp; FOX &nbsp;·&nbsp; <span style={{ color: "#9CA3AF", fontWeight: 400 }}>Tennessee Campaign Report</span>
        </div>
        <div style={{ fontSize: 12, color: "#9CA3AF" }}>Performance through May 5, 2026</div>
        <div style={{ fontSize: 12, color: "#9CA3AF" }}>Prepared by Suleiman</div>
      </div>
      <div style={{ marginTop: 24, fontSize: 11, color: "#4B5563", letterSpacing: "0.08em" }}>
        © 2026 Brawn &amp; Fox
      </div>
    </footer>
  );
}

Object.assign(window, { Geography, PerSKU, EmailPerformance, Glossary, Footer });
