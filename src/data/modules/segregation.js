export const segregationConfig = {
  title: 'Waste Segregation',
  subtitle: 'Door-to-Door Segregated Collection — source-level compliance audit',
  kpis: [
    { label: 'Households Covered', value: '1,180', unit: '/ 1,240', tone: 'sky', sub: 'Beat completion', delta: '95.2%', deltaTone: 'up' },
    { label: 'Segregation Compliance', value: '91.8', unit: '%', tone: 'leaf', sub: 'High-purity benchmark' },
    { label: 'Wet Organic Waste', value: '18.4', unit: 'MT', tone: 'leaf', sub: 'Kitchen / vegetable waste' },
    { label: 'Dry Recyclables', value: '9.6', unit: 'MT', tone: 'sky', sub: 'Paper, plastic, PET' },
    { label: 'Mixed / Contaminated', value: '1.8', unit: 'MT', tone: 'rose', sub: 'Flagged residuals' }
  ],
  map: {
    title: 'Sub-10m Beat Navigation & Street Basemap',
    center: [18.5204, 73.8567],
    markers: [
      { lat: 18.5204, lng: 73.8567, status: 'green', label: 'QR-HSE-W04-0842 — verified' },
      { lat: 18.5221, lng: 73.8589, status: 'yellow', label: 'Next scheduled stop' },
      { lat: 18.5188, lng: 73.8542, status: 'red', label: 'Gate locked — non-compliant' },
      { lat: 18.5240, lng: 73.8601, status: 'green', label: 'Verified via QR scan' }
    ],
    route: [[18.5170, 73.8520], [18.5204, 73.8567], [18.5240, 73.8601]]
  },
  photos: {
    title: 'Doorstep Photographic Verification',
    items: [
      { label: 'Wet Waste Photo', tone: 'leaf', note: '96% Purity Grade A, green bin', gps: '18.5204°N 73.8567°E', time: '08:24 IST' },
      { label: 'Dry Waste Photo', tone: 'sky', note: '94% Recyclable, blue bin', gps: '18.5204°N 73.8567°E', time: '08:24 IST' },
      { label: 'Mixed Waste Warning', tone: 'rose', note: 'Unsegregated plastic/food co-mingling', gps: '18.5188°N 73.8542°E', time: '08:31 IST' },
      { label: 'QR Entrance Gate', tone: 'saffron', note: 'QR-HSE-W04-0842 scanned', gps: '18.5204°N 73.8567°E', time: '08:24 IST' }
    ]
  },
  chart: {
    title: 'Hourly Beat Intake (06:00–11:00)',
    type: 'bar',
    color: '#4CC77E',
    data: [
      { label: '06:00', value: 8.2 }, { label: '07:00', value: 14.1 }, { label: '08:00', value: 21.6 },
      { label: '09:00', value: 18.4 }, { label: '10:00', value: 11.2 }, { label: '11:00', value: 6.5 }
    ]
  },
  progress: {
    title: 'Punctuality & Route SLA',
    items: [
      { label: 'On-time doorstep arrival', value: 98.4, tone: 'leaf' },
      { label: 'Segregation compliance', value: 91.8, tone: 'teal' },
      { label: 'Beat completion', value: 95.2, tone: 'sky' }
    ]
  },
  table: {
    title: 'Household Collection & UCC Ledger',
    columns: [
      { key: 'house', label: 'House ID / QR' }, { key: 'address', label: 'Resident Address' },
      { key: 'time', label: 'Arrival', mono: true }, { key: 'collector', label: 'Collector ID', mono: true },
      { key: 'grade', label: 'Segregation Grade' }, { key: 'ucc', label: 'UCC Status', statusCol: true }
    ],
    rows: [
      { house: 'QR-HSE-W04-0842', address: '12, Lane 4, Ward 04', time: '08:24:12', collector: 'COL-8821', grade: 'Grade A', ucc: 'Paid' },
      { house: 'QR-HSE-W04-0851', address: '14, Lane 4, Ward 04', time: '08:27:40', collector: 'COL-8821', grade: 'Grade A', ucc: 'Paid' },
      { house: 'QR-HSE-W04-0863', address: '2, Cross St, Ward 04', time: '08:31:02', collector: 'COL-8821', grade: 'Non-compliant', ucc: 'Overdue' },
      { house: 'QR-HSE-W04-0879', address: '9, Market Rd, Ward 04', time: '08:35:55', collector: 'COL-8821', grade: 'Grade A', ucc: 'Paid' }
    ]
  }
}
