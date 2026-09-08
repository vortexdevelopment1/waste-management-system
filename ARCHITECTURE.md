# Smart Waste Management Platform — Frontend Architecture & UI Design System

Source of truth: uploaded "SMART WASTE MANAGEMENT SOFTWARE" documentation
(login interfaces for Supervisor / Driver–Helper / Surveyor, GIS geotagging
spec, and 15 operational modules from Route Tracking through Drain
Desilting). This is a **frontend-only** architecture — no backend logic is
implied beyond the API contracts each module will eventually need.

---

## 1. Complete Project Architecture

```
smart-waste-frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx                 # app bootstrap, RoleProvider, router
│   ├── App.jsx                  # route table
│   ├── index.css                # Tailwind entry + design tokens/base
│   ├── layouts/
│   │   └── DashboardLayout.jsx  # sidebar + topbar + content shell
│   ├── components/
│   │   ├── sidebar/Sidebar.jsx
│   │   ├── topbar/Topbar.jsx
│   │   ├── ui/                  # KpiCard, StatusBadge, DataTable,
│   │   │                        # ProgressBar, PhotoAuditCard, SectionCard
│   │   ├── charts/               # Line/Bar/Donut/Radar chart wrappers (Recharts)
│   │   ├── map/GisMap.jsx        # shared Leaflet basemap
│   │   └── module/ModulePageTemplate.jsx  # config-driven operations page
│   ├── context/RoleContext.jsx   # active role (Admin/Supervisor/…)
│   ├── hooks/useRole.js
│   ├── data/
│   │   ├── nav.js                # sidebar module registry
│   │   ├── roles.js               # role definitions + access matrix
│   │   └── modules/*.js           # mock config per operations module
│   ├── pages/                     # one file per route (17 pages + Login)
│   └── utils/format.js
└── ARCHITECTURE.md / README.md
```

**Why a config-driven template exists:** the source doc repeats the same
shape for BWG, Transfer Station, MRF, RAT, Weighbridge, CCTV, Street
Sweeping and Drain Desilting — a telemetry KPI header, a GIS map, a
photographic audit workstation, a stream/analytics panel, and a ledger
grid at the bottom. `ModulePageTemplate.jsx` renders that shape from a
plain data object (`src/data/modules/*.js`), so adding a new operations
module is a data change, not a new page. Dashboard, Route Tracking, Waste
Collection, Geotagging, KPI, User Charges, Complaints and Reports get
fully bespoke pages because their interaction patterns genuinely differ
(QR scan workstation, surveyor questionnaire, radar compliance chart,
report catalog, etc).

## 2. Route Structure

| Path | Page | Primary roles |
|---|---|---|
| `/login` | Role/biometric login | all |
| `/` | Dashboard | Admin, Authority, Supervisor, Surveyor |
| `/route-tracking` | Route Tracking | Admin, Supervisor, Driver, Helper |
| `/waste-collection` | Waste Collection | Admin, Supervisor, Driver, Helper |
| `/geotagging` | Geotagging | Admin, Authority, Supervisor, Surveyor |
| `/segregation` | Waste Segregation | Admin, Supervisor, Driver, Helper |
| `/bulk-waste-generators` | Bulk Waste Generators | Admin, Authority, Supervisor |
| `/transfer-station` | Transfer Station | Admin, Authority |
| `/mrf` | Material Recovery Facility | Admin, Authority |
| `/rapid-action-team` | Rapid Action Team | Admin, Authority, Supervisor |
| `/weighbridge` | Weighbridge | Admin, Authority, Supervisor |
| `/cctv-monitoring` | CCTV Monitoring | Admin, Authority, Supervisor |
| `/user-charges` | User Charges Collection | Admin, Authority |
| `/complaints` | Complaint Redressal | Admin, Authority, Supervisor |
| `/kpi` | KPI Dashboard | Admin, Authority |
| `/reports` | Reports | Admin, Authority |
| `/street-sweeping` | Street Sweeping | Admin, Authority, Supervisor |
| `/drain-desilting` | Drain Desilting | Admin, Authority, Supervisor |
| `/settings` | Settings | Admin, Authority |

Access is enforced in the sidebar via `canAccess(role, moduleKey)`
(`src/data/roles.js`) — Admin sees everything, other roles see only their
documented modules. Route-level guards can be added later by wrapping
`<Route>` elements with the same `canAccess` check.

## 3. User Roles

Sourced directly from the doc's three named login interfaces plus the
recurring "Dashboard for Admin / Authority / Member" note:

- **Admin** — full platform control, all modules, all wards, settings.
- **Authority** — Zonal/Municipal Health Officer; statutory oversight,
  KPI, Reports, sign-offs; no field data-entry screens.
- **Supervisor** — Sanitary Inspector; beat allocation, crew muster,
  RAT dispatch, field verification across most operational modules.
- **Driver** — vehicle operator; Route Tracking + Waste Collection only.
- **Helper** — collection crew; same access as Driver (door-to-door
  segregation logging), no vehicle telemetry ownership.
- **Surveyor** — GIS field surveyor; Geotagging is their primary tool,
  Dashboard for situational awareness.

The role switcher lives in the top bar and in `/settings` for demo
purposes — swap it for real auth (JWT/session) without touching page code,
since every page just reads `useRole()`.

## 4. Dashboard Design

`pages/Dashboard.jsx` implements the flagship IoT dashboard exactly as
scoped: live vehicle count, total waste collected, wet/dry % split, route
completion, user-charge collection, complaint stats, GPS active devices
and CCTV status as KPI cards; a 7-day line chart; ward-tonnage bar chart;
composition donut chart; a live activity feed; and per-zone route
completion progress bars, plus a 7-Star GFC compliance snapshot tying the
dashboard back to the statutory theme running through the whole doc.

## 5. Route Tracking Screen

`pages/RouteTracking.jsx`: beat selector with live progress, a Leaflet
GIS map with color-coded property pins and a breadcrumb route line, a
driver/vehicle telemetry panel (face-auth badge, GPS accuracy, SOS
button), an hourly properties-serviced bar chart, and a house list table
with QR scan, weight collected and sync status columns — mirroring the
"In-Cab Live HUD" and "Beat Service Ledger" sections of the source doc.

## 6. Waste Collection Module

`pages/WasteCollection.jsx`: QR scan panel, auto-populated property
details, multi-select waste-category chips (Wet/Dry/Mixed/Hazardous/
Sanitary/E-Waste), confirm/flag actions, and a mandatory photo-audit grid
with GPS + timestamp watermark metadata for each capture slot.

## 7. GIS and Geotagging Module

`pages/Geotagging.jsx`: interactive basemap, a tabbed surveyor
questionnaire (Zone/Ward/Block/Route Mapping) matching the doc's
"1A/1B/2A/2B" start-point → photo → landmark → photo flow, tagging-type
coverage counters (Residential/Commercial/Institutional/GVP/BWG), and a
field survey verification ledger.

## 8. Analytics coverage across modules

Waste trends and ward comparison → Dashboard. Collection/route efficiency
→ Route Tracking. Segregation performance → Segregation module. BWG/MRF/
Transfer Station/Weighbridge each carry their own stream-fraction donut
and coverage gauges. Compliance metrics and ward-radar comparison → KPI
Dashboard. Monthly statutory reporting → Reports.

## 9. Design System

- **Color** (government smart-city + IoT command center, grounded in the
  doc's Indian-municipal context rather than a generic SaaS palette):
  - Canvas `#0A101C`, Surface `#101A2C`, Surface-alt `#15213A`, Border `#223252`
  - Civic Teal `#22B8A6` — GIS/live/primary action
  - Civic Saffron `#EFA23D` — alerts, statutory highlights, municipal identity
  - Civic Leaf `#4CC77E` — compliant/paid/completed
  - Civic Sky `#3FA9DA` — in-transit/informational
  - Civic Rose `#E96A6A` — non-compliant/overdue/flagged
  - Civic Violet `#9B8CE8` — Authority-tier accents
- **Type**: IBM Plex Sans for UI text, IBM Plex Mono for telemetry, IDs,
  GPS coordinates, timestamps and currency — justified by how much of the
  source doc's content is literally live numeric readouts.
- **Spacing**: 4px base scale via Tailwind defaults; cards use 12–16px
  internal padding, 12–20px gaps between panels.
- **Cards**: `SectionCard` (panel shell) and `KpiCard` (metric tile) are
  the two repeating primitives; both use a 1px border + subtle inset
  shadow, never a soft drop-shadow-everywhere look.
- **Tables**: `DataTable` — dense, monospace numeric columns, uppercase
  10px column headers, hover row highlight, built-in `StatusBadge` column.
- **Status badges**: color-coded pill + dot, mapped by literal status word
  (Paid, Overdue, Flagged, Verified, On Route, …) in `StatusBadge.jsx`.
- **Notifications**: bell icon + count badge in the top bar (visual only
  in this prototype; wire to a real notification service later).

## 10. Folder Structure

See section 1 above — matches the requested `src/{pages,components,
layouts,routes,hooks,services,data,assets,context,utils}` shape, with
`routes/` implemented as `App.jsx` + React Router `<Routes>` (a `services/`
folder is stubbed for the future API layer; add `src/services/api.js` per
module when a backend exists).

---

## Recommended charts (by module)

| Module | Chart |
|---|---|
| Dashboard | Line (7-day trend), Bar (ward tonnage), Donut (composition) |
| Route Tracking | Bar (hourly properties serviced) |
| BWG / Transfer Station / MRF / Weighbridge | Donut (stream fractions) |
| RAT / CCTV | Donut (alert origin / incident split), Bar (incidents by site) |
| Street Sweeping / Drain Desilting | Donut (distance/network by method) |
| KPI Dashboard | Radar (ward compliance), Donut (mass balance) |
| User Charges | Donut (payment channel mix), Bar (hourly velocity) |
| Complaints | Line (7-day volume), Donut (category split) |

## Recommended tables

Every module ends in a ledger/manifest table (`DataTable`): Beat Service
Ledger, BWG Commercial Ledger, Transfer Station Manifest, MRF Dispatch
Manifest, RAT Incident Ledger, Weighbridge Manifest, Camera/Incident
Register, UCC Billing Ledger, Complaint Ticket Register, Statutory Audit
Ledger, Shift Audit Grids (Sweeping/Desilting).

## Dummy JSON structures

Every module's mock data lives in `src/data/modules/*.js` as a plain
config object: `{ kpis[], map: { markers[], route[] }, photos: { items[] },
chart: { type, data[] }, progress: { items[] }, table: { columns[], rows[] } }`.
This shape is intentionally close to a REST response — e.g. `GET
/api/modules/bwg` returning exactly that JSON would let you swap the
static import for a `fetch`/React Query call with no component changes.

## React component plan

Primitives (`ui/`) → Charts (`charts/`) → Map (`map/GisMap.jsx`) →
Composite (`module/ModulePageTemplate.jsx`) → Pages (`pages/*.jsx`) →
Layout (`layouts/DashboardLayout.jsx`) → App shell (`App.jsx`). Role state
is the only cross-cutting concern and is handled via React Context
(`RoleContext`) rather than prop drilling.

## Development roadmap

1. **Now (delivered)** — static frontend prototype, mock data, full IA,
   role-based sidebar, 17 pages + login.
2. **Next** — wire `src/data/*` to real endpoints (React Query/SWR),
   replace `PhotoAuditCard` placeholders with actual image upload +
   preview, replace simulated face-auth with a real biometric SDK.
3. **Then** — live GPS via WebSocket for vehicle markers, CCTV via
   HLS/WebRTC stream embeds, PDF/XLSX export wired to the Reports actions.
4. **Later** — offline-first PWA mode for Driver/Helper/Surveyor
   interfaces (spotty network in the field), push notifications for RAT
   dispatch and complaint SLA breaches.
