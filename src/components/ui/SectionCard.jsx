import React from 'react'
import { cx } from '../../utils/format'

/**
 * Base panel used across every module: telemetry ribbons, map panels,
 * photo-audit workstations, analytics panels and ledger grids all sit
 * inside this same shell so the command-center reads as one system.
 */
export default function SectionCard({ title, eyebrow, action, className, children, dense }) {
  return (
    <div className={cx('bg-surface border border-border rounded-lg shadow-panel', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-soft">
          <div>
            {eyebrow && <div className="text-[11px] tracking-wide text-ink-faint mb-0.5">{eyebrow}</div>}
            {title && <h3 className="text-sm font-medium text-ink">{title}</h3>}
          </div>
          {action}
        </div>
      )}
      <div className={dense ? 'p-3' : 'p-4'}>{children}</div>
    </div>
  )
}
