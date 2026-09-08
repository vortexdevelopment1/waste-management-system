import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout.jsx'
import SectionCard from '../ui/SectionCard.jsx'
import KpiCard from '../ui/KpiCard.jsx'
import PhotoAuditCard from '../ui/PhotoAuditCard.jsx'
import DataTable from '../ui/DataTable.jsx'
import ProgressBar from '../ui/ProgressBar.jsx'
import GisMap from '../map/GisMap.jsx'
import BarChartCard from '../charts/BarChartCard.jsx'
import DonutChartCard from '../charts/DonutChartCard.jsx'

/**
 * Every "operations module" documented in the source (BWG, Transfer
 * Station, MRF, RAT, Weighbridge, Street Sweeping, Drain Desilting…)
 * repeats the same architecture: telemetry KPI header -> GIS map +
 * photo-audit workstation -> stream/analytics gauges -> ledger grid.
 * Rather than hand-building 10 near-identical pages, one config-driven
 * template renders all of them — new modules are added by data, not code.
 */
export default function ModulePageTemplate({ config, children }) {
  const { title, subtitle, kpis, map, photos, progress, chart, table } = config

  return (
    <DashboardLayout title={title} subtitle={subtitle}>
      {children}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title={map.title} eyebrow="GIS Basemap" className="xl:col-span-2">
          <GisMap markers={map.markers} route={map.route} center={map.center} height={320} />
        </SectionCard>

        <SectionCard title={photos.title} eyebrow="Photographic Audit">
          <div className="grid grid-cols-2 gap-2.5">
            {photos.items.map((p) => <PhotoAuditCard key={p.label} {...p} />)}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {chart && (
          <SectionCard title={chart.title} eyebrow="Analytics" className="xl:col-span-2">
            {chart.type === 'bar'
              ? <BarChartCard data={chart.data} color={chart.color} />
              : <DonutChartCard data={chart.data} />}
          </SectionCard>
        )}
        {progress && (
          <SectionCard title={progress.title} eyebrow="Coverage">
            <div className="space-y-4">
              {progress.items.map((p) => <ProgressBar key={p.label} {...p} />)}
            </div>
          </SectionCard>
        )}
      </div>

      <SectionCard title={table.title} eyebrow="Ledger">
        <DataTable columns={table.columns} rows={table.rows} />
      </SectionCard>
    </DashboardLayout>
  )
}
