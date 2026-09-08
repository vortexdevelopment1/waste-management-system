export const bwgConfig = {
  title: 'Bulk Waste Generators',
  subtitle: 'Commercial, institutional & industrial BWG compliance (>100 kg/day)',
  kpis: [
    { label: 'Registered BWGs', value: '184', unit: 'entities', tone: 'sky' },
    { label: 'Daily Intake', value: '185.4', unit: 'MT', tone: 'teal' },
    { label: 'Segregation Compliance', value: '94.6', unit: '%', tone: 'leaf' },
    { label: 'Commercial UCC Realized', value: '₹4,85,000', tone: 'saffron', sub: '≈ $48,500' },
    { label: 'Non-compliant BWGs', value: '9', unit: '/ 184', tone: 'rose' }
  ],
  map: {
    title: 'Commercial / Institutional BWG Node Map',
    center: [18.5230, 73.8480],
    markers: [
      { lat: 18.5230, lng: 73.8480, status: 'green', label: 'Hotel Meridian — Compliant' },
      { lat: 18.5260, lng: 73.8510, status: 'green', label: 'Tech Park Alpha — Compliant' },
      { lat: 18.5195, lng: 73.8455, status: 'yellow', label: 'City Hospital — Pending today' },
      { lat: 18.5305, lng: 73.8530, status: 'red', label: 'Shopping Complex — Defaulter' }
    ]
  },
  photos: {
    title: 'Before / After Facility Audit',
    items: [
      { label: 'Commercial Storage Bay', tone: 'sky', note: 'Segregated bins, GPS + time watermark', gps: '18.5230°N 73.8480°E', time: '10:12 IST' },
      { label: 'After Sanitization', tone: 'leaf', note: 'Cleared, washed, inspector-verified', gps: '18.5230°N 73.8480°E', time: '10:41 IST' },
      { label: 'Dry Recyclables', tone: 'sky', note: 'Cardboard, rigid plastics, metals → MRF', gps: '18.5260°N 73.8510°E', time: '09:58 IST' },
      { label: 'Wet Organic Waste', tone: 'leaf', note: 'Kitchen/canteen waste → bio-methanation', gps: '18.5260°N 73.8510°E', time: '09:58 IST' }
    ]
  },
  chart: {
    title: 'Multi-Stream Fraction Breakdown',
    type: 'donut',
    data: [
      { name: 'Dry Recyclables', value: 42 }, { name: 'Wet Organic', value: 38 },
      { name: 'Inert / Sanitary', value: 12 }, { name: 'Hazardous', value: 8 }
    ]
  },
  progress: {
    title: 'Statutory Coverage',
    items: [
      { label: 'In-situ processing compliance', value: 95.1, tone: 'leaf' },
      { label: 'Segregation compliance', value: 94.6, tone: 'teal' },
      { label: 'UCC realization', value: 81.3, tone: 'saffron' }
    ]
  },
  table: {
    title: 'Commercial & Operational Ledger',
    columns: [
      { key: 'id', label: 'BWG ID', mono: true }, { key: 'name', label: 'Establishment' },
      { key: 'category', label: 'Category' }, { key: 'tonnage', label: 'Actual / Est. MT', mono: true },
      { key: 'vehicle', label: 'Vehicle', mono: true }, { key: 'status', label: 'Enforcement', statusCol: true }
    ],
    rows: [
      { id: 'BWG-0114', name: 'Hotel Meridian', category: 'Hospitality', tonnage: '1.2 / 1.4', vehicle: 'TRUCK-402', status: 'Compliant' },
      { id: 'BWG-0129', name: 'Tech Park Alpha', category: 'Institutional', tonnage: '3.8 / 4.0', vehicle: 'TRUCK-108', status: 'Compliant' },
      { id: 'BWG-0142', name: 'City Hospital', category: 'Institutional', tonnage: '2.1 / 2.6', vehicle: 'TRUCK-402', status: 'Pending' },
      { id: 'BWG-0156', name: 'Shopping Complex', category: 'Commercial', tonnage: '0.6 / 3.2', vehicle: '—', status: 'Non-compliant' }
    ]
  }
}
