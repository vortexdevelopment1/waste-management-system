import React from 'react'
import { cx } from '../../utils/format'

const TONES = {
  teal: 'text-civic-teal',
  saffron: 'text-civic-saffron',
  leaf: 'text-civic-leaf',
  sky: 'text-civic-sky',
  rose: 'text-civic-rose',
  violet: 'text-civic-violet',
  default: 'text-ink'
}

const ICON_TONES = {
  teal: 'bg-civic-tealDim text-civic-teal border-civic-teal/20',
  leaf: 'bg-civic-leafDim text-civic-leaf border-civic-leaf/20',
  sky: 'bg-civic-skyDim text-civic-sky border-civic-sky/20',
  saffron: 'bg-civic-saffronDim text-civic-saffron border-civic-saffron/20',
  rose: 'bg-civic-roseDim text-civic-rose border-civic-rose/20',
  violet: 'bg-purple-50 text-purple-600 border-purple-200',
  default: 'bg-surface-alt text-ink-muted border-border'
}

export default function KpiCard({ label, value, unit, delta, deltaTone = 'up', tone = 'default', sub, icon: Icon }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col justify-between gap-2 min-w-0 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted truncate">{label}</span>
        {Icon && (
          <div className={cx('w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs', ICON_TONES[tone] || ICON_TONES.default)}>
            <Icon size={14} className="stroke-[2.2]" />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={cx('text-2xl font-black tabular font-mono tracking-tight', tone === 'default' ? 'text-ink' : TONES[tone])}>
          {value}
        </span>
        {unit && <span className="text-xs text-ink-muted font-medium">{unit}</span>}
      </div>
      {(sub || delta) && (
        <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
          {sub && <span className="text-[11px] text-ink-muted truncate">{sub}</span>}
          {delta && (
            <span className={cx('font-semibold text-xs ml-auto', deltaTone === 'up' ? 'text-civic-leaf' : deltaTone === 'down' ? 'text-civic-rose' : 'text-ink-muted')}>
              {delta}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
