// Role definitions sourced from the SWM documentation login interfaces:
// "LOGIN INTERFACE FOR SUPERVISOR", "LOGIN INTERFACE FOR DRIVER/HELPER",
// "LOGIN INTERFACE FOR SURVEYOR", and recurring "Dashboard for Admin / Authority / Member".

export const ROLES = {
  admin: {
    id: 'admin',
    label: 'Admin',
    description: 'Full platform control — configuration, all modules, all wards.',
    color: 'saffron'
  },
  authority: {
    id: 'authority',
    label: 'Authority',
    description: 'City / Municipal Health Officer — statutory oversight & sign-off.',
    color: 'violet'
  },
  supervisor: {
    id: 'supervisor',
    label: 'Supervisor',
    description: 'Sanitary Inspector — beat allocation, crew muster, field verification.',
    color: 'teal'
  },
  driver: {
    id: 'driver',
    label: 'Driver',
    description: 'Vehicle operator — beat navigation & QR-based collection.',
    color: 'sky'
  },
  helper: {
    id: 'helper',
    label: 'Helper',
    description: 'Collection crew — door-to-door segregation logging.',
    color: 'leaf'
  },
  surveyor: {
    id: 'surveyor',
    label: 'Surveyor',
    description: 'GIS field surveyor — ward/zone/route geotagging.',
    color: 'rose'
  }
}

export const ROLE_ACCESS = {
  admin: '*',
  authority: [
    'dashboard', 'kpi', 'reports', 'bwg', 'transfer-station', 'mrf', 'rat',
    'weighbridge', 'cctv', 'user-charges', 'complaints', 'street-sweeping',
    'drain-desilting', 'geotagging', 'settings'
  ],
  supervisor: [
    'dashboard', 'route-tracking', 'waste-collection', 'segregation', 'bwg',
    'rat', 'complaints', 'street-sweeping', 'drain-desilting', 'weighbridge',
    'cctv', 'geotagging'
  ],
  driver: ['route-tracking', 'waste-collection', 'segregation'],
  helper: ['route-tracking', 'waste-collection', 'segregation'],
  surveyor: ['geotagging', 'dashboard']
}

export function canAccess(role, moduleKey) {
  const access = ROLE_ACCESS[role]
  if (access === '*') return true
  return access?.includes(moduleKey)
}
