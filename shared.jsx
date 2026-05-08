// Shared hooks + small components

const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ---- Hooks ----
function useInView(options = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCountUp(target, { duration = 1500, start = false, decimals = 0 } = {}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
}

// ---- Reveal wrapper ----
function Reveal({ children, delay = 0, className = "", from = "up" }) {
  const [ref, inView] = useInView();
  const initialTransforms = {
    up: "translateY(28px) scale(0.985)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    zoom: "scale(0.92)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0) scale(1)" : (initialTransforms[from] || initialTransforms.up),
        transition: `opacity 800ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform 800ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ---- Gold rule line ----
function GoldRule() {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ height: 1, width: "100%", overflow: "hidden", margin: "0" }}>
      <div
        style={{
          height: 1,
          width: inView ? "100%" : "0%",
          background: "linear-gradient(90deg, transparent 0%, #C9A96E 30%, #C9A96E 70%, transparent 100%)",
          transition: "width 1100ms ease-out",
        }}
      />
    </div>
  );
}

// ---- Section header ----
function SectionHeader({ eyebrow, title, subtitle }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 40 }}>
      {eyebrow && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{
            display: "inline-block", width: 24, height: 1,
            background: "#C9A96E",
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 700ms cubic-bezier(0.2,0.8,0.2,1) 200ms",
          }}/>
          <div className="eyebrow" style={{
            color: "#C9A96E",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-8px)",
            transition: "opacity 600ms ease-out 350ms, transform 600ms ease-out 350ms",
          }}>{eyebrow}</div>
        </div>
      )}
      <h2 style={{
        fontSize: 38, fontWeight: 600, letterSpacing: "-0.02em",
        color: "#E8E9EE", margin: 0, lineHeight: 1.1,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 800ms ease-out 450ms, transform 800ms cubic-bezier(0.2,0.8,0.2,1) 450ms",
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          marginTop: 12, fontSize: 17, color: "#9CA3AF", maxWidth: 720, lineHeight: 1.5,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 700ms ease-out 600ms, transform 700ms ease-out 600ms",
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ---- Card ----
function Card({ children, style = {}, accent, hover = true }) {
  const [hovered, setHovered] = useState(false);
  const accentBorder = accent === 'gold' ? '#C9A96E' : accent === 'green' ? '#5C9E76' : accent === 'silver' ? '#8B8B95' : null;
  return (
    <div
      className={hover ? "lift" : ""}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "linear-gradient(180deg, rgba(22,28,42,0.95) 0%, rgba(18,23,35,0.95) 100%)",
        border: "1px solid rgba(201, 169, 110, 0.08)",
        borderLeft: accentBorder ? `2px solid ${accentBorder}` : "1px solid rgba(201, 169, 110, 0.08)",
        borderRadius: 16,
        padding: 28,
        transition: "transform 220ms ease-out, box-shadow 220ms ease-out, border-color 220ms ease-out",
        transform: hover && hovered ? "scale(1.012) translateY(-3px)" : "scale(1)",
        boxShadow: hover && hovered
          ? "0 24px 70px -20px rgba(201,169,110,0.22), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 4px 24px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)",
        ...style,
      }}
    >
      {hover && <span className="card-shimmer-track" aria-hidden="true"></span>}
      {children}
    </div>
  );
}

// ---- Pill ----
function Pill({ children, tone = "neutral" }) {
  const map = {
    green:   { bg: "rgba(92,158,118,0.12)",  fg: "#7DC799", bd: "rgba(92,158,118,0.30)" },
    silver:  { bg: "rgba(139,139,149,0.12)", fg: "#B8B8C2", bd: "rgba(139,139,149,0.28)" },
    gold:    { bg: "rgba(201,169,110,0.12)", fg: "#D8BC85", bd: "rgba(201,169,110,0.32)" },
    neutral: { bg: "rgba(232,233,238,0.06)", fg: "#9CA3AF", bd: "rgba(232,233,238,0.10)" },
  };
  const t = map[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 12px", borderRadius: 999,
      fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase",
      background: t.bg, color: t.fg, border: `1px solid ${t.bd}`,
    }}>{children}</span>
  );
}

// ---- Animated counter display ----
function NumberDisplay({ value, prefix = "", suffix = "", decimals = 0, glow = "gold", size = 64, weight = 700 }) {
  const [ref, inView] = useInView();
  const display = useCountUp(value, { start: inView, decimals, duration: 1700 });
  const glowMap = {
    gold: "0 0 40px rgba(201,169,110,0.35), 0 0 12px rgba(201,169,110,0.25)",
    indigo: "0 0 40px rgba(99,102,241,0.30), 0 0 12px rgba(99,102,241,0.22)",
    green: "0 0 36px rgba(92,158,118,0.30), 0 0 10px rgba(92,158,118,0.20)",
    none: "none",
  };
  const breathClass = glow === "indigo" ? "breath-indigo" : glow === "none" ? "" : "breath-gold";
  return (
    <div ref={ref} className={breathClass} style={{
      fontSize: size, fontWeight: weight, lineHeight: 1, letterSpacing: "-0.03em",
      color: "#F2EAD8",
      textShadow: glowMap[glow],
      fontVariantNumeric: "tabular-nums",
      display: "inline-block",
    }}>
      {prefix}{display}{suffix}
    </div>
  );
}

window.SHARED = { useInView, useCountUp, Reveal, GoldRule, SectionHeader, Card, Pill, NumberDisplay };
Object.assign(window, { useInView, useCountUp, Reveal, GoldRule, SectionHeader, Card, Pill, NumberDisplay });
