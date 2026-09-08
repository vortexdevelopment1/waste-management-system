export const weighbridgeConfig = {
  title: 'Weighbridge',
  subtitle: 'Dual-scale gross/tare capture — API fed by weighbridge load cells',
  kpis: [
    { label: 'Daily Bulk Inward', value: '1,428.5', unit: 'MT', tone: 'teal' },
    { label: 'ANPR Accuracy', value: '99.8', unit: '%', tone: 'leaf' },
    { label: 'Avg. Turnaround', value: '42', unit: 'sec', tone: 'sky' },
    { label: 'Landfill Diversion', value: '86.4', unit: '%', tone: 'saffron' }
  ],
  map: {
    title: 'Secondary Haulage Corridor Map',
    center: [18.5150, 73.8600],
    markers: [
      { lat: 18.5150, lng: 73.8600, status: 'blue', label: 'TS-01 Weighbridge' },
      { lat: 18.5400, lng: 73.8700, status: 'green', label: 'MRF' },
      { lat: 18.4950, lng: 73.8450, status: 'yellow', label: 'Bio-Methanation Plant' },
      { lat: 18.4800, lng: 73.9000, status: 'red', label: 'Scientific Landfill' }
    ]
  },
  photos: {
    title: 'ANPR & Scale Inspection',
    items: [
      { label: 'Gross Scale Platform', tone: 'sky', note: 'MH-12-TR-9904, GROSS 28,450 KG', gps: '18.5150°N 73.8600°E', time: '11:04 IST' },
      { label: 'Tipping Bunker', tone: 'leaf', note: 'RORO discharging to bio-methanation pit' },
      { label: 'RFID / ANPR Reader', tone: 'saffron', note: 'License plate + windshield tag capture' },
      { label: 'Tare Scale 02', tone: 'teal', note: 'Outbound tare weighment' }
    ]
  },
  chart: {
    title: 'Daily Haul Stream Split',
    type: 'donut',
    data: [
      { name: 'Wet Bio-Waste', value: 48 }, { name: 'Dry Recyclables', value: 28 },
      { name: 'RDF', value: 14 }, { name: 'Inerts', value: 10 }
    ]
  },
  progress: {
    title: 'Scale Status',
    items: [
      { label: 'Scale 01 (Inbound Gross)', value: 100, tone: 'leaf' },
      { label: 'Scale 02 (Outbound Tare)', value: 100, tone: 'leaf' },
      { label: 'ANPR accuracy', value: 99.8, tone: 'sky' }
    ]
  },
  table: {
    title: 'Secondary Weighbridge Manifest Ledger',
    columns: [
      { key: 'ticket', label: 'Ticket ID', mono: true }, { key: 'vehicle', label: 'Vehicle Reg.', mono: true },
      { key: 'origin', label: 'Origin' }, { key: 'destination', label: 'Destination' },
      { key: 'net', label: 'Net Payload (MT)', mono: true }, { key: 'status', label: 'Certificate', statusCol: true }
    ],
    rows: [
      { ticket: 'WB-SEC-8841', vehicle: 'MH-12-TR-9904', origin: 'TS-01', destination: 'MRF', net: '11.2', status: 'Verified' },
      { ticket: 'WB-SEC-8842', vehicle: 'MH-12-TR-1187', origin: 'TS-02', destination: 'Bio-Methanation', net: '9.8', status: 'Pending' },
      { ticket: 'WB-SEC-8843', vehicle: 'MH-12-TR-5520', origin: 'Central Hub', destination: 'Landfill', net: '14.5', status: 'Verified' }
    ]
  }
}
