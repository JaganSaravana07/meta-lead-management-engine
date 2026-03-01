import { useState, useEffect, useRef } from "react";

// ─── Icons (inline SVG components) ───────────────────────────────────────────
const Icon = ({ d, size = 18, color = "currentColor", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const Icons = {
  logo: () => <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="#3B5BDB"/><path d="M7 14c0-4 3-7 7-7s7 3 7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/><path d="M9 16.5c1-2.5 5-2.5 6 0" stroke="#60EFFF" strokeWidth="2" strokeLinecap="round"/></svg>,
  dashboard: () => <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10"/>,
  leads: () => <Icon d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75"/>,
  pipeline: () => <Icon d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
  analytics: () => <Icon d="M18 20V10 M12 20V4 M6 20v-6"/>,
  workflows: () => <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
  scoring: () => <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
  team: () => <Icon d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75"/>,
  integrations: () => <Icon d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>,
  billing: () => <Icon d="M3 10h18 M3 6h18 M3 14h11 M3 18h7"/>,
  settings: () => <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>,
  support: () => <Icon d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
  bell: () => <Icon d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0"/>,
  search: () => <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>,
  plus: () => <Icon d="M12 5v14 M5 12h14"/>,
  arrow: () => <Icon d="M5 12h14 M12 5l7 7-7 7"/>,
  check: () => <Icon d="M20 6L9 17l-5-5"/>,
  x: () => <Icon d="M18 6L6 18 M6 6l12 12"/>,
  trend_up: () => <Icon d="M23 6l-9.5 9.5-5-5L1 18"/>,
  trend_down: () => <Icon d="M23 18l-9.5-9.5-5 5L1 6"/>,
  filter: () => <Icon d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>,
  export: () => <Icon d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12"/>,
  eye: () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6z"/>,
  trash: () => <Icon d="M3 6h18 M19 6l-1 14H6L5 6 M8 6V4h8v2"/>,
  drag: () => <Icon d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01"/>,
  globe: () => <Icon d="M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>,
  mail: () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"/>,
  phone: () => <Icon d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>,
  zap: () => <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
  calendar: () => <Icon d="M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18"/>,
  clock: () => <Icon d="M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2"/>,
  location: () => <Icon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z"/>,
  chevron_down: () => <Icon d="M6 9l6 6 6-6"/>,
  chevron_right: () => <Icon d="M9 18l6-6-6-6"/>,
  copy: () => <Icon d="M20 9H11a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>,
  key: () => <Icon d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>,
  refresh: () => <Icon d="M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15"/>,
  play: () => <Icon d="M5 3l14 9-14 9V3z"/>,
  save: () => <Icon d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8"/>,
};

// ─── Color & Style Constants ──────────────────────────────────────────────────
const C = {
  primary: "#3B5BDB",
  primaryLight: "#EEF2FF",
  primaryDark: "#2F4AC8",
  accent: "#60EFFF",
  bg: "#F8F9FC",
  sidebar: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E8ECF4",
  text: "#0F172A",
  textSub: "#64748B",
  textMuted: "#94A3B8",
  hot: "#EF4444",
  warm: "#F59E0B",
  cold: "#6366F1",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
};

// ─── Shared UI Components ─────────────────────────────────────────────────────

const Badge = ({ label, color = "blue", size = "sm" }) => {
  const colors = {
    blue: { bg: "#EEF2FF", text: "#3B5BDB" },
    green: { bg: "#ECFDF5", text: "#059669" },
    red: { bg: "#FEF2F2", text: "#DC2626" },
    orange: { bg: "#FFF7ED", text: "#C2410C" },
    purple: { bg: "#F5F3FF", text: "#6D28D9" },
    gray: { bg: "#F1F5F9", text: "#475569" },
    yellow: { bg: "#FEFCE8", text: "#A16207" },
    cyan: { bg: "#ECFEFF", text: "#0891B2" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: size === "sm" ? "2px 8px" : "4px 12px",
      borderRadius: 20, fontSize: size === "sm" ? 11 : 12,
      fontWeight: 600, background: c.bg, color: c.text, whiteSpace: "nowrap"
    }}>{label}</span>
  );
};

const Btn = ({ children, variant = "primary", size = "md", onClick, icon, style: sx = {} }) => {
  const [hov, setHov] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: 7, border: "none",
    borderRadius: 9, cursor: "pointer", fontWeight: 600, fontFamily: "inherit",
    transition: "all .15s", outline: "none",
    padding: size === "sm" ? "7px 14px" : size === "lg" ? "14px 28px" : "9px 18px",
    fontSize: size === "sm" ? 13 : size === "lg" ? 16 : 14,
    ...sx,
  };
  const variants = {
    primary: { background: hov ? C.primaryDark : C.primary, color: "#fff", boxShadow: hov ? "0 4px 14px rgba(59,91,219,.35)" : "0 2px 6px rgba(59,91,219,.2)" },
    secondary: { background: hov ? "#F1F5F9" : "#fff", color: C.text, border: `1.5px solid ${C.border}` },
    ghost: { background: hov ? C.primaryLight : "transparent", color: C.primary },
    danger: { background: hov ? "#DC2626" : "#EF4444", color: "#fff" },
  };
  return (
    <button style={{ ...base, ...variants[variant] }} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {icon && icon}
      {children}
    </button>
  );
};

const Card = ({ children, style: sx = {}, padding = 24 }) => (
  <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding, boxShadow: "0 1px 4px rgba(0,0,0,.04)", ...sx }}>
    {children}
  </div>
);

const StatCard = ({ icon, label, value, trend, trendVal, color = C.primary }) => (
  <Card style={{ flex: 1 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ width: 42, height: 42, borderRadius: 11, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", color }}>
        {icon}
      </div>
      {trendVal && (
        <span style={{ fontSize: 12, fontWeight: 600, color: trend === "up" ? C.success : C.danger, display: "flex", alignItems: "center", gap: 3 }}>
          {trend === "up" ? "↑" : "↓"} {trendVal}
        </span>
      )}
    </div>
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 13, color: C.textSub, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: "-0.5px" }}>{value}</div>
    </div>
  </Card>
);

const Avatar = ({ name = "U", size = 32, src }) => {
  const colors = ["#3B5BDB","#10B981","#F59E0B","#EF4444","#6366F1","#EC4899","#14B8A6"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: src ? "transparent" : color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: size * .38, fontWeight: 700, overflow: "hidden", flexShrink: 0 }}>
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : name[0].toUpperCase()}
    </div>
  );
};

const Input = ({ label, placeholder, type = "text", value, onChange, prefix, style: sx = {} }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 600, color: C.textSub }}>{label}</label>}
    <div style={{ position: "relative" }}>
      {prefix && <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}>{prefix}</span>}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={{ width: "100%", padding: prefix ? "10px 12px 10px 36px" : "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, color: C.text, background: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit", ...sx }}
        onFocus={e => e.target.style.borderColor = C.primary}
        onBlur={e => e.target.style.borderColor = C.border}
      />
    </div>
  </div>
);

const Select = ({ label, options, value, onChange, style: sx = {} }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 600, color: C.textSub }}>{label}</label>}
    <select value={value} onChange={onChange}
      style={{ padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, color: C.text, background: "#fff", outline: "none", fontFamily: "inherit", ...sx }}>
      {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
  </div>
);

// ─── Mini Line Chart ──────────────────────────────────────────────────────────
const MiniChart = ({ data, color, width = 100, height = 40 }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ─── Bar Chart (Campaign Performance) ────────────────────────────────────────
const BarChart = ({ bars, line }) => {
  const maxVal = Math.max(...bars.map(b => b.value));
  const W = 680, H = 200;
  const barW = 36, gap = (W - bars.length * barW) / (bars.length + 1);
  const pts = bars.map((b, i) => {
    const x = gap + i * (barW + gap) + barW / 2;
    const y = H - (b.line / maxVal) * H;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 30}`} style={{ overflow: "visible" }}>
      {bars.map((b, i) => {
        const x = gap + i * (barW + gap);
        const bH = (b.value / maxVal) * H;
        return (
          <g key={i}>
            <rect x={x} y={H - bH} width={barW} height={bH} rx={6} fill={C.primary} opacity=".85" />
            <text x={x + barW / 2} y={H + 20} textAnchor="middle" fontSize="11" fill={C.textMuted}>{b.label}</text>
          </g>
        );
      })}
      <polyline points={pts} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {bars.map((b, i) => {
        const x = gap + i * (barW + gap) + barW / 2;
        const y = H - (b.line / maxVal) * H;
        return <circle key={i} cx={x} cy={y} r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />;
      })}
    </svg>
  );
};

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = ({ segments }) => {
  let angle = -90;
  const R = 60, cx = 70, cy = 70;
  const paths = segments.map(seg => {
    const sweep = (seg.pct / 100) * 360;
    const start = angle * Math.PI / 180;
    angle += sweep;
    const end = angle * Math.PI / 180;
    const large = sweep > 180 ? 1 : 0;
    const x1 = cx + R * Math.cos(start), y1 = cy + R * Math.sin(start);
    const x2 = cx + R * Math.cos(end), y2 = cy + R * Math.sin(end);
    return { d: `M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} Z`, color: seg.color };
  });
  return (
    <svg width="140" height="140">
      {paths.map((p, i) => <path key={i} d={p.d} fill={p.color} />)}
      <circle cx={cx} cy={cy} r={35} fill="#fff" />
    </svg>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Icons.dashboard, section: "CORE" },
  { id: "leads", label: "Leads", icon: Icons.leads, section: "CORE" },
  { id: "pipeline", label: "Pipeline", icon: Icons.pipeline, section: "CORE" },
  { id: "analytics", label: "Analytics", icon: Icons.analytics, section: "CORE" },
  { id: "workflows", label: "Workflows", icon: Icons.workflows, section: "AUTOMATION" },
  { id: "scoring", label: "Lead Scoring", icon: Icons.scoring, section: "AUTOMATION" },
  { id: "team", label: "Team", icon: Icons.team, section: "MANAGEMENT" },
  { id: "integrations", label: "Integrations", icon: Icons.integrations, section: "MANAGEMENT" },
  { id: "billing", label: "Billing", icon: Icons.billing, section: "MANAGEMENT" },
];

const Sidebar = ({ active, setActive }) => {
  const sections = ["CORE", "AUTOMATION", "MANAGEMENT"];
  return (
    <div style={{ width: 220, minHeight: "100vh", background: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 100 }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <Icons.logo />
        <span style={{ fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: "-0.3px" }}>Meta OS</span>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "0 12px" }}>
        {sections.map(section => (
          <div key={section} style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em", padding: "12px 8px 6px" }}>{section}</div>
            {navItems.filter(n => n.section === section).map(item => {
              const isActive = active === item.id;
              return (
                <button key={item.id} onClick={() => setActive(item.id)}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 9, border: "none", cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: isActive ? 600 : 500, fontFamily: "inherit", background: isActive ? C.primaryLight : "transparent", color: isActive ? C.primary : C.textSub, transition: "all .15s" }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "#F8F9FC"; e.currentTarget.style.color = C.text; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSub; } }}>
                  <item.icon />
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ padding: "12px", borderTop: `1px solid ${C.border}` }}>
        {[{ id: "settings", label: "Settings", icon: Icons.settings }, { id: "support", label: "Support", icon: Icons.support }].map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 9, border: "none", cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: active === item.id ? 600 : 500, fontFamily: "inherit", background: active === item.id ? C.primaryLight : "transparent", color: active === item.id ? C.primary : C.textSub, transition: "all .15s" }}>
            <item.icon />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Top Bar ──────────────────────────────────────────────────────────────────
const TopBar = ({ onSearch }) => (
  <div style={{ position: "fixed", top: 0, left: 220, right: 0, height: 64, background: "#fff", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "0 28px", gap: 16, zIndex: 99 }}>
    <div style={{ flex: 1, position: "relative", maxWidth: 420 }}>
      <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icons.search /></span>
      <input placeholder="Search leads, campaigns..." onChange={onSearch}
        style={{ width: "100%", padding: "9px 14px 9px 40px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.text, outline: "none", fontFamily: "inherit", background: C.bg, boxSizing: "border-box" }}
        onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.background = "#fff"; }}
        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.background = C.bg; }} />
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ position: "relative", cursor: "pointer" }}>
      <Icons.bell />
      <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: C.danger, borderRadius: "50%", fontSize: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>4</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Alex Smith</div>
        <div style={{ fontSize: 11, color: C.textMuted }}>Workspace Admin</div>
      </div>
      <Avatar name="Alex Smith" size={36} />
    </div>
  </div>
);

// ─── PAGES ────────────────────────────────────────────────────────────────────

// Dashboard
const DashboardPage = () => {
  const chartData = [
    { label: "Mon", value: 42, line: 18 }, { label: "Tue", value: 48, line: 22 },
    { label: "Wed", value: 45, line: 26 }, { label: "Thu", value: 65, line: 38 },
    { label: "Fri", value: 55, line: 32 }, { label: "Sat", value: 28, line: 20 },
    { label: "Sun", value: 22, line: 16 },
  ];
  const leads = [
    { name: "Rahul Sharma", status: "NEW", score: 92, campaign: "FB Real Estate High Int", time: "12m ago" },
    { name: "Priya Singh", status: "NEW", score: 88, campaign: "Instagram Luxury Livin", time: "45m ago" },
    { name: "Amit Patel", status: "INTERESTED", score: 84, campaign: "FB Real Estate High Int", time: "1h ago" },
    { name: "Sanya Malhotra", status: "CONTACTED", score: 81, campaign: "WhatsApp Direct Quer", time: "2h ago" },
    { name: "Vikram Goel", status: "NEW", score: 79, campaign: "Meta Lead Gen Form", time: "3h ago" },
  ];
  const scoreColor = s => s >= 80 ? C.success : s >= 60 ? C.warning : C.danger;
  const [tab, setTab] = useState("7D");
  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <StatCard icon={<Icons.leads />} label="Leads Today" value="142" trend="up" trendVal="+12.5%" color={C.primary} />
        <StatCard icon={<Icons.zap />} label="Hot Leads Pending" value="28" trend="down" trendVal="-2.4%" color="#F59E0B" />
        <StatCard icon={<Icons.analytics />} label="Conversion Rate" value="8.4%" trend="up" trendVal="+0.8%" color="#10B981" />
        <StatCard icon={<Icons.billing />} label="Revenue Generated" value="₹4,82,900" trend="up" trendVal="+18.2%" color="#6366F1" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <Card style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>Campaign Performance</div>
                <div style={{ fontSize: 13, color: C.textMuted }}>Visualizing lead volume vs conversions over time</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {["24H", "7D", "30D"].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ padding: "5px 14px", borderRadius: 7, border: `1.5px solid ${tab === t ? C.primary : C.border}`, background: tab === t ? C.primaryLight : "#fff", color: tab === t ? C.primary : C.textSub, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <BarChart bars={chartData} />
          </Card>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>Priority Leads</div>
                <div style={{ fontSize: 13, color: C.textMuted }}>Most engaged leads requiring immediate follow-up</div>
              </div>
              <Btn variant="secondary" size="sm" icon={<Icons.arrow />}>Manage All Leads</Btn>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Lead Name", "Score", "Source Campaign", "Received", "Actions"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 600, color: C.textMuted, letterSpacing: ".04em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}
                    onMouseEnter={e => e.currentTarget.style.background = C.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar name={l.name} size={32} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{l.name}</div>
                          <Badge label={l.status} color={l.status === "NEW" ? "blue" : l.status === "INTERESTED" ? "green" : "orange"} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: "50%", background: scoreColor(l.score) + "20", color: scoreColor(l.score), fontWeight: 800, fontSize: 13 }}>{l.score}</span>
                    </td>
                    <td style={{ padding: "12px", fontSize: 13, color: C.textSub }}>{l.campaign}</td>
                    <td style={{ padding: "12px", fontSize: 13, color: C.textMuted }}>{l.time}</td>
                    <td style={{ padding: "12px" }}>
                      <Btn variant="ghost" size="sm">View</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>Live Updates</div>
              <Badge label="4 New" color="blue" />
            </div>
            {[
              { dot: C.primary, text: "High intent lead 'Rahul' received from Meta", time: "2m ago" },
              { dot: C.warning, text: "Campaign 'Luxury Living' reached daily cap", time: "15m ago" },
              { dot: C.success, text: "Workflow 'Auto-Reply' triggered for 12 leads", time: "1h ago" },
              { dot: C.textMuted, text: "New performance report is ready for download", time: "3h ago" },
            ].map((u, i) => (
              <div key={i} style={{ display: "flex", gap: 12, paddingBottom: 14, borderBottom: i < 3 ? `1px solid ${C.border}` : "none", marginBottom: i < 3 ? 14 : 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: u.dot, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{u.text}</div>
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}><Icons.clock /> {u.time}</div>
                </div>
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: 8 }}><button style={{ color: C.primary, fontSize: 13, fontWeight: 600, border: "none", background: "none", cursor: "pointer" }}>View All Notifications</button></div>
          </Card>

          <Card>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 14 }}>Quick Insights</div>
            {[
              { icon: <Icons.scoring />, title: "Lead Scoring Rules", sub: "Automate priority for high-intent users", color: C.primary },
              { icon: <Icons.zap />, title: "Active Automations", sub: "14 workflows currently processing leads", color: C.success },
              { icon: <Icons.analytics />, title: "ROI Analysis", sub: "Calculate cost per lead vs conversion", color: "#6366F1" },
            ].map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = C.bg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: q.color + "15", display: "flex", alignItems: "center", justifyContent: "center", color: q.color, flexShrink: 0 }}>{q.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{q.title}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{q.sub}</div>
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ background: `linear-gradient(135deg, ${C.primaryLight}, #fff)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>↗</span>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.primary }}>Monthly Growth Goal</div>
            </div>
            <div style={{ fontSize: 13, color: C.textSub, marginBottom: 12 }}>
              You've reached <strong>78%</strong> of your conversion target this month. Keep it up!
            </div>
            <div style={{ background: C.border, borderRadius: 10, height: 8, marginBottom: 16 }}>
              <div style={{ width: "78%", height: "100%", background: C.primary, borderRadius: 10, transition: "width 1s" }} />
            </div>
            <Btn style={{ width: "100%", justifyContent: "center" }}>View Detailed Report</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Leads Central
const LeadsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const allLeads = [
    { name: "Sarah Jenkins", email: "sarah.j@example.com", campaign: "Q4 Real Estate Meta Ad", location: "Mumbai, India", score: 92, status: "Hot", owner: "Alex", activity: "2 hours ago" },
    { name: "Michael Chen", email: "m.chen@techcorp.io", campaign: "WhatsApp Lead Gen", location: "Singapore", score: 45, status: "New", owner: "Alex", activity: "5 mins ago" },
    { name: "Elena Rodriguez", email: "elena.rod@gmail.com", campaign: "Global Webinar Funnel", location: "Madrid, Spain", score: 78, status: "Contacted", owner: "Priya", activity: "1 day ago" },
    { name: "David Wilson", email: "d.wilson@fitness.com", campaign: "Q4 Real Estate Meta Ad", location: "London, UK", score: 32, status: "Lost", owner: "John", activity: "3 days ago" },
    { name: "Ananya Rao", email: "arao.official@outlook.com", campaign: "WhatsApp Lead Gen", location: "Bangalore, India", score: 88, status: "Booked", owner: "Priya", activity: "4 hours ago" },
    { name: "James Patel", email: "james.p@startup.co", campaign: "FB Real Estate High Int", location: "Delhi, India", score: 71, status: "Interested", owner: "Alex", activity: "6h ago" },
    { name: "Yuki Tanaka", email: "yuki.t@corp.jp", campaign: "Meta Lead Gen Form", location: "Tokyo, Japan", score: 55, status: "Contacted", owner: "Alex", activity: "8h ago" },
  ];
  const statusColor = { Hot: "red", New: "blue", Contacted: "purple", Lost: "gray", Booked: "green", Interested: "yellow" };
  const scoreColor = s => s >= 80 ? C.success : s >= 60 ? C.warning : C.danger;
  const filtered = allLeads.filter(l =>
    (statusFilter === "All" || l.status === statusFilter) &&
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()))
  );
  const [selected, setSelected] = useState([]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Leads Central</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 14 }}>Manage and track your Meta platform leads in real-time.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="secondary" size="sm" icon={<Icons.export />}>Export CSV</Btn>
          <Btn size="sm" icon={<Icons.plus />}>Add New Lead</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Leads", value: "1,284", sub: "+12% this week", icon: <Icons.leads />, color: C.primary },
          { label: "New Leads (24h)", value: "42", sub: "+5 today", icon: <Icons.clock />, color: "#6366F1" },
          { label: "High Score Leads", value: "156", icon: <Icons.scoring />, color: "#F59E0B" },
          { label: "Avg. Conversion", value: "18.4%", icon: <Icons.analytics />, color: C.success },
        ].map((s, i) => (
          <Card key={i} padding={18}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontSize: 13, color: C.textSub }}>{s.label}</div>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "8px 0 2px" }}>{s.value}</div>
            {s.sub && <div style={{ fontSize: 12, color: C.textMuted }}>{s.sub}</div>}
          </Card>
        ))}
      </div>

      <Card>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, position: "relative", minWidth: 200 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icons.search /></span>
            <input placeholder="Search by name or campaign..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "9px 12px 9px 38px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = C.primary}
              onBlur={e => e.target.style.borderColor = C.border} />
          </div>
          <Btn variant="secondary" size="sm" icon={<Icons.filter />}>Filter</Btn>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: C.textSub }}>Status:</span>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              style={{ border: `1.5px solid ${C.border}`, borderRadius: 7, padding: "6px 10px", fontSize: 13, fontFamily: "inherit", cursor: "pointer", outline: "none" }}>
              {["All", "New", "Contacted", "Interested", "Booked", "Hot", "Lost"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: C.textSub }}>Owner:</span>
            <select style={{ border: `1.5px solid ${C.border}`, borderRadius: 7, padding: "6px 10px", fontSize: 13, fontFamily: "inherit", cursor: "pointer", outline: "none" }}>
              <option>All</option><option>Alex</option><option>Priya</option>
            </select>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}` }}>
              <th style={{ width: 40, padding: "10px 8px" }}><input type="checkbox" /></th>
              {["Lead Name", "Campaign", "Location", "Score", "Status", "Owner", "Last Activity", "Actions"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 600, color: C.textMuted, letterSpacing: ".04em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, transition: "background .12s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.bg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "12px 8px" }}><input type="checkbox" /></td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar name={l.name} size={34} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{l.name}</div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>{l.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px", fontSize: 13, color: C.textSub, maxWidth: 160 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Icons.arrow />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.campaign}</span>
                  </div>
                </td>
                <td style={{ padding: "12px", fontSize: 13, color: C.textSub }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Icons.location />{l.location}</div>
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", background: scoreColor(l.score) + "18", color: scoreColor(l.score), fontWeight: 800, fontSize: 13 }}>{l.score}</span>
                </td>
                <td style={{ padding: "12px" }}><Badge label={l.status} color={statusColor[l.status] || "gray"} /></td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <Avatar name={l.owner} size={26} />
                    <span style={{ fontSize: 13, color: C.textSub }}>{l.owner}</span>
                  </div>
                </td>
                <td style={{ padding: "12px", fontSize: 13, color: C.textMuted, whiteSpace: "nowrap" }}>{l.activity}</td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn variant="ghost" size="sm">View</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
          <div style={{ fontSize: 13, color: C.textMuted }}>Showing 1 to {filtered.length} of 1,284 leads</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["Previous", "1", "2", "3", "...", "Next"].map((p, i) => (
              <button key={i} style={{ padding: "6px 12px", borderRadius: 7, border: `1.5px solid ${p === "1" ? C.primary : C.border}`, background: p === "1" ? C.primary : "#fff", color: p === "1" ? "#fff" : C.textSub, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Pipeline Board
const PipelinePage = () => {
  const stages = [
    { id: "new", label: "NEW LEADS", color: C.primary, count: 3, value: "$7,450", leads: [
      { name: "James Wilson", campaign: "Real Estate Retargeting", value: "$1,200", days: "1d", score: 85, icon: "📘" },
      { name: "Maria Garcia", campaign: "Luxury Condos Launch", value: "$850", days: "0d", score: 92, icon: "📷" },
      { name: "Tech Solutions Ltd", campaign: "B2B Enterprise", value: "$5,400", days: "2d", score: 78, icon: "📘" },
    ]},
    { id: "contacted", label: "CONTACTED", color: "#6366F1", count: 1, value: "$2,100", leads: [
      { name: "Robert Chen", campaign: "Modern Living Ads", value: "$2,100", days: "4d", score: 65, icon: "📘" },
    ]},
    { id: "interested", label: "INTERESTED", color: C.warning, count: 2, value: "$4,700", leads: [
      { name: "Elena Popova", campaign: "Real Estate Retargeting", value: "$3,200", days: "7d", score: 88, icon: "📷" },
      { name: "David Miller", campaign: "Luxury Condos Launch", value: "$1,500", days: "5d", score: 72, icon: "📘" },
    ]},
    { id: "booked", label: "BOOKED", color: "#8B5CF6", count: 1, value: "$12,500", leads: [
      { name: "Greenwood Inc", campaign: "B2B Enterprise", value: "$12,500", days: "6d", score: 91, icon: "📘" },
    ]},
    { id: "converted", label: "CONVERTED", color: C.success, count: 0, value: "$0", leads: [] },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Sales Pipeline</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 14 }}>Manage and track conversion progress across all Meta campaigns</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="secondary" size="sm" icon={<Icons.filter />}>Filters</Btn>
          <Btn variant="secondary" size="sm" icon={<Icons.export />}>Export</Btn>
          <Btn size="sm" icon={<Icons.plus />}>Add Lead</Btn>
        </div>
      </div>

      <Card style={{ marginBottom: 20 }} padding={18}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[
            { label: "ACTIVE DEALS", value: "42", sub: "+12%", icon: "↗", color: C.success },
            { label: "PIPELINE VALUE", value: "$158,400", sub: "+8%", icon: "$", color: C.primary },
            { label: "AVG. VELOCITY", value: "4.2 Days", sub: "-1 day", icon: "⏱", color: "#6366F1" },
            { label: "PROJECTED REVENUE", value: "$84,200", sub: "+15%", icon: "↗", color: C.warning },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 14, color: s.color }}>{s.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: ".08em" }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{s.value} <span style={{ fontSize: 13, fontWeight: 600, color: C.success }}>{s.sub}</span></div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }}>
        {stages.map(stage => (
          <div key={stage.id} style={{ minWidth: 260, maxWidth: 280, flex: "0 0 260px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: stage.color }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: ".06em" }}>{stage.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: stage.color, background: stage.color + "18", padding: "1px 8px", borderRadius: 20 }}>{stage.count}</span>
              </div>
              <button style={{ border: "none", background: "none", cursor: "pointer", color: C.textMuted }}><Icons.plus /></button>
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10 }}>TOTAL VALUE: {stage.value}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {stage.leads.map((lead, i) => (
                <Card key={i} padding={14} style={{ cursor: "pointer", transition: "box-shadow .15s", border: `1.5px solid ${C.border}` }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.08)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.04)"}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ fontSize: 16 }}>{lead.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, background: C.primaryLight, color: C.primary, padding: "2px 8px", borderRadius: 20 }}>{lead.score} pts</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 3 }}>{lead.name}</div>
                  <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10 }}>{lead.campaign}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: C.text }}>$ {lead.value.replace("$","")}</span>
                    <span style={{ fontSize: 12, color: C.textMuted, display: "flex", alignItems: "center", gap: 4 }}><Icons.clock /> {lead.days}</span>
                  </div>
                  <div style={{ marginTop: 10 }}><Avatar name={lead.name} size={24} /></div>
                </Card>
              ))}
              {stage.leads.length === 0 && (
                <div style={{ textAlign: "center", padding: "32px 0", color: C.textMuted, fontSize: 13, border: `2px dashed ${C.border}`, borderRadius: 10 }}>Drop leads here</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics
const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const lineData = [380, 420, 450, 540, 490, 590, 150];
  const convData = [20, 25, 28, 32, 30, 35, 18];
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const W = 500, H = 180;
  const maxL = Math.max(...lineData);
  const mkPts = (data) => data.map((v,i) => `${(i/(data.length-1))*W},${H-(v/maxL)*H}`).join(" ");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Campaign Analytics</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 14 }}>Deep dive into your Meta advertising performance and ROI</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <select value={dateRange} onChange={e => setDateRange(e.target.value)}
            style={{ padding: "8px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 13, fontFamily: "inherit", cursor: "pointer", outline: "none" }}>
            {["Last 7 Days","Last 30 Days","Last 90 Days"].map(o => <option key={o}>{o}</option>)}
          </select>
          <Btn variant="secondary" size="sm" icon={<Icons.filter />}>Filter</Btn>
          <Btn size="sm" icon={<Icons.export />}>Export Report</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Leads", value: "12,482", trend: "up", val: "14.5%", color: C.primary },
          { label: "Conversion Rate", value: "8.2%", trend: "up", val: "2.1%", color: "#6366F1" },
          { label: "Total Spend", value: "₹4,82,000", trend: "down", val: "5.4%", color: C.danger },
          { label: "Generated Revenue", value: "₹24,15,000", trend: "up", val: "18.2%", color: C.success },
        ].map((s, i) => (
          <Card key={i} padding={18}>
            <div style={{ fontSize: 13, color: C.textSub, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: s.trend === "up" ? C.success : C.danger, marginTop: 4 }}>
              {s.trend === "up" ? "↑" : "↓"} {s.val}
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Leads vs Conversions</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 20 }}>Daily performance overview across all campaigns</div>
          <svg width="100%" viewBox={`0 0 ${W} ${H+30}`}>
            <polyline points={mkPts(lineData)} fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={mkPts(convData)} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {lineData.map((v,i) => <circle key={i} cx={(i/(lineData.length-1))*W} cy={H-(v/maxL)*H} r="4" fill={C.primary} stroke="#fff" strokeWidth="2" />)}
            {days.map((d,i) => <text key={i} x={(i/(days.length-1))*W} y={H+24} textAnchor="middle" fontSize="11" fill={C.textMuted}>{d}</text>)}
          </svg>
          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}><span style={{ width: 12, height: 3, background: C.primary, display: "inline-block", borderRadius: 2 }} />Inbound Leads</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}><span style={{ width: 12, height: 3, background: "#10B981", display: "inline-block", borderRadius: 2 }} />Converted Deals</div>
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Revenue by Campaign</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 20 }}>Top performing ad sets by total value</div>
          {[
            { name: "Retargeting_LAL", pct: 90 },
            { name: "Cold_Interests_V1", pct: 65 },
            { name: "Demo_Form_Campaign", pct: 52 },
            { name: "Video_Engagement", pct: 38 },
            { name: "Old_Customer_Upsell", pct: 22 },
          ].map((c, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                <span style={{ color: C.textSub }}>{c.name}</span>
              </div>
              <div style={{ background: C.border, borderRadius: 4, height: 10 }}>
                <div style={{ width: `${c.pct}%`, height: "100%", background: C.primary, borderRadius: 4, transition: "width 1s" }} />
              </div>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Cost per Booking (CPA)</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Efficiency of ad spend over time</div>
          <svg width="100%" viewBox="0 0 400 120">
            <defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EF444440"/><stop offset="100%" stopColor="#EF444400"/></linearGradient></defs>
            <path d="M0,80 C40,50 80,90 120,60 C160,30 200,70 240,50 C280,30 320,40 360,30 L360,120 L0,120 Z" fill="url(#grad)" />
            <path d="M0,80 C40,50 80,90 120,60 C160,30 200,70 240,50 C280,30 320,40 360,30" fill="none" stroke={C.danger} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Top Locations</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Lead volume by region</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DonutChart segments={[
              { pct: 45, color: "#3B5BDB" }, { pct: 30, color: "#10B981" },
              { pct: 15, color: "#1E1B4B" }, { pct: 10, color: "#F59E0B" }
            ]} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {[["Mumbai","45%","#3B5BDB"],["Delhi","30%","#10B981"],["Bangalore","15%","#1E1B4B"],["Other","10%","#F59E0B"]].map(([city,pct,color]) => (
              <div key={city} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
                {city} {pct}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Sales Conversion</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Team closure performance</div>
          <svg width="100%" viewBox="0 0 200 120">
            {[["Rajesh K.",40,70,10],["Priya S.",55,80,45],["Amit M.",38,65,30],["Sneha L.",50,75,40]].map(([n,a,c,x],i) => (
              <g key={n}>
                <rect x={x} y={120-(a/100)*110} width={14} height={(a/100)*110} rx={3} fill={C.border} />
                <rect x={x+16} y={120-(c/100)*110} width={14} height={(c/100)*110} rx={3} fill={C.success} />
                <text x={x+15} y={118} textAnchor="middle" fontSize="8" fill={C.textMuted}>{n.split(" ")[0]}</text>
              </g>
            ))}
          </svg>
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}><span style={{ width: 10, height: 10, background: C.border, display: "inline-block" }} />Assigned</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}><span style={{ width: 10, height: 10, background: C.success, display: "inline-block" }} />Closed</div>
          </div>
        </Card>
      </div>

      <Card style={{ background: `linear-gradient(135deg, ${C.primaryLight} 0%, #fff 100%)`, borderColor: C.primary + "30" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>↗</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: ".06em" }}>AI INSIGHTS & RECOMMENDATIONS</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8 }}>Optimization Opportunity Found</div>
            <div style={{ fontSize: 14, color: C.textSub }}>
              The <strong>Retargeting_LAL</strong> campaign has a 3x higher conversion rate than average. We recommend reallocating 15% of the budget from <strong>Video_Engagement</strong> to maximize ROI this week.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0, marginLeft: 24 }}>
            <Btn variant="secondary" size="sm">Dismiss</Btn>
            <Btn size="sm">Apply Changes</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Workflows
const WorkflowsPage = () => {
  const steps = [
    { type: "trigger", label: "New Facebook Lead", desc: "Triggered when a user submits a Lead Form on Facebook or Instagram.", color: "#E0E7FF", border: "#6366F1", icon: "👤" },
    { type: "condition", label: "Lead Score > 80?", desc: "Check if the automated lead quality score exceeds 80 based on profile data.", color: "#F0FDF4", border: "#22C55E", icon: "✓" },
    { type: "action", label: "Send WhatsApp Template", desc: "Auto-send 'High-Intent Welcome' WhatsApp message from Meta Business API.", color: "#EFF6FF", border: "#3B82F6", icon: "💬" },
    { type: "delay", label: "Wait 2 Hours", desc: "Pause flow for 120 minutes before proceeding to the next step.", color: "#FFFBEB", border: "#F59E0B", icon: "⏱" },
    { type: "action", label: "Notify Sales Team", desc: "Send immediate notification to top closers via Mobile App, Slack, and Email.", color: "#EFF6FF", border: "#3B5BDB", icon: "🔔" },
  ];
  const typeColors = { trigger: "#6366F1", condition: "#22C55E", action: "#3B82F6", delay: "#F59E0B" };

  const actions = {
    "Triggers": [["New Facebook Lead","Instant capture from Meta forms"],["New Messenger Chat","User starts a conversation"],["Website Visit","Meta Pixel event detection"]],
    "Logic & Flow": [["Conditional Split","If/Else logic based on data"],["Wait / Delay","Pause for a set duration"],["Lead Score Check","Filter based on quality score"]],
    "Meta Actions": [["Send WhatsApp","Use pre-approved templates"],["Messenger Reply","Send an automated DM"],["Add to Audience","Sync to Custom Audiences"]],
    "Notifications": [["Internal Alert","Notify team via workspace"],["Push Notification","Alert sales via mobile app"]],
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, background: "#fff", padding: "16px 0", borderBottom: `1px solid ${C.border}`, marginTop: -28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary }}><Icons.zap /></div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: C.text }}>High-Intent Fast Track</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>Last edited 2 mins ago by Alex</div>
          </div>
          <Badge label="Active" color="green" />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="secondary" size="sm" icon={<Icons.play />}>Test Flow</Btn>
          <Btn size="sm" icon={<Icons.save />}>Save Workflow</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 0, minHeight: "calc(100vh - 200px)" }}>
        {/* Canvas */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px", background: "#F8F9FC", borderRadius: "0 0 0 12px" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 360, background: "#fff", border: `2px solid ${step.border}`, borderRadius: 12, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: step.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{step.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: typeColors[step.type], letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>{step.type}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{step.label}</div>
                    <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>{step.desc}</div>
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "8px 0" }}>
                  <div style={{ width: 2, height: 24, background: C.border }} />
                  <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${C.border}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: C.textMuted, cursor: "pointer" }}>+</div>
                </div>
              )}
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 16 }}>
            <div style={{ width: 2, height: 24, background: C.border }} />
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.success, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>✓</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, letterSpacing: ".08em", marginTop: 8 }}>END OF AUTOMATION</div>
          </div>
        </div>

        {/* Action Panel */}
        <div style={{ borderLeft: `1px solid ${C.border}`, padding: 20, background: "#fff", overflowY: "auto" }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icons.search /></span>
            <input placeholder="Find actions..." style={{ width: "100%", padding: "9px 12px 9px 34px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          {Object.entries(actions).map(([section, items]) => (
            <div key={section} style={{ marginBottom: 20 }}>
              <button style={{ display: "flex", justifyContent: "space-between", width: "100%", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, color: C.text, padding: "4px 0 10px" }}>
                {section} <Icons.chevron_down />
              </button>
              {items.map(([name, desc]) => (
                <div key={name} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 6, border: `1px solid ${C.border}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.primaryLight; e.currentTarget.style.borderColor = C.primary; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = C.border; }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{name}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{desc}</div>
                </div>
              ))}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>View Options</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="secondary" size="sm" style={{ flex: 1, justifyContent: "center" }}>Select</Btn>
              <Btn variant="secondary" size="sm" style={{ flex: 1, justifyContent: "center" }}>Auto-Align</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lead Scoring
const ScoringPage = () => {
  const [rules, setRules] = useState([
    { field: "Location", op: "equals", val: "Mumbai", pts: 40 },
    { field: "Budget", op: "greater than", val: "50000", pts: 30 },
    { field: "Job Title", op: "contains", val: "CEO", pts: 25 },
    { field: "Lead Source", op: "equals", val: "Meta Ads", pts: 15 },
    { field: "Email", op: "ends with", val: ".edu", pts: -20 },
  ]);
  const fields = ["Location","Budget","Job Title","Lead Source","Email","Phone","Campaign","Company Size"];
  const ops = ["equals","greater than","less than","contains","starts with","ends with"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Lead Scoring Rules</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 14 }}>Configure the logic used to automatically rank and prioritize your Meta leads based on profile data and custom field inputs.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="secondary" size="sm" icon={<Icons.refresh />}>Reset</Btn>
          <Btn size="sm" icon={<Icons.save />}>Save Rules</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24, marginTop: 20 }}>
        {[
          { label: "Total Leads Scored", value: "24,592", sub: "Last 30 days", color: C.primary },
          { label: "Average Lead Score", value: "64.2", sub: "Across all campaigns", color: "#6366F1" },
          { label: "Hot Leads (70+)", value: "18.4%", sub: "Conversion ready", color: C.warning },
          { label: "Scoring Accuracy", value: "92%", sub: "Based on sales feedback", color: C.success },
        ].map((s, i) => (
          <Card key={i} padding={18}>
            <div style={{ fontSize: 12, color: C.textSub, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.text }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <Card style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Active Rules <Badge label="5" color="blue" /></div>
              <Btn variant="ghost" size="sm" icon={<Icons.plus />}>Add New Rule</Btn>
            </div>
            {rules.map((rule, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: i < rules.length-1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ color: C.textMuted, cursor: "grab" }}><Icons.drag /></div>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textSub, minWidth: 20 }}>If</span>
                <select defaultValue={rule.field} style={{ padding: "7px 10px", border: `1.5px solid ${C.border}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit", flex: 1, outline: "none" }}>
                  {fields.map(f => <option key={f}>{f}</option>)}
                </select>
                <select defaultValue={rule.op} style={{ padding: "7px 10px", border: `1.5px solid ${C.border}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit", flex: 1, outline: "none" }}>
                  {ops.map(o => <option key={o}>{o}</option>)}
                </select>
                <input defaultValue={rule.val} style={{ padding: "7px 10px", border: `1.5px solid ${C.border}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit", width: 90, outline: "none" }} />
                <span style={{ fontSize: 13, color: C.textSub, fontWeight: 600 }}>then</span>
                <input type="number" defaultValue={Math.abs(rule.pts)}
                  style={{ padding: "7px 8px", border: `1.5px solid ${rule.pts < 0 ? C.danger : C.border}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit", width: 60, outline: "none", textAlign: "right", color: rule.pts < 0 ? C.danger : C.text, fontWeight: 700 }} />
                <span style={{ fontSize: 13, color: C.textSub }}>PTS</span>
                <button onClick={() => setRules(rules.filter((_,j) => j !== i))}
                  style={{ border: "none", background: "none", cursor: "pointer", color: C.textMuted, padding: 4 }}><Icons.trash /></button>
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Global Scoring Settings</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16 }}>Baseline rules applied to every new lead.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: C.bg, borderRadius: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary }}><Icons.leads /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Default Starting Score</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Applied to all leads upon ingestion</div>
              </div>
              <input type="number" defaultValue={0} style={{ width: 60, padding: "8px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 15, fontWeight: 700, textAlign: "right", fontFamily: "inherit", outline: "none" }} />
              <span style={{ fontWeight: 600, color: C.textSub }}>PTS</span>
            </div>
          </Card>

          <Card style={{ marginTop: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Recent Score Adjustments</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Audit log of scoring actions taken on recent leads.</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Lead Name","Reason","Impact","New Score","Time"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: ".05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Rohan Sharma","Mumbai Location Match","+40","82","2 mins ago"],
                  ["Sarah Miller","CEO Job Title Match","+25","68","14 mins ago"],
                  ["Priya Verma","Low Budget Detection","-10","34","1 hour ago"],
                  ["David Chen","High Budget Detection","+30","91","3 hours ago"],
                  ["Anil Gupta","Meta Ad Referral","+15","55","5 hours ago"],
                ].map(([name,reason,impact,score,time],i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding:"10px" ,fontWeight:600,fontSize:13}}>{name}</td>
                    <td style={{ padding:"10px",fontSize:13,color:C.textSub}}>{reason}</td>
                    <td style={{ padding:"10px",fontWeight:700,color:impact.startsWith("+") ? C.success : C.danger}}>{impact}</td>
                    <td style={{ padding:"10px",fontWeight:700,fontSize:14}}>{score}</td>
                    <td style={{ padding:"10px",fontSize:12,color:C.textMuted}}>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Predicted Score Impact</div>
              <Badge label="Live" color="green" />
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Distribution of existing leads with current rules.</div>
            <svg width="100%" viewBox="0 0 200 100">
              {[[0,40,10],["41-60",60,55],["61-80",90,100],["81-100",70,145]].map(([label,h,x],i) => (
                <g key={i}>
                  <rect x={x} y={100-h} width={40} height={h} rx={4} fill={i === 2 ? C.primary : i === 3 ? C.accent : C.border} />
                </g>
              ))}
              <text x="15" y="115" fontSize="9" fill={C.textMuted}>21-40</text>
              <text x="55" y="115" fontSize="9" fill={C.textMuted}>41-60</text>
              <text x="100" y="115" fontSize="9" fill={C.textMuted}>61-80</text>
              <text x="145" y="115" fontSize="9" fill={C.textMuted}>81-100</text>
            </svg>
          </Card>

          <Card>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Scoring Tiers</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Labels assigned based on final scores.</div>
            {[
              { tier: "Hot", count: "1,420 LEADS", threshold: "> 75", color: C.danger },
              { tier: "Warm", count: "3,810 LEADS", threshold: "> 40", color: C.warning },
              { tier: "Cold", count: "12,542 LEADS", threshold: "> 0", color: "#94A3B8" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.tier}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{t.count}</div>
                </div>
                <div style={{ background: C.bg, padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 700, color: C.text }}>{t.threshold}</div>
              </div>
            ))}
            <button style={{ fontSize: 13, color: C.primary, fontWeight: 600, border: "none", background: "none", cursor: "pointer", marginTop: 10, padding: 0 }}>Manage Tier Notifications →</button>
          </Card>

          <Card style={{ background: `linear-gradient(135deg, ${C.primaryLight}, #fff)` }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>+</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Automate Follow-ups</div>
            </div>
            <div style={{ fontSize: 13, color: C.textSub, marginBottom: 14 }}>Trigger WhatsApp messages automatically when a lead's score crosses a threshold.</div>
            <Btn style={{ width: "100%", justifyContent: "center" }}>Go to Workflow Builder</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Team
const TeamPage = () => {
  const members = [
    { name: "Alex Smith", email: "alex@metaos.ai", role: "Admin", status: "Active", leads: 450, response: "4m", closing: 88 },
    { name: "Sarah Chen", email: "sarah.c@metaos.ai", role: "Sales", status: "Active", leads: 892, response: "2m", closing: 94 },
    { name: "Mark Thompson", email: "m.thompson@metaos.ai", role: "Manager", status: "Active", leads: 120, response: "12m", closing: 76 },
    { name: "Priya Rao", email: "priya.rao@metaos.ai", role: "Sales", status: "Active", leads: 645, response: "6m", closing: 82 },
    { name: "James Wilson", email: "j.wilson@metaos.ai", role: "Sales", status: "Invited", leads: null, response: "-", closing: 0 },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Team Management</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 14 }}>Manage user roles, monitor performance, and invite collaborators.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="secondary" size="sm" icon={<Icons.export />}>Export Stats</Btn>
          <Btn size="sm" icon={<Icons.leads />}>Invite Member</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Team", value: "12 Members", sub: "+2 joined this month", color: C.primary },
          { label: "Avg. Response", value: "5.2 min", sub: "-1.4m faster than avg", trend: "up", color: "#6366F1" },
          { label: "Team Closing Rate", value: "84.2%", sub: "Highest in Q3", trend: "up", color: C.success },
          { label: "Rev. Generated", value: "₹14,20,500", sub: "Last 30 days", color: C.warning },
        ].map((s, i) => <StatCard key={i} label={s.label} value={s.value} color={s.color} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
        <Card>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icons.search /></span>
              <input placeholder="Search name or email..." style={{ width: "100%", padding: "9px 12px 9px 38px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>
            <Btn variant="secondary" size="sm" icon={<Icons.filter />}>Filter</Btn>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["User","Role","Status","Leads","Response","Closing Rate"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 600, color: C.textMuted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = C.bg}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={m.name} size={36} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: C.textMuted }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <Badge label={m.role} color={m.role === "Admin" ? "blue" : m.role === "Manager" ? "purple" : "gray"} />
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: m.status === "Active" ? C.success : C.warning }} />
                      <span style={{ fontSize: 13 }}>{m.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px", fontSize: 14, fontWeight: 600 }}>{m.leads || "-"}</td>
                  <td style={{ padding: "12px", fontSize: 13, color: C.textSub }}>{m.response}</td>
                  <td style={{ padding: "12px", minWidth: 160 }}>
                    {m.status !== "Invited" ? (
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{m.closing}%</div>
                        <div style={{ background: C.border, borderRadius: 4, height: 6 }}>
                          <div style={{ width: `${m.closing}%`, height: "100%", background: C.primary, borderRadius: 4 }} />
                        </div>
                      </div>
                    ) : <span style={{ fontSize: 13, color: C.textMuted }}>0%</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center", padding: "14px 0 0", borderTop: `1px solid ${C.border}`, marginTop: 8 }}>
            <button style={{ color: C.primary, fontWeight: 600, fontSize: 13, border: "none", background: "none", cursor: "pointer" }}>View All 12 Members →</button>
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 16 }}>🏆</span>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Top Performer</div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar name="Sarah Chen" size={48} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Sarah Chen</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Senior Sales Executive</div>
                <div style={{ fontSize: 12, color: C.success, fontWeight: 700, marginTop: 4 }}>94% Conversion</div>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Live Activity</div>
            {[
              { user: "Sarah Chen", action: "Closed ₹4.5k deal", time: "2m ago", color: C.success },
              { user: "Mark Thompson", action: "Assigned 12 leads", time: "15m ago", color: C.primary },
              { user: "Priya Rao", action: "Response goal met", time: "1h ago", color: "#6366F1" },
              { user: "System", action: "Monthly report ready", time: "3h ago", color: C.textMuted },
            ].map((a, i) => (
              <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: a.color }}>{a.user}</strong> {a.action}
                </div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>{a.time}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

// Integrations
const IntegrationsPage = () => {
  const [connectedStates, setConnectedStates] = useState({
    "Meta Ads Manager": true, "WhatsApp Business API": true, "Google Sheets": true,
    "Twilio SMS": false, "ActiveCampaign": false, "Zapier": false, "Webhooks": false,
  });
  const toggle = name => setConnectedStates(prev => ({ ...prev, [name]: !prev[name] }));

  const sections = [
    {
      title: "Core Meta Ecosystem", badge: null, integrations: [
        { name: "Meta Ads Manager", desc: "Sync leads directly from your Facebook and Instagram ad campaigns.", tag: "Core", lastSync: "Last synced: 2 mins ago" },
        { name: "WhatsApp Business API", desc: "Automate lead follow-ups and notifications via WhatsApp Cloud API.", tag: "Core", lastSync: "Last synced: 15 mins ago" },
      ]
    },
    {
      title: "Communication & Engagement", badge: "2 Available", integrations: [
        { name: "Twilio SMS", desc: "Send SMS notifications and alerts for high-priority lead events.", warning: true },
        { name: "ActiveCampaign", desc: "Sync your conversion data back to your email marketing CRM." },
      ]
    },
    {
      title: "Data Management & CRM", badge: "3 Available", integrations: [
        { name: "Google Sheets", desc: "Export leads automatically to shared spreadsheets for team tracking.", lastSync: "Last synced: 1 hour ago" },
        { name: "Zapier", desc: "Connect to 5,000+ apps and create custom multi-step workflows." },
        { name: "Webhooks", desc: "Generic HTTP endpoints for custom internal integrations." },
      ]
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Integrations Hub</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 14 }}>Connect your favorite tools to automate lead capture and communication.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="secondary" size="sm">3 Active Apps</Btn>
          <Btn variant="danger" size="sm">1 Attention Required</Btn>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["All Tools", "Connected", "Action Required"].map((t, i) => (
          <button key={t} style={{ padding: "8px 18px", borderRadius: 8, border: `1.5px solid ${i === 0 ? C.primary : C.border}`, background: i === 0 ? C.primary : "#fff", color: i === 0 ? "#fff" : C.textSub, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icons.search /></span>
          <input placeholder="Search integrations..." style={{ padding: "8px 12px 8px 34px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
        </div>
      </div>

      {sections.map(section => (
        <div key={section.title} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ color: C.primary }}><Icons.check /></span>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{section.title}</h3>
            {section.badge && <Badge label={section.badge} color="gray" />}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
            {section.integrations.map(intg => {
              const isConn = connectedStates[intg.name];
              return (
                <Card key={intg.name} padding={20}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: `1px solid ${C.border}` }}>
                      {intg.name.includes("Meta") ? "Ⓜ" : intg.name.includes("WhatsApp") ? "💬" : intg.name.includes("Twilio") ? "📱" : intg.name.includes("Google") ? "📊" : intg.name.includes("Zapier") ? "⚡" : "🔗"}
                    </div>
                    {intg.tag && <Badge label={intg.tag} color="blue" />}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{intg.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", color: isConn ? C.success : intg.warning ? C.warning : C.textMuted, marginBottom: 8 }}>
                    {isConn ? "● CONNECTED" : intg.warning ? "⚠ WARNING" : "○ DISCONNECTED"}
                  </div>
                  <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.5, marginBottom: 14 }}>{intg.desc}</div>
                  {intg.lastSync && isConn && <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 12 }}>🔄 {intg.lastSync}</div>}
                  <Btn variant={isConn ? "secondary" : "primary"} size="sm" style={{ width: "100%", justifyContent: "center" }} onClick={() => toggle(intg.name)}>
                    {isConn ? "Manage ↗" : "Connect +"}
                  </Btn>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      <Card style={{ background: C.primaryLight, borderColor: C.primary + "30" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.primaryLight, border: `2px solid ${C.primary}30`, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary }}><Icons.globe /></div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.primary }}>Need a custom integration?</div>
              <div style={{ fontSize: 13, color: C.textSub }}>Our API and Webhook suite allow you to connect any custom CRM or proprietary internal tool. Check our developer documentation or request a dedicated integration from our engineering team.</div>
            </div>
          </div>
          <Btn variant="secondary" size="sm" icon={<Icons.refresh />}>Request Integration</Btn>
        </div>
      </Card>
    </div>
  );
};

// Billing
const BillingPage = () => {
  const invoices = [
    { id: "INV-2024-001", date: "Sep 24, 2024", amount: "₹6,999", plan: "Growth", status: "Paid" },
    { id: "INV-2024-002", date: "Aug 24, 2024", amount: "₹6,999", plan: "Growth", status: "Paid" },
    { id: "INV-2024-003", date: "Jul 24, 2024", amount: "₹2,999", plan: "Starter", status: "Paid" },
    { id: "INV-2024-004", date: "Jun 24, 2024", amount: "₹2,999", plan: "Starter", status: "Paid" },
    { id: "INV-2024-005", date: "May 24, 2024", amount: "₹2,999", plan: "Starter", status: "Refunded" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Billing & Plans</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 14 }}>Manage your workspace subscription and payment methods.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="secondary" size="sm" icon={<Icons.clock />}>View Billing Logs</Btn>
          <Btn size="sm">Upgrade Plan</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
        <div>
          <Card style={{ marginBottom: 20, background: `linear-gradient(135deg, #F0F3FF, #fff)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <Badge label="ACTIVE" color="green" />
                <div style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "10px 0 4px" }}>Growth Plan</div>
                <div style={{ fontSize: 13, color: C.textSub }}>Professional tier for scaling lead automation teams.</div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: C.primary }}>₹6,999<span style={{ fontSize: 14, fontWeight: 500, color: C.textMuted }}>/mo</span></div>
            </div>
            <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
              {["5 User Seats", "WhatsApp Automation", "Advanced Analytics"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.textSub }}>
                  <span style={{ color: C.success }}>✓</span> {f}
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13, color: C.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
                <Icons.clock /> Next renewal on October 24, 2024
              </div>
              <button style={{ color: C.primary, fontWeight: 600, fontSize: 13, border: "none", background: "none", cursor: "pointer" }}>Change billing cycle</button>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13, color: C.textMuted }}>Your plan was last updated on Sep 24, 2024. Need more leads?</div>
              <Btn variant="secondary" size="sm">Compare Plans</Btn>
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Payment Methods</div>
              <Btn variant="ghost" size="sm" icon={<Icons.plus />}>Add Method</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              <div style={{ padding: "14px 16px", border: `2px solid ${C.primary}`, borderRadius: 10, position: "relative" }}>
                <Badge label="Default" color="blue" />
                <div style={{ fontSize: 14, marginTop: 10 }}>💳 •••• •••• •••• 4242</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>Expires 12/26</div>
              </div>
              <div style={{ padding: "14px 16px", border: `1.5px solid ${C.border}`, borderRadius: 10 }}>
                <div style={{ fontSize: 14 }}>📱 alex.smith@okaxis</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>UPI via Razorpay</div>
              </div>
              <div style={{ padding: "14px 16px", border: `2px dashed ${C.border}`, borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 6 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.primary}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <Icons.plus />
                <span style={{ fontSize: 13, color: C.textMuted }}>Add new</span>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Invoice History</div>
              <button style={{ color: C.primary, fontWeight: 600, fontSize: 13, border: "none", background: "none", cursor: "pointer" }}>Export to CSV ↗</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Invoice ID","Date","Amount","Plan","Status","Action"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, fontWeight: 600, color: C.textMuted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "12px", color: C.primary, fontWeight: 600, fontSize: 13 }}>{inv.id}</td>
                    <td style={{ padding: "12px", fontSize: 13 }}>{inv.date}</td>
                    <td style={{ padding: "12px", fontSize: 14, fontWeight: 700 }}>{inv.amount}</td>
                    <td style={{ padding: "12px" }}><Badge label={inv.plan} color={inv.plan === "Growth" ? "blue" : "gray"} /></td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {inv.status === "Refunded" && <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.warning, display: "inline-block" }} />}
                        <span style={{ fontSize: 13, color: inv.status === "Refunded" ? C.warning : C.text }}>{inv.status}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <button style={{ color: C.textSub, border: "none", background: "none", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                        <Icons.export /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: "center", padding: "14px 0 0", borderTop: `1px solid ${C.border}`, marginTop: 8 }}>
              <button style={{ color: C.primary, fontSize: 13, fontWeight: 600, border: "none", background: "none", cursor: "pointer" }}>Load more invoices →</button>
            </div>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
              <span style={{ color: C.primary }}><Icons.zap /></span>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Monthly Lead Limit</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: C.textSub }}>850 Leads</span>
              <span style={{ fontWeight: 600 }}>1,000 Leads</span>
            </div>
            <div style={{ background: C.border, borderRadius: 6, height: 8, marginBottom: 8 }}>
              <div style={{ width: "85%", height: "100%", background: C.primary, borderRadius: 6 }} />
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>85% of monthly limit reached</div>
          </Card>

          <Card>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
              <span style={{ color: "#6366F1" }}><Icons.team /></span>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Team Seat Usage</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: C.textSub }}>3 Users</span>
              <span style={{ fontWeight: 600 }}>5 Users</span>
            </div>
            <div style={{ background: C.border, borderRadius: 6, height: 8, marginBottom: 8 }}>
              <div style={{ width: "60%", height: "100%", background: "#6366F1", borderRadius: 6 }} />
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>60% of monthly limit reached</div>
          </Card>

          <Card style={{ background: "#FFF7ED", borderColor: C.warning + "40" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <span>⚠️</span>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E" }}>Heads Up!</div>
            </div>
            <div style={{ fontSize: 13, color: "#92400E" }}>You are at 85% of your lead limit. Automated captures will pause once limit is hit.</div>
          </Card>

          <div style={{ textAlign: "center", borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
            <div style={{ fontSize: 12, color: C.textMuted }}>All transactions are encrypted and processed securely via Stripe or Razorpay.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings
const SettingsPage = () => {
  const [settingsTab, setSettingsTab] = useState("Company Profile");
  const tabs = ["Company Profile", "Custom Lead Fields", "Notification Rules", "WhatsApp Templates", "API Keys"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 0, minHeight: "calc(100vh - 130px)" }}>
      <div style={{ borderRight: `1px solid ${C.border}`, paddingRight: 0 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setSettingsTab(t)}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 16px", border: "none", borderRadius: 9, cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: settingsTab === t ? 700 : 500, fontFamily: "inherit", background: settingsTab === t ? C.primary : "transparent", color: settingsTab === t ? "#fff" : C.textSub, transition: "all .15s", marginBottom: 4 }}>
            {t === "Company Profile" ? <Icons.integrations /> : t === "API Keys" ? <Icons.key /> : t === "WhatsApp Templates" ? <Icons.mail /> : <Icons.settings />}
            {t}
          </button>
        ))}
      </div>
      <div style={{ padding: "0 32px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>{settingsTab}</h2>
        <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 28 }}>Manage your business identity and general workspace settings.</p>
        <Card>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>General Information</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>This information will be visible to your team and in outgoing communication headers.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 72, height: 72, borderRadius: 16, background: C.bg, border: `2px dashed ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.textMuted, fontSize: 28 }}>🏢</div>
            <div>
              <Btn variant="secondary" size="sm">Change Logo</Btn>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>JPG, PNG or SVG. Max size 800K.</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <Input label="Company Name" placeholder="TechGrowth Solutions" defaultValue="TechGrowth Solutions" />
            <Input label="Industry" placeholder="Real Estate & Infrastructure" />
            <Input label="Website" placeholder="https://techgrowth.ai" />
            <Input label="Timezone" placeholder="Asia/Kolkata (GMT+05:30)" />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
            <Btn variant="secondary">Discard</Btn>
            <Btn icon={<Icons.save />}>Save Changes</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Support
const SupportPage = () => (
  <div>
    <div style={{ textAlign: "center", marginBottom: 36 }}>
      <Badge label="Support Center" color="blue" />
      <h1 style={{ fontSize: 34, fontWeight: 900, color: C.text, margin: "12px 0 8px" }}>How can we help you today?</h1>
      <p style={{ fontSize: 15, color: C.textMuted }}>Search our knowledge base, watch video tutorials, or chat with our success team.</p>
      <div style={{ position: "relative", maxWidth: 520, margin: "20px auto 12px" }}>
        <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icons.search /></span>
        <input placeholder="Search for articles, guides, and workflows..." style={{ width: "100%", padding: "14px 16px 14px 44px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
          onFocus={e => e.target.style.borderColor = C.primary}
          onBlur={e => e.target.style.borderColor = C.border} />
      </div>
      <div style={{ fontSize: 13, color: C.textMuted }}>
        Popular: {["WhatsApp Setup","Lead Scoring","Webhook API","Billing"].map((t,i) => (
          <span key={t}><button style={{ color: C.primary, border: "none", background: "none", cursor: "pointer", fontWeight: 600 }}>{t}</button>{i < 3 ? "  " : ""}</span>
        ))}
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}><Icons.integrations /> Knowledge Base</div>
          <button style={{ color: C.primary, fontWeight: 600, fontSize: 13, border: "none", background: "none", cursor: "pointer" }}>View All Categories</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
          {[
            { title: "Getting Started", sub: "Learn the basics of setting up your workspace and connecting Meta", count: 12, icon: "📖" },
            { title: "Automations", sub: "Master the workflow builder to create powerful follow-up sequences.", count: 24, icon: "⚡" },
            { title: "Lead Scoring", sub: "Configuring rules to prioritize your high-value leads automatically.", count: 8, icon: "✓" },
            { title: "Messaging APIs", sub: "Connecting WhatsApp, Messenger, and Email for multi-channel outreach.", count: 15, icon: "💬" },
            { title: "CRM Integration", sub: "Syncing your leads with Salesforce, Hubspot, or custom webhooks.", count: 10, icon: "🔗" },
            { title: "Billing & Plans", sub: "Information about subscriptions, usage limits, and invoices.", count: 6, icon: "💳" },
          ].map((item, i) => (
            <Card key={i} padding={18} style={{ cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.primary}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 12 }}>{item.sub}</div>
              <div style={{ color: C.primary, fontWeight: 600, fontSize: 13 }}>{item.count} Articles →</div>
            </Card>
          ))}
        </div>

        <div style={{ fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>🎥 Video Academy</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
          {[
            { title: "Connecting Meta Lead Forms in 5 Minutes", dur: "04:20" },
            { title: "Building an Abandoned Lead Recovery Workflow", dur: "12:45" },
            { title: "Understanding ROI Analytics and Attribution", dur: "08:15" },
            { title: "Advanced Lead Scoring Rule Strategies", dur: "06:30" },
          ].map((v, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <div style={{ background: `linear-gradient(135deg, #1E1B4B, #3B5BDB)`, height: 100, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16 }}>▶</div>
                <span style={{ position: "absolute", bottom: 8, right: 10, background: "rgba(0,0,0,.6)", color: "#fff", fontSize: 11, padding: "2px 6px", borderRadius: 4 }}>{v.dur}</span>
              </div>
              <div style={{ padding: 12, fontSize: 13, fontWeight: 600, color: C.text }}>{v.title}</div>
            </div>
          ))}
        </div>

        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Frequently Asked Questions</div>
        {[
          { q: "How many Meta Pages can I connect?", a: "Starter plans support up to 2 pages, while Growth and Scale plans allow for unlimited connections." },
          { q: "Does this work with Instagram DM leads?", a: null },
          { q: "Is my data compliant with GDPR?", a: null },
        ].map((faq, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
              {faq.q}
              <Icons.chevron_down />
            </div>
            {faq.a && <div style={{ fontSize: 13, color: C.textSub, marginTop: 10 }}>{faq.a}</div>}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #2563EB 100%)`, color: "#fff" }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Live Chat Support</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 16 }}>Average response time: &lt; 2 mins</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Avatar name="Sarah" size={36} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Sarah is online</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Support Lead</div>
            </div>
          </div>
          <Btn style={{ width: "100%", justifyContent: "center", background: "#fff", color: C.primary }}>Start Chat Session</Btn>
          <div style={{ fontSize: 11, textAlign: "center", marginTop: 10, opacity: 0.7 }}>Mon-Fri: 9 AM - 6 PM PST • Priority</div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Submit a Support Ticket</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Can't find what you're looking for? Reach out to our experts.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Input label="Issue Subject" placeholder="e.g. WhatsApp API Connection Error" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Select label="Department" options={["Technical","Billing","Sales"]} />
              <Select label="Urgency" options={["Low","Medium","High","Critical"]} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.textSub, display: "block", marginBottom: 5 }}>Detailed Description</label>
              <textarea placeholder="Please describe the issue, including steps to reproduce if applicable..." rows={4}
                style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 13, fontFamily: "inherit", resize: "vertical", outline: "none", boxSizing: "border-box" }}
                onFocus={e => e.target.style.borderColor = C.primary}
                onBlur={e => e.target.style.borderColor = C.border} />
            </div>
            <Btn style={{ width: "100%", justifyContent: "center" }}>Send Ticket Request</Btn>
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>MY ACTIVE TICKETS</div>
          {[
            { id: "#4512", title: "Webhook missing data", status: "In Progress" },
            { id: "#4498", title: "Plan upgrade issue", status: "Resolved" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: `1px solid ${C.border}`, cursor: "pointer" }}>
              <div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{t.id}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Badge label={t.status} color={t.status === "Resolved" ? "green" : "orange"} />
                <Icons.chevron_right />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  </div>
);

// ─── Auth Pages ───────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin, onSignup }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #EEF2FF 0%, #F0FEFF 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <Icons.logo />
        <span style={{ fontSize: 20, fontWeight: 900, color: C.text, letterSpacing: "-0.5px" }}>Meta Lead Conversion OS</span>
      </div>
      <div style={{ background: "#fff", borderRadius: 20, padding: 40, width: "100%", maxWidth: 440, boxShadow: "0 8px 40px rgba(59,91,219,.12)" }}>
        <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 8px" }}>Welcome back</h2>
        <p style={{ textAlign: "center", fontSize: 14, color: C.textMuted, marginBottom: 28 }}>Login to manage your Meta campaigns and automate your lead follow-ups.</p>
        <button style={{ width: "100%", padding: "12px", border: `1.5px solid ${C.border}`, borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24 }}>
          🔵 Continue with Google
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, letterSpacing: ".08em" }}>OR CONTINUE WITH EMAIL</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
          <Input label="Email Address" placeholder="name@company.com" type="email" value={email} onChange={e => setEmail(e.target.value)} prefix={<Icons.mail />} />
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.textSub }}>Password</label>
              <button style={{ fontSize: 13, color: C.primary, fontWeight: 600, border: "none", background: "none", cursor: "pointer" }}>Forgot password?</button>
            </div>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icons.key /></span>
              <input type={showPass ? "text" : "password"} placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)}
                style={{ width: "100%", padding: "10px 40px 10px 36px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                onFocus={e => e.target.style.borderColor = C.primary}
                onBlur={e => e.target.style.borderColor = C.border} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: C.textMuted }}>
                <Icons.eye />
              </button>
            </div>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: C.textSub }}>
            <input type="checkbox" /> Remember me for 30 days
          </label>
        </div>
        <Btn style={{ width: "100%", justifyContent: "center", padding: "14px" }} onClick={onLogin}>
          Sign in to Dashboard →
        </Btn>
        <div style={{ background: C.primaryLight, borderRadius: 10, padding: "12px 14px", marginTop: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: C.primary }}>💡</span>
          <div style={{ fontSize: 12, color: C.textSub }}>Tip: You can now sync your Instagram Direct messages automatically via the Integrations panel.</div>
        </div>
      </div>
      <div style={{ marginTop: 24, fontSize: 14, color: C.textMuted }}>
        Don't have an account yet? <button onClick={onSignup} style={{ color: C.primary, fontWeight: 700, border: "none", background: "none", cursor: "pointer", fontSize: 14 }}>Create a workspace</button>
      </div>
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {["Privacy Policy","Terms of Service","Help Center"].map(t => (
          <button key={t} style={{ fontSize: 12, color: C.textMuted, border: "none", background: "none", cursor: "pointer" }}>{t}</button>
        ))}
      </div>
    </div>
  );
};

const SignupPage = ({ onSignup, onLogin }) => {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", password: "" });
  const [agree, setAgree] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <div style={{ width: "40%", background: `linear-gradient(160deg, #2845C8, #3B5BDB)`, padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, background: "rgba(255,255,255,.25)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <span style={{ fontSize: 18, fontWeight: 800 }}>Meta OS</span>
        </div>
        <div>
          <h2 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.25, margin: "0 0 16px" }}>Scale your Meta Ads <span style={{ color: C.accent }}>with Zero Effort.</span></h2>
          {[
            { icon: "🚀", title: "30-Second Setup", sub: "Our automated engine provisions your workspace and connects your first Meta campaign in seconds." },
            { icon: "🛡", title: "Enterprise-Grade Privacy", sub: "Your lead data is encrypted and managed with bank-level security protocols at every stage." },
            { icon: "🌐", title: "Unified Global Reach", sub: "Manage WhatsApp, Instagram, and Facebook leads in one single, high-speed OS." },
          ].map(f => (
            <div key={f.title} style={{ display: "flex", gap: 14, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.accent, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.5 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex" }}>
            {["A","B","C","D"].map((l, i) => (
              <div key={l} style={{ width: 28, height: 28, borderRadius: "50%", background: ["#3B82F6","#10B981","#F59E0B","#EC4899"][i], display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, marginLeft: i > 0 ? -8 : 0, border: "2px solid #3B5BDB" }}>{l}</div>
            ))}
          </div>
          <span style={{ fontSize: 13, opacity: 0.85 }}>Trusted by 500+ global agencies</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: "48px", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, position: "absolute", top: 24, right: 24 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{ fontSize: 13, color: C.textSub, border: "none", background: "none", cursor: "pointer" }}>Need help?</button>
            <button style={{ fontSize: 13, color: C.primary, fontWeight: 600, border: "none", background: "none", cursor: "pointer" }}>Contact Sales</button>
          </div>
        </div>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: C.text, margin: "0 0 4px" }}>Create your workspace</h2>
        <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 28 }}>Join 2,000+ companies automating their Meta lead pipeline.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 560 }}>
          <Input label="Full Name" placeholder="John Doe" value={form.name} onChange={set("name")} prefix={<Icons.leads />} />
          <Input label="Company Name" placeholder="Acme Corp" value={form.company} onChange={set("company")} prefix={<Icons.integrations />} />
          <Input label="Business Email" placeholder="john@acme.com" type="email" value={form.email} onChange={set("email")} prefix={<Icons.mail />} />
          <Input label="Phone Number" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set("phone")} prefix={<Icons.phone />} />
          <div style={{ gridColumn: "1/-1" }}>
            <Input label="Password" placeholder="••••••••" type="password" value={form.password} onChange={set("password")} prefix={<Icons.key />} />
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>Minimum 8 characters with numbers and symbols.</div>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ display: "flex", gap: 8, cursor: "pointer", fontSize: 13, color: C.textSub, alignItems: "flex-start" }}>
              <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginTop: 2 }} />
              <span>I agree to the <button style={{ color: C.primary, fontWeight: 600, border: "none", background: "none", cursor: "pointer" }}>Terms of Service</button> and <button style={{ color: C.primary, fontWeight: 600, border: "none", background: "none", cursor: "pointer" }}>Privacy Policy</button>.</span>
            </label>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <Btn style={{ width: "100%", justifyContent: "center", padding: "14px" }} onClick={onSignup}>
              Create Workspace & Sign Up →
            </Btn>
          </div>
          <div style={{ gridColumn: "1/-1", background: C.bg, borderRadius: 10, padding: "12px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ color: C.primary }}>⚡</span>
            <div style={{ fontSize: 12, color: C.textSub }}><strong>Instant Activation:</strong> Your dedicated Meta OS workspace will be provisioned immediately upon registration.</div>
          </div>
        </div>
        <div style={{ marginTop: 24, fontSize: 14, color: C.textMuted }}>
          Already have an account? <button onClick={onLogin} style={{ color: C.primary, fontWeight: 700, border: "none", background: "none", cursor: "pointer" }}>Sign in here</button>
        </div>
        <div style={{ marginTop: 32, fontSize: 11, color: C.textMuted }}>© 2026 Meta Lead OS • Support • Privacy</div>
        <div style={{ position: "fixed", bottom: 20, right: 24, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, color: C.success, fontWeight: 600 }}>● System Status: Optimal</div>
      </div>
    </div>
  );
};

// ─── Landing Page ─────────────────────────────────────────────────────────────
const LandingPage = ({ onLogin, onSignup }) => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);
  const [navHov, setNavHov] = useState(null);

  const faqs = [
    { q: "Can I change my plan later?", a: "Yes, you can upgrade or downgrade your plan at any time from your billing settings. Changes take effect at the start of the next billing cycle." },
    { q: "Is there a free trial available?", a: "Yes! All plans come with a 14-day free trial. No credit card required." },
    { q: "How does Lead Scoring work?", a: "Our AI engine analyzes lead data including location, budget, job title, and behavioral signals to assign a quality score from 0-100." },
    { q: "Does this include the Meta Ads budget?", a: "No, Meta Lead Conversion OS is a CRM and automation platform. Your Meta Ads budget is managed separately in Meta Business Suite." },
    { q: "Is WhatsApp API support included?", a: "WhatsApp Business API integration is available on Growth and Scale plans." },
    { q: "What happens if I exceed my lead limit?", a: "We'll notify you at 85% usage. Upon hitting the limit, automated captures pause until the next billing cycle or you upgrade your plan." },
  ];

  return (
    <div style={{ fontFamily: "inherit", color: C.text }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(255,255,255,.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "0 40px", display: "flex", alignItems: "center", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 40 }}>
          <Icons.logo />
          <span style={{ fontSize: 15, fontWeight: 800, color: C.text }}>Meta Lead Conversion OS</span>
        </div>
        <div style={{ display: "flex", gap: 28, flex: 1 }}>
          {["Features","Pricing","Contact"].map(l => (
            <button key={l} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: C.textSub, fontFamily: "inherit" }}
              onMouseEnter={e => e.currentTarget.style.color = C.text}
              onMouseLeave={e => e.currentTarget.style.color = C.textSub}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Btn variant="ghost" onClick={onLogin}>Log in</Btn>
          <Btn onClick={onSignup} icon={<Icons.arrow />}>Start Free Trial</Btn>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 80px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
        <div>
          <Badge label="✨ NEW: AI-Driven Lead Scoring 2.0" color="blue" />
          <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, margin: "20px 0 20px", letterSpacing: "-1px" }}>
            Turn Every Meta Lead Into <span style={{ color: C.primary }}>Revenue</span>, Automatically.
          </h1>
          <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.6, marginBottom: 32, maxWidth: 480 }}>
            Stop losing high-intent leads to slow manual follow-ups. Capture, score, and engage Meta leads within seconds with the world's first conversion-centric OS.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <Btn size="lg" onClick={onSignup} icon={<Icons.arrow />}>Start Free Trial</Btn>
            <Btn size="lg" variant="secondary" icon={<Icons.play />}>Book Demo</Btn>
          </div>
          <div style={{ marginTop: 28, fontSize: 13, color: C.textMuted }}>TRUSTED BY</div>
        </div>
        <div style={{ background: `linear-gradient(135deg, #0F172A, #1E293B)`, borderRadius: 20, height: 320, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 24px 60px rgba(59,91,219,.2)" }}>
          <div style={{ textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: C.accent }}>142 Leads Today</div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,.6)", marginTop: 8 }}>↑ 12.5% vs yesterday</div>
            <div style={{ marginTop: 20, display: "flex", gap: 16, justifyContent: "center" }}>
              {[["8.4%","Conversion"],["28","Hot Leads"],["₹4.8L","Revenue"]].map(([v,l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>{v}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why fail */}
      <section style={{ padding: "60px 80px", background: C.bg }}>
        <h2 style={{ textAlign: "center", fontSize: 36, fontWeight: 900, marginBottom: 8 }}>Why Meta Advertisers Fail at Conversion</h2>
        <p style={{ textAlign: "center", color: C.textMuted, marginBottom: 48 }}>Traditional CRMs weren't built for the speed of social media leads. We fixed the fundamental gap.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 900, margin: "0 auto" }}>
          {[
            { title: "The Old Way", icon: "🔴", items: ["Manual Entry Lag — Leads sit in Meta Business Suite for hours before being seen.","Slow Follow-ups — Contact happens when the lead is already cold.","Poor Lead Quality — Spending time on junk leads instead of high-value prospects.","Zero Attribution — No idea which specific creative actually generated the revenue."], color: "#FEF2F2", border: "#FCA5A5" },
            { title: "The Meta OS Way", icon: "✅", items: ["Instant Sync — Real-time webhook capture means 0-second latency.","Auto-Engagement — WhatsApp and Email triggered within 3 minutes of signup.","Intelligent Scoring — AI ranks leads based on budget, intent, and location.","Closed-Loop Data — See exactly which ad spend resulted in a bank deposit."], color: "#F0FDF4", border: "#86EFAC" },
          ].map(col => (
            <div key={col.title} style={{ background: col.color, border: `1px solid ${col.border}`, borderRadius: 16, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span>{col.icon}</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{col.title}</h3>
              </div>
              {col.items.map((item, i) => {
                const [bold, rest] = item.split(" — ");
                return (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: col.border.replace("A5","888"), marginTop: 7, flexShrink: 0 }} />
                    <div style={{ fontSize: 14, lineHeight: 1.5 }}><strong>{bold}</strong> — {rest}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: "80px", textAlign: "center" }}>
        <Badge label="The Workflow" color="blue" />
        <h2 style={{ fontSize: 36, fontWeight: 900, margin: "16px 0 48px" }}>Simplified Conversion in 4 Steps</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {[
            { icon: "📥", title: "Capture Leads", sub: "Direct integration with Meta Lead Forms and Messengers." },
            { icon: "🧠", title: "Score Automatically", sub: "Our AI ranks leads based on your custom business rules." },
            { icon: "💬", title: "Auto Follow-up", sub: "Engage on WhatsApp, Email, or SMS instantly." },
            { icon: "📈", title: "Track Revenue", sub: "Connect sales data back to your Meta Ads campaigns." },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 16px" }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section style={{ padding: "40px 80px 80px", background: C.bg }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
          {[
            { icon: "🎯", title: "Lead Intelligence", sub: "Not all leads are equal. Automatically identify high-budget prospects before your team makes a single call." },
            { icon: "💬", title: "WhatsApp Flows", sub: "Automate conversational lead nurturing. Send catalogs, book meetings, and answer FAQs on autopilot." },
            { icon: "📊", title: "Precise Attribution", sub: "Know exactly which creative and campaign is driving the highest LTV customers, not just the cheapest leads." },
            { icon: "📈", title: "Advanced Analytics", sub: "Custom dashboards for your sales team, marketing agency, and executive leadership." },
          ].map(f => (
            <Card key={f.title} padding={20} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.5 }}>{f.sub}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats banner */}
      <div style={{ background: C.primary, padding: "32px 80px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        {[["45%","FASTER RESPONSE"],["12x","LEAD VISIBILITY"],["3.2x","ROI INCREASE"],["24/7","AUTO-FOLLOWUPS"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 36, fontWeight: 900 }}>{v}</div>
            <div style={{ fontSize: 11, letterSpacing: ".1em", opacity: 0.7 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <section style={{ padding: "80px", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 48 }}>Loved by 500+ Performance Marketers</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {[
            { text: "This tool halved our cost per acquisition. The auto-scoring ensures my sales team only spends time on genuine buyers.", name: "Sarah Jenkins", title: "Head of Growth, EduCorp" },
            { text: "The WhatsApp automation alone is worth the price. It's like having a 24/7 sales assistant that never sleeps.", name: "Marcus Thorne", title: "Founder, DigitalGrow Agency" },
            { text: "Finally, a platform that understands how Meta advertising actually works in the real world. Simple and powerful.", name: "Dena Rodriguez", title: "Managing Director, Axelmore" },
          ].map((t, i) => (
            <Card key={i} padding={24}>
              <div style={{ fontSize: 14, color: C.textSub, lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={t.name} size={36} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{t.title}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: "80px", background: C.bg }}>
        <Badge label="Simple, Transparent Pricing" color="blue" />
        <h2 style={{ textAlign: "center", fontSize: 42, fontWeight: 900, margin: "16px 0 8px" }}>Scale your Meta Ads <span style={{ color: C.primary }}>ROI</span></h2>
        <p style={{ textAlign: "center", color: C.textMuted, marginBottom: 36 }}>Choose the plan that fits your growth stage. All plans include automated lead capture and basic CRM features.</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 48 }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: billingPeriod === "monthly" ? C.text : C.textMuted }}>Monthly</span>
          <div style={{ width: 48, height: 26, background: C.primary, borderRadius: 13, cursor: "pointer", display: "flex", alignItems: "center", padding: "0 3px", position: "relative" }}
            onClick={() => setBillingPeriod(p => p === "monthly" ? "yearly" : "monthly")}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "transform .2s", transform: billingPeriod === "yearly" ? "translateX(22px)" : "translateX(0)" }} />
          </div>
          <span style={{ fontWeight: 600, fontSize: 14, color: billingPeriod === "yearly" ? C.text : C.textMuted }}>Yearly <Badge label="Save 25%" color="green" /></span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", gap: 20, maxWidth: 960, margin: "0 auto" }}>
          {[
            { name: "Starter", price: "₹2,999", period: "/month", tagline: "Perfect for solo creators and micro-businesses starting their lead gen journey.", features: ["2 Team Members","1,000 Leads / month","Basic Workflow Automation","Standard Lead Capture","Email Support"], disabled: ["Lead Scoring","WhatsApp-API Integration","Custom Analytics"], cta: "Start with Starter", ctaSub: "Start 14-day Free Trial", popular: false },
            { name: "Growth", price: "₹6,999", period: "/month", tagline: "The sweet spot for scaling businesses that need automated intelligence.", features: ["5 Team Members","5,000 Leads / month","Advanced Lead Scoring","Workflow Automation Builder","WhatsApp & Meta API","Real-time Analytics","Priority Chat Support","API Access"], cta: "Go Growth", ctaSub: "Start 14-day Free Trial", popular: true },
            { name: "Scale", price: "₹14,999", period: "/month", tagline: "Enterprise-grade power for high-volume agencies and large corporations.", features: ["Unlimited Team Members","50,000 Leads / month","Custom Scoring Rules","Multi-branch Automations","Full API & Webhook Access","White-label Reporting","Dedicated Account Manager","Custom SLAs"], cta: "Start Scale Trial", ctaSub: "Start 14-day Free Trial", popular: false },
          ].map(plan => (
            <div key={plan.name} style={{ background: plan.popular ? C.primary : "#fff", border: `2px solid ${plan.popular ? C.primary : C.border}`, borderRadius: 20, padding: 32, position: "relative", boxShadow: plan.popular ? "0 16px 48px rgba(59,91,219,.25)" : "none" }}>
              {plan.popular && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)" }}><Badge label="Most Popular" color="yellow" size="lg" /></div>}
              <div style={{ fontSize: 20, fontWeight: 800, color: plan.popular ? "#fff" : C.text, marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: plan.popular ? "#fff" : C.text }}>{plan.price}<span style={{ fontSize: 15, fontWeight: 500, opacity: .7 }}>{plan.period}</span></div>
              <div style={{ fontSize: 13, color: plan.popular ? "rgba(255,255,255,.75)" : C.textMuted, marginBottom: 24, lineHeight: 1.5 }}>{plan.tagline}</div>
              {plan.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 13, color: plan.popular ? "#fff" : C.text }}>
                  <span style={{ color: plan.popular ? C.accent : C.success }}>✓</span> {f}
                </div>
              ))}
              {plan.disabled?.map(f => (
                <div key={f} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 13, color: plan.popular ? "rgba(255,255,255,.35)" : C.textMuted, textDecoration: "line-through" }}>
                  <span>—</span> {f}
                </div>
              ))}
              <div style={{ marginTop: 24 }}>
                <button onClick={onSignup} style={{ width: "100%", padding: "13px", borderRadius: 10, border: plan.popular ? "2px solid rgba(255,255,255,.3)" : `2px solid ${C.border}`, background: plan.popular ? "rgba(255,255,255,.15)" : "#fff", color: plan.popular ? "#fff" : C.text, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", marginBottom: 8 }}>{plan.cta}</button>
                <div style={{ textAlign: "center", fontSize: 12, color: plan.popular ? "rgba(255,255,255,.6)" : C.textMuted }}>{plan.ctaSub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span style={{ color: C.primary }}><Icons.globe /></span>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Frequently Asked Questions</h2>
        </div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "none", background: "#fff", cursor: "pointer", fontSize: 15, fontWeight: 600, color: C.text, fontFamily: "inherit" }}>
              {faq.q}
              <span style={{ transition: "transform .2s", display: "inline-block", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}><Icons.chevron_down /></span>
            </button>
            {openFaq === i && (
              <div style={{ padding: "0 20px 18px", fontSize: 14, color: C.textSub, lineHeight: 1.6 }}>{faq.a}</div>
            )}
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background: C.primary, padding: "80px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, margin: "0 0 16px" }}>Ready to double your conversions?</h2>
        <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 36 }}>Join 2,500+ businesses using Meta Lead Conversion OS to streamline their sales pipeline.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24 }}>
          <button onClick={onSignup} style={{ padding: "16px 36px", borderRadius: 12, border: "2px solid #fff", background: "#fff", color: C.primary, fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "inherit" }}>Start Your Free Trial</button>
          <button style={{ padding: "16px 36px", borderRadius: 12, border: "2px solid rgba(255,255,255,.4)", background: "transparent", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "inherit" }}>Book a Demo</button>
        </div>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", opacity: 0.75, fontSize: 13 }}>
          {["✓ No credit card required","✓ Cancel anytime","✓ 14-day full access"].map(t => <span key={t}>{t}</span>)}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#fff", padding: "48px 80px 24px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 36 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Icons.logo />
              <span style={{ fontWeight: 800, fontSize: 15 }}>Meta Lead Conversion OS</span>
            </div>
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>The ultimate OS for Meta advertisers looking to maximize their ROI through automated lead conversion.</p>
          </div>
          {[
            { title: "Product", links: ["Features","Pricing","Automations","Integrations"] },
            { title: "Company", links: ["About Us","Contact","Careers","Privacy Policy"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>{col.title}</div>
              {col.links.map(l => <div key={l}><button style={{ color: C.textSub, fontSize: 13, border: "none", background: "none", cursor: "pointer", marginBottom: 8, padding: 0, fontFamily: "inherit" }}>{l}</button></div>)}
            </div>
          ))}
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Stay Updated</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="Enter email" style={{ flex: 1, padding: "9px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
              <Btn size="sm">Join</Btn>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, textAlign: "center", fontSize: 12, color: C.textMuted }}>
          © 2026 Meta Lead Conversion OS. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("landing"); // landing | login | signup | app
  const [activePage, setActivePage] = useState("dashboard");

  if (view === "landing") return <LandingPage onLogin={() => setView("login")} onSignup={() => setView("signup")} />;
  if (view === "login") return <LoginPage onLogin={() => setView("app")} onSignup={() => setView("signup")} />;
  if (view === "signup") return <SignupPage onSignup={() => setView("app")} onLogin={() => setView("login")} />;

  const pages = {
    dashboard: <DashboardPage />,
    leads: <LeadsPage />,
    pipeline: <PipelinePage />,
    analytics: <AnalyticsPage />,
    workflows: <WorkflowsPage />,
    scoring: <ScoringPage />,
    team: <TeamPage />,
    integrations: <IntegrationsPage />,
    billing: <BillingPage />,
    settings: <SettingsPage />,
    support: <SupportPage />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
        input, select, textarea, button { font-family: 'DM Sans', sans-serif; }
      `}</style>
      <Sidebar active={activePage} setActive={setActivePage} />
      <div style={{ marginLeft: 220, flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar onSearch={() => {}} />
        <main style={{ marginTop: 64, padding: 28, flex: 1 }}>
          {pages[activePage] || <DashboardPage />}
        </main>
      </div>
    </div>
  );
}
