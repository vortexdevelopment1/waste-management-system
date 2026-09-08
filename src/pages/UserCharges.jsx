import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import DonutChartCard from '../components/charts/DonutChartCard.jsx'
import BarChartCard from '../components/charts/BarChartCard.jsx'
import GisMap from '../components/map/GisMap.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { Wallet, CheckCircle2, Download, CreditCard, ShieldCheck, QrCode } from 'lucide-react'
import { useRole } from '../hooks/useRole.js'

const channelMix = [
  { name: 'UPI / Dynamic QR', value: 62 }, { name: 'Handheld POS', value: 22 },
  { name: 'Doorstep Cash', value: 12 }, { name: 'Web Portal', value: 4 }
]

const hourly = [
  { label: '06:00', value: 210 }, { label: '07:00', value: 480 }, { label: '08:00', value: 720 },
  { label: '09:00', value: 640 }, { label: '10:00', value: 390 }, { label: '11:00', value: 240 }, { label: '12:00', value: 285 }
]

const billing = [
  { id: 'GIS-P-8842', owner: 'Ananya Deshmukh', ward: 'W04 / B02', category: 'Residential', demand: '₹50', paid: '₹50', mode: 'UPI', status: 'Paid' },
  { id: 'GIS-P-8843', owner: 'S. Naik', ward: 'W04 / B02', category: 'Residential', demand: '₹50', paid: '₹0', mode: '—', status: 'Overdue' },
  { id: 'GIS-P-BWG-156', owner: 'Shopping Complex', ward: 'W05 / B01', category: 'Commercial', demand: '₹3,200', paid: '₹0', mode: '—', status: 'Defaulter' },
  { id: 'GIS-P-8845', owner: 'A. Kulkarni', ward: 'W04 / B03', category: 'Residential', demand: '₹50', paid: '₹50', mode: 'POS', status: 'Paid' }
]

export default function UserCharges() {
  const { role, roleInfo, currentUser } = useRole()
  const [userPaid, setUserPaid] = useState(false)

  // Citizen / User Specific View
  if (role === 'user') {
    return (
      <DashboardLayout title="My User Charges & Billing" subtitle="Property ID: W04-B02-8842 — Citizen Payment Portal">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <SectionCard title="My Property Sanitation Bill" eyebrow="Property ID: W04-B02-8842" className="xl:col-span-2">
            <div className="p-4 bg-surface-alt border border-border rounded-xl space-y-4">
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-ink-faint">Property Owner:</span>
                  <div className="font-semibold text-ink text-sm mt-0.5">{currentUser?.name || 'Ananya Deshmukh'}</div>
                </div>
                <div>
                  <span className="text-ink-faint">Ward & Beat:</span>
                  <div className="font-semibold text-ink text-sm mt-0.5">Ward 04 / Beat 02</div>
                </div>
                <div>
                  <span className="text-ink-faint">Billing Month:</span>
                  <div className="font-mono text-ink mt-0.5">August 2026</div>
                </div>
                <div>
                  <span className="text-ink-faint">Due Date:</span>
                  <div className="font-mono text-civic-saffron font-medium mt-0.5">15 Sep 2026</div>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-ink-muted">Monthly Solid Waste User Charge</div>
                  <div className="text-2xl font-bold font-mono text-ink">₹50.00</div>
                </div>

                <div className="text-right">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-mono font-semibold border ${
                    userPaid ? 'bg-civic-leafDim text-civic-leaf border-civic-leaf/40' : 'bg-civic-saffronDim text-civic-saffron border-civic-saffron/40'
                  }`}>
                    {userPaid ? 'Settled & Verified' : 'Pending Payment'}
                  </span>
                </div>
              </div>

              {userPaid ? (
                <div className="p-4 bg-civic-leafDim/30 border border-civic-leaf/40 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-civic-leaf">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    <div>
                      <div className="font-bold">Payment Verified (Receipt #REC-2026-8842)</div>
                      <div className="text-[11px] opacity-80">Paid via BHIM UPI on {new Date().toLocaleDateString('en-IN')}</div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-civic-leaf text-surface rounded-lg font-semibold flex items-center gap-1.5 hover:bg-civic-leaf/90 transition-colors">
                    <Download size={13} /> Download PDF Receipt
                  </button>
                </div>
              ) : (
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setUserPaid(true)}
                    className="flex-1 py-3 px-4 bg-civic-leaf text-surface font-semibold text-xs rounded-xl hover:bg-civic-leaf/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-civic-leaf/20"
                  >
                    <QrCode size={16} /> Pay ₹50 via Dynamic UPI QR
                  </button>
                  <button
                    onClick={() => setUserPaid(true)}
                    className="flex-1 py-3 px-4 bg-surface-alt border border-border text-ink hover:text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard size={16} /> NetBanking / Card
                  </button>
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Payment Receipt History" eyebrow="Verified Ledger">
            <div className="space-y-3">
              <div className="p-3 bg-surface-alt border border-border rounded-lg text-xs flex justify-between items-center">
                <div>
                  <div className="font-semibold text-ink">July 2026 Sanitary Charge</div>
                  <div className="text-ink-faint text-[10px]">Paid 12 Jul 2026 • UPI</div>
                </div>
                <div className="text-right font-mono font-semibold text-civic-leaf">₹50 (Paid)</div>
              </div>

              <div className="p-3 bg-surface-alt border border-border rounded-lg text-xs flex justify-between items-center">
                <div>
                  <div className="font-semibold text-ink">June 2026 Sanitary Charge</div>
                  <div className="text-ink-faint text-[10px]">Paid 10 Jun 2026 • POS Handheld</div>
                </div>
                <div className="text-right font-mono font-semibold text-civic-leaf">₹50 (Paid)</div>
              </div>

              <div className="p-3 bg-surface-alt border border-border rounded-lg text-xs flex justify-between items-center">
                <div>
                  <div className="font-semibold text-ink">May 2026 Sanitary Charge</div>
                  <div className="text-ink-faint text-[10px]">Paid 08 May 2026 • Cash</div>
                </div>
                <div className="text-right font-mono font-semibold text-civic-leaf">₹50 (Paid)</div>
              </div>
            </div>
          </SectionCard>
        </div>
      </DashboardLayout>
    )
  }

  // Admin / Supervisor View
  return (
    <DashboardLayout title="User Charges Collection (Admin/Supervisor)" subtitle="UCC billing, doorstep payment & defaulter tracking">
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
