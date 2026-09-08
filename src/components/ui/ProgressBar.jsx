import React from 'react'
import { cx } from '../../utils/format'

const TONES = {
  teal: 'bg-civic-teal',
  saffron: 'bg-civic-saffron',
  leaf: 'bg-civic-leaf',
  sky: 'bg-civic-sky',
  rose: 'bg-civic-rose'
}

export default function ProgressBar({ label, value, max = 100, tone = 'teal', suffix = '%' }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-ink-muted">{label}</span>
        <span className="font-mono text-ink font-bold tabular">{value}{suffix}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-surface-alt border border-border overflow-hidden">
        <div className={cx('h-full rounded-full transition-all duration-500', TONES[tone])} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
