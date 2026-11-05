# CURRENT DESIGN SYSTEM: Ultraviolet (v45, supersedes the Porcelain/Carbon notes below)

One violet pigment on two grounds. All colour lives in `--uv-*` tokens at the end of `styles.css`.

| Token | Light (lavender paper) | Dark (violet-black night) |
| --- | --- | --- |
| `--uv-bg` | `#F4F1FB` | `#0F0B1A` |
| `--uv-panel` / `-2` / `-3` | `#FFFFFF` / `#ECE7F8` / `#E2DBF3` | `#151024` / `#1A1429` / `#1C1630` |
| `--uv-ink` / `-2` / `muted` | `#1B1624` / `#302843` / `#5B5370` | `#E6E0F5` / `#C4BBDD` / `#A298BE` |
| `--uv-rule` / `-2` | `#D6CEEA` / `#A99CD3` | `#2B2342` / `#4A3E70` |
| `--uv-accent` / `-deep` / `-soft` | `#6A2FEA` / `#5A22CF` / `#E2D8FB` | `#7C4DFF` / `#6B35E8` / `#3A2A6E` |

Status colours stay functional only: green = money received, amber = waiting, blue = info, rose = problem. Each has a deep light-mode and a bright dark-mode value (`--uv-ok`, `--uv-warn`, `--uv-info`, `--uv-bad`).

Type: Outfit for headings, Onest for body. Body text is 16px, labels 12px or more, sentence case, no tracked capitals.

Rules: one filled violet button per screen area, all others outlined. Every Tailwind colour class written for a dark panel is remapped by role in `styles.css`, so JS-rendered markup follows the theme without edits. Check contrast with `.hallmark/audit.js` (`window.__auditAll()`), which tests every modal in both themes.

---

# LEGACY NOTES (superseded by Ultraviolet above; kept for history, hex values here are no longer live)

# Role & Goal
You are a Principal Product Designer & Design Systems Engineer. Redesign the frontend for "beRich", a premier Creative Video Production & Post-Production Agency CRM (operating in INR ₹), with a Dual-Mode Adaptive Theme & Layout Engine (`data-theme="light"` and `data-theme="dark"`). 

Toggling the theme (#btn-theme-toggle) must dynamically change both the visual color system AND the layout architecture + infographic metric visualization styles, while preserving 100% of the required DOM IDs and layman-friendly terminology ("Project Board", "Client File", "Software Subscriptions", "Team History", "Database Security Key").

---

## 1. Dual-Theme Adaptive Architecture (Colors + Layout + Infographics)

### THEME A: "Warm Porcelain Executive" (Light Mode — Default)
- **Visual Inspiration**: High-craft clean executive SaaS (Linear / Stripe / Apple Executive).
- **Canvas & Surfaces**: Warm porcelain canvas (`#F8FAFC` to `#F1F5F9`) with radial peach/amber (`#FED7AA/30`) and soft indigo (`#EEF2FF/40`) ambient blurs. Cards are pure crisp white (`#FFFFFF`), border `1px solid #E2E8F0`, `rounded-2xl` (20px), shadow `0 4px 20px -2px rgba(15, 23, 42, 0.05)`.
- **Typography (Strict WCAG AAA)**: Primary headings & KPIs in solid Deep Slate `#0F172A`. Secondary labels `#334155`, muted captions `#64748B`. Zero low-contrast gray.
- **Layout Mode**: Spacious 3-Row Executive Bento Grid with generous 20px gaps and airy padding (`p-6`).
- **Light Mode Infographic Metric Styles**:
  1. **Goals Speedometer (`#visual-speedometer-arc`)**: Segmented radial pill-tick gauge (24 distinct rounded pill segments arranged in a semicircle, filling in vibrant Warm Orange `#F97316` to Royal Indigo `#4F46E5` against `#F1F5F9` inactive ticks).
  2. **Lead & Touchpoint Matrix (`#heatmap-row-leads`, `#heatmap-row-cuts`, `#heatmap-row-cash`)**: Proportional Variable-Size Bubble Timeline (Jan–Dec horizontal tracks where circle diameter scales dynamically with monthly volume in `#F97316`, `#8B5CF6`, and `#10B981`).
  3. **Project Stage Distribution (`#visual-donut-center-count`)**: Multi-layered thick ring chart with clean white segment gaps and right-aligned pill legend.

### THEME B: "Tactical Carbon & Industrial Amber" (Dark Mode)
- **Visual Inspiration**: High-contrast industrial telemetry & dark glass dashboard (NetSuite Industrial Amber / Creatio Dark Telemetry).
- **Canvas & Surfaces**: Obsidian carbon background (`#0B0D10`) with deep charcoal cards (`#14171C`), crisp subtle borders (`1px solid #262930`), and vibrant tactical accent cards in Rich Gold (`#FACC15` with `#0B0D10` bold text) and Warm Tangerine (`#FB923C` with `#0B0D10` text).
- **Typography (Strict WCAG AAA)**: Primary KPIs in Crisp Pure White `#FFFFFF` (or `#0B0D10` on solid yellow/amber accent cards). Secondary labels `#CBD5E1`, muted `#94A3B8`.
- **Layout Mode**: Compact Command-Center Asymmetric Bento Grid (`gap-3.5`, denser `p-4` cards, docked right-hand Quick Telemetry Drawer, and docked bottom-bar partner strip).
- **Dark Mode Infographic Metric Styles**:
  1. **Goals Gauge (`#visual-speedometer-arc`)**: Industrial Diagonal-Hatch Bar & Arc Hybrid—combines a glowing neon-emerald/amber radial gauge with 45-degree diagonal hatch pattern bars (`repeating-linear-gradient(45deg, ...)`) showing target vs. actual cash burn.
  2. **Touchpoint Activity (`#heatmap-row-leads`, `#heatmap-row-cuts`, `#heatmap-row-cash`)**: Horizontal Neon Progress Bar Stack + High-Density glowing telemetry nodes showing conversion velocity across stages.
  3. **Stage Breakdown (`#visual-donut-center-count`)**: Glowing 360-degree thin-stroke neon ring (`#22D3EE`, `#FACC15`, `#4ADE80`, `#F97316`) with live percentage callouts.

---

## 2. Zoom-Proof 2-Row Header & Left Navigation Rail (80% / 90% / 100% / 125% Safe)
- **Left Navigation Rail (fixed `w-64` to `w-72`)**:
  - Brand Header (`#sidebar-agency-name`), View Switcher ("Project Board", "Client File", "Software Subscriptions", "Team History"), and bottom Settings launcher ("Partners & Sheet Config").
- **2-Row Top Header Architecture (Zero Button Collision)**:
  - **Row 1 (Primary Action Shelf)**: Agency Title (`#header-agency-name`), Flexible Global Search (`#crm-global-search`, `min-w-[160px] max-w-[280px]`), Active User Presence Pill (`#header-user-presence-btn`), Theme Mode Switcher (`#btn-theme-toggle` — switches Light Executive <-> Dark Tactical), WhatsApp Launcher, and Primary CTA `+ New Lead` (`#btn-open-new-lead`).
  - **Row 2 (Telemetry & Guide Shelf)**: SLA Status Pill (`#telemetry-sla-pill`), Partner Revenue Mini-Bar (`#subheader-partner-metrics` for `koushik`, `bharagav`, `kiran`), Sync Sheet button, FX Currency badges, and glowing `📖 Quick Start Guide` button (`#btn-quick-start`).

---

## 3. Executive Hero Bento Grid
- **Row A — 3 Primary KPI Cards**:
  1. Actual Cash Collected in ₹ (`#metric-hero-cash`) + payment count badge (`#metric-hero-cash-count`).
  2. Total Closed Revenue (`#metric-hero-ytd`) + won deal count badge.
  3. Active Project Value (`#metric-hero-unpaid`) + sample review count (`#metric-hero-sample-count`).
- **Row B — 3 Adaptive Interactive Visual Widgets**:
  1. Goals Speedometer Gauge (`#visual-speedometer-arc`, `#visual-speedometer-val`, `#visual-speedometer-target`, `#visual-goal-pct-badge`).
  2. Deals by Project Stage Ring Chart (`#visual-donut-center-count`, `#visual-donut-total-badge`).
  3. Monthly Touchpoint Matrix (`#heatmap-row-leads`, `#heatmap-row-cuts`, `#heatmap-row-cash`).
- **Row C — 3-Partner Revenue Showcase (`#hero-partner-performance-grid`)**:
  - Dedicated cards for `koushik`, `bharagav`, and `kiran` with assigned project value in ₹, won deals count, and filter pills (`#partner-filter-pills-container`).

---

## 4. Resizable 5-Column Project Board (Kanban)
- **Container**: `#kanban-board-columns` with 5 horizontally resizable columns (`.kanban-resizable-col`):
  1. `Identified` (Outreach / New Inbound)
  2. `In Discussion` (Discovery & Scope)
  3. `Sample Cut` (Free/Paid Test Edit)
  4. `Approved` (Contract Locked)
  5. `Closed Won` (Collected & Delivered)
- **Project Deal Cards (`.kanban-deal-card`)**:
  - Crisp title, service badge, country tag, and total contract value in ₹.
  - Cash Collected vs. Pending progress bar.
  - Net Profit Margin chip (Retainer minus Labor & Software Subscriptions burn).
  - 2-Way WhatsApp badge (`🔔 New Reply`) + 1-click WhatsApp & Email buttons.

---

## 5. Five Core Layman-Friendly Modals (Aligned Flexbox Headers)
1. **Client File Modal (`#client-dossier-modal`)**:
   - Strictly aligned Flexbox header (`.dossier-modal-header` with `justify-content: space-between; align-items: center; gap: 12px;`) so Client Name, Stage Dropdown, Delete trash button, and Close `X` button never overlap.
   - 2-Way WhatsApp Live Stream thread + quick template pills (`👋 Kickoff`, `🎬 Cut Ready`, `💳 Payment Due`, `⏰ Follow-up`) + `#wa-draft-text-[id]`.
   - Itemized Profit Margin Engine & Offline Receipt Scanner Dropzone (`#receipt-scanner-dropzone-[id]`, `#payment-input-amount-[id]`).
2. **Submit New Project Modal (`#crm-new-lead-modal`)**:
   - Clean form inputs, Software Subscriptions cost checkboxes, and live net profit preview bar.
3. **Secure Studio Login Modal (`#crm-pin-login-modal`)**:
   - Partner selector (`koushik`, `bharagav`, `kiran`), 4-digit SHA-256 PIN pad, and bottom toggle link `🔌 Setup Database Key (New Device)` to save the GitHub PAT straight to `localStorage` and fetch `crm-data.json` without lockout.
4. **How to Use the Studio CRM Modal (`#crm-quick-start-modal`)**:
   - Scrollable (`max-height: 75vh; overflow-y: auto;`) 5-step layman guide explaining Setup, Adding Projects, Moving Cards, Scanning Receipts, and Team History.
5. **Team History (`#crm-activity-log-modal`) & UPI/PayPal QR Modal (`#crm-upi-modal`)**:
   - Partner-filterable audit log + 3D QR payment modal with 1-click WhatsApp push.

---

## 6. Strict DOM ID & Class Contract (Never Rename)
Preserve these exact selectors:
`#header-agency-name`, `#sidebar-agency-name`, `#crm-global-search`, `#header-user-presence-btn`, `#btn-open-new-lead`, `#btn-quick-start`, `#btn-theme-toggle`, `#metric-hero-cash`, `#metric-hero-cash-count`, `#metric-hero-ytd`, `#metric-hero-unpaid`, `#metric-hero-sample-count`, `#telemetry-sla-pill`, `#visual-speedometer-arc`, `#visual-speedometer-val`, `#visual-speedometer-target`, `#visual-goal-pct-badge`, `#visual-donut-center-count`, `#visual-donut-total-badge`, `#heatmap-row-leads`, `#heatmap-row-cuts`, `#heatmap-row-cash`, `#hero-partner-performance-grid`, `#partner-filter-pills-container`, `#kanban-board-columns`, `.kanban-resizable-col`, `.kanban-deal-card`, `#client-dossier-modal`, `#crm-new-lead-modal`, `#crm-pin-login-modal`, `#crm-activity-log-modal`, `#crm-upi-modal`, `#receipt-scanner-dropzone-[id]`, `#payment-input-amount-[id]`, `#wa-draft-text-[id]`.