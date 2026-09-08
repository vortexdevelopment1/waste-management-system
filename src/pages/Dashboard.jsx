import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import LineChartCard from '../components/charts/LineChartCard.jsx'
import BarChartCard from '../components/charts/BarChartCard.jsx'
import DonutChartCard from '../components/charts/DonutChartCard.jsx'
import SectorLiveDashboard from '../components/dashboard/SectorLiveDashboard.jsx'
import {
  Truck, Recycle, Route as RouteIcon, Wallet, MessageSquareWarning,
  Satellite, Video, Droplets, ShieldCheck, UserCheck, User, ArrowRight,
  Activity, BarChart3, Radio
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRole } from '../hooks/useRole.js'

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

const activity = [
  { time: '11:42', text: 'TRUCK-402 completed Beat W04-01 — 98.2% adherence', tone: 'leaf' },
  { time: '11:38', text: 'RAT dispatched PATROL-04 to GVP #012, Market Cross', tone: 'rose' },
  { time: '11:31', text: 'BWG-0156 flagged non-compliant — Shopping Complex', tone: 'saffron' },
  { time: '11:24', text: 'Weighbridge WB-8802 logged 10,850 kg inward', tone: 'sky' },
  { time: '11:15', text: '312 doorstep UPI payments settled this hour', tone: 'teal' },
  { time: '11:02', text: 'MRF Line 1 baled 1.2 MT OCC cardboard', tone: 'leaf' }
]

export default function Dashboard() {
  const { role, roleInfo, currentUser } = useRole()
  // Default to 'sector' for Admin and Supervisor to showcase the requested live dashboard
  const [activeTab, setActiveTab] = useState('sector')

  const roleBanners = {
    admin: {
      title: 'Administrator Command Oversight',
      desc: 'All 17 municipal modules, 6 zones, and automated IoT sensor grid active.',
      tone: 'border-amber-200 bg-amber-50/80 text-amber-900',
      icon: ShieldCheck,
      actions: [
        { label: 'View KPI Analytics', to: '/kpi' },
        { label: 'System Reports', to: '/reports' },
        { label: 'Platform Settings', to: '/settings' }
      ]
    },
    supervisor: {
      title: 'Field Operations & Sanitary Inspection (Zone 02)',
      desc: 'Ward 04/05/06 beat adherence: 92.4% • 4 Rapid Action Patrols on standby.',
      tone: 'border-emerald-200 bg-emerald-50/80 text-emerald-900',
      icon: UserCheck,
      actions: [
        { label: 'Inspect Route Tracking', to: '/route-tracking' },
        { label: 'Rapid Action Team', to: '/rapid-action-team' },
        { label: 'Grievance Review (46 open)', to: '/complaints' }
      ]
    },
    driver: {
      title: 'Vehicle Operator Console — Tipper MH-12-Q-402',
      desc: 'Assigned Route: Beat W04-01 (Market Road & Sector 4) • Shift status: Active.',
      tone: 'border-sky-200 bg-sky-50/80 text-sky-900',
      icon: Truck,
      actions: [
        { label: 'Open Live Beat Route', to: '/route-tracking' },
        { label: 'Log QR Waste Pickup', to: '/waste-collection' },
        { label: 'Report Road Blockage', to: '/complaints' }
      ]
    },
    user: {
      title: 'Citizen Sanitation Portal — Property W04-B02-8842',
      desc: 'Morning collection vehicle arrived at 07:15 AM • Your segregation rating: 5 Stars.',
      tone: 'border-emerald-200 bg-emerald-50/80 text-emerald-900',
      icon: User,
      actions: [
        { label: 'Check Collection Schedule', to: '/waste-collection' },
        { label: 'Pay User Charges (₹50)', to: '/user-charges' },
        { label: 'Report Litter / Grievance', to: '/complaints' }
      ]
    }
  }

  const banner = roleBanners[role] || roleBanners.admin
  const BannerIcon = banner.icon
  const isCommandRole = role === 'admin' || role === 'supervisor'

  return (
    <DashboardLayout
      title={isCommandRole ? `${roleInfo?.label || 'Command'} Console` : 'City Command Dashboard'}
      subtitle={isCommandRole ? 'Sector-level route telemetry and doorstep segregation intelligence' : 'Live citywide solid waste management overview — updated every 60s'}
    >
      {/* Role-tailored Greeting Banner */}
      <div className="bg-surface border border-border rounded-2xl p-5 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-civic-tealDim border border-civic-teal/30 text-civic-teal flex items-center justify-center shrink-0 shadow-2xs">
            <BannerIcon size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-civic-tealDim text-civic-teal border border-civic-teal/30 font-mono">
                {roleInfo?.label || role} Mode
              </span>
              <span className="text-xs text-ink-muted font-medium">
                Welcome back, <strong className="text-ink">{currentUser?.name || roleInfo?.label}</strong>
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-ink tracking-tight mt-1">
              {banner.title}
            </h2>
            <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
              {banner.desc}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 md:pt-0">
          {banner.actions.map((act) => (
            <Link
              key={act.to}
              to={act.to}
              className="px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-alt border border-border text-xs font-semibold text-ink-muted hover:text-ink transition-all flex items-center gap-1.5 shadow-panel"
            >
              <span>{act.label}</span>
              <ArrowRight size={13} className="text-ink-faint group-hover:text-civic-teal" />
            </Link>
          ))}
        </div>
      </div>

      {/* For Admin and Supervisor: View Switcher Tabs (Sector Live View vs Citywide Overview) */}
      {isCommandRole && (
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-1.5 bg-surface-alt border border-border p-1 rounded-2xl shadow-panel">
            <button
              type="button"
              onClick={() => setActiveTab('sector')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sector'
                  ? 'bg-surface text-civic-teal shadow-panel border border-border'
                  : 'text-ink-muted hover:text-ink hover:bg-surface/50'
              }`}
            >
              <Radio size={14} className={activeTab === 'sector' ? 'text-civic-teal animate-pulse' : 'text-ink-faint'} />
              <span>Sector Live Console</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${activeTab === 'sector' ? 'bg-civic-tealDim text-civic-teal border border-civic-teal/30' : 'bg-surface border border-border text-ink-muted'}`}>
                LIVE
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-surface text-ink shadow-panel border border-border'
                  : 'text-ink-muted hover:text-ink hover:bg-surface/50'
              }`}
            >
              <BarChart3 size={14} className={activeTab === 'overview' ? 'text-civic-teal' : 'text-ink-faint'} />
              <span>Citywide Macro Overview</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-ink-muted font-medium">
            <span className="w-2 h-2 rounded-full bg-civic-teal animate-ping" />
            <span className="font-mono text-[11px]">Real-time Telemetry (1s)</span>
          </div>
        </div>
      )}

      {/* Render Sector Live Dashboard (Default for Admin and Supervisor) */}
      {isCommandRole && activeTab === 'sector' ? (
        <SectorLiveDashboard role={role} />
      ) : (
        /* Render Citywide Overview or Driver/User fallback */
        <div className="space-y-5">

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        <KpiCard label="Live Vehicle Count" value="142" unit="/ 160" tone="sky" icon={Truck} delta="+4 since 09:00" />
        <KpiCard label="Total Waste Collected" value="3,140" unit="MT / today" tone="teal" icon={Recycle} delta="+6.1% vs yesterday" />
        <KpiCard label="Route Completion" value="87.4" unit="%" tone="leaf" icon={RouteIcon} sub="1,142 / 1,306 beats" />
        <KpiCard label="User Charge Collection" value="₹18,42,500" tone="saffron" icon={Wallet} sub="75.2% realization MTD" />
        <KpiCard label="Open Complaints" value="46" tone="rose" icon={MessageSquareWarning} sub="98.4% resolved <24h" />
        <KpiCard label="Wet Waste Share" value="48" unit="%" tone="leaf" icon={Droplets} />
        <KpiCard label="Dry Waste Share" value="34" unit="%" tone="sky" icon={Droplets} />
        <KpiCard label="GPS Active Devices" value="318" unit="/ 330" tone="teal" icon={Satellite} sub="96.4% online" />
        <KpiCard label="CCTV Status" value="142" unit="/ 150" tone="violet" icon={Video} sub="94.7% feeds live" />
        <KpiCard label="Landfill Diversion" value="86.4" unit="%" tone="leaf" icon={Recycle} />
      </div>

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
            {activity.map((a, i) => (
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
      </div>
      )}
    </DashboardLayout>
  )
}
