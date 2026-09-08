import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import DonutChartCard from '../components/charts/DonutChartCard.jsx'
import LineChartCard from '../components/charts/LineChartCard.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { MessageSquareWarning } from 'lucide-react'

const byCategory = [
  { name: 'Missed Collection', value: 38 }, { name: 'GVP Spillover', value: 22 },
  { name: 'Vehicle Delay', value: 18 }, { name: 'Billing Dispute', value: 14 }, { name: 'Other', value: 8 }
]

const trend = [
  { label: 'Mon', value: 61 }, { label: 'Tue', value: 54 }, { label: 'Wed', value: 47 },
  { label: 'Thu', value: 58 }, { label: 'Fri', value: 63 }, { label: 'Sat', value: 41 }, { label: 'Sun', value: 29 }
]

const tickets = [
  { id: 'CMP-8801', category: 'Missed Collection', ward: 'W04', filed: 'Citizen App', age: '3h', status: 'On Route' },
  { id: 'CMP-8802', category: 'GVP Spillover', ward: 'W02', filed: 'RAT Escalation', age: '11h', status: 'Flagged' },
  { id: 'CMP-8803', category: 'Billing Dispute', ward: 'W05', filed: 'Web Portal', age: '1d', status: 'Pending' },
  { id: 'CMP-8804', category: 'Vehicle Delay', ward: 'W03', filed: 'Citizen App', age: '2h', status: 'Completed' }
]

export default function Complaints() {
  return (
    <DashboardLayout title="Complaint Redressal" subtitle="Citizen grievance intake, SLA tracking & resolution">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Open Complaints" value="46" tone="rose" icon={MessageSquareWarning} />
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

      <SectionCard title="Ticket Register" eyebrow="Live">
        <DataTable
          columns={[
            { key: 'id', label: 'Ticket ID', mono: true }, { key: 'category', label: 'Category' },
            { key: 'ward', label: 'Ward' }, { key: 'filed', label: 'Filed Via' },
            { key: 'age', label: 'Age', mono: true }, { key: 'status', label: 'Status', statusCol: true }
          ]}
          rows={tickets}
        />
      </SectionCard>
    </DashboardLayout>
  )
}
