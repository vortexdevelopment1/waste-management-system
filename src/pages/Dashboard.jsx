import React from 'react'
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
  Satellite, Video, Droplets
} from 'lucide-react'

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
  return (
    <DashboardLayout title="City Command Dashboard" subtitle="Live citywide solid waste management overview — updated every 60s">
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
    </DashboardLayout>
  )
}
