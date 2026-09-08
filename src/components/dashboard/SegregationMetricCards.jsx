import React from 'react'
import { Droplets, Box, Package, Sprout, Cpu, Layers } from 'lucide-react'

export const SEGREGATION_STATS = [
  {
    id: 'wet',
    label: 'Wet',
    fullName: 'Wet Waste',
    desc: 'Kitchen & food organic',
    percentage: 42,
    tonnage: '1,318.8 MT',
    color: '#10B981', // green
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200/80',
    textClass: 'text-emerald-700',
    barClass: 'bg-emerald-500',
    icon: Droplets
  },
  {
    id: 'dry',
    label: 'Dry',
    fullName: 'Dry Recyclable',
    desc: 'Paper, carton & recyclables',
    percentage: 30,
    tonnage: '942.0 MT',
    color: '#3B82F6', // blue
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200/80',
    textClass: 'text-blue-700',
    barClass: 'bg-blue-500',
    icon: Box
  },
  {
    id: 'plastic',
    label: 'Plastic',
    fullName: 'Plastic Waste',
    desc: 'Bottles, bags & polymers',
    percentage: 15,
    tonnage: '471.0 MT',
    color: '#F59E0B', // orange
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200/80',
    textClass: 'text-amber-700',
    barClass: 'bg-amber-500',
    icon: Package
  },
  {
    id: 'organic',
    label: 'Organic',
    fullName: 'Organic Waste',
    desc: 'Horticulture & green mulch',
    percentage: 8,
    tonnage: '251.2 MT',
    color: '#8B5CF6', // purple
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-200/80',
    textClass: 'text-purple-700',
    barClass: 'bg-purple-500',
    icon: Sprout
  },
  {
    id: 'ewaste',
    label: 'E-waste',
    fullName: 'E-waste',
    desc: 'Gadgets, batteries & wiring',
    percentage: 5,
    tonnage: '157.0 MT',
    color: '#EF4444', // red
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-200/80',
    textClass: 'text-rose-700',
    barClass: 'bg-rose-500',
    icon: Cpu
  }
]

export default function SegregationMetricCards({ showHeader = true, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
            <Layers size={14} className="text-civic-teal" />
            Waste Fraction Distribution • Doorstep Segregation
          </span>
          <span className="text-xs font-mono text-ink-muted">
            Total Intake: <strong className="text-ink font-bold">3,140 MT</strong> / Today
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {SEGREGATION_STATS.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="rounded-2xl p-4 border border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card shadow-soft"
            >
              {/* Top Row: Icon + Label + Badge */}
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${item.bgClass} ${item.textClass}`}
                  >
                    <Icon size={14} />
                  </span>
                  <span className="text-xs font-bold text-ink truncate">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${item.bgClass} ${item.textClass}`}
                >
                  {item.percentage}%
                </span>
              </div>

              {/* Big Percentage Number */}
              <div className="mt-2.5 flex items-baseline justify-between">
                <div className="text-2xl font-black font-mono tracking-tight text-ink">
                  {item.percentage}
                  <span className="text-xs font-semibold text-ink-faint ml-0.5">%</span>
                </div>
                <div className="text-[11px] font-mono font-medium text-ink-muted">
                  {item.tonnage}
                </div>
              </div>

              {/* Category Progress Bar */}
              <div className="w-full h-2 rounded-full bg-surface-alt border border-border mt-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.barClass}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              {/* Subtitle */}
              <div className="mt-2 text-[11px] text-ink-muted truncate font-medium">
                {item.desc}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
