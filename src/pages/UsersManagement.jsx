import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import {
  Users, UserCheck, Truck, Building2, ShieldCheck, ScanFace,
  QrCode, Search, Filter, MapPin, Eye, CheckCircle2, AlertTriangle,
  Phone, Mail, Plus, Award, ShieldAlert, X
} from 'lucide-react'

// Master mock data grounded in the SWM specifications
const SUPERVISORS = [
  {
    id: 'SUP-SI-402',
    name: 'Sunil Patil',
    title: 'Sanitary Inspector',
    zone: 'Zone 02 / Ward 04',
    phone: '+91 98230 44102',
    email: 'supervisor@swm.gov.in',
    faceAuth: 'Verified (04:02 IST)',
    vehicles: 'TRUCK-402, MS-04, SP-02',
    crews: '12 Drivers, 24 Helpers (Muster 97.7%)',
    beat: 'BEAT-W04-01 to W04-06 (1,306 Props)',
    adherence: '98.4%',
    status: 'Active On Duty'
  },
  {
    id: 'SUP-SI-108',
    name: 'Rajesh Sharma',
    title: 'Sanitary Inspector',
    zone: 'Zone 01 / Ward 02',
    phone: '+91 98211 90812',
    email: 'r.sharma@swm.gov.in',
    faceAuth: 'Verified (03:55 IST)',
    vehicles: 'PATROL-04, TRUCK-108',
    crews: '8 Drivers, 16 Helpers (Muster 100%)',
    beat: 'BEAT-W02-01 to W02-04 (940 Props)',
    adherence: '96.0%',
    status: 'Active On Duty'
  },
  {
    id: 'SUP-JE-08',
    name: 'A. Khan',
    title: 'Junior Engineer (Drain & Silt)',
    zone: 'Zone 03 / Central Nallah',
    phone: '+91 98765 12008',
    email: 'a.khan@swm.gov.in',
    faceAuth: 'Verified (04:15 IST)',
    vehicles: 'EX-02 Excavator, SS-02 Jetting Truck',
    crews: '15 Desilting Crew (100% Gas PPE)',
    beat: 'Central Siphon & Drainage Grid',
    adherence: '99.2%',
    status: 'Active On Duty'
  }
]

const DRIVERS_HELPERS = [
  {
    id: 'DRV-104',
    name: 'Suresh Kumar',
    role: 'Driver (Operator)',
    helper: 'HLP-204 Ramesh Shinde',
    vehicle: 'TRUCK-402 (Auto-Tipper MH-12-Q-402)',
    route: 'BEAT-W04-01',
    faceAuth: 'Verified (06:00 IST)',
    gps: 'Active (< 3.8m accuracy)',
    progress: '60.4% (2.9 / 4.8 km)',
    serviced: '82 / 135 properties',
    ppe: 'Passed 100%',
    status: 'In Transit'
  },
  {
    id: 'DRV-118',
    name: 'Anil Bhosale',
    role: 'Driver (Operator)',
    helper: 'HLP-312 Vikas Pawar',
    vehicle: 'TRUCK-108 (Compactor MH-12-TR-9904)',
    route: 'BEAT-W02-03',
    faceAuth: 'Verified (05:50 IST)',
    gps: 'Active (< 4.1m accuracy)',
    progress: '82.6% (4.6 / 5.6 km)',
    serviced: '119 / 144 properties',
    ppe: 'Passed 100%',
    status: 'In Transit'
  },
  {
    id: 'DRV-302',
    name: 'Santosh Jadhav',
    role: 'Driver (Vacuum Sweeper)',
    helper: 'HLP-401 Ganesh Mane',
    vehicle: 'MS-04 (Mechanized Sweeper)',
    route: 'ARTERIAL-04 (Shift 04:00–12:00)',
    faceAuth: 'Verified (03:58 IST)',
    gps: 'Active (< 2.9m accuracy)',
    progress: '91.7% (34.8 / 38.0 km)',
    serviced: '14 Wards Serviced',
    ppe: 'Passed 100%',
    status: 'Active Sweeping'
  },
  {
    id: 'DRV-419',
    name: 'Vikram Rathod',
    role: 'Driver (RAT Commander)',
    helper: 'HLP-505 Dipak More',
    vehicle: 'PATROL-04 (Rapid Action Patrol)',
    route: 'RAT Zone 02 Hotspots',
    faceAuth: 'Verified (06:10 IST)',
    gps: 'Active (< 3.2m accuracy)',
    progress: 'Response SLA: 14.2 min',
    serviced: '8 GVP Sites Remediated',
    ppe: 'Passed 100%',
    status: 'On Patrol'
  }
]

const USERS = [
  {
    id: 'QR-HSE-W04-0842',
    name: 'Ananya Deshmukh',
    category: 'Residential Property',
    address: '12, Lane 4, Ward 04, Zone 02',
    phone: '+91 98201 55401',
    uccStatus: 'Paid — ₹50.00',
    qrPlaque: 'Scanned Gate QR (08:24 IST)',
    purityGrade: 'Grade A (96% Wet/Dry)',
    photoAudit: 'Wet & Dry Photos Uploaded',
    status: 'Compliant'
  },
  {
    id: 'QR-HSE-W04-0851',
    name: 'R. Deshpande',
    category: 'Residential Property',
    address: '14, Lane 4, Ward 04, Zone 02',
    phone: '+91 98334 11202',
    uccStatus: 'Paid — ₹50.00',
    qrPlaque: 'Scanned Gate QR (08:27 IST)',
    purityGrade: 'Grade A (94% Wet/Dry)',
    photoAudit: 'Wet & Dry Photos Uploaded',
    status: 'Compliant'
  },
  {
    id: 'QR-BWG-156',
    name: 'Grand Horizon Shopping Complex',
    category: 'Bulk Waste Generator (>100 kg/day)',
    address: 'Plot 45, Market Cross, Ward 05',
    phone: '+91 98990 00156',
    uccStatus: 'Defaulter — ₹3,200 Arrears',
    qrPlaque: 'Scanned Gate QR (06:40 IST)',
    purityGrade: 'Non-Compliant (Co-mingled)',
    photoAudit: 'Commercial Bay Flagged',
    status: 'Flagged'
  },
  {
    id: 'QR-HSE-W04-0863',
    name: 'S. Naik',
    category: 'Residential Property',
    address: '2, Cross St, Ward 04, Zone 02',
    phone: '+91 98450 77103',
    uccStatus: 'Overdue — ₹50.00 Pending',
    qrPlaque: 'Pending (Gate Locked)',
    purityGrade: 'Pending Verification',
    photoAudit: 'Gate Locked Photo Uploaded',
    status: 'Pending'
  },
  {
    id: 'QR-INST-042',
    name: 'St. Jude International Academy',
    category: 'Institutional Generator',
    address: '8, School Rd, Ward 03, Zone 01',
    phone: '+91 98111 88042',
    uccStatus: 'Paid — ₹1,500.00',
    qrPlaque: 'Scanned Gate QR (07:15 IST)',
    purityGrade: 'Grade A (98% Purity)',
    photoAudit: 'In-Situ Compost Verified',
    status: 'Compliant'
  }
]

const SURVEYORS = [
  {
    id: 'GIS-SRV-01',
    name: 'S. Deshmukh',
    assignment: 'Zone & Ward Boundary Mapping',
    phone: '+91 98770 12345',
    accuracy: '< 3.8m GPS Lock',
    nodes: '842 Residential, 14 GVP Nodes',
    photos: 'Start/End & Landmark Photos',
    status: 'Verified'
  },
  {
    id: 'GIS-SRV-02',
    name: 'A. Kulkarni',
    assignment: 'BWG & Commercial Route Beat Mapping',
    phone: '+91 98770 54321',
    accuracy: '< 4.1m GPS Lock',
    nodes: '184 BWG Entities, 32 Routes',
    photos: 'Commercial Storage Bay Photos',
    status: 'Verified'
  }
]

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState('supervisors')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEntity, setSelectedEntity] = useState(null)

  // Filter lists based on search
  const filteredSupervisors = SUPERVISORS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.zone.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredDrivers = DRIVERS_HELPERS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.route.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUsers = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredSurveyors = SURVEYORS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.assignment.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout
      title="Admin User & Crew Control Center"
      subtitle="Complete management & biometric audit of Supervisors, Drivers, Helpers, Citizens & GIS Surveyors"
    >
      {/* Top Executive KPI Telemetry */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          label="Registered Users / Props"
          value="49,000"
          unit="Units"
          tone="teal"
          icon={Building2}
          sub="95.2% Collection Active"
        />
        <KpiCard
          label="Sanitary Supervisors"
          value="14"
          unit="Active"
          tone="saffron"
          icon={UserCheck}
          sub="100% Face-Auth Verified"
        />
        <KpiCard
          label="Drivers & Crew On-Road"
          value="160 / 320"
          unit="Drivers / Helpers"
          tone="sky"
          icon={Truck}
          sub="142 Fleet Vehicles Live"
        />
        <KpiCard
          label="GIS Surveyors & Tags"
          value="12"
          unit="Surveyors"
          tone="leaf"
          icon={MapPin}
          sub="11,280 Geotagged Nodes"
        />
      </div>

      {/* Control Bar: Search & Action Controls */}
      <SectionCard dense>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-surface-alt border border-border rounded-md px-3 py-2 text-xs w-full sm:w-80">
            <Search size={15} className="text-ink-faint shrink-0" />
            <input
              type="text"
              placeholder="Search by name, ID, vehicle, ward, QR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-ink placeholder:text-ink-faint w-full text-xs"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-ink-faint hover:text-ink">
                <X size={13} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-ink-faint font-mono">Filtered:</span>
            <span className="text-xs font-semibold text-civic-teal font-mono bg-civic-tealDim px-2 py-0.5 rounded border border-civic-teal/30">
              {activeTab === 'supervisors' && `${filteredSupervisors.length} Supervisors`}
              {activeTab === 'drivers' && `${filteredDrivers.length} Drivers & Helpers`}
              {activeTab === 'users' && `${filteredUsers.length} Users / Properties`}
              {activeTab === 'surveyors' && `${filteredSurveyors.length} Surveyors`}
            </span>
          </div>
        </div>
      </SectionCard>

      {/* Tab Navigation Menu */}
      <div className="flex border-b border-border gap-1 overflow-x-auto">
        <TabButton
          id="supervisors"
          label="Supervisors (Sanitary Inspectors)"
          count={SUPERVISORS.length}
          active={activeTab === 'supervisors'}
          onClick={() => setActiveTab('supervisors')}
          icon={UserCheck}
        />
        <TabButton
          id="drivers"
          label="Drivers & Helpers (Fleet Crew)"
          count={DRIVERS_HELPERS.length}
          active={activeTab === 'drivers'}
          onClick={() => setActiveTab('drivers')}
          icon={Truck}
        />
        <TabButton
          id="users"
          label="Users & Waste Generators"
          count={USERS.length}
          active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
          icon={Users}
        />
        <TabButton
          id="surveyors"
          label="GIS Field Surveyors"
          count={SURVEYORS.length}
          active={activeTab === 'surveyors'}
          onClick={() => setActiveTab('surveyors')}
          icon={MapPin}
        />
      </div>

      {/* TAB 1: SUPERVISORS ROSTER */}
      {activeTab === 'supervisors' && (
        <SectionCard
          title="Sanitary Supervisors & Ward Inspection Roster"
          eyebrow="Biometric Face-Auth & Fleet Assignment"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="text-left text-ink-faint uppercase tracking-wide text-[10px] border-b border-border">
                  <th className="px-3 py-2.5 font-medium">Supervisor ID</th>
                  <th className="px-3 py-2.5 font-medium">Name & Title</th>
                  <th className="px-3 py-2.5 font-medium">Assigned Zone / Ward</th>
                  <th className="px-3 py-2.5 font-medium">Face-Auth Status</th>
                  <th className="px-3 py-2.5 font-medium">Assigned Fleet Vehicles</th>
                  <th className="px-3 py-2.5 font-medium">Deployed Crews</th>
                  <th className="px-3 py-2.5 font-medium">SLA Adherence</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <th className="px-3 py-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSupervisors.map((s) => (
                  <tr key={s.id} className="border-b border-border-soft hover:bg-surface-alt/60 transition-colors">
                    <td className="px-3 py-3 font-mono font-semibold text-civic-teal">{s.id}</td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-ink">{s.name}</div>
                      <div className="text-[11px] text-ink-faint">{s.title}</div>
                    </td>
                    <td className="px-3 py-3 text-ink-muted">{s.zone}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-civic-leafDim text-civic-leaf border border-civic-leaf/30">
                        <ScanFace size={12} /> {s.faceAuth}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-ink-muted">{s.vehicles}</td>
                    <td className="px-3 py-3 text-ink-muted">{s.crews}</td>
                    <td className="px-3 py-3 font-mono font-semibold text-civic-leaf">{s.adherence}</td>
                    <td className="px-3 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        onClick={() => setSelectedEntity({ type: 'supervisor', data: s })}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-alt border border-border hover:border-civic-teal/40 text-ink text-[11px] transition-colors"
                      >
                        <Eye size={12} /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* TAB 2: DRIVERS & HELPERS ROSTER */}
      {activeTab === 'drivers' && (
        <SectionCard
          title="Driver & Helper Operational Roster"
          eyebrow="Automatically Generated Route Beats & Vehicle Telemetry"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="text-left text-ink-faint uppercase tracking-wide text-[10px] border-b border-border">
                  <th className="px-3 py-2.5 font-medium">Driver ID</th>
                  <th className="px-3 py-2.5 font-medium">Driver & Helper Name</th>
                  <th className="px-3 py-2.5 font-medium">Assigned Vehicle</th>
                  <th className="px-3 py-2.5 font-medium">Auto Beat Route</th>
                  <th className="px-3 py-2.5 font-medium">Face-Auth Log</th>
                  <th className="px-3 py-2.5 font-medium">Route Progress</th>
                  <th className="px-3 py-2.5 font-medium">Properties Serviced</th>
                  <th className="px-3 py-2.5 font-medium">PPE Safety Audit</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <th className="px-3 py-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((d) => (
                  <tr key={d.id} className="border-b border-border-soft hover:bg-surface-alt/60 transition-colors">
                    <td className="px-3 py-3 font-mono font-semibold text-civic-sky">{d.id}</td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-ink">{d.name}</div>
                      <div className="text-[11px] text-ink-faint">{d.helper}</div>
                    </td>
                    <td className="px-3 py-3 font-mono text-ink-muted">{d.vehicle}</td>
                    <td className="px-3 py-3 font-mono text-civic-teal font-medium">{d.route}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-civic-tealDim text-civic-teal border border-civic-teal/30">
                        <CheckCircle2 size={11} /> {d.faceAuth}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-ink-muted">{d.progress}</td>
                    <td className="px-3 py-3 font-mono font-medium text-ink">{d.serviced}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-civic-leafDim text-civic-leaf border border-civic-leaf/30">
                        <Award size={11} /> {d.ppe}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        onClick={() => setSelectedEntity({ type: 'driver', data: d })}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-alt border border-border hover:border-civic-sky/40 text-ink text-[11px] transition-colors"
                      >
                        <Eye size={12} /> Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* TAB 3: USERS & WASTE GENERATORS LEDGER */}
      {activeTab === 'users' && (
        <SectionCard
          title="User & Waste Generator Directory"
          eyebrow="Embedded Gate QR, User Charge Collection (UCC) & Purity Grading"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="text-left text-ink-faint uppercase tracking-wide text-[10px] border-b border-border">
                  <th className="px-3 py-2.5 font-medium">GIS / QR ID</th>
                  <th className="px-3 py-2.5 font-medium">Owner / Establishment Name</th>
                  <th className="px-3 py-2.5 font-medium">Category</th>
                  <th className="px-3 py-2.5 font-medium">Address & Ward</th>
                  <th className="px-3 py-2.5 font-medium">User Charge (UCC)</th>
                  <th className="px-3 py-2.5 font-medium">Gate Embedded QR</th>
                  <th className="px-3 py-2.5 font-medium">Segregation Purity</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <th className="px-3 py-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border-soft hover:bg-surface-alt/60 transition-colors">
                    <td className="px-3 py-3 font-mono font-semibold text-civic-saffron">{u.id}</td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-ink">{u.name}</div>
                      <div className="text-[11px] text-ink-faint">{u.phone}</div>
                    </td>
                    <td className="px-3 py-3 text-ink-muted">{u.category}</td>
                    <td className="px-3 py-3 text-ink-muted">{u.address}</td>
                    <td className="px-3 py-3 font-mono font-semibold">
                      <span className={u.uccStatus.includes('Paid') ? 'text-civic-leaf' : u.uccStatus.includes('Defaulter') ? 'text-civic-rose' : 'text-civic-saffron'}>
                        {u.uccStatus}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] text-ink-muted">{u.qrPlaque}</td>
                    <td className="px-3 py-3 font-mono font-medium text-ink">{u.purityGrade}</td>
                    <td className="px-3 py-3">
                      <StatusBadge status={u.status} />
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        onClick={() => setSelectedEntity({ type: 'user', data: u })}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-alt border border-border hover:border-civic-saffron/40 text-ink text-[11px] transition-colors"
                      >
                        <Eye size={12} /> Audit Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* TAB 4: GIS FIELD SURVEYORS */}
      {activeTab === 'surveyors' && (
        <SectionCard
          title="GIS Field Surveyors & Basemap Geotagging Team"
          eyebrow="Sub-10m Accuracy & Photo Watermarking"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="text-left text-ink-faint uppercase tracking-wide text-[10px] border-b border-border">
                  <th className="px-3 py-2.5 font-medium">Surveyor ID</th>
                  <th className="px-3 py-2.5 font-medium">Surveyor Name</th>
                  <th className="px-3 py-2.5 font-medium">Assigned Survey Task</th>
                  <th className="px-3 py-2.5 font-medium">GPS Lock Accuracy</th>
                  <th className="px-3 py-2.5 font-medium">Tagged GIS Nodes</th>
                  <th className="px-3 py-2.5 font-medium">Watermarked Photos</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <th className="px-3 py-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSurveyors.map((s) => (
                  <tr key={s.id} className="border-b border-border-soft hover:bg-surface-alt/60 transition-colors">
                    <td className="px-3 py-3 font-mono font-semibold text-civic-teal">{s.id}</td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-ink">{s.name}</div>
                      <div className="text-[11px] text-ink-faint">{s.phone}</div>
                    </td>
                    <td className="px-3 py-3 text-ink-muted">{s.assignment}</td>
                    <td className="px-3 py-3 font-mono text-civic-leaf font-semibold">{s.accuracy}</td>
                    <td className="px-3 py-3 font-mono text-ink-muted">{s.nodes}</td>
                    <td className="px-3 py-3 text-ink-muted">{s.photos}</td>
                    <td className="px-3 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        onClick={() => setSelectedEntity({ type: 'surveyor', data: s })}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-alt border border-border hover:border-civic-teal/40 text-ink text-[11px] transition-colors"
                      >
                        <Eye size={12} /> Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* INSPECTION MODAL */}
      {selectedEntity && (
        <EntityDetailModal entity={selectedEntity} onClose={() => setSelectedEntity(null)} />
      )}
    </DashboardLayout>
  )
}

function TabButton({ id, label, count, active, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
        active
          ? 'border-civic-teal text-civic-teal bg-civic-tealDim/30'
          : 'border-transparent text-ink-muted hover:text-ink hover:bg-surface-alt'
      }`}
    >
      <Icon size={14} />
      <span>{label}</span>
      <span className={`px-1.5 py-0.2 text-[10px] font-mono rounded-full ${active ? 'bg-civic-teal text-white' : 'bg-surface-alt text-ink-faint border border-border'}`}>
        {count}
      </span>
    </button>
  )
}

function EntityDetailModal({ entity, onClose }) {
  const { type, data } = entity

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-surface border border-border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-alt">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-civic-tealDim border border-civic-teal/30 flex items-center justify-center text-civic-teal">
              {type === 'supervisor' && <UserCheck size={16} />}
              {type === 'driver' && <Truck size={16} />}
              {type === 'user' && <Users size={16} />}
              {type === 'surveyor' && <MapPin size={16} />}
            </span>
            <div>
              <div className="text-sm font-semibold text-ink">{data.name}</div>
              <div className="text-[11px] text-ink-faint font-mono">{data.id} • {type.toUpperCase()} PROFILE</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-ink-faint hover:text-ink hover:bg-surface">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-3 text-xs">
          {type === 'supervisor' && (
            <>
              <DetailRow label="Designation / Title" value={data.title} />
              <DetailRow label="Assigned Zone & Ward" value={data.zone} />
              <DetailRow label="Contact Phone" value={data.phone} mono />
              <DetailRow label="Official Email" value={data.email} mono />
              <DetailRow label="Biometric Face-Auth" value={data.faceAuth} highlight />
              <DetailRow label="Assigned Fleet Vehicles" value={data.vehicles} mono />
              <DetailRow label="Deployed Operations Crew" value={data.crews} />
              <DetailRow label="Assigned Beat Coverage" value={data.beat} />
              <DetailRow label="Route Adherence SLA" value={data.adherence} highlight />
            </>
          )}

          {type === 'driver' && (
            <>
              <DetailRow label="Role & Assignment" value={data.role} />
              <DetailRow label="Assigned Helper" value={data.helper} />
              <DetailRow label="Vehicle Registration & Type" value={data.vehicle} mono />
              <DetailRow label="Auto-Generated Beat Route" value={data.route} mono highlight />
              <DetailRow label="Biometric Attendance Log" value={data.faceAuth} highlight />
              <DetailRow label="Live GPS Lock & Accuracy" value={data.gps} mono />
              <DetailRow label="Current Route Progress" value={data.progress} mono />
              <DetailRow label="Properties Serviced (QR)" value={data.serviced} />
              <DetailRow label="Safety PPE Audit Verification" value={data.ppe} highlight />
            </>
          )}

          {type === 'user' && (
            <>
              <DetailRow label="Owner / Generator Name" value={data.name} />
              <DetailRow label="Property Category" value={data.category} />
              <DetailRow label="Property Address" value={data.address} />
              <DetailRow label="Contact Number" value={data.phone} mono />
              <DetailRow label="User Charge (UCC) Status" value={data.uccStatus} highlight />
              <DetailRow label="Gate Embedded QR Plaque" value={data.qrPlaque} mono />
              <DetailRow label="Source Segregation Grade" value={data.purityGrade} highlight />
              <DetailRow label="Mandatory Photo Audit" value={data.photoAudit} />
            </>
          )}

          {type === 'surveyor' && (
            <>
              <DetailRow label="Surveyor Name" value={data.name} />
              <DetailRow label="Assigned Survey Task" value={data.assignment} />
              <DetailRow label="Contact Phone" value={data.phone} mono />
              <DetailRow label="Sub-10m GPS Accuracy" value={data.accuracy} highlight />
              <DetailRow label="Tagged GIS Nodes" value={data.nodes} mono />
              <DetailRow label="Watermarked Photo Audits" value={data.photos} />
            </>
          )}

          <div className="pt-3 border-t border-border flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-md border border-border bg-surface-alt hover:bg-surface text-ink text-xs font-medium"
            >
              Close Record
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value, mono, highlight }) {
  return (
    <div className="flex items-center justify-between border-b border-border-soft pb-2">
      <span className="text-ink-faint">{label}</span>
      <span className={`${mono ? 'font-mono' : ''} ${highlight ? 'text-civic-teal font-semibold' : 'text-ink'}`}>
        {value}
      </span>
    </div>
  )
}
