export const cctvConfig = {
  title: 'CCTV Monitoring',
  subtitle: 'Integrated surveillance — MRF, Transfer Station, Processing Plants, GVP sites',
  kpis: [
    { label: 'Cameras Online', value: '142', unit: '/ 150', tone: 'leaf' },
    { label: 'AI Incidents Today', value: '9', tone: 'rose' },
    { label: 'Avg. Detection Latency', value: '1.8', unit: 'sec', tone: 'sky' },
    { label: 'Coverage Sites', value: '18', tone: 'teal' }
  ],
  map: {
    title: 'Camera Network Map',
    center: [18.5230, 73.8580],
    markers: [
      { lat: 18.5150, lng: 73.8600, status: 'green', label: 'TS-01 — 12 cameras' },
      { lat: 18.5400, lng: 73.8700, status: 'green', label: 'MRF — 20 cameras' },
      { lat: 18.5204, lng: 73.8567, status: 'red', label: 'GVP #012 — incident live' },
      { lat: 18.5305, lng: 73.8530, status: 'yellow', label: 'BWG Shopping Complex — offline camera' }
    ]
  },
  photos: {
    title: 'Live Feed Snapshots',
    items: [
      { label: 'GVP #012 Feed', tone: 'rose', note: 'Unauthorized dumping — bounding box active' },
      { label: 'MRF Sorting Line', tone: 'sky', note: 'Optical QC belt, normal operation' },
      { label: 'TS-01 Tipping Bay', tone: 'teal', note: 'Vehicle count nominal' },
      { label: 'Weighbridge Gate', tone: 'saffron', note: 'ANPR camera, normal operation' }
    ]
  },
  chart: {
    title: 'Incidents by Site (7 days)',
    type: 'bar',
    color: '#E96A6A',
    data: [
      { label: 'GVP', value: 14 }, { label: 'BWG', value: 5 }, { label: 'MRF', value: 1 },
      { label: 'TS-01', value: 2 }, { label: 'Weighbridge', value: 0 }
    ]
  },
  progress: {
    title: 'Network Health',
    items: [
      { label: 'Cameras online', value: 94.7, tone: 'leaf' },
      { label: 'Storage retention (30 days)', value: 100, tone: 'sky' }
    ]
  },
  table: {
    title: 'Camera & Incident Register',
    columns: [
      { key: 'cam', label: 'Camera ID', mono: true }, { key: 'site', label: 'Site' },
      { key: 'type', label: 'Detection Type' }, { key: 'time', label: 'Last Event', mono: true },
      { key: 'status', label: 'Status', statusCol: true }
    ],
    rows: [
      { cam: 'CCTV-GVP-012', site: 'GVP #012 Market Cross', type: 'Illegal dumping', time: '08:12:04', status: 'Flagged' },
      { cam: 'CCTV-MRF-07', site: 'MRF Line 1', type: 'Normal', time: '—', status: 'Active Now' },
      { cam: 'CCTV-BWG-156', site: 'Shopping Complex', type: 'Camera offline', time: '06:40:11', status: 'Pending' }
    ]
  }
}
