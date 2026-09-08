import React from 'react'
import { cx } from '../../utils/format'

/**
 * Base panel used across every module: telemetry ribbons, map panels,
 * photo-audit workstations, analytics panels and ledger grids.
 */
export default function SectionCard({ title, eyebrow, action, className, children, dense }) {
  return (
    <div className={cx('bg-surface border border-border rounded-2xl shadow-soft', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            {eyebrow && <div className="text-[10px] uppercase font-bold tracking-wider text-ink-muted mb-0.5">{eyebrow}</div>}
            {title && <h3 className="text-sm font-bold text-ink">{title}</h3>}
          </div>
          {action}
        </div>
      )}
      <div className={dense ? 'p-3' : 'p-4'}>{children}</div>
    </div>
  )
}
