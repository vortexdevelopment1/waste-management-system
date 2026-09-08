import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { FileDown, FileSpreadsheet, RefreshCw, FileText } from 'lucide-react'

const catalog = [
  'Form-IV Annual SWM Filing',
  'Daily Inward / Outward Mass Balance & Landfill Diversion Audit',
  'Door-to-Door Source Segregation Purity Index',
  'GVP Blackspot Elimination & Transformation Certifications',
  'Bulk Waste Generator On-Site Treatment & Fee Compliance',
  'User Charge Collection Realization & Defaulter Audit',
  'Plastic Waste Management (PWM) & EPR Circularity Ledger'
]

const filings = [
  { id: 'RPT-2026-0901', title: 'Daily Mass Balance Audit', freq: 'Daily', generated: '08 Sep 2026, 06:00', officer: 'JE-08 A. Khan', sync: 'Verified' },
  { id: 'RPT-2026-0731', title: 'Form-IV Annual Filing', freq: 'Annual', generated: '31 Jul 2026, 18:20', officer: 'ZHO R. Menon', sync: 'Verified' },
  { id: 'RPT-2026-0830', title: 'UCC Realization & Defaulter Audit', freq: 'Monthly', generated: '30 Aug 2026, 21:05', officer: 'MHO S. Iyer', sync: 'Pending' }
]

export default function Reports() {
  const [selected, setSelected] = useState(catalog[0])

  return (
    <DashboardLayout title="Reports" subtitle="Statutory filings — SBM / CPCB national portal integration">
      <SectionCard>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm text-ink font-semibold">7-Star GFC Certification · SWM 2026 Compliance Index</div>
            <div className="text-2xl font-mono font-bold text-civic-leaf mt-1">98.4%</div>
          </div>
          <div className="flex gap-2">
            <ActionBtn icon={RefreshCw} label="Sync to SBM / CPCB" />
            <ActionBtn icon={FileText} label="Generate Master Audit PDF" />
            <ActionBtn icon={FileSpreadsheet} label="Download .xlsx" />
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Statutory Report Catalog" eyebrow="SWM Rules 2026">
          <div className="space-y-1.5">
            {catalog.map((c) => (
              <button
                key={c}
                onClick={() => setSelected(c)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs border ${selected === c ? 'border-civic-teal/40 bg-civic-tealDim text-civic-teal' : 'border-transparent text-ink-muted hover:bg-surface-alt'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title={selected} eyebrow="Executive Scorecard Preview" className="xl:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <Metric label="Landfill Diversion" value="86.8%" />
            <Metric label="Doorstep Segregation" value="92.4%" />
            <Metric label="GVP Remediation" value="91.9%" />
            <Metric label="BWG In-Situ Processing" value="95.1%" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-ink-faint border-t border-border-soft pt-3">
            <FileDown size={13} /> Digitally signed by Zonal Health Officer (ZHO) & Municipal Health Officer (MHO)
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Statutory Filing History & Submission Ledger" eyebrow="SPCB Sync">
        <DataTable
          columns={[
            { key: 'id', label: 'Report ID', mono: true }, { key: 'title', label: 'Title' },
            { key: 'freq', label: 'Frequency' }, { key: 'generated', label: 'Generated', mono: true },
            { key: 'officer', label: 'Authorized Officer' }, { key: 'sync', label: 'SPCB Sync', statusCol: true }
          ]}
          rows={filings}
        />
      </SectionCard>
    </DashboardLayout>
  )
}

function ActionBtn({ icon: Icon, label }) {
  return (
    <button className="flex items-center gap-1.5 border border-border bg-surface-alt hover:border-civic-teal/30 text-ink-muted hover:text-ink text-[11px] rounded-md px-2.5 py-1.5">
      <Icon size={13} /> {label}
    </button>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-md border border-border bg-surface-alt p-3">
      <div className="text-ink-faint text-[11px]">{label}</div>
      <div className="text-lg font-mono text-civic-leaf font-semibold mt-1">{value}</div>
    </div>
  )
}
