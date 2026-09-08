import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { useRole } from '../hooks/useRole.js'
import { ROLES } from '../data/roles.js'

export default function Settings() {
  const { role, setRole } = useRole()
  return (
    <DashboardLayout title="Settings" subtitle="Platform configuration, roles & integrations">
      <SectionCard title="Active Role (Prototype Switcher)" eyebrow="Access Control">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.values(ROLES).map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`text-left rounded-md border p-3 ${role === r.id ? 'border-civic-teal/40 bg-civic-tealDim' : 'border-border bg-surface-alt'}`}
            >
              <div className="text-xs font-medium text-ink">{r.label}</div>
              <div className="text-[11px] text-ink-faint mt-1">{r.description}</div>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Integrations" eyebrow="Read-only in this prototype">
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          {[
            'Weighbridge Load-Cell API', 'ANPR / RFID Gate Readers', 'SBM / CPCB National Portal Sync',
            'CCTV / AI Vision Provider', 'UPI / Bharat QR Payment Gateway', 'Face-Auth Biometric Attendance'
          ].map((i) => (
            <div key={i} className="flex items-center justify-between border border-border bg-surface-alt rounded-md px-3 py-2.5">
              <span className="text-ink-muted">{i}</span>
              <span className="text-civic-leaf text-[11px] font-mono">Connected</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="About this Prototype" eyebrow="Frontend-only demonstration">
        <p className="text-xs text-ink-muted leading-relaxed">
          This is a frontend-only MVP built from the Smart Waste Management System documentation.
          All figures shown are illustrative mock data wired to the documented KPIs and workflows —
          no backend, authentication, or live IoT feed is connected. See the architecture document
          delivered alongside this project for the full page-by-page breakdown and API contracts to
          implement when wiring up a real backend.
        </p>
      </SectionCard>
    </DashboardLayout>
  )
}
