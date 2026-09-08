export const transferStationConfig = {
  title: 'Transfer Station',
  subtitle: 'TS-01 — inward/outward logistics & compaction',
  kpis: [
    { label: 'Daily Inward Intake', value: '642.5', unit: 'MT', tone: 'teal' },
    { label: 'Compactor Capacity', value: '78', unit: '% full', tone: 'saffron' },
    { label: 'Outbound Haulers', value: '18', unit: '/ 24', tone: 'sky', sub: 'In transit' },
    { label: 'ANPR Scale Accuracy', value: '99.8', unit: '%', tone: 'leaf' }
  ],
  map: {
    title: 'Regional Inflow / Outflow Logistics Map',
    center: [18.5150, 73.8600],
    markers: [
      { lat: 18.5150, lng: 73.8600, status: 'blue', label: 'TS-01 Transfer Station' },
      { lat: 18.5400, lng: 73.8700, status: 'green', label: 'MRF' },
      { lat: 18.4950, lng: 73.8450, status: 'yellow', label: 'Bio-Methanation Unit' },
      { lat: 18.4800, lng: 73.9000, status: 'red', label: 'Scientific Landfill' }
    ]
  },
  photos: {
    title: 'Live Operational Photo Panels',
    items: [
      { label: 'Tipping Bay & Receiving Pit', tone: 'sky', note: 'Tippers discharging into concrete hoppers' },
      { label: 'Hydraulic Compactor Bay', tone: 'teal', note: 'RORO container compaction' },
      { label: 'Digital Weighbridge Pit', tone: 'saffron', note: 'ANPR gross/tare capture' },
      { label: 'Odor Scrubber System', tone: 'leaf', note: 'Bio-filter, negative air pressure' }
    ]
  },
  chart: {
    title: 'Mass Fraction by Stream',
    type: 'donut',
    data: [
      { name: 'Wet Bio-Waste', value: 48 }, { name: 'Dry Recyclables', value: 28 },
      { name: 'Inerts / C&D', value: 24 }
    ]
  },
  progress: {
    title: 'Facility Status',
    items: [
      { label: 'Compactor capacity used', value: 78, tone: 'saffron' },
      { label: 'Outbound haulers active', value: 75, tone: 'sky' }
    ]
  },
  table: {
    title: 'Inward & Outward Tipping Manifest',
    columns: [
      { key: 'ticket', label: 'Ticket ID', mono: true }, { key: 'vehicle', label: 'Vehicle Reg.', mono: true },
      { key: 'transporter', label: 'Transporter' }, { key: 'net', label: 'Net Weight (kg)', mono: true },
      { key: 'hopper', label: 'Hopper' }, { key: 'status', label: 'Dispatch', statusCol: true }
    ],
    rows: [
      { ticket: 'WB-8801', vehicle: 'MH-12-TR-9904', transporter: 'COL-8821', net: '12,400', hopper: 'H-02', status: 'Completed' },
      { ticket: 'WB-8802', vehicle: 'MH-12-TR-4471', transporter: 'COL-7734', net: '10,850', hopper: 'H-01', status: 'In transit' },
      { ticket: 'WB-8803', vehicle: 'MH-12-TR-2290', transporter: 'COL-8821', net: '13,220', hopper: 'H-03', status: 'Pending' }
    ]
  }
}
