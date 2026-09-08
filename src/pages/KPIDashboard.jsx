import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import RadarChartCard from '../components/charts/RadarChartCard.jsx'
import DonutChartCard from '../components/charts/DonutChartCard.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { Award } from 'lucide-react'

const radarData = [
  { metric: 'D2D Coverage', value: 92 }, { metric: 'Wet Waste Processing', value: 88 },
  { metric: 'MRF Recovery', value: 84 }, { metric: 'GPS Beat Adherence', value: 96 },
  { metric: 'UCC Recovery', value: 75 }
]

const massBalance = [
  { name: 'Bio-Methanation', value: 48 }, { name: 'MRF Recovery', value: 28 },
  { name: 'RDF', value: 14 }, { name: 'Landfill Inerts', value: 10 }
]

const auditLedger = [
  { rule: 'Doorstep Source Segregation', target: '> 90%', actual: '92.4%', source: 'AI Photo Audit', status: 'Verified' },
  { rule: 'Scientific Landfill Diversion', target: '> 85%', actual: '86.8%', source: 'Weighbridge API', status: 'Verified' },
  { rule: 'GVP Blackspot Elimination', target: '100%', actual: '91.9%', source: 'RAT Ledger', status: 'Pending' },
  { rule: 'BWG In-Situ Processing', target: '> 90%', actual: '95.1%', source: 'BWG Registry', status: 'Verified' },
  { rule: 'Grievance Redressal SLA', target: '< 24 hrs', actual: '98.4%', source: 'Complaints Module', status: 'Verified' }
]

export default function KPIDashboard() {
  return (
    <DashboardLayout title="KPI Dashboard" subtitle="SWM 2026 statutory compliance & Garbage Free City benchmark">
      <SectionCard>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-civic-saffronDim border border-civic-saffron/30 flex items-center justify-center">
              <Award size={22} className="text-civic-saffron" />
            </div>
            <div>
              <div className="text-sm text-ink font-semibold">7-Star Garbage Free City Certification</div>
              <div className="text-xs text-ink-faint">Overall SWM 2026 Compliance Index</div>
            </div>
          </div>
          <div className="text-3xl font-mono font-bold text-civic-leaf">98.4%</div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiCard label="Doorstep Segregation" value="92.4" unit="%" tone="leaf" sub="Mandate > 90%" />
        <KpiCard label="Landfill Diversion" value="86.8" unit="%" tone="teal" sub="Cap on residual < 15%" />
        <KpiCard label="GVP Elimination" value="91.9" unit="%" tone="saffron" sub="68 / 74 remediated" />
        <KpiCard label="BWG In-Situ Processing" value="95.1" unit="%" tone="sky" sub="175 / 184 compliant" />
        <KpiCard label="Grievance SLA <24h" value="98.4" unit="%" tone="leaf" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Ward Compliance Radar" eyebrow="Wards 01–06" className="xl:col-span-2">
          <RadarChartCard data={radarData} />
        </SectionCard>
        <SectionCard title="Circular Economy Mass Balance" eyebrow="Daily Intake Processing">
          <DonutChartCard data={massBalance} />
        </SectionCard>
      </div>

      <SectionCard title="Ward Coverage Progress" eyebrow="Statutory Benchmarks">
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          <ProgressBar label="Ward 01" value={96.4} tone="leaf" />
          <ProgressBar label="Ward 02" value={94.2} tone="leaf" />
          <ProgressBar label="Ward 03" value={89.1} tone="saffron" />
          <ProgressBar label="Ward 04" value={87.5} tone="saffron" />
        </div>
      </SectionCard>

      <SectionCard title="SWM 2026 Statutory Compliance & Audit Ledger" eyebrow="Verification">
        <DataTable
          columns={[
            { key: 'rule', label: 'SWM Rule Mandate' }, { key: 'target', label: 'Target', mono: true },
            { key: 'actual', label: 'Actual', mono: true }, { key: 'source', label: 'Verification Source' },
            { key: 'status', label: 'Certification', statusCol: true }
          ]}
          rows={auditLedger}
        />
      </SectionCard>
    </DashboardLayout>
  )
}
