export const ratConfig = {
  title: 'Rapid Action Team',
  subtitle: 'Emergency GVP blackspot response — RAT / PAT patrol command',
  kpis: [
    { label: 'Fleet Readiness', value: '08', unit: '/ 08 online', tone: 'leaf' },
    { label: 'Avg. Response Time', value: '14.2', unit: 'min', tone: 'teal', sub: 'SLA < 30 min' },
    { label: 'Active Alerts', value: '3', tone: 'rose' },
    { label: 'Landfill Diversion', value: '86.4', unit: '%', tone: 'sky' }
  ],
  map: {
    title: '3D GIS Emergency Fleet & Incident Basemap',
    center: [18.5204, 73.8567],
    markers: [
      { lat: 18.5204, lng: 73.8567, status: 'red', label: 'GVP #012 — Market Cross, active dumping' },
      { lat: 18.5240, lng: 73.8601, status: 'yellow', label: 'PATROL-04 en route' },
      { lat: 18.5170, lng: 73.8520, status: 'green', label: 'GVP #009 — resolved' },
      { lat: 18.5300, lng: 73.8650, status: 'blue', label: 'PATROL-01 base' }
    ]
  },
  photos: {
    title: 'Geotagged Remediation Verification',
    items: [
      { label: 'Before Remediation', tone: 'rose', note: 'Unsegregated spillover, GVP #012', gps: '18.5204°N 73.8567°E', time: '08:12 IST' },
      { label: 'After Remediation', tone: 'leaf', note: 'Cleared, sanitized, bio-planters', gps: '18.5204°N 73.8567°E', time: '08:38 IST' },
      { label: 'AI CCTV Detection', tone: 'sky', note: 'Bounding boxes: dumping + plate capture' },
      { label: 'Dispatch Confirmation', tone: 'saffron', note: 'PATROL-04 nearest-unit auto-assign' }
    ]
  },
  chart: {
    title: 'Alert Origin Split',
    type: 'donut',
    data: [
      { name: 'AI CCTV', value: 52 }, { name: 'Citizen 311 App', value: 33 }, { name: 'Inspector Patrol', value: 15 }
    ]
  },
  progress: {
    title: 'GVP Blackspot Elimination',
    items: [
      { label: 'Sites remediated (68/74)', value: 91.9, tone: 'leaf' },
      { label: 'Response SLA adherence', value: 96.5, tone: 'teal' }
    ]
  },
  table: {
    title: 'Incident Dispatch & Statutory Clearance Ledger',
    columns: [
      { key: 'id', label: 'Ticket ID', mono: true }, { key: 'origin', label: 'Alert Origin' },
      { key: 'volume', label: 'Est. Volume (MT)', mono: true }, { key: 'vehicle', label: 'Vehicle / Driver' },
      { key: 'turnaround', label: 'Turnaround', mono: true }, { key: 'status', label: 'Status', statusCol: true }
    ],
    rows: [
      { id: 'RAT-2026-0419', origin: 'AI CCTV', volume: '0.8', vehicle: 'PATROL-04 / R. Sharma', turnaround: '14 min', status: 'Completed' },
      { id: 'RAT-2026-0420', origin: 'Citizen 311', volume: '1.2', vehicle: 'PATROL-02 / S. Naik', turnaround: '19 min', status: 'On route' },
      { id: 'RAT-2026-0421', origin: 'Inspector Patrol', volume: '0.4', vehicle: 'PATROL-06 / K. Rao', turnaround: '—', status: 'Pending' }
    ]
  }
}
