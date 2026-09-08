import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import PhotoAuditCard from '../components/ui/PhotoAuditCard.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { QrCode, MapPin, Clock, CheckCircle2, Flag } from 'lucide-react'

const categories = [
  { id: 'wet', label: 'Wet', tone: 'leaf' },
  { id: 'dry', label: 'Dry', tone: 'sky' },
  { id: 'mixed', label: 'Mixed', tone: 'saffron' },
  { id: 'hazardous', label: 'Hazardous', tone: 'rose' },
  { id: 'sanitary', label: 'Sanitary', tone: 'violet' },
  { id: 'ewaste', label: 'E-Waste', tone: 'teal' }
]

const recent = [
  { house: 'QR-HSE-W04-0842', category: 'Wet / Dry', time: '08:24:12', ucc: 'Paid', status: 'Completed' },
  { house: 'QR-HSE-W04-0851', category: 'Dry', time: '08:27:40', ucc: 'Paid', status: 'Completed' },
  { house: 'QR-HSE-W04-0863', category: 'Mixed', time: '08:31:02', ucc: 'Overdue', status: 'Flagged' },
  { house: 'QR-HSE-W04-0879', category: '—', time: '—', ucc: 'Paid', status: 'Pending' }
]

export default function WasteCollection() {
  const [selected, setSelected] = useState(['wet', 'dry'])

  function toggle(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  return (
    <DashboardLayout title="Waste Collection" subtitle="Door-to-Door (D2D) property collection workstation">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Scan Entrance QR Code" eyebrow="Property Lookup" className="xl:col-span-1">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg py-10 gap-3">
            <QrCode size={40} className="text-civic-teal" />
            <p className="text-xs text-ink-muted text-center px-4">Point the device camera at the embedded gate QR plaque to auto-pull the billing record.</p>
            <span className="text-[11px] font-mono text-ink-faint">Awaiting scan…</span>
          </div>
        </SectionCard>

        <SectionCard title="Active Property Details" eyebrow="Auto-populated from QR-HSE-W04-0842" className="xl:col-span-2">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-xs mb-4">
            <Row k="Generator Category" v="Residential" />
            <Row k="Address" v="12, Lane 4, Ward 04" />
            <Row k="House / QR ID" v="QR-HSE-W04-0842" mono />
            <Row k="User Charge (UCC)" v="Paid — ₹50.00" />
            <Row k="GPS Coordinates" v="18.5204°N, 73.8567°E" mono />
            <Row k="Timestamp" v="08:24:12 IST" mono />
          </div>

          <p className="text-[11px] uppercase tracking-wide text-ink-faint mb-2">Waste Category Selection</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                  selected.includes(c.id)
                    ? 'border-civic-teal/40 bg-civic-tealDim text-civic-teal'
                    : 'border-border bg-surface-alt text-ink-muted hover:text-ink'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl py-2.5 shadow-sm transition-colors cursor-pointer">
              <CheckCircle2 size={14} /> Confirm Collection (Save &amp; Next)
            </button>
            <button className="flex items-center justify-center gap-2 border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium text-xs rounded-xl px-4 transition-colors cursor-pointer">
              <Flag size={14} /> Flag Issue / Refused
            </button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Mandatory Photo Upload Audit" eyebrow="GPS + Timestamp Watermarked">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <PhotoAuditCard label="Wet Waste Photo" tone="leaf" note="96% Purity Grade A" gps="18.5204°N 73.8567°E" time="08:24:12" />
          <PhotoAuditCard label="Dry Waste Photo" tone="sky" note="94% Recyclable" gps="18.5204°N 73.8567°E" time="08:24:12" />
          <PhotoAuditCard label="Mixed Waste Photo" tone="saffron" note="Optional — only if present" gps="—" time="—" />
        </div>
      </SectionCard>

      <SectionCard title="Recent Collections" eyebrow="Beat Service Ledger">
        <DataTable
          columns={[
            { key: 'house', label: 'House ID / QR' }, { key: 'category', label: 'Waste Category' },
            { key: 'time', label: 'Collection Time', mono: true }, { key: 'ucc', label: 'UCC Status', statusCol: true },
            { key: 'status', label: 'Status', statusCol: true }
          ]}
          rows={recent}
        />
      </SectionCard>
    </DashboardLayout>
  )
}

function Row({ k, v, mono }) {
  return (
    <div className="flex items-center justify-between border-b border-border-soft pb-1.5">
      <span className="text-ink-faint flex items-center gap-1.5">{k}</span>
      <span className={mono ? 'font-mono text-ink' : 'text-ink'}>{v}</span>
    </div>
  )
}
