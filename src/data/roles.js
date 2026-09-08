// Solid Waste Management (SWM) Command Center — 4 Role Configuration & Demo Credentials

export const ROLES = {
  admin: {
    id: 'admin',
    label: 'Admin',
    title: 'System Administrator',
    description: 'Full municipal command — configuration, all 17 modules, IoT telemetry, all wards & settings.',
    color: 'saffron',
    badgeTone: 'saffron',
    demo: {
      username: 'admin',
      email: 'admin@swm.gov.in',
      password: 'admin123',
      name: 'Dr. Rajesh Verma',
      designation: 'Chief SWM Administrator'
    }
  },
  supervisor: {
    id: 'supervisor',
    label: 'Supervisor',
    title: 'Sanitary Inspector',
    description: 'Field operations & supervision — beat allocation, crew muster, rapid action team & inspections.',
    color: 'teal',
    badgeTone: 'teal',
    demo: {
      username: 'supervisor',
      email: 'supervisor@swm.gov.in',
      password: 'super123',
      name: 'Sunil Patil',
      designation: 'Sanitary Inspector (Zone 2)'
    }
  },
  driver: {
    id: 'driver',
    label: 'Driver',
    title: 'Fleet Vehicle Operator',
    description: 'Vehicle navigation & collection — assigned beat route, RFID/QR pickup logging & bin status.',
    color: 'sky',
    badgeTone: 'sky',
    demo: {
      username: 'driver',
      email: 'driver@swm.gov.in',
      password: 'driver123',
      name: 'Mukesh Solanki',
      designation: 'Vehicle Operator (Tipper MH-12-Q-402)'
    }
  },
  user: {
    id: 'user',
    label: 'User',
    title: 'Citizen & Resident',
    description: 'Citizen portal — daily waste collection schedule, segregation guide, fees & grievance logging.',
    color: 'leaf',
    badgeTone: 'leaf',
    demo: {
      username: 'user',
      email: 'user@swm.gov.in',
      password: 'user123',
      name: 'Ananya Deshmukh',
      designation: 'Resident / Property Owner (Ward 4)'
    }
  }
}

export const DEMO_CREDENTIALS = [
  {
    role: 'admin',
    label: 'Admin',
    title: 'System Administrator',
    username: 'admin',
    email: 'admin@swm.gov.in',
    password: 'admin123',
    name: 'Dr. Rajesh Verma',
    designation: 'Chief SWM Administrator',
    access: 'Full Command Center (All 17 Modules)',
    color: 'saffron'
  },
  {
    role: 'supervisor',
    label: 'Supervisor',
    title: 'Sanitary Inspector',
    username: 'supervisor',
    email: 'supervisor@swm.gov.in',
    password: 'super123',
    name: 'Sunil Patil',
    designation: 'Sanitary Inspector (Zone 2)',
    access: 'Field Ops, RAT, Sweeping & Desilting',
    color: 'teal'
  },
  {
    role: 'driver',
    label: 'Driver',
    title: 'Fleet Operator',
    username: 'driver',
    email: 'driver@swm.gov.in',
    password: 'driver123',
    name: 'Mukesh Solanki',
    designation: 'Tipper Operator (MH-12-Q-402)',
    access: 'Routes, Waste Collection, Segregation',
    color: 'sky'
  },
  {
    role: 'user',
    label: 'User',
    title: 'Citizen / Resident',
    username: 'user',
    email: 'user@swm.gov.in',
    password: 'user123',
    name: 'Ananya Deshmukh',
    designation: 'Property Owner (Ward 4 / Beat 2)',
    access: 'Collection Status, User Charges, Grievance',
    color: 'leaf'
  }
]

export const ROLE_ACCESS = {
  admin: '*',
  supervisor: [
    'dashboard', 'route-tracking', 'waste-collection', 'geotagging', 'segregation', 'bwg',
    'transfer-station', 'mrf', 'rat', 'weighbridge', 'cctv', 'complaints',
    'kpi', 'reports', 'street-sweeping', 'drain-desilting'
  ],
  driver: [
    'dashboard', 'route-tracking', 'waste-collection', 'segregation', 'weighbridge', 'complaints'
  ],
  user: [
    'dashboard', 'waste-collection', 'segregation', 'user-charges', 'complaints', 'bwg'
  ]
}

export function canAccess(role, moduleKey) {
  if (!role) return false
  const access = ROLE_ACCESS[role]
  if (access === '*') return true
  return Boolean(access?.includes(moduleKey))
}

export function authenticateUser(identifier, password) {
  if (!identifier || !password) return null
  const cleanId = identifier.trim().toLowerCase()
  const cleanPass = password.trim()

  const match = DEMO_CREDENTIALS.find(
    (c) =>
      (c.username.toLowerCase() === cleanId || c.email.toLowerCase() === cleanId) &&
      c.password === cleanPass
  )

  if (!match) return null

  return {
    role: match.role,
    username: match.username,
    email: match.email,
    name: match.name,
    designation: match.designation,
    title: match.title
  }
}

