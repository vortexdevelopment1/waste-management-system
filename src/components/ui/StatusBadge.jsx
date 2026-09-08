import React from 'react'
import { cx } from '../../utils/format'

const MAP = {
  compliant: 'bg-civic-leafDim text-civic-leaf border-civic-leaf/30',
  paid: 'bg-civic-leafDim text-civic-leaf border-civic-leaf/30',
  completed: 'bg-civic-leafDim text-civic-leaf border-civic-leaf/30',
  cleared: 'bg-civic-leafDim text-civic-leaf border-civic-leaf/30',
  verified: 'bg-civic-leafDim text-civic-leaf border-civic-leaf/30',
  scanned: 'bg-civic-leafDim text-civic-leaf border-civic-leaf/30',
  synced: 'bg-civic-leafDim text-civic-leaf border-civic-leaf/30',
  pending: 'bg-civic-saffronDim text-civic-saffron border-civic-saffron/30',
  queued: 'bg-civic-saffronDim text-civic-saffron border-civic-saffron/30',
  'active now': 'bg-civic-skyDim text-civic-sky border-civic-sky/30',
  retry: 'bg-civic-roseDim text-civic-rose border-civic-rose/30',
  failed: 'bg-civic-roseDim text-civic-rose border-civic-rose/30',
  'on route': 'bg-civic-saffronDim text-civic-saffron border-civic-saffron/30',
  'in transit': 'bg-civic-skyDim text-civic-sky border-civic-sky/30',
  overdue: 'bg-civic-roseDim text-civic-rose border-civic-rose/30',
  defaulter: 'bg-civic-roseDim text-civic-rose border-civic-rose/30',
  'non-compliant': 'bg-civic-roseDim text-civic-rose border-civic-rose/30',
  flagged: 'bg-civic-roseDim text-civic-rose border-civic-rose/30',
  refused: 'bg-civic-roseDim text-civic-rose border-civic-rose/30',
  locked: 'bg-civic-roseDim text-civic-rose border-civic-rose/30',
  default: 'bg-surface-alt text-ink-muted border-border'
}

export default function StatusBadge({ status }) {
  const key = String(status || '').toLowerCase()
  const cls = MAP[key] || MAP.default
  return (
    <span className={cx('inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border text-[11px] font-medium', cls)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
