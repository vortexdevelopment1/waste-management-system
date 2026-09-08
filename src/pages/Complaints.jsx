import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import DonutChartCard from '../components/charts/DonutChartCard.jsx'
import LineChartCard from '../components/charts/LineChartCard.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { MessageSquareWarning, PlusCircle, CheckCircle2, AlertTriangle, Send } from 'lucide-react'
import { useRole } from '../hooks/useRole.js'

const byCategory = [
  { name: 'Missed Collection', value: 38 }, { name: 'GVP Spillover', value: 22 },
  { name: 'Vehicle Delay', value: 18 }, { name: 'Billing Dispute', value: 14 }, { name: 'Other', value: 8 }
]

const trend = [
  { label: 'Mon', value: 61 }, { label: 'Tue', value: 54 }, { label: 'Wed', value: 47 },
  { label: 'Thu', value: 58 }, { label: 'Fri', value: 63 }, { label: 'Sat', value: 41 }, { label: 'Sun', value: 29 }
]

const initialTickets = [
  { id: 'CMP-8801', category: 'Missed Collection', ward: 'W04', filed: 'Citizen App', age: '3h', status: 'On Route' },
  { id: 'CMP-8802', category: 'GVP Spillover', ward: 'W02', filed: 'RAT Escalation', age: '11h', status: 'Flagged' },
  { id: 'CMP-8803', category: 'Billing Dispute', ward: 'W05', filed: 'Web Portal', age: '1d', status: 'Pending' },
  { id: 'CMP-8804', category: 'Vehicle Delay', ward: 'W03', filed: 'Citizen App', age: '2h', status: 'Completed' }
]

export default function Complaints() {
  const { role, roleInfo, currentUser } = useRole()
  const [tickets, setTickets] = useState(initialTickets)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [category, setCategory] = useState('Missed Collection')
  const [ward, setWard] = useState('W04')
  const [description, setDescription] = useState('')

  function handleSubmitComplaint(e) {
    e.preventDefault()
    if (!description.trim()) return

    const newTicket = {
      id: `CMP-${Math.floor(8805 + Math.random() * 1000)}`,
      category,
      ward,
      filed: `${roleInfo?.label || 'Citizen'} (${currentUser?.name || 'User'})`,
      age: 'Just now',
      status: 'Pending'
    }

    setTickets([newTicket, ...tickets])
    setSubmitted(true)
    setDescription('')
    setTimeout(() => {
      setSubmitted(false)
      setShowForm(false)
    }, 2500)
  }

  return (
    <DashboardLayout
      title="Complaint Redressal & Grievance Portal"
      subtitle={`Citizen grievance intake, SLA tracking & resolution — ${roleInfo?.label || 'Role'} Mode`}
    >
      {/* Top Banner with Action for User / Driver / Supervisor */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-surface-alt">
        <div>
          <h2 className="text-sm font-bold text-ink">
            Grievance Redressal Center ({roleInfo?.label})
          </h2>
          <p className="text-xs text-ink-muted mt-0.5">
            {role === 'user'
              ? 'Lodge a complaint regarding doorstep waste collection, billing, or street cleanliness.'
              : role === 'driver'
              ? 'Report road blockages, vehicle breakdown, or route access issues to dispatch.'
              : 'Monitor citywide grievance SLA compliance, dispatch RAT, and resolve tickets.'}
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3.5 py-2 bg-civic-teal text-surface font-semibold text-xs rounded-lg hover:bg-civic-teal/90 transition-all flex items-center gap-1.5 shrink-0 shadow-md"
        >
          <PlusCircle size={15} />
          <span>{showForm ? 'Close Form' : 'Lodge New Grievance'}</span>
        </button>
      </div>

      {/* New Complaint Intake Form (Modal / Collapsible) */}
      {showForm && (
        <SectionCard title="Submit New Grievance Ticket" eyebrow="Intake Form" className="border-civic-teal/40">
          {submitted ? (
            <div className="p-4 bg-civic-leafDim/40 border border-civic-leaf/40 rounded-xl text-center text-xs text-civic-leaf font-medium flex items-center justify-center gap-2">
              <CheckCircle2 size={18} />
              <span>Grievance Ticket Created Successfully! Track status in the register below.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1">
                    Grievance Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface-alt border border-border rounded-lg p-2 text-xs text-ink focus:border-civic-teal focus:outline-none"
                  >
                    <option>Missed Collection</option>
                    <option>GVP Spillover / Illegal Dumping</option>
                    <option>Vehicle Delay / Non-arrival</option>
                    <option>Billing / User Charge Dispute</option>
                    <option>Road Blockage / Route Obstruction</option>
                    <option>Sanitation Staff Conduct</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1">
                    Ward Location
                  </label>
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full bg-surface-alt border border-border rounded-lg p-2 text-xs text-ink focus:border-civic-teal focus:outline-none"
                  >
                    <option value="W01">Ward 01 — Market Zone</option>
                    <option value="W02">Ward 02 — Central Avenue</option>
                    <option value="W03">Ward 03 — Railway Station Area</option>
                    <option value="W04">Ward 04 — Residential Sector 4</option>
                    <option value="W05">Ward 05 — Industrial Park</option>
                    <option value="W06">Ward 06 — South Belt</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1">
                  Issue Description & Location Details
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide property details, landmark, or specific grievance description…"
                  className="w-full bg-surface-alt border border-border rounded-lg p-2 text-xs text-ink focus:border-civic-teal focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-1.5 border border-border text-xs rounded-lg text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-civic-teal text-surface text-xs font-semibold rounded-lg hover:bg-civic-teal/90 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send size={13} />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          )}
        </SectionCard>
      )}

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Open Complaints" value={`${tickets.length}`} tone="rose" icon={MessageSquareWarning} />
        <KpiCard label="Resolved <24h" value="98.4" unit="%" tone="leaf" />
        <KpiCard label="Avg. Resolution Time" value="6.2" unit="hrs" tone="sky" />
        <KpiCard label="Repeat Complaints" value="3.1" unit="%" tone="saffron" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Complaints — 7 Day Trend" eyebrow="Volume" className="xl:col-span-2">
          <LineChartCard data={trend} color="#E96A6A" />
        </SectionCard>
        <SectionCard title="By Category" eyebrow="Distribution">
          <DonutChartCard data={byCategory} />
        </SectionCard>
      </div>

      <SectionCard title="Live Ticket Register" eyebrow="Grievance Ledger">
        <DataTable
          columns={[
            { key: 'id', label: 'Ticket ID', mono: true },
            { key: 'category', label: 'Category' },
            { key: 'ward', label: 'Ward' },
            { key: 'filed', label: 'Filed Via / User' },
            { key: 'age', label: 'Age', mono: true },
            { key: 'status', label: 'Status', statusCol: true }
          ]}
          rows={tickets}
        />
      </SectionCard>
    </DashboardLayout>
  )
}
