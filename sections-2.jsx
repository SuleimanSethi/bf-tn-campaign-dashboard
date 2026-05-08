// Sections part 2: WhatWorked, WhatDidntWork, TheRealStory

const ICONS = {
  Flag: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
  Crown: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 7l5 5 5-7 5 7 5-5v12H2z"/></svg>,
  MapPin: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Mail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Wrench: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Minus: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  Cog: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  MailX: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><line x1="14" y1="10" x2="20" y2="16"/><line x1="20" y1="10" x2="14" y2="16"/></svg>,
  Users: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
};

function HighlightCard({ icon, stat, title, body, accent = "green" }) {
  const accentColors = {
    green: { fg: "#7DC799", bg: "rgba(92,158,118,0.10)", border: "rgba(92,158,118,0.28)" },
    silver: { fg: "#B8B8C2", bg: "rgba(139,139,149,0.10)", border: "rgba(139,139,149,0.24)" },
  };
  const c = accentColors[accent];
  return (
    <Card accent={accent === "green" ? "green" : "silver"} style={{ height: "100%" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 18,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: c.bg, border: `1px solid ${c.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: c.fg,
        }}>{icon}</div>
        <div style={{
          fontSize: 26, fontWeight: 700, color: c.fg, letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
        }}>{stat}</div>
      </div>
      <h3 style={{
        fontSize: 18, fontWeight: 600, color: "#E8E9EE",
        margin: "0 0 10px", lineHeight: 1.3, letterSpacing: "-0.01em",
      }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.55, margin: 0 }}>{body}</p>
    </Card>
  );
}

function WhatWorked() {
  const items = window.campaign.whatWorked;
  const iconMap = { Flag: ICONS.Flag, Crown: ICONS.Crown, MapPin: ICONS.MapPin, Mail: ICONS.Mail, Wrench: ICONS.Wrench };
  return (
    <section id="wins" style={{ padding: "24px 56px 96px" }}>
      <SectionHeader eyebrow="What worked" title="The five things that landed"
        subtitle="Where the campaign produced real results." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-3">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 80}>
            <HighlightCard icon={iconMap[it.icon]} stat={it.stat} title={it.title} body={it.body} accent="green" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhatDidntWork() {
  const items = window.campaign.whatDidntWork;
  const icons = [ICONS.Minus, ICONS.Cog, ICONS.MailX, ICONS.Users];
  return (
    <section id="lessons" style={{ padding: "24px 56px 96px" }}>
      <SectionHeader eyebrow="What didn't work" title="Four honest observations"
        subtitle="Things that came up short — useful inputs for the next campaign, not failures." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="grid-4">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 80}>
            <HighlightCard icon={icons[i]} stat={it.stat} title={it.title} body={it.body} accent="silver" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---- The Real Story ----
function FunnelChart() {
  const [ref, inView] = useInView();
  const data = window.campaign.funnel;

  return (
    <Card hover={false}>
      <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 4 }}>Customer journey funnel</div>
      <h3 style={{ fontSize: 22, fontWeight: 600, color: "#E8E9EE", margin: "8px 0 24px" }}>
        Where Tennessee lost ground vs Georgia
      </h3>
      <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {data.map((d, i) => {
          // stages 1,2 are click rates (small %, scale 0-15); stages 3,4 are bigger (%, 0-100)
          const max = d.tn > 50 || d.ga > 50 ? 100 : 15;
          const tnW = inView ? (d.tn / max) * 100 : 0;
          const gaW = inView ? (d.ga / max) * 100 : 0;
          const isHighlight = d.highlight;
          return (
            <div key={i} style={{
              padding: isHighlight ? "20px 22px" : "8px 0",
              borderRadius: 12,
              background: isHighlight ? "linear-gradient(90deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02))" : "transparent",
              border: isHighlight ? "1px solid rgba(201,169,110,0.20)" : "none",
              transition: "all 300ms",
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                marginBottom: 10,
              }}>
                <span style={{
                  fontSize: isHighlight ? 15 : 13, color: "#E8E9EE",
                  fontWeight: isHighlight ? 600 : 500,
                }}>
                  {d.stage}
                </span>
                <span style={{
                  fontSize: 11, color: isHighlight ? "#C9A96E" : "#9CA3AF",
                  letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600,
                }}>{d.label}</span>
              </div>
              {/* TN bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <span style={{ width: 64, fontSize: 11, color: "#9CA3AF", letterSpacing: "0.06em" }}>TN</span>
                <div style={{ flex: 1, height: isHighlight ? 18 : 14, background: "rgba(99,102,241,0.08)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                  <div style={{
                    width: `${tnW}%`, height: "100%",
                    background: "linear-gradient(90deg, #4F52D6, #6366F1)",
                    borderRadius: 4,
                    boxShadow: isHighlight ? "0 0 16px rgba(99,102,241,0.45)" : "none",
                    transition: `width 1100ms cubic-bezier(0.2,0.8,0.2,1) ${i * 200}ms`,
                  }}/>
                </div>
                <span style={{ width: 60, fontSize: 13, color: "#E8E9EE", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                  {d.tn}%
                </span>
              </div>
              {/* GA bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 64, fontSize: 11, color: "#9CA3AF", letterSpacing: "0.06em" }}>GA</span>
                <div style={{ flex: 1, height: isHighlight ? 18 : 14, background: "rgba(63,191,176,0.08)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                  <div style={{
                    width: `${gaW}%`, height: "100%",
                    background: "linear-gradient(90deg, #2A9C90, #3FBFB0)",
                    borderRadius: 4,
                    boxShadow: isHighlight ? "0 0 16px rgba(63,191,176,0.45)" : "none",
                    transition: `width 1100ms cubic-bezier(0.2,0.8,0.2,1) ${i * 200 + 120}ms`,
                  }}/>
                </div>
                <span style={{ width: 60, fontSize: 13, color: "#E8E9EE", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                  {d.ga}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ marginTop: 26, fontSize: 14, color: "#9CA3AF", lineHeight: 1.6, maxWidth: 760 }}>
        Once someone reached your checkout, both campaigns converted at the exact same 59%. The losses didn't happen at checkout — they happened the moment a buyer arrived on the product page and decided whether they wanted the hat. Georgia products generated that "yes" at more than twice the rate Tennessee's did.
      </p>
    </Card>
  );
}

function VelocityComparison() {
  const v = window.campaign.velocityComparison;
  const [ref, inView] = useInView();
  const max = Math.max(v.tn.avgPerSKU, v.ga.avgPerSKU);
  return (
    <Card hover={false}>
      <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 4 }}>Per-SKU velocity</div>
      <h3 style={{ fontSize: 22, fontWeight: 600, color: "#E8E9EE", margin: "8px 0 24px" }}>
        Georgia hats sold ~3× more units per SKU per dollar
      </h3>
      <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#E8E9EE" }}>Tennessee average per SKU</span>
            <span style={{ fontSize: 22, fontWeight: 600, color: "#6366F1", fontVariantNumeric: "tabular-nums" }}>
              {v.tn.avgPerSKU} units
            </span>
          </div>
          <div style={{ height: 16, background: "rgba(99,102,241,0.08)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: inView ? `${(v.tn.avgPerSKU / max) * 100}%` : 0, height: "100%",
              background: "linear-gradient(90deg, #4F52D6, #6366F1)",
              transition: "width 1200ms cubic-bezier(0.2,0.8,0.2,1)",
            }}/>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#E8E9EE" }}>Georgia average per SKU</span>
            <span style={{ fontSize: 22, fontWeight: 600, color: "#3FBFB0", fontVariantNumeric: "tabular-nums" }}>
              {v.ga.avgPerSKU} units
            </span>
          </div>
          <div style={{ height: 16, background: "rgba(63,191,176,0.08)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: inView ? `${(v.ga.avgPerSKU / max) * 100}%` : 0, height: "100%",
              background: "linear-gradient(90deg, #2A9C90, #3FBFB0)",
              boxShadow: "0 0 12px rgba(63,191,176,0.30)",
              transition: "width 1200ms cubic-bezier(0.2,0.8,0.2,1) 200ms",
            }}/>
          </div>
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "10px 0", color: "#6B7280", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, borderBottom: "1px solid rgba(232,233,238,0.08)" }}></th>
            <th style={{ textAlign: "right", padding: "10px 0", color: "#6366F1", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, borderBottom: "1px solid rgba(232,233,238,0.08)" }}>Tennessee</th>
            <th style={{ textAlign: "right", padding: "10px 0", color: "#3FBFB0", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, borderBottom: "1px solid rgba(232,233,238,0.08)" }}>Georgia</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["SKUs that sold any units", `${v.tn.hatSKUsSold} of ${v.tn.totalHatSKUs}`, `${v.ga.hatSKUsSold} of ${v.ga.totalHatSKUs}`],
            ["Total hat units", v.tn.totalUnits, v.ga.totalUnits],
            ["Average per SKU", v.tn.avgPerSKU, v.ga.avgPerSKU],
            ["Spend per SKU", `$${v.tn.spendPerSKU}`, `$${v.ga.spendPerSKU}`],
          ].map((r, i) => (
            <tr key={i}>
              <td style={{ padding: "12px 0", color: "#9CA3AF", borderBottom: "1px solid rgba(232,233,238,0.04)" }}>{r[0]}</td>
              <td style={{ padding: "12px 0", color: "#E8E9EE", textAlign: "right", fontVariantNumeric: "tabular-nums", borderBottom: "1px solid rgba(232,233,238,0.04)" }}>{r[1]}</td>
              <td style={{ padding: "12px 0", color: "#E8E9EE", textAlign: "right", fontVariantNumeric: "tabular-nums", borderBottom: "1px solid rgba(232,233,238,0.04)" }}>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function EmailCleanTest() {
  const c = window.campaign.blastComparison;

  function Side({ name, sub, data, color, glow }) {
    return (
      <div style={{
        flex: 1,
        padding: 28, borderRadius: 14,
        background: "rgba(20,25,37,0.7)",
        border: `1px solid ${color}33`,
      }}>
        <div className="eyebrow" style={{ color, marginBottom: 8 }}>{sub}</div>
        <h4 style={{ fontSize: 18, fontWeight: 600, color: "#E8E9EE", margin: "0 0 22px" }}>{name}</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Row label="Recipients" v={data.recipients.toLocaleString()} />
          <Row label="Open rate" v={`${data.openRate}%`} />
          <Row label="Clicked through" v={data.clicks} />
          <Row label="Conversions" v={data.conversions} bold />
          <Row label="Click → buy rate" v={`${data.clickToBuyRate}%`} bold accent={color} />
          <div style={{ borderTop: `1px solid ${color}22`, margin: "8px 0", paddingTop: 14 }}>
            <div style={{ fontSize: 11, color: "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Revenue</div>
            <div style={{
              fontSize: 36, fontWeight: 700, color, letterSpacing: "-0.02em",
              textShadow: `0 0 24px ${glow}`, fontVariantNumeric: "tabular-nums",
            }}>${data.revenue}</div>
          </div>
        </div>
      </div>
    );
  }
  function Row({ label, v, bold, accent }) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 13, color: "#9CA3AF" }}>{label}</span>
        <span style={{
          fontSize: bold ? 17 : 14, color: accent || "#E8E9EE",
          fontWeight: bold ? 600 : 500, fontVariantNumeric: "tabular-nums",
        }}>{v}</span>
      </div>
    );
  }

  return (
    <Card hover={false}>
      <div className="eyebrow" style={{ color: "#9CA3AF", marginBottom: 4 }}>The cleanest test</div>
      <h3 style={{ fontSize: 22, fontWeight: 600, color: "#E8E9EE", margin: "8px 0 6px" }}>
        Same email list, different products → 8× different response
      </h3>
      <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 0, marginBottom: 24, maxWidth: 700, lineHeight: 1.55 }}>
        Both blasts hit the same audience and got nearly identical open rates. Then Georgia buyers converted 8× more often.
      </p>
      <div style={{ display: "flex", gap: 20 }} className="email-test-grid">
        <Side name={c.tn.name} sub="TENNESSEE — Blast #2" data={c.tn} color="#6366F1" glow="rgba(99,102,241,0.40)" />
        <Side name={c.ga.name} sub="GEORGIA — Blast #2" data={c.ga} color="#3FBFB0" glow="rgba(63,191,176,0.40)" />
      </div>
      <p style={{ marginTop: 22, fontSize: 14, color: "#9CA3AF", lineHeight: 1.6 }}>
        Same list. Same email infrastructure. Same delivery system. The variable that's left is what was being sold.
      </p>
    </Card>
  );
}

function TheRealStory() {
  return (
    <section id="story" style={{
      padding: "96px 56px",
      background: "linear-gradient(180deg, transparent 0%, rgba(201,169,110,0.025) 8%, rgba(201,169,110,0.025) 92%, transparent 100%)",
      borderTop: "1px solid rgba(201,169,110,0.08)",
      borderBottom: "1px solid rgba(201,169,110,0.08)",
    }}>
      <div style={{ marginBottom: 14 }}><GoldRule/></div>
      <Reveal>
        <div className="eyebrow" style={{ color: "#C9A96E", marginBottom: 18, marginTop: 32 }}>◆ The real story</div>
      </Reveal>
      <Reveal delay={120}>
        <h2 style={{
          fontSize: 48, fontWeight: 600, letterSpacing: "-0.025em",
          color: "#E8E9EE", margin: 0, lineHeight: 1.05, maxWidth: 900,
        }}>Why Tennessee underperformed Georgia</h2>
      </Reveal>
      <Reveal delay={240}>
        <p style={{ marginTop: 20, fontSize: 18, color: "#C9A96E", maxWidth: 900, lineHeight: 1.5, fontWeight: 400 }}>
          Same store. Same checkout. Same ads system. Different products. Different demand.
        </p>
      </Reveal>
      <Reveal delay={360}>
        <p style={{
          marginTop: 32, fontSize: 17, color: "#E8E9EE", maxWidth: 900,
          lineHeight: 1.65,
        }}>
          Georgia spent <strong style={{ color: "#3FBFB0" }}>$1,150</strong> and made <strong style={{ color: "#3FBFB0" }}>$2,512</strong> in attributed sales. Tennessee spent <strong style={{ color: "#6366F1" }}>$799</strong> and made <strong style={{ color: "#6366F1" }}>$806</strong>. After adjusting for spend differences, Georgia was about <strong style={{ color: "#C9A96E" }}>2× more efficient per dollar</strong>. The reason isn't operational — it's that the Georgia collection appealed to a broader audience than Tennessee's did. The data points to this from three angles.
        </p>
      </Reveal>

      <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 24 }}>
        <Reveal><FunnelChart/></Reveal>
        <Reveal><VelocityComparison/></Reveal>
        <Reveal><EmailCleanTest/></Reveal>
      </div>

      <div style={{ marginTop: 56 }}><GoldRule/></div>
    </section>
  );
}

Object.assign(window, { WhatWorked, WhatDidntWork, TheRealStory });
