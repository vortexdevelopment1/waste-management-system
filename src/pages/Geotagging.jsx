import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import GisMap from '../components/map/GisMap.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { MapPin, Camera } from 'lucide-react'

const TABS = ['Zone Boundary', 'Ward Boundary', 'Block Boundary', 'Route Mapping']

const taggingTypes = [
  { label: 'Residential Tagging', count: 8420 },
  { label: 'Commercial Tagging', count: 1284 },
  { label: 'Institutional Tagging', count: 312 },
  { label: 'GVP Tagging', count: 74 },
  { label: 'Bulk Waste Generator Tagging', count: 184 }
]

const surveyLedger = [
  { id: 'GIS-Z04-021', type: 'Zone Boundary', name: 'Zone 04 — BEAT-W04', surveyor: 'S. Deshmukh', accuracy: '3.8 m', status: 'Verified' },
  { id: 'GIS-W02-014', type: 'Ward Boundary', name: 'Ward 02', surveyor: 'A. Kulkarni', accuracy: '4.1 m', status: 'Verified' },
  { id: 'GIS-BWG-156', type: 'BWG Tagging', name: 'Shopping Complex', surveyor: 'S. Deshmukh', accuracy: '2.9 m', status: 'Pending' },
  { id: 'GIS-RT-0033', type: 'Route Mapping', name: 'BEAT-W06-02', surveyor: 'R. Iyer', accuracy: '3.2 m', status: 'Verified' }
]

export default function Geotagging() {
  const [tab, setTab] = useState(TABS[0])

  return (
    <DashboardLayout title="Geotagging" subtitle="GIS basemap surveying — sub-10m accuracy field data capture">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Interactive GIS Basemap" eyebrow="City Name — Ward 04" className="xl:col-span-2">
          <GisMap
            center={[18.5204, 73.8567]}
            markers={[
              { lat: 18.5204, lng: 73.8567, status: 'blue', label: 'Zone 04 start point (1A)' },
              { lat: 18.5240, lng: 73.8601, status: 'green', label: 'Centre landmark (2A)' },
              { lat: 18.5188, lng: 73.8542, status: 'red', label: 'GVP tagged blackspot' },
              { lat: 18.5305, lng: 73.8530, status: 'yellow', label: 'BWG-0156 tagged, pending photo' }
            ]}
            height={340}
          />
        </SectionCard>

        <SectionCard title="Surveyor Questionnaire" eyebrow="Field Capture">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] border ${tab === t ? 'border-civic-teal/40 bg-civic-tealDim text-civic-teal' : 'border-border text-ink-muted'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="space-y-3 text-xs">
            <Field label={`${tab.split(' ')[0]} No. / Name`} placeholder="e.g. 04" />
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface-alt px-2.5 py-2 text-ink-muted">
              <MapPin size={13} className="text-civic-teal" /> Start / End Point — tap map to tag latlong
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface-alt px-2.5 py-2 text-ink-muted">
              <Camera size={13} className="text-civic-saffron" /> Start Point Photo — appears after tagging
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface-alt px-2.5 py-2 text-ink-muted">
              <MapPin size={13} className="text-civic-sky" /> Landmark / Centre Point
            </div>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl py-2.5 mt-1 shadow-sm transition-colors cursor-pointer">
              Save Tagging
            </button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Tagging Coverage by Type" eyebrow="Zone · Ward · Route · Property">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {taggingTypes.map((t) => (
            <div key={t.label} className="rounded-md border border-border bg-surface-alt p-3">
              <div className="text-lg font-mono font-semibold text-civic-teal">{t.count.toLocaleString('en-IN')}</div>
              <div className="text-[11px] text-ink-muted mt-1">{t.label}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Field Survey Ledger" eyebrow="Verification Status">
        <DataTable
          columns={[
            { key: 'id', label: 'GIS ID', mono: true }, { key: 'type', label: 'Tagging Type' },
            { key: 'name', label: 'Name / Reference' }, { key: 'surveyor', label: 'Surveyor' },
            { key: 'accuracy', label: 'Accuracy', mono: true }, { key: 'status', label: 'Status', statusCol: true }
          ]}
          rows={surveyLedger}
        />
      </SectionCard>
    </DashboardLayout>
  )
}

function Field({ label, placeholder }) {
  return (
    <label className="block">
      <span className="text-ink-faint text-[11px]">{label}</span>
      <input
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-border bg-surface-alt px-2.5 py-1.5 text-ink text-xs placeholder:text-ink-faint focus:outline-none focus:border-civic-teal/50"
      />
    </label>
  )
}
