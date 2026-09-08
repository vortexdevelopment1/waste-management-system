import React from 'react'
import StatusBadge from './StatusBadge'

/**
 * Generic ledger/manifest table used at the bottom of every module
 * (Beat Service Ledger, Weighbridge Manifest, UCC Ledger, etc).
 * columns: [{ key, label, mono, statusCol }]
 */
export default function DataTable({ columns, rows, dense }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="text-left text-ink-faint uppercase tracking-wide text-[10px]">
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2 font-medium whitespace-nowrap">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border-soft hover:bg-surface-alt/60 transition-colors">
              {columns.map((c) => (
                <td key={c.key} className={`px-3 ${dense ? 'py-1.5' : 'py-2.5'} whitespace-nowrap ${c.mono ? 'font-mono tabular text-ink' : 'text-ink-muted'}`}>
                  {c.statusCol ? <StatusBadge status={row[c.key]} /> : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className="py-8 text-center text-xs text-ink-faint">No records for the selected filters.</div>
      )}
    </div>
  )
}
