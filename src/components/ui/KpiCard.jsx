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

export default function KpiCard({ label, value, unit, delta, deltaTone = 'up', tone = 'default', sub, icon: Icon }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wide text-ink-faint truncate">{label}</span>
        {Icon && <Icon size={15} className="text-ink-faint shrink-0" />}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={cx('text-2xl font-semibold tabular font-mono', TONES[tone])}>{value}</span>
        {unit && <span className="text-xs text-ink-muted">{unit}</span>}
      </div>
      {(sub || delta) && (
        <div className="flex items-center justify-between text-xs">
          {sub && <span className="text-ink-faint truncate">{sub}</span>}
          {delta && (
            <span className={cx('font-medium', deltaTone === 'up' ? 'text-civic-leaf' : deltaTone === 'down' ? 'text-civic-rose' : 'text-ink-muted')}>
              {delta}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
