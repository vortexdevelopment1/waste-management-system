import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import LineChartCard from '../components/charts/LineChartCard.jsx'
import BarChartCard from '../components/charts/BarChartCard.jsx'
import DonutChartCard from '../components/charts/DonutChartCard.jsx'
import {
  Truck, Recycle, Route as RouteIcon, Wallet, MessageSquareWarning,
  Satellite, Video, Droplets, ShieldCheck, UserCheck, User, ArrowRight,
  CheckCircle2, Clock, AlertTriangle, MapPin, QrCode, ShieldAlert,
  Scale, FileText, Fuel, Activity, Building2, Check, ExternalLink,
  Wind, Waves, Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRole } from '../hooks/useRole.js'

// --- MOCK DATA FOR CHARTS & DASHBOARD VIEWS ---
const wasteTrend = [
  { label: 'Mon', value: 612 }, { label: 'Tue', value: 634 }, { label: 'Wed', value: 598 },
  { label: 'Thu', value: 671 }, { label: 'Fri', value: 705 }, { label: 'Sat', value: 742 }, { label: 'Sun', value: 588 }
]

const wardTonnage = [
  { label: 'W01', value: 92 }, { label: 'W02', value: 78 }, { label: 'W03', value: 104 },
  { label: 'W04', value: 118 }, { label: 'W05', value: 86 }, { label: 'W06', value: 73 }
]

const wasteMix = [
  { name: 'Wet Organic', value: 48 }, { name: 'Dry Recyclable', value: 34 },
  { name: 'Mixed / Residual', value: 12 }, { name: 'Hazardous / Sanitary', value: 6 }
]

const DOT_TONE = {
  leaf: 'bg-civic-leaf', rose: 'bg-civic-rose', saffron: 'bg-civic-saffron',
  sky: 'bg-civic-sky', teal: 'bg-civic-teal', violet: 'bg-civic-violet'
}

const adminActivity = [
  { time: '11:42', text: 'TRUCK-402 completed Beat W04-01 — 98.2% adherence', tone: 'leaf' },
  { time: '11:38', text: 'RAT dispatched PATROL-04 to GVP #012, Market Cross', tone: 'rose' },
  { time: '11:31', text: 'BWG-0156 flagged non-compliant — Shopping Complex', tone: 'saffron' },
  { time: '11:24', text: 'Weighbridge WB-8802 logged 10,850 kg inward', tone: 'sky' },
  { time: '11:15', text: '312 doorstep UPI payments settled this hour', tone: 'teal' },
  { time: '11:02', text: 'MRF Line 1 baled 1.2 MT OCC cardboard', tone: 'leaf' }
]

const supervisorActivity = [
  { time: '11:40', text: 'Inspected Ward 04 Beat 2 doorstep segregation (96% dry/wet split)', tone: 'leaf' },
  { time: '11:25', text: 'Issued ₹500 spot-fine to Commercial Shop #42 for open littering', tone: 'rose' },
  { time: '11:10', text: 'RAT Patrol cleared GVP blackspot at Market Cross (1.8 MT cleared)', tone: 'teal' },
  { time: '10:45', text: 'Street Sweeping Gang #03 finished 8.4 km along MG Road', tone: 'sky' },
  { time: '10:15', text: 'Tipper MH-12-Q-402 checked-in at Transfer Station TS-02', tone: 'leaf' }
]

export default function Dashboard() {
  const { role, roleInfo, currentUser } = useRole()

  // Render role-specific dashboard based on active role
  if (role === 'supervisor') {
    return <SupervisorDashboard roleInfo={roleInfo} currentUser={currentUser} />
  }

  if (role === 'driver') {
    return <DriverDashboard roleInfo={roleInfo} currentUser={currentUser} />
  }

  if (role === 'user') {
    return <UserDashboard roleInfo={roleInfo} currentUser={currentUser} />
  }

  // Default: Admin Dashboard
  return <AdminDashboard roleInfo={roleInfo} currentUser={currentUser} />
}

/* ==========================================================================
   1. ADMIN DASHBOARD VIEW (System Administrator Oversight)
   ========================================================================== */
function AdminDashboard({ roleInfo, currentUser }) {
  return (
    <DashboardLayout
      title="City Command Dashboard (Admin)"
      subtitle="Live municipal solid waste management telemetry — updated real-time"
    >
      {/* Greeting Banner */}
      <div className="border border-civic-saffron/40 bg-civic-saffronDim/20 text-civic-saffron rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-surface border border-current/20 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface border border-current/30 font-mono">
                Admin Oversight Mode
              </span>
              <span className="text-xs text-ink font-medium">
                Welcome, {currentUser?.name || roleInfo?.label}
              </span>
            </div>
            <h2 className="text-sm md:text-base font-bold text-ink mt-1">
              Administrator Command Center Oversight
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              All 19 municipal modules, 6 zones, and automated IoT sensor grid active.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
          <Link
            to="/users-management"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-ink hover:text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <span>User & Crew Control</span>
            <ArrowRight size={12} className="opacity-70" />
          </Link>
          <Link
            to="/kpi"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-ink hover:text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <span>KPI Analytics</span>
            <ArrowRight size={12} className="opacity-70" />
          </Link>
          <Link
            to="/reports"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-ink hover:text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <span>System Reports</span>
            <ArrowRight size={12} className="opacity-70" />
          </Link>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        <KpiCard label="Live Vehicle Count" value="142" unit="/ 160" tone="sky" icon={Truck} delta="+4 since 09:00" />
        <KpiCard label="Total Waste Collected" value="3,140" unit="MT / today" tone="teal" icon={Recycle} delta="+6.1% vs yesterday" />
        <KpiCard label="Route Completion" value="87.4" unit="%" tone="leaf" icon={RouteIcon} sub="1,142 / 1,306 beats" />
        <KpiCard label="User Charge Realization" value="₹18,42,500" tone="saffron" icon={Wallet} sub="75.2% realization MTD" />
        <KpiCard label="Open Complaints" value="46" tone="rose" icon={MessageSquareWarning} sub="98.4% resolved <24h" />
        <KpiCard label="Wet Waste Share" value="48" unit="%" tone="leaf" icon={Droplets} />
        <KpiCard label="Dry Waste Share" value="34" unit="%" tone="sky" icon={Droplets} />
        <KpiCard label="GPS Active Devices" value="318" unit="/ 330" tone="teal" icon={Satellite} sub="96.4% online" />
        <KpiCard label="CCTV Feeds Live" value="142" unit="/ 150" tone="violet" icon={Video} sub="94.7% online" />
        <KpiCard label="Landfill Diversion" value="86.4" unit="%" tone="leaf" icon={Recycle} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Citywide Waste Collected — 7 Day Trend" eyebrow="Trend" className="xl:col-span-2">
          <LineChartCard data={wasteTrend} color="#22B8A6" />
        </SectionCard>
        <SectionCard title="Wet / Dry / Mixed Composition" eyebrow="Composition">
          <DonutChartCard data={wasteMix} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Tonnage by Ward" eyebrow="Comparison" className="xl:col-span-2">
          <BarChartCard data={wardTonnage} color="#3FA9DA" />
        </SectionCard>

        <SectionCard title="Live Activity Feed" eyebrow="Real-time">
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
            {adminActivity.map((a, i) => (
              <div key={i} className="flex gap-2.5 text-xs">
                <span className="font-mono text-ink-faint w-10 shrink-0">{a.time}</span>
                <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${DOT_TONE[a.tone]}`} />
                <span className="text-ink-muted leading-snug">{a.text}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Route Completion by Zone" eyebrow="Progress" className="xl:col-span-2">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <ProgressBar label="Zone North (BEAT-W04)" value={98.2} tone="leaf" />
            <ProgressBar label="Zone East (BEAT-W02)" value={82.6} tone="teal" />
            <ProgressBar label="Zone South (BEAT-W06)" value={71.4} tone="saffron" />
            <ProgressBar label="Zone West (BEAT-W01)" value={90.8} tone="leaf" />
            <ProgressBar label="Zone Central (BEAT-W03)" value={64.1} tone="rose" />
            <ProgressBar label="Zone Industrial (BEAT-W05)" value={88.0} tone="teal" />
          </div>
        </SectionCard>

        <SectionCard title="7-Star GFC Compliance Snapshot" eyebrow="Statutory">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink-muted">SWM 2026 Compliance Index</span>
              <span className="font-mono text-civic-leaf font-semibold">98.4%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink-muted">Doorstep Segregation</span>
              <StatusBadge status="Compliant" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink-muted">GVP Blackspot Elimination</span>
              <span className="font-mono text-ink">91.9%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink-muted">BWG In-Situ Processing</span>
              <span className="font-mono text-ink">95.1%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink-muted">Grievance SLA (&lt;24h)</span>
              <StatusBadge status="Compliant" />
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  )
}

/* ==========================================================================
   2. SUPERVISOR DASHBOARD VIEW (Sanitary Inspector / Zone Field In-charge)
   ========================================================================== */
function SupervisorDashboard({ roleInfo, currentUser }) {
  return (
    <DashboardLayout
      title="Field Operations Dashboard (Supervisor)"
      subtitle="Sanitary Inspector Console — Zone 02 (Wards 04, 05, 06)"
    >
      {/* Supervisor Greeting Banner */}
      <div className="border border-civic-teal/40 bg-civic-tealDim/20 text-civic-teal rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-surface border border-current/20 flex items-center justify-center shrink-0">
            <UserCheck size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface border border-current/30 font-mono">
                Supervisor Field Mode
              </span>
              <span className="text-xs text-ink font-medium">
                Inspector {currentUser?.name || 'Sunil Patil'}
              </span>
            </div>
            <h2 className="text-sm md:text-base font-bold text-ink mt-1">
              Field Operations & Sanitary Inspection (Zone 02)
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Ward 04/05/06 beat adherence: 92.4% • 128 Sanitation Staff active on beat • 4 RAT Units Ready
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
          <Link
            to="/route-tracking"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-ink hover:text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <span>Inspect Route Tracking</span>
            <ArrowRight size={12} className="opacity-70" />
          </Link>
          <Link
            to="/rapid-action-team"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-ink hover:text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <span>Dispatch RAT Patrol</span>
            <ArrowRight size={12} className="opacity-70" />
          </Link>
          <Link
            to="/complaints"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-ink hover:text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <span>Zone Grievances (12)</span>
            <ArrowRight size={12} className="opacity-70" />
          </Link>
        </div>
      </div>

      {/* Field Operational KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard label="Zone Beat Adherence" value="92.4" unit="%" tone="teal" icon={RouteIcon} delta="+1.8% vs yesterday" />
        <KpiCard label="Zone Active Tippers" value="34" unit="/ 38" tone="sky" icon={Truck} sub="94.7% online" />
        <KpiCard label="Crew Muster Present" value="128" unit="/ 135" tone="leaf" icon={UserCheck} sub="94.8% attendance" />
        <KpiCard label="RAT Squad Readiness" value="4 Units" tone="saffron" icon={AlertTriangle} sub="1 Active Patrol" />
        <KpiCard label="Street Sweeping" value="88.5" unit="%" tone="sky" icon={Wind} sub="42.4 km cleared" />
        <KpiCard label="Pending Zone Grievances" value="12" tone="rose" icon={MessageSquareWarning} sub="SLA avg 4.2 hours" />
      </div>

      {/* Main Supervisor Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Rapid Action Team & GVP Spot Inspection */}
        <SectionCard title="Zone GVP Blackspots & RAT Status" eyebrow="Hotspot Control" className="xl:col-span-2">
          <div className="space-y-3">
            <div className="p-3 bg-surface-alt border border-border rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-civic-roseDim border border-civic-rose/30 flex items-center justify-center text-civic-rose shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink flex items-center gap-2">
                    <span>GVP #012 — Market Cross (Ward 04)</span>
                    <StatusBadge status="Resolved" />
                  </div>
                  <div className="text-[11px] text-ink-muted mt-0.5">
                    1.8 MT illegal dumping cleared by RAT Patrol-04 at 11:38 AM • Site sanitized & geotagged.
                  </div>
                </div>
              </div>
              <Link
                to="/rapid-action-team"
                className="px-2.5 py-1 text-[11px] font-medium bg-surface border border-border text-ink hover:text-white rounded-md transition-colors shrink-0"
              >
                View Log
              </Link>
            </div>

            <div className="p-3 bg-surface-alt border border-border rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-civic-saffronDim border border-civic-saffron/30 flex items-center justify-center text-civic-saffron shrink-0">
                  <Building2 size={16} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink flex items-center gap-2">
                    <span>BWG-0156 — Grand Shopping Mall</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-civic-saffronDim text-civic-saffron font-mono">
                      Inspection Needed
                    </span>
                  </div>
                  <div className="text-[11px] text-ink-muted mt-0.5">
                    Wet waste compactor overflow flagged. Organic waste segregation audit scheduled for 02:00 PM.
                  </div>
                </div>
              </div>
              <Link
                to="/bwg"
                className="px-2.5 py-1 text-[11px] font-medium bg-surface border border-border text-ink hover:text-white rounded-md transition-colors shrink-0"
              >
                Audit BWG
              </Link>
            </div>

            <div className="p-3 bg-surface-alt border border-border rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-civic-tealDim border border-civic-teal/30 flex items-center justify-center text-civic-teal shrink-0">
                  <Waves size={16} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink flex items-center gap-2">
                    <span>Drain Desilting Beat D-04 — Sector 6 Main Nallah</span>
                    <StatusBadge status="Active" />
                  </div>
                  <div className="text-[11px] text-ink-muted mt-0.5">
                    Desilting gang active • 14.2 MT silt excavated today • Monsoon preparedness: 91%.
                  </div>
                </div>
              </div>
              <Link
                to="/drain-desilting"
                className="px-2.5 py-1 text-[11px] font-medium bg-surface border border-border text-ink hover:text-white rounded-md transition-colors shrink-0"
              >
                Track Drain
              </Link>
            </div>
          </div>
        </SectionCard>

        {/* Supervisor Activity & Spot Fines Log */}
        <SectionCard title="Field Inspector Activity Log" eyebrow="Inspection Feed">
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
            {supervisorActivity.map((a, i) => (
              <div key={i} className="flex gap-2.5 text-xs">
                <span className="font-mono text-ink-faint w-10 shrink-0">{a.time}</span>
                <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${DOT_TONE[a.tone]}`} />
                <span className="text-ink-muted leading-snug">{a.text}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Ward Progress & Sweeping Beats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Zone 02 Beat Route Completion" eyebrow="Ward Breakdown" className="xl:col-span-2">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <ProgressBar label="Ward 04 — Residential Doorstep Collection" value={98.2} tone="leaf" />
            <ProgressBar label="Ward 04 — Commercial Market Beats" value={89.4} tone="teal" />
            <ProgressBar label="Ward 05 — Sector 5 & Industrial Belt" value={91.0} tone="teal" />
            <ProgressBar label="Ward 06 — Primary Street Sweeping" value={88.5} tone="sky" />
            <ProgressBar label="Ward 06 — Secondary Drain Desilting" value={76.4} tone="saffron" />
            <ProgressBar label="Zone 02 — Overall SWM Compliance" value={92.4} tone="leaf" />
          </div>
        </SectionCard>

        <SectionCard title="Quick Supervisor Tools" eyebrow="Action Panel">
          <div className="space-y-2">
            <Link
              to="/route-tracking"
              className="w-full flex items-center justify-between p-2.5 bg-surface-alt hover:bg-surface-raised border border-border rounded-lg text-xs font-medium text-ink transition-colors"
            >
              <div className="flex items-center gap-2">
                <RouteIcon size={14} className="text-civic-teal" />
                <span>Reassign Tipper Route / Driver</span>
              </div>
              <ArrowRight size={13} className="text-ink-faint" />
            </Link>

            <Link
              to="/segregation"
              className="w-full flex items-center justify-between p-2.5 bg-surface-alt hover:bg-surface-raised border border-border rounded-lg text-xs font-medium text-ink transition-colors"
            >
              <div className="flex items-center gap-2">
                <Recycle size={14} className="text-civic-leaf" />
                <span>Log Doorstep Segregation Audit</span>
              </div>
              <ArrowRight size={13} className="text-ink-faint" />
            </Link>

            <Link
              to="/cctv-monitoring"
              className="w-full flex items-center justify-between p-2.5 bg-surface-alt hover:bg-surface-raised border border-border rounded-lg text-xs font-medium text-ink transition-colors"
            >
              <div className="flex items-center gap-2">
                <Video size={14} className="text-civic-violet" />
                <span>Check Zone GVP CCTV Feeds</span>
              </div>
              <ArrowRight size={13} className="text-ink-faint" />
            </Link>

            <Link
              to="/street-sweeping"
              className="w-full flex items-center justify-between p-2.5 bg-surface-alt hover:bg-surface-raised border border-border rounded-lg text-xs font-medium text-ink transition-colors"
            >
              <div className="flex items-center gap-2">
                <Wind size={14} className="text-civic-sky" />
                <span>Muster Sanitation Crew Attendance</span>
              </div>
              <ArrowRight size={13} className="text-ink-faint" />
            </Link>
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  )
}

/* ==========================================================================
   3. DRIVER DASHBOARD VIEW (Fleet Operator / Tipper Driver)
   ========================================================================== */
function DriverDashboard({ roleInfo, currentUser }) {
  const [scannedBins, setScannedBins] = useState(142)
  const totalBins = 160

  const stops = [
    { name: 'Stop 1: Sector 4 Main Market', time: '07:45 AM', status: 'Done', count: '32 Bins', tone: 'leaf' },
    { name: 'Stop 2: Block A Residential Area', time: '08:30 AM', status: 'Done', count: '45 Bins', tone: 'leaf' },
    { name: 'Stop 3: Block B Apartments', time: 'In Progress', status: 'Active', count: '42 Bins (18/42 scanned)', tone: 'sky' },
    { name: 'Stop 4: Green Park Housing Society', time: 'Estimated 10:15 AM', status: 'Pending', count: '41 Bins', tone: 'saffron' },
    { name: 'Stop 5: Transfer Station TS-02 (Unload)', time: 'Estimated 11:30 AM', status: 'Pending', count: '10.8 MT Waste', tone: 'teal' }
  ]

  return (
    <DashboardLayout
      title="Vehicle Operator Console (Driver)"
      subtitle="Tipper Vehicle MH-12-Q-402 — Assigned Beat W04-01"
    >
      {/* Driver Greeting Banner */}
      <div className="border border-civic-sky/40 bg-civic-skyDim/20 text-civic-sky rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-surface border border-current/20 flex items-center justify-center shrink-0">
            <Truck size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface border border-current/30 font-mono">
                Driver Console Mode
              </span>
              <span className="text-xs text-ink font-medium">
                Operator {currentUser?.name || 'Mukesh Solanki'}
              </span>
            </div>
            <h2 className="text-sm md:text-base font-bold text-ink mt-1">
              Assigned Route: Beat W04-01 (Market Road & Sector 4)
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Vehicle Tipper MH-12-Q-402 • Shift status: Active • Target Bins: 160
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
          <Link
            to="/route-tracking"
            className="px-3.5 py-2 rounded-lg bg-civic-sky text-surface font-semibold text-xs hover:bg-civic-sky/90 transition-all flex items-center gap-1.5 shadow-md"
          >
            <RouteIcon size={14} />
            <span>Open Live Beat Route Map</span>
          </Link>
          <Link
            to="/waste-collection"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-ink hover:text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <QrCode size={13} className="text-civic-teal" />
            <span>Scan QR Pickup</span>
          </Link>
          <Link
            to="/complaints"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-ink hover:text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <AlertTriangle size={13} className="text-civic-rose" />
            <span>Report Road Issue</span>
          </Link>
        </div>
      </div>

      {/* Driver Operational KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        <KpiCard label="Bins Collected Today" value={`${scannedBins}`} unit={`/ ${totalBins}`} tone="sky" icon={QrCode} sub={`${((scannedBins/totalBins)*100).toFixed(1)}% complete`} />
        <KpiCard label="Current Fuel Level" value="76" unit="%" tone="teal" icon={Fuel} sub="Est. 120 km range" />
        <KpiCard label="Inward Weight Logged" value="10.85" unit="MT" tone="leaf" icon={Scale} sub="1 Weighbridge trip" />
        <KpiCard label="Shift Speed Avg" value="38" unit="km/h" tone="sky" icon={Activity} sub="Governor Compliant" />
        <KpiCard label="On-Route Alerts" value="1" tone="saffron" icon={AlertTriangle} sub="Traffic delay Sector 4" />
      </div>

      {/* Interactive Driver Navigation & QR Pickup Checklist */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Route Stop Progression Checklist */}
        <SectionCard title="Today's Assigned Route Stops (Beat W04-01)" eyebrow="Live Progression" className="xl:col-span-2">
          <div className="space-y-2.5">
            {stops.map((stop, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors ${
                  stop.status === 'Active'
                    ? 'bg-civic-skyDim/30 border-civic-sky/40 text-ink'
                    : stop.status === 'Done'
                    ? 'bg-surface-alt/70 border-border text-ink-muted'
                    : 'bg-surface border-border text-ink-faint'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono text-xs font-semibold shrink-0 ${
                      stop.status === 'Done'
                        ? 'bg-civic-leafDim text-civic-leaf border-civic-leaf/40'
                        : stop.status === 'Active'
                        ? 'bg-civic-sky text-surface border-civic-sky animate-pulse'
                        : 'bg-surface-alt text-ink-faint border-border'
                    }`}
                  >
                    {stop.status === 'Done' ? <Check size={14} /> : idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-ink flex items-center gap-2">
                      <span>{stop.name}</span>
                      <span className="text-[10px] font-mono text-ink-faint">({stop.count})</span>
                    </div>
                    <div className="text-[11px] text-ink-muted mt-0.5">
                      Status: <span className="font-medium">{stop.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {stop.status === 'Active' && (
                    <button
                      onClick={() => setScannedBins((prev) => Math.min(prev + 1, totalBins))}
                      className="px-3 py-1 bg-civic-sky text-surface rounded-md text-xs font-semibold hover:bg-civic-sky/90 transition-colors shadow-sm"
                    >
                      + Quick Scan Bin
                    </button>
                  )}
                  {stop.status === 'Done' && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-civic-leafDim text-civic-leaf font-mono border border-civic-leaf/30">
                      Completed
                    </span>
                  )}
                  {stop.status === 'Pending' && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-alt text-ink-faint font-mono border border-border">
                      Scheduled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Quick Driver Action & Telematics */}
        <SectionCard title="Vehicle Telematics & Actions" eyebrow="Driver Control">
          <div className="space-y-3">
            <div className="p-3 bg-surface-alt border border-border rounded-xl">
              <div className="text-xs font-semibold text-ink mb-2">Tipper Vehicle Health</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-ink-muted">
                  <span>Engine Temperature</span>
                  <span className="font-mono text-civic-leaf font-semibold">84°C (Optimal)</span>
                </div>
                <div className="flex justify-between items-center text-ink-muted">
                  <span>GPS Telematics Signal</span>
                  <span className="font-mono text-civic-teal font-semibold">Strong (3D Lock)</span>
                </div>
                <div className="flex justify-between items-center text-ink-muted">
                  <span>Speed Governor</span>
                  <span className="font-mono text-ink font-semibold">Active (Max 40 km/h)</span>
                </div>
                <div className="flex justify-between items-center text-ink-muted">
                  <span>Assigned Weighbridge</span>
                  <span className="font-mono text-civic-sky font-semibold">WB-8802 (Sector 5)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                to="/waste-collection"
                className="w-full py-2.5 px-3 bg-civic-teal text-surface font-semibold rounded-lg text-xs flex items-center justify-center gap-2 hover:bg-civic-teal/90 transition-colors shadow-md"
              >
                <QrCode size={15} />
                <span>Open Doorstep RFID / QR Scanner</span>
              </Link>
              <Link
                to="/weighbridge"
                className="w-full py-2 px-3 bg-surface-alt hover:bg-surface-raised border border-border rounded-lg text-xs font-medium text-ink flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Scale size={14} className="text-civic-saffron" />
                  <span>Log Weighbridge Slip</span>
                </div>
                <ArrowRight size={13} className="text-ink-faint" />
              </Link>
              <Link
                to="/complaints"
                className="w-full py-2 px-3 bg-civic-roseDim/40 hover:bg-civic-roseDim/70 border border-civic-rose/30 rounded-lg text-xs font-medium text-civic-rose flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} />
                  <span>Report Road Blockage / Breakdown</span>
                </div>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  )
}

/* ==========================================================================
   4. USER DASHBOARD VIEW (Citizen / Resident / Commercial Generator)
   ========================================================================== */
function UserDashboard({ roleInfo, currentUser }) {
  const [paid, setPaid] = useState(false)

  return (
    <DashboardLayout
      title="Citizen Sanitation Portal (User)"
      subtitle="Property ID: W04-B02-8842 — Resident Sanitation Portal & Waste Services"
    >
      {/* Citizen Greeting Banner */}
      <div className="border border-civic-leaf/40 bg-civic-leafDim/20 text-civic-leaf rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-surface border border-current/20 flex items-center justify-center shrink-0">
            <User size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface border border-current/30 font-mono">
                Citizen Portal Mode
              </span>
              <span className="text-xs text-ink font-medium">
                Welcome, {currentUser?.name || 'Ananya Deshmukh'}
              </span>
            </div>
            <h2 className="text-sm md:text-base font-bold text-ink mt-1">
              Citizen Sanitation Portal — Property W04-B02-8842
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Morning doorstep collection vehicle arrived at 07:15 AM • Your segregation score: 5 Stars ⭐⭐⭐⭐⭐
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
          <Link
            to="/waste-collection"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-ink hover:text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <span>Check Pickup Schedule</span>
            <ArrowRight size={12} className="opacity-70" />
          </Link>
          <Link
            to="/user-charges"
            className="px-3 py-1.5 rounded-lg bg-civic-leaf text-surface font-semibold text-xs hover:bg-civic-leaf/90 transition-all flex items-center gap-1 shadow-sm"
          >
            <Wallet size={13} />
            <span>Pay User Charges (₹50)</span>
          </Link>
          <Link
            to="/complaints"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-ink hover:text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <MessageSquareWarning size={13} className="text-civic-rose" />
            <span>Report Grievance</span>
          </Link>
        </div>
      </div>

      {/* Citizen Personal KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        <KpiCard label="Morning Tipper Status" value="Arrived" unit="07:15 AM" tone="leaf" icon={Truck} sub="Tipper MH-12-Q-402" />
        <KpiCard label="Segregation Score" value="5 Stars" tone="saffron" icon={Sparkles} sub="98% dry/wet accuracy" />
        <KpiCard label="Monthly Sanitary Fee" value={paid ? 'Paid ₹50' : '₹50 Due'} tone={paid ? 'leaf' : 'saffron'} icon={Wallet} sub="Due Sep 15, 2026" />
        <KpiCard label="Active Grievances" value="0" tone="teal" icon={CheckCircle2} sub="1 resolved yesterday" />
        <KpiCard label="Monthly Pickups" value="30 / 30" unit="days" tone="sky" icon={Recycle} sub="100% attendance" />
      </div>

      {/* Live Doorstep Collection Status & Quick Payment */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Collection Tracker Timeline */}
        <SectionCard title="Live Doorstep Waste Collection Status" eyebrow="Today's Timeline" className="xl:col-span-2">
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
            <div className="relative flex items-center justify-between text-xs">
              <span className="absolute -left-6 w-4 h-4 rounded-full bg-civic-leaf border-2 border-surface flex items-center justify-center text-white">
                <Check size={10} />
              </span>
              <div>
                <div className="font-semibold text-ink">Tipper Departed Zone Depot</div>
                <div className="text-ink-muted text-[11px]">Vehicle MH-12-Q-402 started Beat W04-01</div>
              </div>
              <span className="font-mono text-ink-faint">06:30 AM</span>
            </div>

            <div className="relative flex items-center justify-between text-xs">
              <span className="absolute -left-6 w-4 h-4 rounded-full bg-civic-leaf border-2 border-surface flex items-center justify-center text-white">
                <Check size={10} />
              </span>
              <div>
                <div className="font-semibold text-ink">Entered Your Street (Sector 4 Market Road)</div>
                <div className="text-ink-muted text-[11px]">Audio chime broadcasted for household pickup</div>
              </div>
              <span className="font-mono text-ink-faint">07:05 AM</span>
            </div>

            <div className="relative flex items-center justify-between text-xs">
              <span className="absolute -left-6 w-4 h-4 rounded-full bg-civic-leaf border-2 border-surface flex items-center justify-center text-white">
                <Check size={10} />
              </span>
              <div>
                <div className="font-semibold text-ink text-civic-leaf">Waste Collected at Your Doorstep</div>
                <div className="text-ink-muted text-[11px]">RFID Tag Scanned • Segregation verified 100% compliant</div>
              </div>
              <span className="font-mono text-civic-leaf font-semibold">07:15 AM</span>
            </div>

            <div className="relative flex items-center justify-between text-xs">
              <span className="absolute -left-6 w-4 h-4 rounded-full bg-civic-teal border-2 border-surface flex items-center justify-center text-white">
                <Check size={10} />
              </span>
              <div>
                <div className="font-semibold text-ink">Discharged at Transfer Station TS-02</div>
                <div className="text-ink-muted text-[11px]">Waste processed for secondary segregation & composting</div>
              </div>
              <span className="font-mono text-ink-faint">10:00 AM</span>
            </div>
          </div>
        </SectionCard>

        {/* Quick Payment & Bill Status Card */}
        <SectionCard title="Sanitary User Charge Payment" eyebrow="Monthly Billing">
          <div className="p-4 bg-surface-alt border border-border rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-ink-faint">Billing Period</div>
                <div className="text-xs font-semibold text-ink">August 2026</div>
              </div>
              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold border ${
                paid ? 'bg-civic-leafDim text-civic-leaf border-civic-leaf/30' : 'bg-civic-saffronDim text-civic-saffron border-civic-saffron/30'
              }`}>
                {paid ? 'Paid & Verified' : 'Payment Due'}
              </span>
            </div>

            <div className="pt-2 border-t border-border flex justify-between items-baseline">
              <span className="text-xs text-ink-muted">Sanitation Fee</span>
              <span className="text-lg font-bold text-ink font-mono">₹50.00</span>
            </div>

            {paid ? (
              <div className="p-2.5 bg-civic-leafDim/40 border border-civic-leaf/30 rounded-lg text-center text-xs text-civic-leaf font-medium flex items-center justify-center gap-1.5">
                <CheckCircle2 size={15} />
                <span>Receipt #REC-2026-8842 Settled</span>
              </div>
            ) : (
              <button
                onClick={() => setPaid(true)}
                className="w-full py-2.5 bg-civic-leaf text-surface font-semibold text-xs rounded-lg hover:bg-civic-leaf/90 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Wallet size={14} />
                <span>Pay ₹50 via UPI / Card / NetBanking</span>
              </button>
            )}

            <div className="text-[10px] text-ink-faint text-center">
              Under SWM Rules 2026 • Receipt sent to user@swm.gov.in
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Citizen Waste Segregation & Grievance Guidelines */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Doorstep Waste Segregation Guide" eyebrow="Compliance Helper" className="xl:col-span-2">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 bg-civic-leafDim/20 border border-civic-leaf/30 rounded-xl text-xs space-y-1">
              <div className="font-bold text-civic-leaf flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-civic-leaf inline-block" />
                <span>Green Bin — Wet Organic</span>
              </div>
              <p className="text-ink-muted text-[11px] leading-relaxed">
                Vegetable peels, food waste, tea bags, garden leaves, egg shells. Processed into organic city compost.
              </p>
            </div>

            <div className="p-3 bg-civic-skyDim/20 border border-civic-sky/30 rounded-xl text-xs space-y-1">
              <div className="font-bold text-civic-sky flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-civic-sky inline-block" />
                <span>Blue Bin — Dry Recyclable</span>
              </div>
              <p className="text-ink-muted text-[11px] leading-relaxed">
                Paper, cardboard, plastics, glass bottles, metal cans. Baled & recycled at Material Recovery Facility.
              </p>
            </div>

            <div className="p-3 bg-civic-roseDim/20 border border-civic-rose/30 rounded-xl text-xs space-y-1">
              <div className="font-bold text-civic-rose flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-civic-rose inline-block" />
                <span>Red Bin — Hazardous & Sanitary</span>
              </div>
              <p className="text-ink-muted text-[11px] leading-relaxed">
                Expired medicines, paint cans, batteries, sanitary waste wrapped separately for scientific disposal.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Citizen Grievance & Help" eyebrow="Quick Support">
          <div className="space-y-2">
            <Link
              to="/complaints"
              className="w-full flex items-center justify-between p-2.5 bg-surface-alt hover:bg-surface-raised border border-border rounded-lg text-xs font-medium text-ink transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageSquareWarning size={14} className="text-civic-rose" />
                <span>Report Missed Doorstep Pickup</span>
              </div>
              <ArrowRight size={13} className="text-ink-faint" />
            </Link>

            <Link
              to="/complaints"
              className="w-full flex items-center justify-between p-2.5 bg-surface-alt hover:bg-surface-raised border border-border rounded-lg text-xs font-medium text-ink transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-civic-saffron" />
                <span>Report Overflowing Public Street Bin</span>
              </div>
              <ArrowRight size={13} className="text-ink-faint" />
            </Link>

            <Link
              to="/segregation"
              className="w-full flex items-center justify-between p-2.5 bg-surface-alt hover:bg-surface-raised border border-border rounded-lg text-xs font-medium text-ink transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-civic-leaf" />
                <span>View Star Rating & Segregation Guide</span>
              </div>
              <ArrowRight size={13} className="text-ink-faint" />
            </Link>
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  )
}
