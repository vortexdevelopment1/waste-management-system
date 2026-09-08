import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import DonutChartCard from '../components/charts/DonutChartCard.jsx'
import BarChartCard from '../components/charts/BarChartCard.jsx'
import GisMap from '../components/map/GisMap.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { Wallet } from 'lucide-react'

const channelMix = [
  { name: 'UPI / Dynamic QR', value: 62 }, { name: 'Handheld POS', value: 22 },
  { name: 'Doorstep Cash', value: 12 }, { name: 'Web Portal', value: 4 }
]

const hourly = [
  { label: '06:00', value: 210 }, { label: '07:00', value: 480 }, { label: '08:00', value: 720 },
  { label: '09:00', value: 640 }, { label: '10:00', value: 390 }, { label: '11:00', value: 240 }, { label: '12:00', value: 285 }
]

const billing = [
  { id: 'GIS-P-8842', owner: 'R. Deshpande', ward: 'W04 / B02', category: 'Residential', demand: '₹50', paid: '₹50', mode: 'UPI', status: 'Paid' },
  { id: 'GIS-P-8843', owner: 'S. Naik', ward: 'W04 / B02', category: 'Residential', demand: '₹50', paid: '₹0', mode: '—', status: 'Overdue' },
  { id: 'GIS-P-BWG-156', owner: 'Shopping Complex', ward: 'W05 / B01', category: 'Commercial', demand: '₹3,200', paid: '₹0', mode: '—', status: 'Defaulter' },
  { id: 'GIS-P-8845', owner: 'A. Kulkarni', ward: 'W04 / B03', category: 'Residential', demand: '₹50', paid: '₹50', mode: 'POS', status: 'Paid' }
]

export default function UserCharges() {
  return (
    <DashboardLayout title="User Charges Collection" subtitle="UCC billing, doorstep payment & defaulter tracking">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiCard label="Total Billed Demand" value="₹24,50,000" tone="saffron" icon={Wallet} sub="49,000 properties" />
        <KpiCard label="Realized MTD" value="₹18,42,500" tone="leaf" sub="75.2% realization" />
        <KpiCard label="Collected Today" value="₹1,48,250" tone="teal" sub="2,965 transactions" />
        <KpiCard label="Defaulter Arrears" value="₹6,07,500" tone="rose" sub="12,150 accounts" />
        <KpiCard label="POS Terminals Online" value="14" unit="/ 14" tone="sky" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Property Realization & Defaulter Heatmap" eyebrow="GIS Street-Level" className="xl:col-span-2">
          <GisMap
            center={[18.5210, 73.8560]}
            markers={[
              { lat: 18.5204, lng: 73.8567, status: 'green', label: 'Paid — ₹50/month' },
              { lat: 18.5188, lng: 73.8542, status: 'red', label: 'Overdue arrears' },
              { lat: 18.5305, lng: 73.8530, status: 'blue', label: 'BWG commercial account' },
              { lat: 18.5240, lng: 73.8601, status: 'green', label: 'Paid — ₹50/month' }
            ]}
            height={300}
          />
        </SectionCard>
        <SectionCard title="Payment Channel Mix" eyebrow="Distribution">
          <DonutChartCard data={channelMix} />
        </SectionCard>
      </div>

      <SectionCard title="Hourly Collection Velocity" eyebrow="06:00 – 12:00">
        <BarChartCard data={hourly} color="#EFA23D" />
      </SectionCard>

      <SectionCard title="Property Billing & E-Receipt Ledger" eyebrow="Live Register">
        <DataTable
          columns={[
            { key: 'id', label: 'GIS Property ID', mono: true }, { key: 'owner', label: 'Owner / Resident' },
            { key: 'ward', label: 'Ward / Block' }, { key: 'category', label: 'Category' },
            { key: 'demand', label: 'Monthly Demand', mono: true }, { key: 'paid', label: 'Amount Paid', mono: true },
            { key: 'mode', label: 'Mode' }, { key: 'status', label: 'Status', statusCol: true }
          ]}
          rows={billing}
        />
      </SectionCard>
    </DashboardLayout>
  )
}
