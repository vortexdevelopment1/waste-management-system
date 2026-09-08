export const streetSweepingConfig = {
  title: 'Street Sweeping',
  subtitle: 'Mechanized, sprinkler & manual gang operations — 04:00 AM – 12:00 PM shift',
  kpis: [
    { label: 'Sweeper Muster', value: '210', unit: '/ 215', tone: 'leaf', sub: '97.7% present' },
    { label: 'Vehicles On-Road', value: '20', unit: '/ 20', tone: 'sky' },
    { label: 'KM Covered', value: '348.5', unit: '/ 380 km', tone: 'teal', sub: '91.7% beat coverage' },
    { label: 'Silt Extracted', value: '24.6', unit: 'MT', tone: 'saffron' },
    { label: 'PM10 Reduction', value: '-38.4', unit: '%', tone: 'leaf' }
  ],
  map: {
    title: 'Route Coverage & Real-Time Telemetry',
    center: [18.5230, 73.8560],
    markers: [
      { lat: 18.5230, lng: 73.8560, status: 'green', label: 'MS-04 — mechanized sweeper' },
      { lat: 18.5280, lng: 73.8610, status: 'blue', label: 'SP-02 — water sprinkler' },
      { lat: 18.5190, lng: 73.8500, status: 'yellow', label: 'GANG-06 — manual sweeping' }
    ],
    route: [[18.5170, 73.8480], [18.5230, 73.8560], [18.5290, 73.8620]]
  },
  photos: {
    title: 'Field Verification Panels',
    items: [
      { label: 'Mechanized Sweeper MS-04', tone: 'sky', note: 'Hopper 3.42/4.5 MT (76% full)' },
      { label: 'Water Sprinkler SP-02', tone: 'teal', note: '4,600L / 6,000L reserve' },
      { label: 'PPE Manual Gang', tone: 'saffron', note: '100% PPE audit passed' },
      { label: 'Before / After Curb', tone: 'leaf', note: 'PM10 242 → 84, SI-402 approved' }
    ]
  },
  chart: {
    title: 'Distance by Method',
    type: 'donut',
    data: [
      { name: 'Mechanized', value: 142.0 }, { name: 'Sprinkler', value: 112.0 }, { name: 'Manual Gang', value: 94.5 }
    ]
  },
  progress: {
    title: 'Ward Coverage',
    items: [
      { label: 'Ward 01', value: 96.4, tone: 'leaf' }, { label: 'Ward 02', value: 94.2, tone: 'leaf' },
      { label: 'Ward 03', value: 89.1, tone: 'saffron' }, { label: 'Ward 04', value: 87.5, tone: 'saffron' }
    ]
  },
  table: {
    title: 'Shift Audit Grid',
    columns: [
      { key: 'beat', label: 'Beat ID', mono: true }, { key: 'unit', label: 'Vehicle / Gang' },
      { key: 'corridor', label: 'Route Corridor' }, { key: 'shift', label: 'Shift', mono: true },
      { key: 'silt', label: 'Silt Extracted (kg)', mono: true }, { key: 'status', label: 'Status', statusCol: true }
    ],
    rows: [
      { beat: 'BEAT-SW-01', unit: 'MS-04', corridor: 'Arterial Rd 1', shift: '04:00–08:00', silt: '820', status: 'Completed' },
      { beat: 'BEAT-SW-02', unit: 'SP-02', corridor: 'Market Lane', shift: '06:00–12:00', silt: '—', status: 'On Route' },
      { beat: 'BEAT-SW-03', unit: 'GANG-06', corridor: 'Ward 03 Internal', shift: '05:30–11:30', silt: '410', status: 'Active Now' }
    ]
  }
}
