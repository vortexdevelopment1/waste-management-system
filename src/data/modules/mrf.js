export const mrfConfig = {
  title: 'Material Recovery Facility',
  subtitle: 'MRF — mechanical sorting line & commodity valorization',
  kpis: [
    { label: 'Daily Infeed Intake', value: '420.5', unit: 'MT', tone: 'teal' },
    { label: 'Recovery Efficiency', value: '88.4', unit: '%', tone: 'leaf' },
    { label: 'Landfill Rejection', value: '11.6', unit: '%', tone: 'rose' },
    { label: 'NIR Sorter Purity', value: '96.2', unit: '%', tone: 'sky' },
    { label: 'Baled Inventory', value: '185', unit: 'MT', tone: 'saffron' }
  ],
  map: {
    title: 'Inward Feed Source Network',
    center: [18.5400, 73.8700],
    markers: [
      { lat: 18.5400, lng: 73.8700, status: 'blue', label: 'MRF Plant' },
      { lat: 18.5150, lng: 73.8600, status: 'green', label: 'TS-01 → MRF' },
      { lat: 18.5500, lng: 73.8650, status: 'green', label: 'Ward-06 Tipper Feed' }
    ]
  },
  photos: {
    title: 'Sorting Line & Warehouse Audit',
    items: [
      { label: 'Optical & Manual QC Belt', tone: 'sky', note: 'PET/HDPE/cans, AI purity overlay' },
      { label: 'Baled Warehouse', tone: 'saffron', note: 'Wire-tied OCC & plastic bales, barcoded' },
      { label: 'NIR Optical Sorter', tone: 'teal', note: 'Polymer resin ID: PET, HDPE, PP' },
      { label: 'Eddy Current Separator', tone: 'leaf', note: 'Ferrous / non-ferrous extraction' }
    ]
  },
  chart: {
    title: 'Commodity Yield Breakdown',
    type: 'donut',
    data: [
      { name: 'OCC / Cardboard', value: 34 }, { name: 'PET Bottles', value: 22 },
      { name: 'HDPE', value: 14 }, { name: 'Mixed Paper', value: 12 },
      { name: 'Al & Steel', value: 8 }, { name: 'RDF', value: 10 }
    ]
  },
  progress: {
    title: 'Line Performance',
    items: [
      { label: 'Recovery efficiency', value: 88.4, tone: 'leaf' },
      { label: 'NIR sorter purity', value: 96.2, tone: 'sky' },
      { label: 'Landfill rejection', value: 11.6, tone: 'rose' }
    ]
  },
  table: {
    title: 'Inward Feed & Commodity Dispatch Manifest',
    columns: [
      { key: 'batch', label: 'Batch ID', mono: true }, { key: 'source', label: 'Source' },
      { key: 'payload', label: 'Payload (kg)', mono: true }, { key: 'line', label: 'Sorting Line' },
      { key: 'offtaker', label: 'Off-take Partner' }, { key: 'status', label: 'Clearance', statusCol: true }
    ],
    rows: [
      { batch: 'MRF-B-3301', source: 'TS-01', payload: '9,400', line: 'Line 1', offtaker: 'GreenCycle Pvt Ltd', status: 'Completed' },
      { batch: 'MRF-B-3302', source: 'Ward-06 Tipper', payload: '6,150', line: 'Line 2', offtaker: 'PolyRecover Inc', status: 'On route' },
      { batch: 'MRF-B-3303', source: 'TS-01', payload: '8,820', line: 'Line 1', offtaker: 'MetalWorks Ltd', status: 'Pending' }
    ]
  }
}
