import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import GisMap from '../components/map/GisMap.jsx'
import BarChartCard from '../components/charts/BarChartCard.jsx'
import { ShieldCheck, Gauge, Clock, MapPin } from 'lucide-react'

const routes = [
  { id: 'BEAT-W04-01', driver: 'Suresh Kumar (DRV-104)', vehicle: 'TRUCK-402', progress: 60.4, length: 4.8, covered: 2.9, eta: '32 min', properties: '82 / 135', adherence: 98.2 },
  { id: 'BEAT-W02-03', driver: 'Anil Bhosale (DRV-118)', vehicle: 'TRUCK-108', progress: 82.6, length: 5.6, covered: 4.6, eta: '11 min', properties: '119 / 144', adherence: 96.0 },
  { id: 'BEAT-W06-02', driver: 'Vikas Pawar (DRV-131)', vehicle: 'TRUCK-221', progress: 71.4, length: 6.1, covered: 4.4, eta: '24 min', properties: '95 / 133', adherence: 91.5 }
]

const houses = [
  { house: 'QR-HSE-W04-0842', address: '12, Lane 4, Ward 04', qr: 'Scanned', weight: '2.4 kg', sync: 'Synced', status: 'Compliant' },
  { house: 'QR-HSE-W04-0851', address: '14, Lane 4, Ward 04', qr: 'Scanned', weight: '3.1 kg', sync: 'Synced', status: 'Compliant' },
  { house: 'QR-HSE-W04-0863', address: '2, Cross St, Ward 04', qr: 'Pending', weight: '—', sync: 'Queued', status: 'Pending' },
  { house: 'QR-HSE-W04-0879', address: '9, Market Rd, Ward 04', qr: 'Failed', weight: '—', sync: 'Retry', status: 'Flagged' }
]

const hourly = [
  { label: '06:00', value: 12 }, { label: '07:00', value: 28 }, { label: '08:00', value: 41 },
  { label: '09:00', value: 33 }, { label: '10:00', value: 22 }, { label: '11:00', value: 14 }
]

export default function RouteTracking() {
  const [active, setActive] = useState(routes[0])

  return (
    <DashboardLayout title="Route Tracking" subtitle="Live beat navigation, vehicle telemetry & QR-verified collection">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Beat Length" value={active.length} unit="km" tone="teal" icon={MapPin} />
        <KpiCard label="Distance Covered" value={active.covered} unit={`km (${active.progress}%)`} tone="sky" icon={Gauge} />
        <KpiCard label="ETA Remaining" value={active.eta} tone="saffron" icon={Clock} />
        <KpiCard label="Route Adherence" value={active.adherence} unit="%" tone="leaf" icon={ShieldCheck} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title={`${active.id} — Live HUD Beat Navigation`} eyebrow="GIS Basemap · sub-10m accuracy" className="xl:col-span-2">
          <GisMap
            center={[18.5204, 73.8567]}
            markers={[
              { lat: 18.5204, lng: 73.8567, status: 'green', label: 'Cleared — QR-HSE-W04-0842' },
              { lat: 18.5221, lng: 73.8589, status: 'yellow', label: 'Next stop — 65m ahead' },
              { lat: 18.5188, lng: 73.8542, status: 'red', label: 'GVP Blackspot flagged' },
              { lat: 18.5240, lng: 73.8601, status: 'blue', label: `${active.vehicle} — live position` }
            ]}
            route={[[18.5170, 73.8520], [18.5204, 73.8567], [18.5221, 73.8589], [18.5240, 73.8601]]}
            height={340}
          />
        </SectionCard>

        <SectionCard title="Active Beats" eyebrow="Select a beat">
          <div className="space-y-2.5">
            {routes.map((r) => (
              <button
                key={r.id}
                onClick={() => setActive(r)}
                className={`w-full text-left rounded-md border p-2.5 transition-colors ${active.id === r.id ? 'border-civic-teal/40 bg-civic-tealDim' : 'border-border bg-surface-alt hover:border-civic-teal/20'}`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-ink">{r.id}</span>
                  <span className="font-mono text-civic-teal">{r.progress}%</span>
                </div>
                <div className="text-[11px] text-ink-muted mt-0.5">{r.driver}</div>
                <div className="text-[11px] text-ink-faint">{r.vehicle} · {r.properties} properties</div>
                <div className="mt-2"><ProgressBar label="Progress" value={r.progress} tone="teal" /></div>
              </button>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Driver & Vehicle Telemetry" eyebrow="Top Status Bar">
          <div className="space-y-2 text-xs">
            <Row k="Driver" v={active.driver} />
            <Row k="Vehicle" v={active.vehicle} />
            <Row k="Collector ID" v="COL-8821" />
            <Row k="Biometric Face-Auth" v="Verified" mono />
            <Row k="GPS Accuracy" v="< 4.2 m" mono />
            <Row k="SOS / Breakdown" v="Ready" mono />
          </div>
        </SectionCard>

        <SectionCard title="Hourly Properties Serviced" eyebrow="Route Completion Analytics" className="xl:col-span-2">
          <BarChartCard data={hourly} color="#22B8A6" />
        </SectionCard>
      </div>

      <SectionCard title="House List — Collection, QR Scan & Sync Status" eyebrow="Beat Service Ledger">
        <DataTable
          columns={[
            { key: 'house', label: 'House ID / QR' }, { key: 'address', label: 'Address' },
            { key: 'qr', label: 'QR Scan', statusCol: true }, { key: 'weight', label: 'Weight Collected', mono: true },
            { key: 'sync', label: 'Sync Status', statusCol: true }, { key: 'status', label: 'Collection Status', statusCol: true }
          ]}
          rows={houses}
        />
      </SectionCard>
    </DashboardLayout>
  )
}

function Row({ k, v, mono }) {
  return (
    <div className="flex items-center justify-between border-b border-border-soft pb-2">
      <span className="text-ink-faint">{k}</span>
      <span className={mono ? 'font-mono text-ink' : 'text-ink'}>{v}</span>
    </div>
  )
}
