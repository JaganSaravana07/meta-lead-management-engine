import { useState, useEffect, useRef } from "react";
import { supabase } from './lib/supabase';


// ─── Icons (inline SVG components) ───────────────────────────────────────────
const Icon = ({ d, size = 18, color = "currentColor", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);


const Icons = {
  logo: () => <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="#3B5BDB" /><path d="M7 14c0-4 3-7 7-7s7 3 7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" /><path d="M9 16.5c1-2.5 5-2.5 6 0" stroke="#60EFFF" strokeWidth="2" strokeLinecap="round" /></svg>,
  dashboard: () => <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" />,
  leads: () => <Icon d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75" />,
  pipeline: () => <Icon d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  analytics: () => <Icon d="M18 20V10 M12 20V4 M6 20v-6" />,
  workflows: () => <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  scoring: () => <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  team: () => <Icon d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75" />,
  integrations: () => <Icon d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />,
  billing: () => <Icon d="M3 10h18 M3 6h18 M3 14h11 M3 18h7" />,
  settings: () => <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />,
  support: () => <Icon d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
  bell: () => <Icon d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0" />,
  search: () => <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  plus: () => <Icon d="M12 5v14 M5 12h14" />,
  arrow: () => <Icon d="M5 12h14 M12 5l7 7-7 7" />,
  check: () => <Icon d="M20 6L9 17l-5-5" />,
  x: () => <Icon d="M18 6L6 18 M6 6l12 12" />,
  trend_up: () => <Icon d="M23 6l-9.5 9.5-5-5L1 18" />,
  trend_down: () => <Icon d="M23 18l-9.5-9.5-5 5L1 6" />,
  filter: () => <Icon d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
  export: () => <Icon d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12" />,
  eye: () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6z" />,
  trash: () => <Icon d="M3 6h18 M19 6l-1 14H6L5 6 M8 6V4h8v2" />,
  drag: () => <Icon d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01" />,
  globe: () => <Icon d="M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />,
  mail: () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />,
  phone: () => <Icon d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />,
  zap: () => <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  calendar: () => <Icon d="M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18" />,
  clock: () => <Icon d="M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2" />,
  location: () => <Icon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z" />,
  chevron_down: () => <Icon d="M6 9l6 6 6-6" />,
  chevron_right: () => <Icon d="M9 18l6-6-6-6" />,
  copy: () => <Icon d="M20 9H11a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />,
  key: () => <Icon d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />,
  refresh: () => <Icon d="M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15" />,
  play: () => <Icon d="M5 3l14 9-14 9V3z" />,
  save: () => <Icon d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8" />,
};

// ─── Color & Style Constants ──────────────────────────────────────────────────
const THEMES = {
  light: {
    primary: "#3B5BDB", primaryLight: "#EEF2FF", primaryDark: "#2F4AC8",
    accent: "#60EFFF", bg: "#F8F9FC", sidebar: "#FFFFFF", card: "#FFFFFF",
    border: "#E8ECF4", text: "#0F172A", textSub: "#64748B", textMuted: "#94A3B8",
    hot: "#EF4444", warm: "#F59E0B", cold: "#6366F1",
    success: "#10B981", warning: "#F59E0B", danger: "#EF4444",
    topbar: "#FFFFFF", inputBg: "#F8F9FC", navHover: "#F1F5F9",
  },
  dark: {
    primary: "#4F6EF7", primaryLight: "rgba(79,110,247,0.15)", primaryDark: "#3B5BDB",
    accent: "#00E5C8", bg: "#05080F", sidebar: "#0D1117", card: "#0D1117",
    border: "#1C2333", text: "#F0F4FF", textSub: "#8892A4", textMuted: "#4A5568",
    hot: "#FF5C5C", warm: "#FFB547", cold: "#818CF8",
    success: "#00D68F", warning: "#FFB547", danger: "#FF5C5C",
    topbar: "#0D1117", inputBg: "rgba(255,255,255,0.04)", navHover: "rgba(255,255,255,0.06)",
  },
};
// Mutable — Object.assign'd before each App render so all C.* refs update
const C = { ...THEMES.light };

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
    secondary: { background: hov ? C.navHover : C.card, color: C.text, border: `1.5px solid ${C.border}` },
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
  <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding, boxShadow: "0 1px 4px rgba(0,0,0,.06)", transition: "background .3s, border-color .3s", ...sx }}>
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
  const colors = ["#3B5BDB", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#EC4899", "#14B8A6"];
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
        style={{ width: "100%", padding: prefix ? "10px 12px 10px 36px" : "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, color: C.text, background: C.inputBg, outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "background .3s, border-color .2s, color .3s", ...sx }}
        onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.background = C.card; }}
        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.background = C.inputBg; }}
      />
    </div>
  </div>
);

const Select = ({ label, options, value, onChange, style: sx = {} }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 600, color: C.textSub }}>{label}</label>}
    <select value={value} onChange={onChange}
      style={{ padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, color: C.text, background: C.inputBg, outline: "none", fontFamily: "inherit", transition: "background .3s, border-color .2s", ...sx }}>
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

const Sidebar = ({ active, setActive, isMobile, isOpen, onClose, darkMode }) => {
  const sections = ["CORE", "AUTOMATION", "MANAGEMENT"];
  return (
    <>
      {isMobile && isOpen && (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 99 }} />
      )}
      <div className="sidebar" style={{ width: 220, minHeight: "100vh", background: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, position: "fixed", left: isMobile ? (isOpen ? 0 : -220) : 0, top: 0, bottom: 0, zIndex: 100, transition: "left .25s ease, background .3s, border-color .3s" }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${C.border}` }}>
          <Icons.logo />
          <span style={{ fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: "-0.3px" }}>Meta OS</span>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "8px 12px" }}>
          {sections.map(section => (
            <div key={section} style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em", padding: "12px 8px 6px" }}>{section}</div>
              {navItems.filter(n => n.section === section).map(item => {
                const isActive = active === item.id;
                return (
                  <button key={item.id} onClick={() => setActive(item.id)}
                    style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 9, border: "none", cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: isActive ? 600 : 500, fontFamily: "inherit", background: isActive ? C.primaryLight : "transparent", color: isActive ? C.primary : C.textSub, transition: "all .15s" }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = C.navHover; e.currentTarget.style.color = C.text; } }}
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
    </>
  );
};

// ─── Top Bar ──────────────────────────────────────────────────────────────────
const TopBar = ({ onSearch, isMobile, onMenuToggle, darkMode, toggleTheme }) => (
  <div className="topbar" style={{ position: "fixed", top: 0, left: isMobile ? 0 : 220, right: 0, height: 64, background: C.topbar, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 12, zIndex: 99, transition: "background .3s, border-color .3s" }}>
    {isMobile && (
      <button onClick={onMenuToggle} style={{ border: "none", background: "none", cursor: "pointer", padding: 6, color: C.text, display: "flex", alignItems: "center", flexShrink: 0 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      </button>
    )}
    <div style={{ flex: 1, position: "relative", maxWidth: 420 }}>
      <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icons.search /></span>
      <input placeholder="Search leads, campaigns..." onChange={e => onSearch(e.target.value)}
        style={{ width: "100%", padding: "9px 14px 9px 40px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.text, outline: "none", fontFamily: "inherit", background: C.inputBg, boxSizing: "border-box", transition: "background .3s, border-color .2s, color .3s" }}
        onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.background = C.card; }}
        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.background = C.inputBg; }} />
    </div>
    <div style={{ flex: 1 }} />

    {/* ── Theme Toggle ── */}
    <button onClick={toggleTheme} title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{ position: "relative", width: 52, height: 28, borderRadius: 14, border: "none", cursor: "pointer", background: darkMode ? C.primary : "#E2E8F0", transition: "background .3s", flexShrink: 0, padding: 0 }}>
      <div style={{ position: "absolute", top: 3, left: darkMode ? 26 : 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", transition: "left .25s cubic-bezier(.4,0,.2,1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, boxShadow: "0 1px 4px rgba(0,0,0,.2)" }}>
        {darkMode ? "🌙" : "☀️"}
      </div>
    </button>

    <div style={{ position: "relative", cursor: "pointer", color: C.textSub }}>
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
const DashboardPage = ({ darkMode }) => {
  const [tab, setTab] = useState("7D");
  const [stats, setStats] = useState({ today: 0, hot: 0, total: 0, convRate: "0.0" });
  const [recentLeads, setRecentLeads] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const scoreColor = s => s >= 80 ? C.success : s >= 60 ? C.warning : C.danger;

  const timeAgo = (ts) => {
    if (!ts) return "";
    const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      // All leads
      const { data: allLeads } = await supabase.from('leads').select('id, full_name, status, score, source, created_at, deal_value').order('created_at', { ascending: false });
      if (!allLeads) { setLoading(false); return; }

      // Stats
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const todayLeads = allLeads.filter(l => new Date(l.created_at) >= today);
      const hotLeads = allLeads.filter(l => (l.score || 0) >= 80);
      const contacted = allLeads.filter(l => ["Contacted", "Booked", "Interested"].includes(l.status));
      const convRate = allLeads.length > 0 ? ((contacted.length / allLeads.length) * 100).toFixed(1) : "0.0";

      setStats({
        today: todayLeads.length,
        hot: hotLeads.length,
        total: allLeads.length,
        convRate,
      });

      // Recent 5 leads
      setRecentLeads(allLeads.slice(0, 5));

      // Chart: last 7 days lead counts
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const chartMap = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0, 0, 0, 0);
        const label = days[d.getDay()];
        chartMap[label] = { label, value: 0, line: 0 };
      }
      allLeads.forEach(l => {
        const d = new Date(l.created_at);
        const daysSince = Math.floor((Date.now() - d) / 86400000);
        if (daysSince < 7) {
          const label = days[d.getDay()];
          if (chartMap[label]) {
            chartMap[label].value += 1;
            if ((l.score || 0) >= 80) chartMap[label].line += 1;
          }
        }
      });
      setChartData(Object.values(chartMap));
      setLoading(false);
    }
    fetchDashboard();
  }, []);

  const convPct = parseFloat(stats.convRate);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: C.textMuted, fontSize: 15 }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ marginRight: 10, animation: "spin 1s linear infinite" }}><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      Loading dashboard...
    </div>
  );

  return (
    <div>
      {/* ── Stat Cards ── */}
      <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard icon={<Icons.leads />} label="Leads Today" value={stats.today} trend="up" trendVal="Live" color={C.primary} />
        <StatCard icon={<Icons.zap />} label="Hot Leads (Score ≥80)" value={stats.hot} trend={stats.hot > 0 ? "up" : "down"} trendVal={`${stats.total > 0 ? Math.round((stats.hot / stats.total) * 100) : 0}%`} color="#F59E0B" />
        <StatCard icon={<Icons.analytics />} label="Conversion Rate" value={`${stats.convRate}%`} trend={convPct >= 10 ? "up" : "down"} trendVal="30d" color="#10B981" />
        <StatCard icon={<Icons.leads />} label="Total Leads" value={stats.total} trend="up" trendVal="All time" color="#6366F1" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          {/* ── Chart ── */}
          <Card style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>Lead Volume — Last 7 Days</div>
                <div style={{ fontSize: 13, color: C.textMuted }}>Bars = total leads · Line = high-score leads (≥80)</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {["7D"].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ padding: "5px 14px", borderRadius: 7, border: `1.5px solid ${C.primary}`, background: C.primaryLight, color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {chartData.length > 0
              ? <BarChart bars={chartData} />
              : <div style={{ textAlign: "center", padding: "40px 0", color: C.textMuted, fontSize: 14 }}>No lead data for the last 7 days.</div>
            }
          </Card>

          {/* ── Priority Leads table ── */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>Recent Leads</div>
                <div style={{ fontSize: 13, color: C.textMuted }}>Latest {recentLeads.length} leads from your database</div>
              </div>
              <Btn variant="secondary" size="sm" icon={<Icons.arrow />}>Manage All Leads</Btn>
            </div>
            {recentLeads.length === 0
              ? <div style={{ textAlign: "center", padding: "40px 0", color: C.textMuted, fontSize: 14 }}>No leads yet. Add your first lead from the Leads page.</div>
              : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["Lead Name", "Score", "Source", "Received", "Actions"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 600, color: C.textMuted, letterSpacing: ".04em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((l, i) => (
                      <tr key={l.id || i} style={{ borderBottom: `1px solid ${C.border}`, transition: "background .15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = C.bg}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Avatar name={l.full_name || "?"} size={32} />
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{l.full_name || "Unknown"}</div>
                              <Badge label={l.status || "New"} color={l.status === "New" || l.status === "NEW" ? "blue" : l.status === "Interested" || l.status === "INTERESTED" ? "green" : "orange"} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "12px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: "50%", background: scoreColor(l.score || 0) + "20", color: scoreColor(l.score || 0), fontWeight: 800, fontSize: 13 }}>{l.score || "—"}</span>
                        </td>
                        <td style={{ padding: "12px", fontSize: 13, color: C.textSub }}>{l.source || "—"}</td>
                        <td style={{ padding: "12px", fontSize: 13, color: C.textMuted }}>{timeAgo(l.created_at)}</td>
                        <td style={{ padding: "12px" }}>
                          <Btn variant="ghost" size="sm">View</Btn>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </Card>
        </div>

        {/* ── Right Panel ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Status breakdown */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 14 }}>Lead Status Breakdown</div>
            {(["New", "Contacted", "Interested", "Booked", "Hot", "Lost"]).map((status, i) => {
              const count = recentLeads.filter(l => l.status === status).length;
              const pct = recentLeads.length > 0 ? Math.round((count / recentLeads.length) * 100) : 0;
              const colors = [C.primary, "#F59E0B", "#10B981", "#6366F1", "#EF4444", C.textMuted];
              return (
                <div key={status} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: C.textSub, fontWeight: 500 }}>{status}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{count}</span>
                  </div>
                  <div style={{ background: C.border, borderRadius: 6, height: 6 }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: colors[i], borderRadius: 6, transition: "width .8s ease" }} />
                  </div>
                </div>
              );
            })}
          </Card>

          <Card>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 14 }}>Quick Insights</div>
            {[
              { icon: <Icons.scoring />, title: "Lead Scoring Rules", sub: "Automate priority for high-intent users", color: C.primary },
              { icon: <Icons.zap />, title: "Active Automations", sub: "14 workflows currently processing", color: C.success },
              { icon: <Icons.analytics />, title: "ROI Analysis", sub: "Calculate cost per lead vs conversion", color: "#6366F1" },
            ].map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none", cursor: "pointer", borderRadius: 8, transition: "background .15s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.bg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: q.color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: q.color, flexShrink: 0 }}>{q.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{q.title}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{q.sub}</div>
                </div>
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>↗</span>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.primary }}>Conversion Progress</div>
            </div>
            <div style={{ fontSize: 13, color: C.textSub, marginBottom: 12 }}>
              <strong style={{ color: C.text }}>{stats.convRate}%</strong> of your leads have been contacted or converted.
            </div>
            <div style={{ background: C.border, borderRadius: 10, height: 8, marginBottom: 16 }}>
              <div style={{ width: `${Math.min(convPct, 100)}%`, height: "100%", background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`, borderRadius: 10, transition: "width 1.2s ease" }} />
            </div>
            <Btn style={{ width: "100%", justifyContent: "center" }}>View Full Report</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
};
const NewLeadForm = ({ onClose, onSaved }) => {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", status: "New", location_city: "", location_country: "", source: "", score: 50 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const handleSave = async () => {
    if (!form.full_name || !form.email) { setError("Name and email are required."); return; }
    setSaving(true);
    const { data: orgData } = await supabase.from('organizations').select('id').limit(1);
    const org_id = orgData?.[0]?.id;
    const { error } = await supabase.from('leads').insert([{ ...form, org_id, score: parseInt(form.score) }]);
    setSaving(false);
    if (error) { setError(error.message); return; }
    onSaved();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Input label="Full Name *" placeholder="John Doe" value={form.full_name} onChange={set("full_name")} />
      <Input label="Email *" placeholder="john@example.com" type="email" value={form.email} onChange={set("email")} />
      <Input label="Phone" placeholder="+91 99999 00000" value={form.phone} onChange={set("phone")} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="City" placeholder="Mumbai" value={form.location_city} onChange={set("location_city")} />
        <Input label="Country" placeholder="India" value={form.location_country} onChange={set("location_country")} />
      </div>
      <Select label="Status" value={form.status} onChange={set("status")} options={["New", "Contacted", "Interested", "Booked", "Hot", "Lost"]} />
      <Input label="Source" placeholder="Meta Ads" value={form.source} onChange={set("source")} />
      <Input label="Score (0-100)" type="number" value={form.score} onChange={set("score")} />
      {error && <div style={{ color: C.danger, fontSize: 13 }}>{error}</div>}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        <Btn onClick={handleSave}>{saving ? "Saving..." : "Save Lead"}</Btn>
      </div>
    </div>
  );
};
const LeadsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [allLeads, setAllLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddLead, setShowAddLead] = useState(false);

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setAllLeads(data);
      }
      setLoading(false);
    }
    fetchLeads();
  }, []);
  const statusColor = { Hot: "red", New: "blue", Contacted: "purple", Lost: "gray", Booked: "green", Interested: "yellow" };
  const scoreColor = s => s >= 80 ? C.success : s >= 60 ? C.warning : C.danger;
  const filtered = allLeads.filter(l =>
    (l.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (l.source || "").toLowerCase().includes(search.toLowerCase())
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
          <Btn size="sm" icon={<Icons.plus />} onClick={() => setShowAddLead(true)}>Add New Lead</Btn>
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
              style={{ width: "100%", padding: "9px 12px 9px 38px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box", background: C.inputBg, color: C.text }}
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
                    <Avatar name={l.full_name} size={34} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{l.full_name}</div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>{l.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px", fontSize: 13, color: C.textSub, maxWidth: 160 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Icons.arrow />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.source}</span>
                  </div>
                </td>
                <td style={{ padding: "12px", fontSize: 13, color: C.textSub }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Icons.location />{l.location_city}, {l.location_country}</div>
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
                <td style={{ padding: "12px", fontSize: 13, color: C.textMuted, whiteSpace: "nowrap" }}>{l.last_activity_at ? new Date(l.last_activity_at).toLocaleDateString() : "No activity"}</td>
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
              <button key={i} style={{ padding: "6px 12px", borderRadius: 7, border: `1.5px solid ${p === "1" ? C.primary : C.border}`, background: p === "1" ? C.primary : C.card, color: p === "1" ? "#fff" : C.textSub, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>

      {showAddLead && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: C.card, borderRadius: 16, padding: 32, width: 480, boxShadow: "0 16px 48px rgba(0,0,0,.25)", border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Add New Lead</h3>
              <button onClick={() => setShowAddLead(false)} style={{ border: "none", background: "none", cursor: "pointer", color: C.textMuted }}><Icons.x /></button>
            </div>
            <NewLeadForm onClose={() => setShowAddLead(false)} onSaved={() => { setShowAddLead(false); }} />
          </div>
        </div>
      )}
    </div>
  );
};

// Pipeline Board
const PipelinePage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movingId, setMovingId] = useState(null);

  const STAGES = [
    { id: "New", label: "NEW LEADS", color: C.primary },
    { id: "Contacted", label: "CONTACTED", color: "#6366F1" },
    { id: "Interested", label: "INTERESTED", color: C.warning },
    { id: "Booked", label: "BOOKED", color: "#8B5CF6" },
    { id: "Converted", label: "CONVERTED", color: C.success },
  ];

  const timeAgo = (ts) => {
    const diff = Math.floor((Date.now() - new Date(ts)) / 60000);
    if (diff < 60) return `${diff}m`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h`;
    return `${Math.floor(diff / 1440)}d`;
  };

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('id, full_name, status, score, source, deal_value, created_at, deleted_at')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    if (!error && data) setLeads(data);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const moveStage = async (leadId, newStatus) => {
    setMovingId(leadId);
    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', leadId);
    if (!error) setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    setMovingId(null);
  };

  const stagesWithLeads = STAGES.map(s => {
    const stageLeads = leads.filter(l => (l.status || "New") === s.id);
    const totalValue = stageLeads.reduce((sum, l) => sum + (l.deal_value || 0), 0);
    return { ...s, leads: stageLeads, count: stageLeads.length, totalValue };
  });

  const activeDeals = leads.filter(l => l.status !== "Converted" && l.status !== "Lost").length;
  const pipelineValue = leads.reduce((sum, l) => sum + (l.deal_value || 0), 0);
  const convertedCount = leads.filter(l => l.status === "Converted").length;
  const convRate = leads.length > 0 ? Math.round((convertedCount / leads.length) * 100) : 0;

  const fmtVal = (v) => v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : v >= 1000 ? `₹${(v / 1000).toFixed(1)}K` : `₹${v}`;

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
          <Btn size="sm" icon={<Icons.refresh />} onClick={fetchLeads}>Refresh</Btn>
        </div>
      </div>

      <Card style={{ marginBottom: 20 }} padding={18}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[
            { label: "ACTIVE DEALS", value: loading ? "…" : String(activeDeals), icon: "↗", color: C.success },
            { label: "PIPELINE VALUE", value: loading ? "…" : fmtVal(pipelineValue), icon: "₹", color: C.primary },
            { label: "TOTAL LEADS", value: loading ? "…" : String(leads.length), icon: "👤", color: "#6366F1" },
            { label: "CONVERSION RATE", value: loading ? "…" : `${convRate}%`, icon: "↗", color: C.warning },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 14, color: s.color }}>{s.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: ".08em" }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{s.value}</div>
            </div>
          ))}
        </div>
      </Card>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200, color: C.textMuted, fontSize: 14 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⟳</div>
            Loading pipeline...
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }}>
          {stagesWithLeads.map(stage => (
            <div key={stage.id} style={{ minWidth: 260, maxWidth: 280, flex: "0 0 260px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: stage.color }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: ".06em" }}>{stage.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: stage.color, background: stage.color + "18", padding: "1px 8px", borderRadius: 20 }}>{stage.count}</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10 }}>
                TOTAL VALUE: {stage.totalValue > 0 ? fmtVal(stage.totalValue) : "—"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {stage.leads.map((lead) => (
                  <Card key={lead.id} padding={14} style={{ cursor: "pointer", transition: "box-shadow .15s", border: `1.5px solid ${C.border}`, opacity: movingId === lead.id ? 0.5 : 1 }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.12)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.04)"}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, background: C.primaryLight, color: C.primary, padding: "2px 8px", borderRadius: 20 }}>{lead.score ?? "—"} pts</span>
                      <span style={{ fontSize: 10, color: C.textMuted, background: C.bg, padding: "2px 7px", borderRadius: 20, border: `1px solid ${C.border}` }}>{lead.source || "Meta"}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 3 }}>{lead.full_name}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{lead.deal_value ? fmtVal(lead.deal_value) : "—"}</span>
                      <span style={{ fontSize: 11, color: C.textMuted, display: "flex", alignItems: "center", gap: 4 }}><Icons.clock /> {timeAgo(lead.created_at)}</span>
                    </div>
                    <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Avatar name={lead.full_name} size={24} />
                      <select
                        value={lead.status || "New"}
                        onChange={e => moveStage(lead.id, e.target.value)}
                        onClick={e => e.stopPropagation()}
                        style={{ fontSize: 11, padding: "3px 6px", border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: "inherit", background: C.inputBg, color: C.text, cursor: "pointer", outline: "none" }}>
                        {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                    </div>
                  </Card>
                ))}
                {stage.leads.length === 0 && (
                  <div style={{ textAlign: "center", padding: "32px 0", color: C.textMuted, fontSize: 13, border: `2px dashed ${C.border}`, borderRadius: 10 }}>No leads here</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Analytics
const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const lineData = [380, 420, 450, 540, 490, 590, 150];
  const convData = [20, 25, 28, 32, 30, 35, 18];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const W = 500, H = 180;
  const maxL = Math.max(...lineData);
  const mkPts = (data) => data.map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / maxL) * H}`).join(" ");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Campaign Analytics</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 14 }}>Deep dive into your Meta advertising performance and ROI</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <select value={dateRange} onChange={e => setDateRange(e.target.value)}
            style={{ padding: "8px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 13, fontFamily: "inherit", cursor: "pointer", outline: "none", background: C.inputBg, color: C.text }}>
            {["Last 7 Days", "Last 30 Days", "Last 90 Days"].map(o => <option key={o}>{o}</option>)}
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
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: C.text }}>Leads vs Conversions</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 20 }}>Daily performance overview across all campaigns</div>
          <svg width="100%" viewBox={`0 0 ${W} ${H + 30}`}>
            <polyline points={mkPts(lineData)} fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={mkPts(convData)} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {lineData.map((v, i) => <circle key={i} cx={(i / (lineData.length - 1)) * W} cy={H - (v / maxL) * H} r="4" fill={C.primary} stroke={C.card} strokeWidth="2" />)}
            {days.map((d, i) => <text key={i} x={(i / (days.length - 1)) * W} y={H + 24} textAnchor="middle" fontSize="11" fill={C.textMuted}>{d}</text>)}
          </svg>
          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.text }}><span style={{ width: 12, height: 3, background: C.primary, display: "inline-block", borderRadius: 2 }} />Inbound Leads</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.text }}><span style={{ width: 12, height: 3, background: "#10B981", display: "inline-block", borderRadius: 2 }} />Converted Deals</div>
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: C.text }}>Revenue by Campaign</div>
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
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: C.text }}>Cost per Booking (CPA)</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Efficiency of ad spend over time</div>
          <svg width="100%" viewBox="0 0 400 120">
            <defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EF444440" /><stop offset="100%" stopColor="#EF444400" /></linearGradient></defs>
            <path d="M0,80 C40,50 80,90 120,60 C160,30 200,70 240,50 C280,30 320,40 360,30 L360,120 L0,120 Z" fill="url(#grad)" />
            <path d="M0,80 C40,50 80,90 120,60 C160,30 200,70 240,50 C280,30 320,40 360,30" fill="none" stroke={C.danger} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: C.text }}>Top Locations</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Lead volume by region</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DonutChart segments={[
              { pct: 45, color: "#3B5BDB" }, { pct: 30, color: "#10B981" },
              { pct: 15, color: "#1E1B4B" }, { pct: 10, color: "#F59E0B" }
            ]} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {[["Mumbai", "45%", "#3B5BDB"], ["Delhi", "30%", "#10B981"], ["Bangalore", "15%", "#1E1B4B"], ["Other", "10%", "#F59E0B"]].map(([city, pct, color]) => (
              <div key={city} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.text }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
                {city} {pct}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: C.text }}>Sales Conversion</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Team closure performance</div>
          <svg width="100%" viewBox="0 0 200 120">
            {[["Rajesh K.", 40, 70, 8], ["Priya S.", 55, 80, 56], ["Amit M.", 38, 65, 104], ["Sneha L.", 50, 75, 152]].map(([n, a, c, x], i) => (
              <g key={n}>
                <rect x={x} y={120 - (a / 100) * 110} width={14} height={(a / 100) * 110} rx={3} fill={C.border} />
                <rect x={x + 16} y={120 - (c / 100) * 110} width={14} height={(c / 100) * 110} rx={3} fill={C.success} />
                <text x={x + 15} y={118} textAnchor="middle" fontSize="8" fill={C.textMuted}>{n.split(" ")[0]}</text>
              </g>
            ))}
          </svg>
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.text }}><span style={{ width: 10, height: 10, background: C.border, display: "inline-block" }} />Assigned</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.text }}><span style={{ width: 10, height: 10, background: C.success, display: "inline-block" }} />Closed</div>
          </div>
        </Card>
      </div>

      <Card style={{ background: C.card, borderTop: `3px solid ${C.primary}`, borderColor: C.primary + "30" }}>
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
    "Triggers": [["New Facebook Lead", "Instant capture from Meta forms"], ["New Messenger Chat", "User starts a conversation"], ["Website Visit", "Meta Pixel event detection"]],
    "Logic & Flow": [["Conditional Split", "If/Else logic based on data"], ["Wait / Delay", "Pause for a set duration"], ["Lead Score Check", "Filter based on quality score"]],
    "Meta Actions": [["Send WhatsApp", "Use pre-approved templates"], ["Messenger Reply", "Send an automated DM"], ["Add to Audience", "Sync to Custom Audiences"]],
    "Notifications": [["Internal Alert", "Notify team via workspace"], ["Push Notification", "Alert sales via mobile app"]],
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, background: C.card, padding: "16px 0", borderBottom: `1px solid ${C.border}`, marginTop: -28 }}>
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px", background: C.bg, borderRadius: "0 0 0 12px" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 360, background: C.card, border: `2px solid ${step.border}`, borderRadius: 12, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>
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
                  <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${C.border}`, background: C.card, display: "flex", alignItems: "center", justifyContent: "center", color: C.textMuted, cursor: "pointer" }}>+</div>
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
        <div style={{ borderLeft: `1px solid ${C.border}`, padding: 20, background: C.card, overflowY: "auto" }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icons.search /></span>
            <input placeholder="Find actions..." style={{ width: "100%", padding: "9px 12px 9px 34px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: C.inputBg, color: C.text }} />
          </div>
          {Object.entries(actions).map(([section, items]) => (
            <div key={section} style={{ marginBottom: 20 }}>
              <button style={{ display: "flex", justifyContent: "space-between", width: "100%", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, color: C.text, padding: "4px 0 10px" }}>
                {section} <Icons.chevron_down />
              </button>
              {items.map(([name, desc]) => (
                <div key={name} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 6, border: `1px solid ${C.border}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.primaryLight; e.currentTarget.style.borderColor = C.primary; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.borderColor = C.border; }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{name}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{desc}</div>
                </div>
              ))}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: C.text }}>View Options</div>
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
  const fields = ["Location", "Budget", "Job Title", "Lead Source", "Email", "Phone", "Campaign", "Company Size"];
  const ops = ["equals", "greater than", "less than", "contains", "starts with", "ends with"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Lead Scoring Rules</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 14 }}>Configure the logic used to automatically rank and prioritize your Meta leads based on profile data and custom field inputs.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="secondary" size="sm" icon={<Icons.refresh />}>Reset</Btn>
          <Btn size="sm">Save Rules</Btn>
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
              <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>Active Rules <Badge label="5" color="blue" /></div>
              <Btn variant="ghost" size="sm" icon={<Icons.plus />}>Add New Rule</Btn>
            </div>
            {rules.map((rule, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: i < rules.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ color: C.textMuted, cursor: "grab" }}><Icons.drag /></div>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textSub, minWidth: 20 }}>If</span>
                <select defaultValue={rule.field} style={{ padding: "7px 10px", border: `1.5px solid ${C.border}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit", flex: 1, outline: "none", background: C.inputBg, color: C.text }}>
                  {fields.map(f => <option key={f}>{f}</option>)}
                </select>
                <select defaultValue={rule.op} style={{ padding: "7px 10px", border: `1.5px solid ${C.border}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit", flex: 1, outline: "none", background: C.inputBg, color: C.text }}>
                  {ops.map(o => <option key={o}>{o}</option>)}
                </select>
                <input defaultValue={rule.val} style={{ padding: "7px 10px", border: `1.5px solid ${C.border}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit", width: 90, outline: "none", background: C.inputBg, color: C.text }} />
                <span style={{ fontSize: 13, color: C.textSub, fontWeight: 600 }}>then</span>
                <input type="number" defaultValue={Math.abs(rule.pts)}
                  style={{ padding: "7px 8px", border: `1.5px solid ${rule.pts < 0 ? C.danger : C.border}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit", width: 60, outline: "none", textAlign: "right", color: rule.pts < 0 ? C.danger : C.text, fontWeight: 700, background: C.inputBg }} />
                <span style={{ fontSize: 13, color: C.textSub }}>PTS</span>
                <button onClick={() => setRules(rules.filter((_, j) => j !== i))}
                  style={{ border: "none", background: "none", cursor: "pointer", color: C.textMuted, padding: 4 }}><Icons.trash /></button>
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: C.text }}>Global Scoring Settings</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16 }}>Baseline rules applied to every new lead.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: C.bg, borderRadius: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary }}><Icons.leads /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>Default Starting Score</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Applied to all leads upon ingestion</div>
              </div>
              <input type="number" defaultValue={0} style={{ width: 60, padding: "8px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 15, fontWeight: 700, textAlign: "right", fontFamily: "inherit", outline: "none", background: C.inputBg, color: C.text }} />
              <span style={{ fontWeight: 600, color: C.textSub }}>PTS</span>
            </div>
          </Card>

          <Card style={{ marginTop: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: C.text }}>Recent Score Adjustments</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Audit log of scoring actions taken on recent leads.</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Lead Name", "Reason", "Impact", "New Score", "Time"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: ".05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Rohan Sharma", "Mumbai Location Match", "+40", "82", "2 mins ago"],
                  ["Sarah Miller", "CEO Job Title Match", "+25", "68", "14 mins ago"],
                  ["Priya Verma", "Low Budget Detection", "-10", "34", "1 hour ago"],
                  ["David Chen", "High Budget Detection", "+30", "91", "3 hours ago"],
                  ["Anil Gupta", "Meta Ad Referral", "+15", "55", "5 hours ago"],
                ].map(([name, reason, impact, score, time], i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "10px", fontWeight: 600, fontSize: 13, color: C.text }}>{name}</td>
                    <td style={{ padding: "10px", fontSize: 13, color: C.textSub }}>{reason}</td>
                    <td style={{ padding: "10px", fontWeight: 700, color: impact.startsWith("+") ? C.success : C.danger }}>{impact}</td>
                    <td style={{ padding: "10px", fontWeight: 700, fontSize: 14, color: C.text }}>{score}</td>
                    <td style={{ padding: "10px", fontSize: 12, color: C.textMuted }}>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Predicted Score Impact</div>
              <Badge label="Live" color="green" />
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Distribution of existing leads with current rules.</div>
            <svg width="100%" viewBox="0 0 200 100">
              {[[0, 40, 10], ["41-60", 60, 55], ["61-80", 90, 100], ["81-100", 70, 145]].map(([label, h, x], i) => (
                <g key={i}>
                  <rect x={x} y={100 - h} width={40} height={h} rx={4} fill={i === 2 ? C.primary : i === 3 ? C.accent : C.border} />
                </g>
              ))}
              <text x="15" y="115" fontSize="9" fill={C.textMuted}>21-40</text>
              <text x="55" y="115" fontSize="9" fill={C.textMuted}>41-60</text>
              <text x="100" y="115" fontSize="9" fill={C.textMuted}>61-80</text>
              <text x="145" y="115" fontSize="9" fill={C.textMuted}>81-100</text>
            </svg>
          </Card>

          <Card>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: C.text }}>Scoring Tiers</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Labels assigned based on final scores.</div>
            {[
              { tier: "Hot", count: "1,420 LEADS", threshold: "> 75", color: C.danger },
              { tier: "Warm", count: "3,810 LEADS", threshold: "> 40", color: C.warning },
              { tier: "Cold", count: "12,542 LEADS", threshold: "> 0", color: "#94A3B8" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{t.tier}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{t.count}</div>
                </div>
                <div style={{ background: C.bg, padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 700, color: C.text }}>{t.threshold}</div>
              </div>
            ))}
            <button style={{ fontSize: 13, color: C.primary, fontWeight: 600, border: "none", background: "none", cursor: "pointer", marginTop: 10, padding: 0 }}>Manage Tier Notifications →</button>
          </Card>

          <Card style={{ background: C.card, border: `1px solid ${C.primary}40` }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>+</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Automate Follow-ups</div>
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
                {["User", "Role", "Status", "Leads", "Response", "Closing Rate"].map(h => (
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
                        <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{m.name}</div>
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
                      <span style={{ fontSize: 13, color: C.text }}>{m.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px", fontSize: 14, fontWeight: 600, color: C.text }}>{m.leads || "-"}</td>
                  <td style={{ padding: "12px", fontSize: 13, color: C.textSub }}>{m.response}</td>
                  <td style={{ padding: "12px", minWidth: 160 }}>
                    {m.status !== "Invited" ? (
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: C.text }}>{m.closing}%</div>
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
              <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>Top Performer</div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar name="Sarah Chen" size={48} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Sarah Chen</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Senior Sales Executive</div>
                <div style={{ fontSize: 12, color: C.success, fontWeight: 700, marginTop: 4 }}>94% Conversion</div>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: C.text }}>Live Activity</div>
            {[
              { user: "Sarah Chen", action: "Closed ₹4.5k deal", time: "2m ago", color: C.success },
              { user: "Mark Thompson", action: "Assigned 12 leads", time: "15m ago", color: C.primary },
              { user: "Priya Rao", action: "Response goal met", time: "1h ago", color: "#6366F1" },
              { user: "System", action: "Monthly report ready", time: "3h ago", color: C.textMuted },
            ].map((a, i) => (
              <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontSize: 13, color: C.text }}>
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
          <button key={t} style={{ padding: "8px 18px", borderRadius: 8, border: `1.5px solid ${i === 0 ? C.primary : C.border}`, background: i === 0 ? C.primary : C.card, color: i === 0 ? "#fff" : C.textSub, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icons.search /></span>
          <input placeholder="Search integrations..." style={{ padding: "8px 12px 8px 34px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", background: C.inputBg, color: C.text }} />
        </div>
      </div>

      {sections.map(section => (
        <div key={section.title} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ color: C.primary }}><Icons.check /></span>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: C.text }}>{section.title}</h3>
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
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: C.text }}>{intg.name}</div>
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
          <Card style={{ marginBottom: 20, background: C.card, borderTop: `3px solid ${C.primary}` }}>
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
              <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>Payment Methods</div>
              <Btn variant="ghost" size="sm" icon={<Icons.plus />}>Add Method</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              <div style={{ padding: "14px 16px", border: `2px solid ${C.primary}`, borderRadius: 10, position: "relative" }}>
                <Badge label="Default" color="blue" />
                <div style={{ fontSize: 14, marginTop: 10, color: C.text }}>💳 •••• •••• •••• 4242</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>Expires 12/26</div>
              </div>
              <div style={{ padding: "14px 16px", border: `1.5px solid ${C.border}`, borderRadius: 10 }}>
                <div style={{ fontSize: 14, color: C.text }}>📱 alex.smith@okaxis</div>
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
              <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>Invoice History</div>
              <button style={{ color: C.primary, fontWeight: 600, fontSize: 13, border: "none", background: "none", cursor: "pointer" }}>Export to CSV ↗</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Invoice ID", "Date", "Amount", "Plan", "Status", "Action"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, fontWeight: 600, color: C.textMuted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "12px", color: C.primary, fontWeight: 600, fontSize: 13 }}>{inv.id}</td>
                    <td style={{ padding: "12px", fontSize: 13, color: C.text }}>{inv.date}</td>
                    <td style={{ padding: "12px", fontSize: 14, fontWeight: 700, color: C.text }}>{inv.amount}</td>
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
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Monthly Lead Limit</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: C.textSub }}>850 Leads</span>
              <span style={{ fontWeight: 600, color: C.text }}>1,000 Leads</span>
            </div>
            <div style={{ background: C.border, borderRadius: 6, height: 8, marginBottom: 8 }}>
              <div style={{ width: "85%", height: "100%", background: C.primary, borderRadius: 6 }} />
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>85% of monthly limit reached</div>
          </Card>

          <Card>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
              <span style={{ color: "#6366F1" }}><Icons.team /></span>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Team Seat Usage</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: C.textSub }}>3 Users</span>
              <span style={{ fontWeight: 600, color: C.text }}>5 Users</span>
            </div>
            <div style={{ background: C.border, borderRadius: 6, height: 8, marginBottom: 8 }}>
              <div style={{ width: "60%", height: "100%", background: "#6366F1", borderRadius: 6 }} />
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>60% of monthly limit reached</div>
          </Card>

          <Card style={{ background: C.card, borderColor: C.warning, borderWidth: 1 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <span>⚠️</span>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.warning }}>Heads Up!</div>
            </div>
            <div style={{ fontSize: 13, color: C.textSub }}>You are at 85% of your lead limit. Automated captures will pause once limit is hit.</div>
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
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: C.text }}>General Information</div>
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
        <input placeholder="Search for articles, guides, and workflows..." style={{ width: "100%", padding: "14px 16px 14px 44px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: C.inputBg, color: C.text }}
          onFocus={e => e.target.style.borderColor = C.primary}
          onBlur={e => e.target.style.borderColor = C.border} />
      </div>
      <div style={{ fontSize: 13, color: C.textMuted }}>
        Popular: {["WhatsApp Setup", "Lead Scoring", "Webhook API", "Billing"].map((t, i) => (
          <span key={t}><button style={{ color: C.primary, border: "none", background: "none", cursor: "pointer", fontWeight: 600 }}>{t}</button>{i < 3 ? "  " : ""}</span>
        ))}
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", gap: 8, color: C.text }}><Icons.integrations /> Knowledge Base</div>
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
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: C.text }}>{item.title}</div>
              <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 12 }}>{item.sub}</div>
              <div style={{ color: C.primary, fontWeight: 600, fontSize: 13 }}>{item.count} Articles →</div>
            </Card>
          ))}
        </div>

        <div style={{ fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", gap: 8, marginBottom: 16, color: C.text }}>🎥 Video Academy</div>
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

        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: C.text }}>Frequently Asked Questions</div>
        {[
          { q: "How many Meta Pages can I connect?", a: "Starter plans support up to 2 pages, while Growth and Scale plans allow for unlimited connections." },
          { q: "Does this work with Instagram DM leads?", a: null },
          { q: "Is my data compliant with GDPR?", a: null },
        ].map((faq, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: 600, fontSize: 14, color: C.text }}>
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
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: C.text }}>Submit a Support Ticket</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Can't find what you're looking for? Reach out to our experts.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Input label="Issue Subject" placeholder="e.g. WhatsApp API Connection Error" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Select label="Department" options={["Technical", "Billing", "Sales"]} />
              <Select label="Urgency" options={["Low", "Medium", "High", "Critical"]} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.textSub, display: "block", marginBottom: 5 }}>Detailed Description</label>
              <textarea placeholder="Please describe the issue, including steps to reproduce if applicable..." rows={4}
                style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 13, fontFamily: "inherit", resize: "vertical", outline: "none", boxSizing: "border-box", background: C.inputBg, color: C.text }}
                onFocus={e => e.target.style.borderColor = C.primary}
                onBlur={e => e.target.style.borderColor = C.border} />
            </div>
            <Btn style={{ width: "100%", justifyContent: "center" }}>Send Ticket Request</Btn>
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: C.text }}>MY ACTIVE TICKETS</div>
          {[
            { id: "#4512", title: "Webhook missing data", status: "In Progress" },
            { id: "#4498", title: "Plan upgrade issue", status: "Resolved" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: `1px solid ${C.border}`, cursor: "pointer" }}>
              <div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{t.id}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{t.title}</div>
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

// ─── Auth Shared Theme ────────────────────────────────────────────────────────
const AT = {
  bg: "#05080F",
  card: "#0D1117",
  cardBorder: "#1C2333",
  primary: "#4F6EF7",
  primaryGlow: "rgba(79,110,247,0.25)",
  accent: "#00E5C8",
  text: "#F0F4FF",
  textSub: "#8892A4",
  textMuted: "#4A5568",
  success: "#00D68F",
  danger: "#FF5C5C",
  gradient: "linear-gradient(135deg, #4F6EF7 0%, #00E5C8 100%)",
};

const AuthInput = ({ label, placeholder, type = "text", value, onChange, icon, rightEl }) => (
  <div>
    {label && <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: AT.textMuted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8, fontFamily: "'Roboto',sans-serif" }}>{label}</label>}
    <div style={{ position: "relative" }}>
      {icon && <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: AT.textMuted, display: "flex" }}>{icon}</span>}
      <input
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={{ width: "100%", padding: icon ? "13px 40px 13px 42px" : "13px 16px", background: "rgba(255,255,255,0.04)", border: `1.5px solid ${AT.cardBorder}`, borderRadius: 10, color: AT.text, fontFamily: "'Roboto',sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border-color .2s, background .2s" }}
        onFocus={e => { e.target.style.borderColor = AT.primary; e.target.style.background = "rgba(79,110,247,0.06)"; }}
        onBlur={e => { e.target.style.borderColor = AT.cardBorder; e.target.style.background = "rgba(255,255,255,0.04)"; }}
      />
      {rightEl && <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>{rightEl}</span>}
    </div>
  </div>
);

// ─── Login Page ───────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin, onSignup }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    setLoading(false);
    if (error) setError(error.message);
    else onLogin();
  };

  return (
    <div style={{ minHeight: "100vh", background: AT.bg, display: "flex", fontFamily: "'Roboto', sans-serif", color: AT.text, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=DM+Sans:wght@600;700;800&display=swap');
        .auth-bg-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .auth-btn-primary { background: linear-gradient(135deg, #4F6EF7 0%, #00E5C8 100%); color: #fff; border: none; padding: 14px 32px; border-radius: 10px; font-family: 'Roboto',sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: opacity .2s, transform .15s, box-shadow .2s; box-shadow: 0 4px 24px rgba(79,110,247,0.3); width: 100%; }
        .auth-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(79,110,247,0.4); }
        .auth-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .auth-link { background: none; border: none; color: ${AT.primary}; font-family: 'Roboto',sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; padding: 0; transition: color .15s; }
        .auth-link:hover { color: ${AT.accent}; }
        .auth-google-btn { width: 100%; padding: 13px; background: rgba(255,255,255,0.04); border: 1.5px solid ${AT.cardBorder}; border-radius: 10px; color: ${AT.text}; font-family: 'Roboto',sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: border-color .2s, background .2s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .auth-google-btn:hover { border-color: rgba(79,110,247,0.5); background: rgba(79,110,247,0.06); }
        .auth-dot-grid { background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 28px 28px; }
        @media (max-width: 768px) { .auth-split-left { display: none !important; } .auth-right { padding: 32px 24px !important; } }
      `}</style>

      {/* Ambient blobs */}
      <div className="auth-bg-blob" style={{ top: -100, left: "30%", width: 400, height: 400, background: "radial-gradient(circle, rgba(79,110,247,0.12) 0%, transparent 70%)" }} />
      <div className="auth-bg-blob" style={{ bottom: -80, right: "20%", width: 320, height: 320, background: "radial-gradient(circle, rgba(0,229,200,0.08) 0%, transparent 70%)" }} />

      {/* Left panel */}
      <div className="auth-split-left auth-dot-grid" style={{ width: "44%", background: "rgba(13,17,23,0.8)", borderRight: `1px solid ${AT.cardBorder}`, padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: AT.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 17, color: AT.text }}>Meta Lead OS</span>
        </div>

        {/* Middle content */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(79,110,247,0.12)", border: "1px solid rgba(79,110,247,0.25)", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "#8BA4FF", letterSpacing: ".04em", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: AT.accent, display: "inline-block" }} />
            AI-POWERED LEAD CONVERSION
          </div>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 38, fontWeight: 800, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.02em", color: AT.text }}>
            Turn every Meta<br />lead into{" "}
            <span style={{ background: AT.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>revenue.</span>
          </h2>
          <p style={{ fontSize: 15, color: AT.textSub, lineHeight: 1.7, marginBottom: 40 }}>The AI-powered CRM built specifically for Meta advertisers. Capture, score, and close in under 3 minutes.</p>

          {/* Feature list */}
          {[
            { icon: "⚡", title: "Real-Time Lead Sync", sub: "Zero delay from Meta form to your dashboard." },
            { icon: "🧠", title: "AI Scoring Engine", sub: "Every lead ranked 0–100 automatically." },
            { icon: "💬", title: "Auto WhatsApp Follow-Up", sub: "Engage leads before competitors even see them." },
          ].map(f => (
            <div key={f.title} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(79,110,247,0.1)", border: "1px solid rgba(79,110,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 14, color: AT.text, marginBottom: 3 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: AT.textSub }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", background: "rgba(255,255,255,0.03)", border: `1px solid ${AT.cardBorder}`, borderRadius: 14 }}>
          <div style={{ display: "flex" }}>
            {["SK", "MR", "AT", "PG"].map((l, i) => (
              <div key={l} style={{ width: 30, height: 30, borderRadius: "50%", background: [AT.primary, "#10B981", "#F59E0B", "#8B5CF6"][i], display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700, marginLeft: i > 0 ? -8 : 0, border: `2px solid ${AT.card}` }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: AT.text }}>500+ agencies trust Meta Lead OS</div>
            <div style={{ display: "flex", gap: 1, marginTop: 3 }}>
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#FFB547", fontSize: 11 }}>★</span>)}
              <span style={{ fontSize: 11, color: AT.textMuted, marginLeft: 6 }}>4.9 / 5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — Form */}
      <div className="auth-right" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "56px 48px", position: "relative" }}>
        {/* Top right links */}
        <div style={{ position: "absolute", top: 28, right: 36, display: "flex", gap: 20, alignItems: "center" }}>
          <button className="auth-link" style={{ color: AT.textSub, fontWeight: 500 }}>Need help?</button>
          <button className="auth-link">Contact Sales</button>
        </div>

        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 30, fontWeight: 800, color: AT.text, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Welcome back</h1>
            <p style={{ fontSize: 14, color: AT.textSub, margin: 0 }}>Sign in to your Meta Lead OS workspace.</p>
          </div>

          {/* Google */}
          <button className="auth-google-btn" style={{ marginBottom: 24 }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: AT.cardBorder }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: AT.textMuted, letterSpacing: ".1em" }}>OR CONTINUE WITH EMAIL</span>
            <div style={{ flex: 1, height: 1, background: AT.cardBorder }} />
          </div>

          {/* Form fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 8 }}>
            <AuthInput
              label="Email Address" placeholder="name@company.com" type="email"
              value={email} onChange={e => setEmail(e.target.value)}
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
            />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: AT.textMuted, letterSpacing: ".1em", textTransform: "uppercase" }}>Password</label>
                <button className="auth-link" style={{ fontSize: 12 }}>Forgot password?</button>
              </div>
              <AuthInput
                placeholder="••••••••" type={showPass ? "text" : "password"}
                value={pass} onChange={e => setPass(e.target.value)}
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>}
                rightEl={
                  <button onClick={() => setShowPass(!showPass)} style={{ border: "none", background: "none", cursor: "pointer", color: AT.textMuted, display: "flex", padding: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  </button>
                }
              />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input type="checkbox" style={{ accentColor: AT.primary }} />
              <span style={{ fontSize: 13, color: AT.textSub }}>Remember me for 30 days</span>
            </label>
          </div>

          {error && (
            <div style={{ background: "rgba(255,92,92,0.1)", border: "1px solid rgba(255,92,92,0.25)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: AT.danger, marginBottom: 16 }}>{error}</div>
          )}

          <button className="auth-btn-primary" onClick={handleLogin} disabled={loading} style={{ marginBottom: 20 }}>
            {loading ? "Signing in..." : "Sign In to Dashboard →"}
          </button>

          {/* Tip */}
          <div style={{ background: "rgba(79,110,247,0.08)", border: "1px solid rgba(79,110,247,0.2)", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: AT.accent, flexShrink: 0 }}>💡</span>
            <div style={{ fontSize: 12, color: AT.textSub, lineHeight: 1.6 }}>You can now sync Instagram Direct Messages automatically via the Integrations panel.</div>
          </div>

          <div style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: AT.textSub }}>
            Don't have an account?{" "}
            <button className="auth-link" onClick={onSignup}>Create a workspace</button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 24 }}>
            {["Privacy Policy", "Terms of Service", "Help Center"].map(t => (
              <button key={t} style={{ fontSize: 12, color: AT.textMuted, border: "none", background: "none", cursor: "pointer", fontFamily: "'Roboto',sans-serif", transition: "color .15s" }}
                onMouseEnter={e => e.currentTarget.style.color = AT.textSub}
                onMouseLeave={e => e.currentTarget.style.color = AT.textMuted}>{t}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Signup Page ──────────────────────────────────────────────────────────────
const SignupPage = ({ onSignup, onLogin }) => {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", password: "" });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const handleSignup = async () => {
    if (!agree) { setError("Please agree to the Terms of Service and Privacy Policy."); return; }
    if (!form.email || !form.password) { setError("Email and password are required."); return; }
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signUp({ email: form.email, password: form.password });
    setLoading(false);
    if (error) setError(error.message);
    else onSignup();
  };

  return (
    <div style={{ minHeight: "100vh", background: AT.bg, display: "flex", fontFamily: "'Roboto', sans-serif", color: AT.text, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=DM+Sans:wght@600;700;800&display=swap');
        .auth-bg-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .auth-btn-primary { background: linear-gradient(135deg, #4F6EF7 0%, #00E5C8 100%); color: #fff; border: none; padding: 14px 32px; border-radius: 10px; font-family: 'Roboto',sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: opacity .2s, transform .15s, box-shadow .2s; box-shadow: 0 4px 24px rgba(79,110,247,0.3); width: 100%; }
        .auth-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .auth-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .auth-link { background: none; border: none; color: ${AT.primary}; font-family: 'Roboto',sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; padding: 0; transition: color .15s; }
        .auth-link:hover { color: ${AT.accent}; }
        .auth-google-btn { width: 100%; padding: 13px; background: rgba(255,255,255,0.04); border: 1.5px solid ${AT.cardBorder}; border-radius: 10px; color: ${AT.text}; font-family: 'Roboto',sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: border-color .2s, background .2s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .auth-google-btn:hover { border-color: rgba(79,110,247,0.5); background: rgba(79,110,247,0.06); }
        @media (max-width: 900px) { .signup-left { display: none !important; } .signup-right { padding: 32px 20px !important; } }
      `}</style>

      {/* Ambient blobs */}
      <div className="auth-bg-blob" style={{ top: -100, right: "20%", width: 400, height: 400, background: "radial-gradient(circle, rgba(79,110,247,0.1) 0%, transparent 70%)" }} />
      <div className="auth-bg-blob" style={{ bottom: -60, left: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(0,229,200,0.08) 0%, transparent 70%)" }} />

      {/* Left panel */}
      <div className="signup-left" style={{
        width: "50%", flexShrink: 0,
        background: "rgba(13,17,23,0.9)",
        borderRight: `1px solid ${AT.cardBorder}`,
        padding: "56px 48px",
        display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: AT.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 17, color: AT.text }}>Meta Lead OS</span>
        </div>

        {/* Value props */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,229,200,0.1)", border: "1px solid rgba(0,229,200,0.2)", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: AT.accent, letterSpacing: ".04em", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: AT.accent, display: "inline-block" }} />
            14 DAYS FREE — NO CARD NEEDED
          </div>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 36, fontWeight: 800, lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-0.02em", color: AT.text }}>
            Your workspace,<br />
            <span style={{ background: AT.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ready in 30 seconds.</span>
          </h2>
          <p style={{ fontSize: 14, color: AT.textSub, lineHeight: 1.75, marginBottom: 36 }}>Join 2,500+ businesses automating their Meta lead pipeline. No technical setup required.</p>

          {[
            { icon: "🚀", title: "Instant Activation", sub: "Your workspace provisions immediately after sign-up." },
            { icon: "🛡️", title: "Enterprise-Grade Security", sub: "Lead data encrypted with bank-level security at every layer." },
            { icon: "🌐", title: "All Channels, One OS", sub: "WhatsApp, Instagram, Facebook leads unified in one dashboard." },
          ].map(f => (
            <div key={f.title} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(79,110,247,0.1)", border: "1px solid rgba(79,110,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 14, color: AT.text, marginBottom: 3 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: AT.textSub, lineHeight: 1.5 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[["500+", "Agencies"], ["14 Days", "Free Trial"], ["< 3min", "Lead Response"], ["4.9★", "User Rating"]].map(([v, l]) => (
            <div key={l} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${AT.cardBorder}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 18, color: AT.text, marginBottom: 2 }}>{v}</div>
              <div style={{ fontSize: 11, color: AT.textMuted, fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — Form */}
      <div className="signup-right" style={{ width: "50%", overflowY: "auto", padding: "48px 52px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative" }}>
        {/* Top-right links */}
        <div style={{ position: "absolute", top: 28, right: 36, display: "flex", gap: 20 }}>
          <button className="auth-link" style={{ color: AT.textSub, fontWeight: 500, fontSize: 13 }}>Need help?</button>
          <button className="auth-link" style={{ fontSize: 13 }}>Contact Sales</button>
        </div>

        <div style={{ maxWidth: 520 }}>
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, color: AT.text, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Create your workspace</h1>
            <p style={{ fontSize: 14, color: AT.textSub }}>Join 2,500+ companies automating their Meta lead pipeline.</p>
          </div>

          {/* Google */}
          <button className="auth-google-btn" style={{ marginBottom: 24 }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: AT.cardBorder }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: AT.textMuted, letterSpacing: ".1em" }}>OR SIGN UP WITH EMAIL</span>
            <div style={{ flex: 1, height: 1, background: AT.cardBorder }} />
          </div>

          {/* Form grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <AuthInput label="Full Name" placeholder="John Doe" value={form.name} onChange={set("name")}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>} />
            <AuthInput label="Company Name" placeholder="Acme Corp" value={form.company} onChange={set("company")}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg>} />
            <AuthInput label="Business Email" placeholder="john@acme.com" type="email" value={form.email} onChange={set("email")}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>} />
            <AuthInput label="Phone Number" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>} />
            <div style={{ gridColumn: "1/-1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: AT.textMuted, letterSpacing: ".1em", textTransform: "uppercase" }}>Password</label>
              </div>
              <AuthInput placeholder="Min. 8 characters" type={showPass ? "text" : "password"} value={form.password} onChange={set("password")}
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>}
                rightEl={
                  <button onClick={() => setShowPass(!showPass)} style={{ border: "none", background: "none", cursor: "pointer", color: AT.textMuted, display: "flex", padding: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  </button>
                }
              />
              <div style={{ fontSize: 11, color: AT.textMuted, marginTop: 6 }}>Minimum 8 characters with numbers and symbols.</div>
            </div>
          </div>

          {/* Terms */}
          <label style={{ display: "flex", gap: 10, cursor: "pointer", alignItems: "flex-start", marginBottom: 20 }}>
            <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginTop: 2, accentColor: AT.primary, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: AT.textSub, lineHeight: 1.6 }}>
              I agree to the{" "}
              <button className="auth-link" style={{ fontSize: 13 }}>Terms of Service</button>
              {" "}and{" "}
              <button className="auth-link" style={{ fontSize: 13 }}>Privacy Policy</button>.
            </span>
          </label>

          {error && (
            <div style={{ background: "rgba(255,92,92,0.1)", border: "1px solid rgba(255,92,92,0.25)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: AT.danger, marginBottom: 16 }}>{error}</div>
          )}

          <button className="auth-btn-primary" onClick={handleSignup} disabled={loading} style={{ marginBottom: 16 }}>
            {loading ? "Creating workspace..." : "Create Workspace & Sign Up →"}
          </button>

          {/* Instant activation tip */}
          <div style={{ background: "rgba(0,229,200,0.06)", border: "1px solid rgba(0,229,200,0.18)", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 24 }}>
            <span style={{ flexShrink: 0 }}>⚡</span>
            <div style={{ fontSize: 12, color: AT.textSub, lineHeight: 1.6 }}>
              <strong style={{ color: AT.text }}>Instant Activation:</strong> Your dedicated Meta OS workspace provisions immediately upon registration.
            </div>
          </div>

          <div style={{ textAlign: "center", fontSize: 14, color: AT.textSub }}>
            Already have an account?{" "}
            <button className="auth-link" onClick={onLogin}>Sign in here</button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 24 }}>
            {["Privacy Policy", "Terms of Service", "Help Center"].map(t => (
              <button key={t} style={{ fontSize: 12, color: AT.textMuted, border: "none", background: "none", cursor: "pointer", fontFamily: "'Roboto',sans-serif", transition: "color .15s" }}
                onMouseEnter={e => e.currentTarget.style.color = AT.textSub}
                onMouseLeave={e => e.currentTarget.style.color = AT.textMuted}>{t}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Landing Page ─────────────────────────────────────────────────────────────
const LandingPage = ({ onLogin, onSignup, onAbout, onCareers, onPrivacy }) => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleContact = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSent(true);
      setTimeout(() => setContactSent(false), 4000);
      setContactForm({ name: "", email: "", message: "" });
    }
  };

  const faqs = [
    { q: "Can I change my plan later?", a: "Yes. Upgrade or downgrade anytime from billing settings. Changes apply at the next billing cycle." },
    { q: "Is there a free trial?", a: "All plans include a 14-day free trial. No credit card required to start." },
    { q: "How does AI Lead Scoring work?", a: "Our engine analyzes location, budget, job title, and behavioral signals to assign a quality score from 0–100." },
    { q: "Does this include Meta Ads budget?", a: "No. Meta Lead OS is a CRM and automation platform. Your ad budget is managed separately in Meta Business Suite." },
    { q: "Is WhatsApp API included?", a: "WhatsApp Business API integration is available on Growth and Scale plans." },
    { q: "What happens if I exceed my lead limit?", a: "We notify you at 85% usage. At the limit, automated captures pause until the next cycle or you upgrade." },
  ];

  const LP = {
    bg: "#05080F",
    card: "#0D1117",
    cardBorder: "#1C2333",
    primary: "#4F6EF7",
    primaryGlow: "rgba(79,110,247,0.25)",
    accent: "#00E5C8",
    accentGlow: "rgba(0,229,200,0.2)",
    text: "#F0F4FF",
    textSub: "#8892A4",
    textMuted: "#4A5568",
    success: "#00D68F",
    warning: "#FFB547",
    danger: "#FF5C5C",
    gradient: "linear-gradient(135deg, #4F6EF7 0%, #00E5C8 100%)",
    gradientText: "linear-gradient(90deg, #FFFFFF 0%, #8BA4FF 60%, #00E5C8 100%)",
  };

  const glassCard = {
    background: LP.card,
    border: `1px solid ${LP.cardBorder}`,
    borderRadius: 16,
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", color: LP.text, background: LP.bg, overflowX: "hidden", minHeight: "100vh" }}>

      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=DM+Sans:wght@600;700;800&display=swap');

        .lp * { box-sizing: border-box; }

        .lp-grad-text {
          background: ${LP.gradientText};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lp-btn-primary {
          background: ${LP.gradient};
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 10px;
          font-family: 'Roboto', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: opacity .2s, transform .15s, box-shadow .2s;
          box-shadow: 0 4px 24px ${LP.primaryGlow};
          white-space: nowrap;
        }
        .lp-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 32px ${LP.primaryGlow}; }

        .lp-btn-ghost {
          background: transparent;
          color: ${LP.text};
          border: 1.5px solid ${LP.cardBorder};
          padding: 13px 28px;
          border-radius: 10px;
          font-family: 'Roboto', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: border-color .2s, background .2s;
          white-space: nowrap;
        }
        .lp-btn-ghost:hover { border-color: ${LP.primary}; background: rgba(79,110,247,0.08); }

        .lp-btn-text {
          background: none;
          border: none;
          color: ${LP.textSub};
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: color .15s;
          padding: 4px 0;
        }
        .lp-btn-text:hover { color: ${LP.text}; }

        .lp-card {
          background: ${LP.card};
          border: 1px solid ${LP.cardBorder};
          border-radius: 16px;
          transition: border-color .2s, transform .2s, box-shadow .2s;
        }
        .lp-card:hover { border-color: rgba(79,110,247,0.4); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }

        .lp-nav-link {
          background: none;
          border: none;
          color: ${LP.textSub};
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: color .15s;
          padding: 4px 0;
        }
        .lp-nav-link:hover { color: ${LP.text}; }

        .lp-input {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid ${LP.cardBorder};
          border-radius: 10px;
          color: ${LP.text};
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          padding: 13px 16px;
          outline: none;
          transition: border-color .2s;
          width: 100%;
        }
        .lp-input::placeholder { color: ${LP.textMuted}; }
        .lp-input:focus { border-color: ${LP.primary}; background: rgba(79,110,247,0.06); }

        .lp-textarea {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid ${LP.cardBorder};
          border-radius: 10px;
          color: ${LP.text};
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          padding: 13px 16px;
          outline: none;
          transition: border-color .2s;
          width: 100%;
          resize: vertical;
          min-height: 120px;
        }
        .lp-textarea::placeholder { color: ${LP.textMuted}; }
        .lp-textarea:focus { border-color: ${LP.primary}; background: rgba(79,110,247,0.06); }

        .lp-faq-row { transition: background .15s; cursor: pointer; }
        .lp-faq-row:hover { background: rgba(255,255,255,0.03); }

        .lp-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(79,110,247,0.12);
          color: #8BA4FF;
          border: 1px solid rgba(79,110,247,0.25);
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Roboto', sans-serif;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .lp-dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .lp-glow-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, ${LP.primary}, ${LP.accent}, transparent);
        }

        .lp-stat-card {
          text-align: center;
          padding: 32px 20px;
          background: ${LP.card};
          border: 1px solid ${LP.cardBorder};
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }
        .lp-stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: ${LP.gradient};
        }

        @media (max-width: 900px) {
          .lp-hero-grid { grid-template-columns: 1fr !important; }
          .lp-hero-visual { display: none !important; }
          .lp-3col { grid-template-columns: 1fr 1fr !important; }
          .lp-4col { grid-template-columns: 1fr 1fr !important; }
          .lp-pricing-grid { grid-template-columns: 1fr !important; max-width: 420px !important; }
          .lp-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .lp-contact-grid { grid-template-columns: 1fr !important; }
          .lp-pad { padding: 60px 24px !important; }
          .lp-nav-links { display: none !important; }
          .lp-nav-cta { display: none !important; }
          .lp-hamburger { display: flex !important; }
        }
        @media (max-width: 540px) {
          .lp-3col { grid-template-columns: 1fr !important; }
          .lp-4col { grid-template-columns: 1fr !important; }
          .lp-footer-grid { grid-template-columns: 1fr !important; }
          .lp-hero-btns { flex-direction: column !important; }
          .lp-cta-btns { flex-direction: column !important; }
          .lp-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        .lp-hamburger { display: none !important; }
      `}</style>

      <div className="lp">

        {/* ── NAV ── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 300,
          background: "rgba(5,8,15,0.85)", backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${LP.cardBorder}`,
          padding: "0 60px", height: 68,
          display: "flex", alignItems: "center", gap: 40
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: LP.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, color: LP.text, letterSpacing: "-0.02em" }}>Meta Lead OS</span>
          </div>

          {/* Nav Links */}
          <div className="lp-nav-links" style={{ display: "flex", gap: 32, flex: 1 }}>
            {[["Features", "features"], ["Pricing", "pricing"], ["Contact", "contact"]].map(([l, id]) => (
              <button key={id} className="lp-nav-link" onClick={() => scrollTo(id)}>{l}</button>
            ))}
          </div>

          {/* CTA */}
          <div className="lp-nav-cta" style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
            <button className="lp-btn-text" onClick={onLogin}>Log in</button>
            <button className="lp-btn-primary" style={{ padding: "10px 22px", fontSize: 14 }} onClick={onSignup}>Get Started Free</button>
          </div>

          {/* Hamburger */}
          <button className="lp-hamburger" onClick={() => setMobileMenuOpen(o => !o)}
            style={{ marginLeft: "auto", border: "none", background: "none", color: LP.text, cursor: "pointer", padding: 6, display: "flex", alignItems: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {mobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
            </svg>
          </button>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div style={{ position: "fixed", top: 68, left: 0, right: 0, background: LP.card, borderBottom: `1px solid ${LP.cardBorder}`, padding: "20px 24px", zIndex: 299, display: "flex", flexDirection: "column", gap: 4 }}>
              {[["Features", "features"], ["Pricing", "pricing"], ["Contact", "contact"]].map(([l, id]) => (
                <button key={id} onClick={() => scrollTo(id)}
                  style={{ border: "none", background: "none", color: LP.text, fontFamily: "'Roboto',sans-serif", fontSize: 15, fontWeight: 500, textAlign: "left", padding: "13px 0", borderBottom: `1px solid ${LP.cardBorder}`, cursor: "pointer" }}>{l}</button>
              ))}
              <div style={{ display: "flex", gap: 10, paddingTop: 16 }}>
                <button onClick={onLogin} style={{ flex: 1, padding: "12px", border: `1.5px solid ${LP.cardBorder}`, borderRadius: 10, background: "none", color: LP.text, fontFamily: "'Roboto',sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Log in</button>
                <button onClick={onSignup} className="lp-btn-primary" style={{ flex: 1, padding: "12px" }}>Sign Up</button>
              </div>
            </div>
          )}
        </nav>

        {/* ── HERO ── */}
        <section className="lp-dot-grid lp-pad" style={{ padding: "100px 60px 80px", position: "relative", overflow: "hidden" }}>
          {/* Ambient glow blobs */}
          <div style={{ position: "absolute", top: -120, left: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,110,247,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 60, right: "10%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,200,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="lp-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div>
              <div className="lp-tag" style={{ marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: LP.accent, display: "inline-block" }} />
                AI-Powered Lead Conversion Platform
              </div>
              <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 24px", letterSpacing: "-0.03em" }}>
                <span style={{ color: LP.text }}>Convert Meta Leads</span><br />
                <span className="lp-grad-text">Into Revenue —</span><br />
                <span style={{ color: LP.text }}>On Autopilot.</span>
              </h1>
              <p style={{ fontSize: 17, color: LP.textSub, lineHeight: 1.75, marginBottom: 40, maxWidth: 480, fontWeight: 400 }}>
                Stop losing high-intent leads to slow manual follow-ups. Capture, score, and engage Meta leads in under 3 minutes with zero human intervention.
              </p>
              <div className="lp-hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
                <button className="lp-btn-primary" onClick={onSignup} style={{ fontSize: 15, padding: "15px 36px" }}>
                  Start Free — 14 Days
                </button>
                <button className="lp-btn-ghost" onClick={() => scrollTo("features")}>
                  See How It Works ↓
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex" }}>
                  {["SK", "MR", "AT", "PG", "DR"].map((l, i) => (
                    <div key={l} style={{ width: 32, height: 32, borderRadius: "50%", background: [LP.primary, "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"][i], display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, marginLeft: i > 0 ? -9 : 0, border: `2px solid ${LP.bg}`, fontFamily: "'Roboto',sans-serif" }}>{l}</div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 13, color: LP.text, fontWeight: 700 }}>500+ agencies trust Meta Lead OS</div>
                  <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: LP.warning, fontSize: 12 }}>★</span>)}
                    <span style={{ fontSize: 12, color: LP.textSub, marginLeft: 6 }}>4.9 / 5.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual — Dashboard mockup */}
            <div className="lp-hero-visual" style={{ position: "relative" }}>
              <div style={{ ...glassCard, padding: 28, boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${LP.cardBorder}, inset 0 1px 0 rgba(255,255,255,0.06)` }}>
                {/* Header bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: LP.textMuted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>Live Dashboard</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 800, color: LP.text }}>Today's Overview</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,214,143,0.12)", border: "1px solid rgba(0,214,143,0.25)", borderRadius: 20, padding: "5px 12px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: LP.success, boxShadow: `0 0 6px ${LP.success}` }} />
                    <span style={{ fontSize: 11, color: LP.success, fontWeight: 700 }}>LIVE</span>
                  </div>
                </div>
                {/* Metric cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {[
                    { label: "Leads Today", val: "142", delta: "+12.5%", up: true, color: LP.primary },
                    { label: "Hot Leads", val: "28", delta: "+5 new", up: true, color: LP.warning },
                    { label: "Conversion Rate", val: "8.4%", delta: "+0.8%", up: true, color: LP.success },
                    { label: "Revenue", val: "₹4.8L", delta: "+18.2%", up: true, color: LP.accent },
                  ].map(m => (
                    <div key={m.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${LP.cardBorder}`, borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ fontSize: 11, color: LP.textMuted, fontWeight: 500, marginBottom: 6 }}>{m.label}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 800, color: m.color, marginBottom: 4 }}>{m.val}</div>
                      <div style={{ fontSize: 11, color: LP.success, fontWeight: 600 }}>{m.up ? "↑" : "↓"} {m.delta}</div>
                    </div>
                  ))}
                </div>
                {/* Lead activity feed */}
                <div style={{ borderTop: `1px solid ${LP.cardBorder}`, paddingTop: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: LP.textMuted, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>Live Activity</div>
                  {[
                    { name: "Priya S.", score: 94, time: "just now", color: LP.success },
                    { name: "Rohan M.", score: 81, time: "2 min ago", color: LP.primary },
                    { name: "Aisha K.", score: 73, time: "5 min ago", color: LP.warning },
                  ].map((l, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 2 ? `1px solid ${LP.cardBorder}` : "none" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: l.color + "22", border: `1px solid ${l.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: l.color }}>{l.name[0]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: LP.text }}>{l.name}</div>
                        <div style={{ fontSize: 11, color: LP.textMuted }}>{l.time}</div>
                      </div>
                      <div style={{ background: l.color + "18", border: `1px solid ${l.color}44`, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: l.color }}>Score {l.score}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating badge */}
              <div style={{ position: "absolute", bottom: -18, left: -20, background: LP.card, border: `1px solid ${LP.cardBorder}`, borderRadius: 12, padding: "10px 16px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(0,229,200,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LP.accent} strokeWidth="2.2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: LP.text }}>WhatsApp Sent</div>
                  <div style={{ fontSize: 11, color: LP.accent }}>Auto-follow-up — 0:47s</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GLOW LINE ── */}
        <div className="lp-glow-line" />

        {/* ── LOGOS BAR ── */}
        <div style={{ background: LP.card, borderBottom: `1px solid ${LP.cardBorder}`, padding: "20px 60px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: LP.textMuted, letterSpacing: ".1em", textTransform: "uppercase", flexShrink: 0 }}>Trusted by teams at</span>
            {["EduCorp", "DigitalGrow", "Axelmore", "BrandScale", "QuickReach", "MediaHub"].map(b => (
              <span key={b} style={{ fontSize: 14, fontWeight: 700, color: LP.textMuted, opacity: 0.6, letterSpacing: "-0.01em" }}>{b}</span>
            ))}
          </div>
        </div>

        {/* ── PROBLEM vs SOLUTION ── */}
        <section className="lp-pad" style={{ padding: "100px 60px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="lp-tag" style={{ marginBottom: 20 }}>The Problem</div>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.03em", color: LP.text }}>
                Why Meta advertisers<br /><span className="lp-grad-text">bleed money every day</span>
              </h2>
              <p style={{ fontSize: 16, color: LP.textSub, maxWidth: 520, margin: "0 auto" }}>Traditional CRMs weren't designed for the velocity of social media leads. The gap is costing you real revenue.</p>
            </div>
            <div className="lp-3col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[
                { icon: "⏱", title: "Hours of delay", sub: "Leads sit untouched in Meta Business Suite while your competitors respond instantly.", color: LP.danger },
                { icon: "🧊", title: "Cold by contact time", sub: "By the time your sales team calls, the prospect has already moved on to the next option.", color: LP.warning },
                { icon: "🎯", title: "Zero lead quality filter", sub: "Your team wastes 60% of their time on junk leads that will never convert.", color: "#8B5CF6" },
                { icon: "🕳", title: "No attribution loop", sub: "You don't know which ad creative actually drove the closed deal — so you can't scale it.", color: "#EC4899" },
              ].map((p, i) => (
                <div key={i} className="lp-card" style={{ padding: 28, display: "flex", gap: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: p.color + "18", border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: LP.text, marginBottom: 8 }}>{p.title}</div>
                    <div style={{ fontSize: 14, color: LP.textSub, lineHeight: 1.7 }}>{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="lp-pad" style={{ padding: "100px 60px", background: "rgba(255,255,255,0.015)", borderTop: `1px solid ${LP.cardBorder}`, borderBottom: `1px solid ${LP.cardBorder}` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="lp-tag" style={{ marginBottom: 20 }}>Platform Features</div>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.03em", color: LP.text }}>
                Everything you need to<br /><span className="lp-grad-text">close more deals, faster</span>
              </h2>
            </div>
            {/* Big feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20, marginBottom: 20 }}>
              <div className="lp-card" style={{ padding: 40, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,110,247,0.15) 0%, transparent 70%)" }} />
                <div style={{ fontSize: 36, marginBottom: 20 }}>⚡</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 22, color: LP.text, marginBottom: 12 }}>Real-Time Lead Capture</div>
                <p style={{ fontSize: 15, color: LP.textSub, lineHeight: 1.7, marginBottom: 24 }}>Webhook-powered sync from Meta Lead Forms, Instagram DMs, and Messenger. Zero latency. Zero manual entry. Every lead captured in under a second.</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["Meta Lead Forms", "Instagram DMs", "Messenger", "WhatsApp"].map(t => (
                    <span key={t} style={{ fontSize: 12, fontWeight: 600, color: LP.textSub, background: "rgba(255,255,255,0.05)", border: `1px solid ${LP.cardBorder}`, borderRadius: 6, padding: "4px 10px" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="lp-card" style={{ padding: 40, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,200,0.12) 0%, transparent 70%)" }} />
                <div style={{ fontSize: 36, marginBottom: 20 }}>🧠</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 22, color: LP.text, marginBottom: 12 }}>AI Lead Scoring 2.0</div>
                <p style={{ fontSize: 15, color: LP.textSub, lineHeight: 1.7 }}>Our engine analyzes budget signals, job title, location, and behavioral patterns to rank every lead from 0–100. Your sales team only touches the 90+ scores.</p>
              </div>
            </div>
            {/* Small feature cards */}
            <div className="lp-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {[
                { icon: "💬", title: "WhatsApp Flows", sub: "Auto-send nurture sequences triggered within 3 minutes of capture.", color: "#25D366" },
                { icon: "📊", title: "Attribution Engine", sub: "Tie every closed deal back to the exact ad creative that started it.", color: LP.primary },
                { icon: "🔗", title: "50+ Integrations", sub: "Salesforce, HubSpot, Google Sheets, Zapier and more, out of the box.", color: LP.accent },
                { icon: "📈", title: "Revenue Analytics", sub: "Full-funnel dashboards from first click to final payment.", color: LP.warning },
              ].map(f => (
                <div key={f.title} className="lp-card" style={{ padding: 24 }}>
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: LP.text, marginBottom: 8 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: LP.textSub, lineHeight: 1.6 }}>{f.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="lp-pad" style={{ padding: "100px 60px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="lp-tag" style={{ marginBottom: 20 }}>How It Works</div>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, margin: 0, letterSpacing: "-0.03em", color: LP.text }}>
                From lead captured to<br /><span className="lp-grad-text">deal closed in 4 steps</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="lp-3col">
              {[
                { n: "01", icon: "📥", title: "Instant Capture", sub: "Meta lead forms sync directly via webhook. No manual export, no CSV upload. Every lead arrives in real time.", color: LP.primary },
                { n: "02", icon: "🎯", title: "AI Scores Instantly", sub: "Within seconds, each lead receives a 0–100 quality score based on your custom business rules and signals.", color: LP.accent },
                { n: "03", icon: "💬", title: "Auto Follow-Up Fires", sub: "WhatsApp message, email, and SMS sequences launch automatically — your best leads get contacted while they're still hot.", color: "#25D366" },
                { n: "04", icon: "📈", title: "Revenue Attributed", sub: "When the deal closes, the credit flows back to the exact ad campaign and creative that generated the lead.", color: LP.warning },
              ].map(s => (
                <div key={s.n} className="lp-card" style={{ padding: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 48, fontWeight: 800, color: LP.cardBorder, lineHeight: 1, flexShrink: 0, marginTop: -4 }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize: 26, marginBottom: 12 }}>{s.icon}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: LP.text, marginBottom: 10 }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: LP.textSub, lineHeight: 1.7 }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ background: LP.card, borderTop: `1px solid ${LP.cardBorder}`, borderBottom: `1px solid ${LP.cardBorder}`, padding: "64px 60px" }}>
          <div className="lp-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
            {[
              { val: "45%", label: "Faster Response Time", icon: "⚡" },
              { val: "12x", label: "Lead Visibility vs Manual", icon: "👁" },
              { val: "3.2x", label: "Average ROI Increase", icon: "📈" },
              { val: "< 3min", label: "Lead-to-Contact Speed", icon: "🚀" },
            ].map(s => (
              <div key={s.label} className="lp-stat-card">
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, marginBottom: 8, background: LP.gradientText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.val}</div>
                <div style={{ fontSize: 13, color: LP.textSub, fontWeight: 500, lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="lp-pad" style={{ padding: "100px 60px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="lp-tag" style={{ marginBottom: 20 }}>Customer Stories</div>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, margin: 0, letterSpacing: "-0.03em", color: LP.text }}>
                Real results from<br /><span className="lp-grad-text">real marketers</span>
              </h2>
            </div>
            <div className="lp-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {[
                { quote: "Meta Lead OS halved our cost per acquisition. The AI scoring means my team never wastes a call on a junk lead again.", name: "Sarah Jenkins", title: "Head of Growth, EduCorp", rating: 5, avatar: "SJ" },
                { quote: "The WhatsApp automation alone is worth the subscription. It's like a 24/7 sales rep that never sleeps, never misses a lead.", name: "Marcus Thorne", title: "Founder, DigitalGrow Agency", rating: 5, avatar: "MT", featured: true },
                { quote: "Finally — a platform built for how Meta ads actually work. We 3x'd our conversion rate in the first month.", name: "Dena Rodriguez", title: "Director, Axelmore", rating: 5, avatar: "DR" },
              ].map((t, i) => (
                <div key={i} className="lp-card" style={{ padding: 32, position: "relative", ...(t.featured ? { border: `1px solid ${LP.primary}44`, background: "rgba(79,110,247,0.05)" } : {}) }}>
                  {t.featured && <div style={{ position: "absolute", top: -1, left: 24, right: 24, height: 2, background: LP.gradient, borderRadius: 2 }} />}
                  <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                    {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: LP.warning, fontSize: 14 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 15, color: LP.textSub, lineHeight: 1.75, marginBottom: 24, fontStyle: "italic" }}>"{t.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: LP.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: LP.text }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: LP.textMuted }}>{t.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="lp-pad" style={{ padding: "100px 60px", background: "rgba(255,255,255,0.015)", borderTop: `1px solid ${LP.cardBorder}`, borderBottom: `1px solid ${LP.cardBorder}` }}>
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div className="lp-tag" style={{ marginBottom: 20 }}>Pricing</div>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.03em", color: LP.text }}>
                Simple, transparent<br /><span className="lp-grad-text">pricing that scales</span>
              </h2>
              <p style={{ fontSize: 15, color: LP.textSub, marginBottom: 32 }}>All plans include 14-day free trial. No credit card required.</p>
              {/* Toggle */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: LP.card, border: `1px solid ${LP.cardBorder}`, borderRadius: 40, padding: "6px 20px" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: billingPeriod === "monthly" ? LP.text : LP.textMuted }}>Monthly</span>
                <div onClick={() => setBillingPeriod(p => p === "monthly" ? "yearly" : "monthly")}
                  style={{ width: 44, height: 24, background: LP.primary, borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", padding: "0 3px", boxShadow: `0 0 12px ${LP.primaryGlow}` }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "transform .25s", transform: billingPeriod === "yearly" ? "translateX(20px)" : "translateX(0)" }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: billingPeriod === "yearly" ? LP.text : LP.textMuted }}>
                  Yearly <span style={{ fontSize: 11, fontWeight: 700, color: LP.success, background: "rgba(0,214,143,0.15)", border: "1px solid rgba(0,214,143,0.25)", borderRadius: 10, padding: "2px 8px", marginLeft: 4 }}>−25%</span>
                </span>
              </div>
            </div>
            <div className="lp-pricing-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.08fr 1fr", gap: 20, maxWidth: 1060, margin: "0 auto" }}>
              {[
                {
                  name: "Starter", badge: null,
                  price: billingPeriod === "yearly" ? "₹2,249" : "₹2,999",
                  tagline: "For solo marketers and micro-businesses just getting started.",
                  features: ["2 Team Members", "1,000 Leads / month", "Basic Workflow Automation", "Standard Lead Capture", "Email Support"],
                  disabled: ["AI Lead Scoring", "WhatsApp API", "Custom Analytics"],
                  popular: false,
                },
                {
                  name: "Growth", badge: "Most Popular",
                  price: billingPeriod === "yearly" ? "₹5,249" : "₹6,999",
                  tagline: "The growth engine for scaling agencies and performance teams.",
                  features: ["5 Team Members", "5,000 Leads / month", "AI Lead Scoring 2.0", "Workflow Automation Builder", "WhatsApp & Meta API", "Real-time Analytics", "Priority Support", "Full API Access"],
                  popular: true,
                },
                {
                  name: "Scale", badge: null,
                  price: billingPeriod === "yearly" ? "₹11,249" : "₹14,999",
                  tagline: "Enterprise-grade power for high-volume agencies and large teams.",
                  features: ["Unlimited Members", "50,000 Leads / month", "Custom Scoring Rules", "Multi-branch Workflows", "Full API & Webhooks", "White-label Reports", "Dedicated Account Manager", "Custom SLAs"],
                  popular: false,
                },
              ].map(plan => (
                <div key={plan.name} style={{
                  ...glassCard,
                  padding: 36,
                  position: "relative",
                  ...(plan.popular ? {
                    border: `1px solid ${LP.primary}66`,
                    background: "rgba(79,110,247,0.06)",
                    boxShadow: `0 0 60px rgba(79,110,247,0.15)`,
                  } : {}),
                }}>
                  {plan.popular && <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 2, background: LP.gradient }} />}
                  {plan.badge && (
                    <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: LP.gradient, color: "#fff", fontSize: 11, fontWeight: 800, padding: "5px 18px", borderRadius: 20, whiteSpace: "nowrap", boxShadow: `0 4px 16px ${LP.primaryGlow}` }}>{plan.badge}</div>
                  )}
                  <div style={{ fontSize: 12, fontWeight: 700, color: LP.textMuted, letterSpacing: ".1em", marginBottom: 10, textTransform: "uppercase" }}>{plan.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 2.5vw, 36px)", fontWeight: 800, color: LP.text, marginBottom: 6 }}>
                    {plan.price}<span style={{ fontSize: 14, fontWeight: 400, color: LP.textMuted }}>/mo</span>
                  </div>
                  <div style={{ fontSize: 13, color: LP.textSub, marginBottom: 28, lineHeight: 1.6 }}>{plan.tagline}</div>
                  <div style={{ borderTop: `1px solid ${LP.cardBorder}`, paddingTop: 24, marginBottom: 28 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, fontSize: 13, color: LP.text }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(0,229,200,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={LP.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        {f}
                      </div>
                    ))}
                    {plan.disabled?.map(f => (
                      <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, fontSize: 13, color: LP.textMuted, textDecoration: "line-through" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontSize: 9 }}>✕</span>
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                  <button className="lp-btn-primary" onClick={onSignup} style={{ width: "100%", padding: "14px", fontSize: 14, ...(plan.popular ? {} : { background: "rgba(255,255,255,0.07)", boxShadow: "none" }) }}>
                    Start Free Trial
                  </button>
                  <div style={{ textAlign: "center", fontSize: 12, color: LP.textMuted, marginTop: 12 }}>14 days free. No card needed.</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="lp-pad" style={{ padding: "100px 60px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="lp-tag" style={{ marginBottom: 20 }}>FAQ</div>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, margin: 0, letterSpacing: "-0.03em", color: LP.text }}>
                Questions? <span className="lp-grad-text">We've got answers.</span>
              </h2>
            </div>
            {faqs.map((faq, i) => (
              <div key={i} className="lp-faq-row" style={{ borderTop: `1px solid ${LP.cardBorder}`, ...(i === faqs.length - 1 ? { borderBottom: `1px solid ${LP.cardBorder}` } : {}) }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
                  <span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, fontWeight: 600, color: openFaq === i ? LP.text : LP.textSub }}>{faq.q}</span>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${LP.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform .2s, border-color .2s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)", borderColor: openFaq === i ? LP.primary : LP.cardBorder }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={openFaq === i ? LP.primary : LP.textMuted} strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>
                {openFaq === i && (
                  <div style={{ paddingBottom: 22, fontSize: 14, color: LP.textSub, lineHeight: 1.75 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="lp-pad" style={{ padding: "100px 60px", background: "rgba(255,255,255,0.015)", borderTop: `1px solid ${LP.cardBorder}` }}>
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="lp-tag" style={{ marginBottom: 20 }}>Contact Us</div>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, margin: "0 0 14px", letterSpacing: "-0.03em", color: LP.text }}>
                Let's talk <span className="lp-grad-text">about your growth</span>
              </h2>
              <p style={{ fontSize: 15, color: LP.textSub }}>Reach out for a demo, partnership, or just a quick question. Our team responds within 24 hours.</p>
            </div>
            <div className="lp-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 40 }}>
              {/* Contact info */}
              <div>
                <div style={{ marginBottom: 36 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 18, color: LP.text, marginBottom: 20 }}>Meta Lead OS — India HQ</div>
                  {[
                    { icon: "📍", label: "Address", val: "Plot 14, 2nd Floor, Velachery Main Road\nVelachery, Chennai — 600 042\nTamil Nadu, India" },
                    { icon: "📞", label: "Phone", val: "+91 98765 43210" },
                    { icon: "✉️", label: "Email", val: "hello@metaleados.in" },
                    { icon: "🕐", label: "Hours", val: "Mon–Sat: 9:00 AM – 7:00 PM IST" },
                  ].map(info => (
                    <div key={info.label} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(79,110,247,0.1)", border: `1px solid rgba(79,110,247,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{info.icon}</div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: LP.textMuted, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>{info.label}</div>
                        <div style={{ fontSize: 14, color: LP.textSub, lineHeight: 1.6, whiteSpace: "pre-line" }}>{info.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Social */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: LP.textMuted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Follow Us</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[["in", "LinkedIn"], ["tw", "Twitter"], ["ig", "Instagram"], ["yt", "YouTube"]].map(([s, name]) => (
                      <div key={s} title={name} style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: `1px solid ${LP.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", color: LP.textSub, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "border-color .15s, color .15s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = LP.primary; e.currentTarget.style.color = LP.text; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = LP.cardBorder; e.currentTarget.style.color = LP.textSub; }}>{s}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div style={{ ...glassCard, padding: 40, position: "relative" }}>
                {contactSent ? (
                  <div style={{ textAlign: "center", padding: "60px 20px" }}>
                    <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 22, color: LP.text, marginBottom: 12 }}>Message Sent!</div>
                    <p style={{ fontSize: 14, color: LP.textSub }}>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 20, color: LP.text, marginBottom: 24 }}>Send us a message</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: LP.textMuted, display: "block", marginBottom: 8, letterSpacing: ".04em" }}>YOUR NAME</label>
                        <input className="lp-input" placeholder="John Doe" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: LP.textMuted, display: "block", marginBottom: 8, letterSpacing: ".04em" }}>EMAIL ADDRESS</label>
                        <input className="lp-input" placeholder="you@company.com" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: LP.textMuted, display: "block", marginBottom: 8, letterSpacing: ".04em" }}>COMPANY / AGENCY</label>
                      <input className="lp-input" placeholder="Your company name" />
                    </div>
                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: LP.textMuted, display: "block", marginBottom: 8, letterSpacing: ".04em" }}>MESSAGE</label>
                      <textarea className="lp-textarea" placeholder="Tell us about your lead volume, current setup, or what you need help with..." value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} />
                    </div>
                    <button className="lp-btn-primary" onClick={handleContact} style={{ width: "100%", padding: "15px", fontSize: 15 }}>
                      Send Message →
                    </button>
                    <div style={{ fontSize: 12, color: LP.textMuted, textAlign: "center", marginTop: 12 }}>We typically respond within a few hours.</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ position: "relative", padding: "100px 60px", textAlign: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, rgba(79,110,247,0.18) 0%, rgba(0,229,200,0.08) 50%, transparent 75%)`, pointerEvents: "none" }} />
          <div className="lp-dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
            <div className="lp-tag" style={{ marginBottom: 24 }}>Ready to Scale?</div>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              <span style={{ color: LP.text }}>Stop losing leads.</span><br />
              <span className="lp-grad-text">Start closing them.</span>
            </h2>
            <p style={{ fontSize: 16, color: LP.textSub, marginBottom: 40, lineHeight: 1.7 }}>Join 2,500+ businesses that automated their Meta lead pipeline and doubled their conversion rate within 30 days.</p>
            <div className="lp-cta-btns" style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
              <button className="lp-btn-primary" onClick={onSignup} style={{ fontSize: 16, padding: "16px 44px", boxShadow: `0 8px 40px ${LP.primaryGlow}` }}>
                Start Free 14-Day Trial
              </button>
              <button className="lp-btn-ghost" onClick={() => scrollTo("contact")}>
                Talk to Sales
              </button>
            </div>
            <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap" }}>
              {["✓ No credit card", "✓ Cancel anytime", "✓ Full access from day 1"].map(t => (
                <span key={t} style={{ fontSize: 13, color: LP.textMuted, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: LP.card, borderTop: `1px solid ${LP.cardBorder}`, padding: "60px 60px 32px" }}>
          <div className="lp-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1.2fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: LP.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 15, color: LP.text }}>Meta Lead OS</span>
              </div>
              <p style={{ fontSize: 13, color: LP.textMuted, lineHeight: 1.75, maxWidth: 260 }}>The AI-powered OS for Meta advertisers. Capture, score, and convert leads on full autopilot.</p>
              <div style={{ marginTop: 20, fontSize: 12, color: LP.textMuted }}>
                <div>📍 Velachery, Chennai — 600 042</div>
                <div style={{ marginTop: 4 }}>📞 +91 98765 43210</div>
                <div style={{ marginTop: 4 }}>✉️ hello@metaleados.in</div>
              </div>
            </div>
            {[
              { title: "Product", links: [["Features", "features"], ["Pricing", "pricing"], ["Integrations", null], ["Changelog", null]] },
              { title: "Company", links: [["About Us", onAbout], ["Contact", () => scrollTo("contact")], ["Careers", onCareers], ["Privacy Policy", onPrivacy]] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontWeight: 700, fontSize: 11, color: LP.textMuted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18 }}>{col.title}</div>
                {col.links.map(([l, id]) => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <button onClick={id ? () => typeof id === "function" ? id() : scrollTo(id) : undefined}
                      style={{ border: "none", background: "none", color: LP.textMuted, fontSize: 13, cursor: id ? "pointer" : "default", fontFamily: "'Roboto',sans-serif", padding: 0, transition: "color .15s" }}
                      onMouseEnter={e => { if (id) e.currentTarget.style.color = LP.text; }}
                      onMouseLeave={e => e.currentTarget.style.color = LP.textMuted}>{l}</button>
                  </div>
                ))}
              </div>
            ))}
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: LP.textMuted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18 }}>Newsletter</div>
              <p style={{ fontSize: 13, color: LP.textMuted, lineHeight: 1.6, marginBottom: 14 }}>Get product updates and marketing tips.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <input className="lp-input" placeholder="Your email" style={{ fontSize: 13, padding: "10px 12px" }} />
                <button className="lp-btn-primary" style={{ padding: "10px 16px", fontSize: 13, whiteSpace: "nowrap", flexShrink: 0 }}>Join</button>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${LP.cardBorder}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 12, color: LP.textMuted }}>© 2026 Meta Lead Conversion OS. All rights reserved.</div>
            <div style={{ display: "flex", gap: 20 }}>
              {[["Privacy Policy", onPrivacy], ["Terms of Service", null], ["Cookie Policy", null]].map(([t, handler]) => (
                <button key={t} onClick={handler || undefined} style={{ fontSize: 12, color: LP.textMuted, border: "none", background: "none", cursor: handler ? "pointer" : "default", fontFamily: "'Roboto',sans-serif", transition: "color .15s" }}
                  onMouseEnter={e => { if (handler) e.currentTarget.style.color = LP.text; }}
                  onMouseLeave={e => e.currentTarget.style.color = LP.textMuted}>{t}</button>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};
// ─── About Us Page ────────────────────────────────────────────────────────────
const AboutPage = ({ onBack }) => {
  const AT = {
    bg: "#05080F", card: "#0D1117", cardBorder: "#1C2333",
    primary: "#4F6EF7", accent: "#00E5C8", text: "#F0F4FF",
    textSub: "#8892A4", textMuted: "#4A5568",
    gradient: "linear-gradient(135deg, #4F6EF7 0%, #00E5C8 100%)",
  };
  return (
    <div style={{ minHeight: "100vh", background: AT.bg, fontFamily: "'Roboto', sans-serif", color: AT.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=DM+Sans:wght@600;700;800&display=swap');`}</style>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(5,8,15,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${AT.cardBorder}`, padding: "0 60px", height: 68, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: AT.gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 16, color: AT.text }}>Meta Lead OS</span>
        <button onClick={onBack} style={{ marginLeft: "auto", border: `1.5px solid ${AT.cardBorder}`, background: "none", color: AT.textSub, borderRadius: 10, padding: "9px 20px", fontFamily: "'Roboto',sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>← Back to Home</button>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 40px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(79,110,247,0.12)", border: "1px solid rgba(79,110,247,0.25)", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "#8BA4FF", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 24 }}>About Us</div>
          <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, margin: "0 0 20px", letterSpacing: "-0.03em", background: AT.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Built by marketers,<br />for marketers.</h1>
          <p style={{ fontSize: 17, color: AT.textSub, lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>Meta Lead OS was founded in Chennai, India with one mission — eliminate the gap between a Meta ad click and a closed sale.</p>
        </div>

        {/* Story */}
        <div style={{ background: AT.card, border: `1px solid ${AT.cardBorder}`, borderRadius: 20, padding: 48, marginBottom: 40, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: AT.gradient }} />
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 26, color: AT.text, marginBottom: 20 }}>Our Story</h2>
          <p style={{ fontSize: 15, color: AT.textSub, lineHeight: 1.85, marginBottom: 16 }}>In 2022, our founders were running a digital marketing agency in Chennai. Every day, they watched high-intent leads from Meta ad campaigns sit untouched for hours — sometimes days — before anyone followed up. By then, the lead had moved on.</p>
          <p style={{ fontSize: 15, color: AT.textSub, lineHeight: 1.85, marginBottom: 16 }}>They tried every CRM on the market. None of them were built for the speed and nature of social media leads. Salesforce was too complex. HubSpot too expensive. Spreadsheets too manual.</p>
          <p style={{ fontSize: 15, color: AT.textSub, lineHeight: 1.85 }}>So they built Meta Lead OS — a purpose-built conversion platform that captures, scores, and engages Meta leads within 3 minutes, automatically. Today, over 500 agencies across India and Southeast Asia use it to close more deals with less effort.</p>
        </div>

        {/* Mission & Values */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
          {[
            { icon: "🎯", title: "Our Mission", body: "To give every Meta advertiser — from solo freelancers to enterprise agencies — the same unfair advantage that the world's best marketing teams have: speed, intelligence, and automation." },
            { icon: "💡", title: "Our Vision", body: "A world where no high-intent lead ever goes cold. Where every click on a Meta ad is met with an intelligent, personalised response before the person even picks up their phone." },
          ].map(v => (
            <div key={v.title} style={{ background: AT.card, border: `1px solid ${AT.cardBorder}`, borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{v.icon}</div>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 20, color: AT.text, marginBottom: 12 }}>{v.title}</h3>
              <p style={{ fontSize: 14, color: AT.textSub, lineHeight: 1.8 }}>{v.body}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 26, color: AT.text, marginBottom: 24, textAlign: "center" }}>What We Stand For</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[
              { icon: "⚡", title: "Speed First", body: "Every second a lead waits is a sale lost. We obsess over response time." },
              { icon: "🔍", title: "Radical Transparency", body: "Clear pricing, clear data ownership, clear privacy practices. Always." },
              { icon: "🤝", title: "Customer Success", body: "Your revenue growth is our product's success metric. Nothing else matters." },
              { icon: "🛡️", title: "Data Integrity", body: "Your lead data belongs to you. We never sell, share, or monetise it." },
              { icon: "🌍", title: "Built for India", body: "Designed for Indian business practices, pricing, and customer behaviour." },
              { icon: "🚀", title: "Always Shipping", body: "We release improvements every week. Our roadmap is driven by your feedback." },
            ].map(v => (
              <div key={v.title} style={{ background: AT.card, border: `1px solid ${AT.cardBorder}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{v.icon}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 15, color: AT.text, marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 13, color: AT.textSub, lineHeight: 1.7 }}>{v.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 26, color: AT.text, marginBottom: 24, textAlign: "center" }}>Leadership Team</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { name: "Arjun Krishnan", role: "CEO & Co-Founder", bio: "Former performance marketer at Razorpay. Built and scaled 3 agencies before founding Meta Lead OS.", avatar: "AK" },
              { name: "Priya Nair", role: "CTO & Co-Founder", bio: "Ex-engineering lead at Freshworks. Architected systems handling millions of events per day.", avatar: "PN" },
              { name: "Karan Mehta", role: "Head of Product", bio: "5 years in B2B SaaS product at Zoho. Obsessed with workflow automation and user experience.", avatar: "KM" },
            ].map(m => (
              <div key={m.name} style={{ background: AT.card, border: `1px solid ${AT.cardBorder}`, borderRadius: 16, padding: 28, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: AT.gradient, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>{m.avatar}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 16, color: AT.text, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: AT.primary, fontWeight: 600, marginBottom: 12 }}>{m.role}</div>
                <div style={{ fontSize: 13, color: AT.textSub, lineHeight: 1.7 }}>{m.bio}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HQ info */}
        <div style={{ background: "rgba(79,110,247,0.06)", border: "1px solid rgba(79,110,247,0.2)", borderRadius: 16, padding: 32, textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 20, color: AT.text, marginBottom: 8 }}>Headquartered in Chennai, India</div>
          <p style={{ fontSize: 14, color: AT.textSub, marginBottom: 16 }}>Plot 14, 2nd Floor, Velachery Main Road, Velachery, Chennai — 600 042, Tamil Nadu</p>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, color: AT.textSub }}>📞 +91 98765 43210</span>
            <span style={{ fontSize: 14, color: AT.textSub }}>✉️ hello@metaleados.in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Careers Page ─────────────────────────────────────────────────────────────
const CareersPage = ({ onBack }) => {
  const AT = {
    bg: "#05080F", card: "#0D1117", cardBorder: "#1C2333",
    primary: "#4F6EF7", accent: "#00E5C8", text: "#F0F4FF",
    textSub: "#8892A4", textMuted: "#4A5568",
    gradient: "linear-gradient(135deg, #4F6EF7 0%, #00E5C8 100%)",
  };
  const openRoles = [
    { title: "Senior Full-Stack Engineer", dept: "Engineering", type: "Full-Time", loc: "Chennai / Remote", desc: "Build and scale the core Meta Lead OS platform. Experience with React, Node.js, and PostgreSQL required." },
    { title: "Product Marketing Manager", dept: "Marketing", type: "Full-Time", loc: "Chennai", desc: "Own product positioning, launch strategy, and content marketing for our growing SaaS platform." },
    { title: "Customer Success Manager", dept: "Customer Success", type: "Full-Time", loc: "Chennai / Hybrid", desc: "Help onboard and retain our agency clients. Strong communication skills and SaaS experience essential." },
    { title: "Growth Marketing Intern", dept: "Marketing", type: "Internship", loc: "Chennai / Remote", desc: "Support SEO, paid media, and content initiatives. Ideal for final-year students or fresh graduates." },
  ];
  return (
    <div style={{ minHeight: "100vh", background: AT.bg, fontFamily: "'Roboto', sans-serif", color: AT.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=DM+Sans:wght@600;700;800&display=swap');`}</style>
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(5,8,15,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${AT.cardBorder}`, padding: "0 60px", height: 68, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: AT.gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 16, color: AT.text }}>Meta Lead OS</span>
        <button onClick={onBack} style={{ marginLeft: "auto", border: `1.5px solid ${AT.cardBorder}`, background: "none", color: AT.textSub, borderRadius: 10, padding: "9px 20px", fontFamily: "'Roboto',sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>← Back to Home</button>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,229,200,0.1)", border: "1px solid rgba(0,229,200,0.2)", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: AT.accent, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 24 }}>We're Hiring</div>
          <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, margin: "0 0 20px", letterSpacing: "-0.03em", color: AT.text }}>
            Help us build the future<br />
            <span style={{ background: AT.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>of lead conversion.</span>
          </h1>
          <p style={{ fontSize: 17, color: AT.textSub, lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>We're a small, fast-moving team based in Chennai. We ship every week, argue about product constantly, and care deeply about the problems we solve.</p>
        </div>

        {/* Perks */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 56 }}>
          {[
            { icon: "🏠", title: "Remote-Friendly", body: "Most roles are hybrid or fully remote. We trust you to get the work done." },
            { icon: "📈", title: "ESOP for Everyone", body: "Every full-time employee gets equity. We grow together." },
            { icon: "🏥", title: "Health Coverage", body: "Full medical, dental, and vision insurance for you and your family." },
            { icon: "📚", title: "Learning Budget", body: "₹30,000/year for courses, books, and conferences of your choice." },
            { icon: "🌴", title: "Unlimited PTO", body: "Take the time you need. We measure output, not hours." },
            { icon: "🤝", title: "Small Team, Big Impact", body: "Your work ships to 500+ agencies. No bureaucracy. No red tape." },
          ].map(p => (
            <div key={p.title} style={{ background: AT.card, border: `1px solid ${AT.cardBorder}`, borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 15, color: AT.text, marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: AT.textSub, lineHeight: 1.7 }}>{p.body}</div>
            </div>
          ))}
        </div>

        {/* Open Roles */}
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 26, color: AT.text, marginBottom: 24 }}>Open Positions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
          {openRoles.map(role => (
            <div key={role.title} style={{ background: AT.card, border: `1px solid ${AT.cardBorder}`, borderRadius: 14, padding: 28, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 16, color: AT.text, marginBottom: 6 }}>{role.title}</div>
                <div style={{ fontSize: 13, color: AT.textSub, lineHeight: 1.6 }}>{role.desc}</div>
              </div>
              <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: AT.primary, background: "rgba(79,110,247,0.1)", border: "1px solid rgba(79,110,247,0.2)", borderRadius: 6, padding: "4px 10px" }}>{role.dept}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: AT.textSub, background: "rgba(255,255,255,0.04)", border: `1px solid ${AT.cardBorder}`, borderRadius: 6, padding: "4px 10px" }}>{role.type}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: AT.textSub, background: "rgba(255,255,255,0.04)", border: `1px solid ${AT.cardBorder}`, borderRadius: 6, padding: "4px 10px" }}>📍 {role.loc}</span>
                <button style={{ background: AT.gradient, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "'Roboto',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Apply →</button>
              </div>
            </div>
          ))}
        </div>

        {/* No role? */}
        <div style={{ background: "rgba(79,110,247,0.06)", border: "1px solid rgba(79,110,247,0.2)", borderRadius: 16, padding: 40, textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 22, color: AT.text, marginBottom: 10 }}>Don't see the right role?</div>
          <p style={{ fontSize: 14, color: AT.textSub, marginBottom: 24 }}>We always want to meet exceptional people. Send us your CV and tell us how you'd contribute.</p>
          <a href="mailto:careers@metaleados.in" style={{ background: AT.gradient, color: "#fff", border: "none", borderRadius: 10, padding: "13px 32px", fontFamily: "'Roboto',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Send Open Application</a>
        </div>
      </div>
    </div>
  );
};

// ─── Privacy Policy Page ──────────────────────────────────────────────────────
const PrivacyPage = ({ onBack }) => {
  const AT = {
    bg: "#05080F", card: "#0D1117", cardBorder: "#1C2333",
    primary: "#4F6EF7", accent: "#00E5C8", text: "#F0F4FF",
    textSub: "#8892A4", textMuted: "#4A5568",
    gradient: "linear-gradient(135deg, #4F6EF7 0%, #00E5C8 100%)",
  };
  const sections = [
    { title: "1. Information We Collect", body: "We collect information you provide directly when you create an account, including your name, business email, company name, and phone number. We also collect usage data — pages visited, features used, and actions taken within the platform — to improve your experience and our product." },
    { title: "2. How We Use Your Information", body: "We use your information to provide, maintain, and improve Meta Lead OS; send you transactional communications like account updates and invoices; send product updates and marketing communications (you can opt out at any time); and to comply with legal obligations. We do not sell your personal information to third parties." },
    { title: "3. Lead Data You Import", body: "Any lead data you import or sync into Meta Lead OS belongs entirely to you. We act as a data processor on your behalf. We do not access, use, or share your lead data for any purpose other than providing the platform services. Your lead data is encrypted at rest and in transit." },
    { title: "4. Data Retention", body: "We retain your account information for as long as your account is active. You may request deletion of your account and all associated data at any time by contacting us at privacy@metaleados.in. We will action deletion requests within 30 days." },
    { title: "5. Cookies", body: "We use essential cookies to keep you logged in and remember your preferences. We use analytics cookies (with your consent) to understand how the platform is used. You can control cookie preferences in your browser settings at any time." },
    { title: "6. Third-Party Services", body: "We integrate with Meta (Facebook), WhatsApp Business API, Google, and other third-party services at your direction. These integrations are governed by the respective third-party privacy policies. We only access third-party data you explicitly authorise." },
    { title: "7. Security", body: "We use industry-standard security practices including AES-256 encryption at rest, TLS 1.3 in transit, regular security audits, and role-based access controls. We promptly notify you of any security incidents that may affect your data." },
    { title: "8. Your Rights", body: "You have the right to access, correct, or delete your personal data at any time. You may also request a portable export of your data. To exercise any of these rights, contact us at privacy@metaleados.in. We respond to all requests within 30 days." },
    { title: "9. Changes to This Policy", body: "We may update this Privacy Policy periodically. We will notify you of material changes via email or in-app notification at least 14 days before changes take effect. Continued use of the platform after changes constitutes acceptance." },
    { title: "10. Contact", body: "For any privacy-related questions, requests, or concerns, contact our Data Protection Officer at privacy@metaleados.in or write to us at: Meta Lead OS, Plot 14, 2nd Floor, Velachery Main Road, Velachery, Chennai — 600 042, Tamil Nadu, India." },
  ];
  return (
    <div style={{ minHeight: "100vh", background: AT.bg, fontFamily: "'Roboto', sans-serif", color: AT.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=DM+Sans:wght@600;700;800&display=swap');`}</style>
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(5,8,15,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${AT.cardBorder}`, padding: "0 60px", height: 68, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: AT.gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 16, color: AT.text }}>Meta Lead OS</span>
        <button onClick={onBack} style={{ marginLeft: "auto", border: `1.5px solid ${AT.cardBorder}`, background: "none", color: AT.textSub, borderRadius: 10, padding: "9px 20px", fontFamily: "'Roboto',sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>← Back to Home</button>
      </nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "72px 40px" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(79,110,247,0.12)", border: "1px solid rgba(79,110,247,0.25)", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "#8BA4FF", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 20 }}>Legal</div>
          <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.02em", color: AT.text }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: AT.textMuted }}>Last updated: 1 March 2026 · Effective: 1 March 2026</p>
          <p style={{ fontSize: 15, color: AT.textSub, lineHeight: 1.8, marginTop: 16 }}>This Privacy Policy explains how Meta Lead Conversion OS ("Meta Lead OS", "we", "us", or "our") collects, uses, and protects your information when you use our platform and services.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ background: AT.card, border: `1px solid ${AT.cardBorder}`, borderRadius: 14, padding: "28px 32px" }}>
              <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 17, color: AT.text, margin: "0 0 12px" }}>{s.title}</h2>
              <p style={{ fontSize: 14, color: AT.textSub, lineHeight: 1.85, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, background: "rgba(79,110,247,0.06)", border: "1px solid rgba(79,110,247,0.2)", borderRadius: 14, padding: 28, textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 16, color: AT.text, marginBottom: 8 }}>Questions about this policy?</div>
          <p style={{ fontSize: 13, color: AT.textSub, marginBottom: 0 }}>Email us at <a href="mailto:privacy@metaleados.in" style={{ color: AT.primary }}>privacy@metaleados.in</a> — we respond within 2 business days.</p>
        </div>
      </div>
    </div>
  );
};


export default function App() {
  const [view, setView] = useState("landing");
  const [activePage, setActivePage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Sync theme into mutable C before every render
  Object.assign(C, darkMode ? THEMES.dark : THEMES.light);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const toggleTheme = () => setDarkMode(d => !d);

  if (view === "landing") return <LandingPage onLogin={() => setView("login")} onSignup={() => setView("signup")} onAbout={() => setView("about")} onCareers={() => setView("careers")} onPrivacy={() => setView("privacy")} />;
  if (view === "login") return <LoginPage onLogin={() => setView("app")} onSignup={() => setView("signup")} />;
  if (view === "signup") return <SignupPage onSignup={() => setView("app")} onLogin={() => setView("login")} />;
  if (view === "about") return <AboutPage onBack={() => setView("landing")} />;
  if (view === "careers") return <CareersPage onBack={() => setView("landing")} />;
  if (view === "privacy") return <PrivacyPage onBack={() => setView("landing")} />;

  const pages = {
    dashboard: <DashboardPage darkMode={darkMode} />,
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
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif", width: "100vw", overflowX: "hidden", position: "relative", transition: "background .3s" }} id="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; overflow-x: hidden; background: ${C.bg}; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${darkMode ? "#2D3748" : "#CBD5E1"}; border-radius: 10px; }
        input, select, textarea, button { font-family: 'DM Sans', sans-serif; }
        input::placeholder, textarea::placeholder { color: ${C.textMuted} !important; opacity: 1; }
        input, textarea, select { color: ${C.text}; background: ${C.inputBg}; }
        option { background: ${C.card}; color: ${C.text}; }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); transition: transform .3s; position: fixed !important; z-index: 200; }
          .sidebar.open { transform: translateX(0); }
          .main-content { margin-left: 0 !important; max-width: 100vw !important; }
          .topbar { left: 0 !important; }
          .mobile-menu-btn { display: flex !important; }
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
          .dash-grid { grid-template-columns: 1fr !important; }
          .page-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .leads-table { overflow-x: auto !important; }
          table { min-width: 700px; }
        }
        @media (max-width: 480px) {
          .stat-grid { grid-template-columns: 1fr !important; }
          main { padding: 16px !important; }
        }
      `}</style>
      <Sidebar active={activePage} setActive={(page) => { setActivePage(page); setMenuOpen(false); }} isMobile={isMobile} isOpen={menuOpen} onClose={() => setMenuOpen(false)} darkMode={darkMode} />
      <div style={{ marginLeft: isMobile ? 0 : 220, flex: 1, display: "flex", flexDirection: "column", minWidth: 0, maxWidth: isMobile ? "100vw" : "calc(100vw - 220px)", overflowX: "hidden" }}>
        <TopBar onSearch={() => { }} isMobile={isMobile} onMenuToggle={() => setMenuOpen(o => !o)} darkMode={darkMode} toggleTheme={toggleTheme} />
        <main className="main-pad" style={{ marginTop: 64, padding: 28, flex: 1, minWidth: 0, overflowX: "hidden" }}>
          {pages[activePage] || <DashboardPage darkMode={darkMode} />}
        </main>
      </div>
    </div>
  );
}
