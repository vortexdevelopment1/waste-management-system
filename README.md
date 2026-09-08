# ASUTOS SWM Command Center — Frontend Prototype

A production-styled **frontend-only** prototype/MVP for a Smart Waste Management
platform, built from the uploaded SWM documentation. No backend is included —
all data is mocked in `src/data/`, structured so it maps 1:1 onto a real API later.

## Stack
React 18 · Vite · Tailwind CSS · React Router · Recharts · React Leaflet · Lucide Icons

## Getting started
```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build to dist/
```

## Structure
See `ARCHITECTURE.md` (delivered alongside this project) for the full
information architecture, role matrix, page-by-page breakdown, and roadmap.

## Role switcher
Use the role menu in the top bar (or `/login`) to preview how the sidebar and
access control change for Admin, Authority, Supervisor, Driver, Helper, and
Surveyor — access rules live in `src/data/roles.js`.

## Design system
Tokens live in `tailwind.config.js` (`civic.*` colors) and `src/index.css`.
Theme: government smart-city command center — deep graphite-navy canvas,
civic teal for GIS/live status, marigold-saffron for alerts/statutory
highlights, IBM Plex Sans/Mono for a technical, telemetry-driven feel.
