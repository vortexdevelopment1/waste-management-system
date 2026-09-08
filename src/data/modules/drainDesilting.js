export const drainDesiltingConfig = {
  title: 'Drain Desilting',
  subtitle: 'Monsoon Preparedness Phase 02 — 05:00 AM – 01:00 PM shift',
  kpis: [
    { label: 'Crew Muster', value: '145', unit: '/ 150', tone: 'leaf', sub: '96.7% deployed' },
    { label: 'Machines Online', value: '18', unit: '/ 18', tone: 'sky' },
    { label: 'Network Cleared', value: '184.5', unit: '/ 210 km', tone: 'teal', sub: '87.9% coverage' },
    { label: 'Silt Extracted', value: '1,842.6', unit: 'MT', tone: 'saffron' },
    { label: 'Flood Points Cleared', value: '28', unit: '/ 32', tone: 'leaf' }
  ],
  map: {
    title: 'Drain Network & Machinery Tracking',
    center: [18.5312, 73.8441],
    markers: [
      { lat: 18.5312, lng: 73.8441, status: 'yellow', label: 'EX-02 — long-boom excavator' },
      { lat: 18.5340, lng: 73.8470, status: 'blue', label: 'SS-02 — super sucker' },
      { lat: 18.5280, lng: 73.8400, status: 'red', label: 'Flood vulnerability hotspot' },
      { lat: 18.5360, lng: 73.8500, status: 'green', label: 'DT-09 — silt tipper' }
    ]
  },
  photos: {
    title: 'Safety & Remediation Audit',
    items: [
      { label: 'Open Nallah Desilting', tone: 'saffron', note: 'EX-02, 18.5 MT/hr extraction rate' },
      { label: 'Super Sucker Jetting', tone: 'sky', note: 'SS-02, 180 Bar, tank 5.8/7.0 MT' },
      { label: 'Multi-Gas Detector Audit', tone: 'leaf', note: 'H2S 0.0 ppm, O2 20.9% — safe' },
      { label: 'Before / After Drain', tone: 'teal', note: '78% sludge depth → cleared, Cert #DN-884' }
    ]
  },
  chart: {
    title: 'Network by Corridor Type',
    type: 'donut',
    data: [
      { name: 'Central Major Nallah', value: 14.8 }, { name: 'Secondary Collectors', value: 62.0 }, { name: 'Ward Gutters/Culverts', value: 107.7 }
    ]
  },
  progress: {
    title: 'Ward-Wise Progress',
    items: [
      { label: 'Ward 01', value: 96.2, tone: 'leaf' }, { label: 'Ward 02', value: 92.1, tone: 'leaf' },
      { label: 'Ward 03', value: 85.0, tone: 'saffron' }, { label: 'Ward 04', value: 81.9, tone: 'saffron' }
    ]
  },
  table: {
    title: 'Operational Shift Ledger',
    columns: [
      { key: 'drain', label: 'Drain ID', mono: true }, { key: 'category', label: 'Category' },
      { key: 'equipment', label: 'Equipment' }, { key: 'ppe', label: 'PPE Audit', statusCol: true },
      { key: 'silt', label: 'Silt (MT)', mono: true }, { key: 'signoff', label: 'Engineer Sign-off', statusCol: true }
    ],
    rows: [
      { drain: 'DN-Nallah-Head-01', category: 'Primary', equipment: 'EX-02, DT-09', ppe: 'Verified', silt: '18.4', signoff: 'Verified' },
      { drain: 'DN-Metro-Culvert', category: 'Secondary', equipment: 'SS-02', ppe: 'Verified', silt: '9.2', signoff: 'Pending' },
      { drain: 'DN-Railway-Siphon', category: 'Secondary', equipment: 'JM-05', ppe: 'Verified', silt: '6.7', signoff: 'Verified' }
    ]
  }
}
