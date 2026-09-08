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
          <tr className="text-left text-ink uppercase tracking-wider text-[10px] font-bold border-b border-border bg-surface-alt/70">
            {columns.map((c) => (
              <th key={c.key} className="px-3.5 py-3 font-bold whitespace-nowrap">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-surface-alt/80 transition-colors">
              {columns.map((c) => (
                <td key={c.key} className={`px-3.5 ${dense ? 'py-2' : 'py-3'} whitespace-nowrap ${c.mono ? 'font-mono tabular text-ink font-bold' : 'text-ink-muted font-medium'}`}>
                  {c.statusCol ? <StatusBadge status={row[c.key]} /> : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className="py-8 text-center text-xs text-ink-muted">No records for the selected filters.</div>
      )}
    </div>
  )
}
