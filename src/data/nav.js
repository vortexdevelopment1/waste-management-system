import {
  LayoutDashboard, Route, Trash2, MapPinned, Recycle, Building2,
  Warehouse, Factory, Siren, Scale, Video, Wallet, MessageSquareWarning,
  Gauge, FileBarChart2, Wind, Waves, Settings as SettingsIcon
} from 'lucide-react'

// One entry per module identified in the source documentation.
export const NAV = [
  { key: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { key: 'route-tracking', label: 'Route Tracking', path: '/route-tracking', icon: Route },
  { key: 'waste-collection', label: 'Waste Collection', path: '/waste-collection', icon: Trash2 },
  { key: 'geotagging', label: 'Geotagging', path: '/geotagging', icon: MapPinned },
  { key: 'segregation', label: 'Waste Segregation', path: '/segregation', icon: Recycle },
  { key: 'bwg', label: 'Bulk Waste Generators', path: '/bulk-waste-generators', icon: Building2 },
  { key: 'transfer-station', label: 'Transfer Station', path: '/transfer-station', icon: Warehouse },
  { key: 'mrf', label: 'MRF', path: '/mrf', icon: Factory },
  { key: 'rat', label: 'Rapid Action Team', path: '/rapid-action-team', icon: Siren },
  { key: 'weighbridge', label: 'Weighbridge', path: '/weighbridge', icon: Scale },
  { key: 'cctv', label: 'CCTV Monitoring', path: '/cctv-monitoring', icon: Video },
  { key: 'user-charges', label: 'User Charges', path: '/user-charges', icon: Wallet },
  { key: 'complaints', label: 'Complaints', path: '/complaints', icon: MessageSquareWarning },
  { key: 'kpi', label: 'KPI Dashboard', path: '/kpi', icon: Gauge },
  { key: 'reports', label: 'Reports', path: '/reports', icon: FileBarChart2 },
  { key: 'street-sweeping', label: 'Street Sweeping', path: '/street-sweeping', icon: Wind },
  { key: 'drain-desilting', label: 'Drain Desilting', path: '/drain-desilting', icon: Waves },
  { key: 'settings', label: 'Settings', path: '/settings', icon: SettingsIcon }
]
