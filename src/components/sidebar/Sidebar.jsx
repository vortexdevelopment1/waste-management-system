import React from 'react'
import { NavLink } from 'react-router-dom'
import { Recycle } from 'lucide-react'
import { NAV } from '../../data/nav'
import { useRole } from '../../hooks/useRole'
import { canAccess } from '../../data/roles'
import { cx } from '../../utils/format'

export default function Sidebar() {
  const { role } = useRole()
  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 border-r border-border bg-surface flex flex-col">
      <div className="flex items-center gap-2 px-4 h-16 border-b border-border">
        <div className="w-8 h-8 rounded-md bg-civic-tealDim border border-civic-teal/30 flex items-center justify-center">
          <Recycle size={16} className="text-civic-teal" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-ink">ASUTOS</div>
          <div className="text-[10px] text-ink-faint tracking-wide">SWM COMMAND CENTER</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV.map((item) => {
          const allowed = canAccess(role, item.key)
          const Icon = item.icon
          if (!allowed) return null
          return (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cx(
                  'flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors',
                  isActive
                    ? 'bg-civic-tealDim text-civic-teal border border-civic-teal/25'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-alt border border-transparent'
                )
              }
            >
              <Icon size={15} />
              <span className="truncate">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="p-3 border-t border-border text-[10px] text-ink-faint leading-relaxed">
        SWM Rules 2026 Compliant
        <br />7-Star Garbage Free City Protocol
      </div>
    </aside>
  )
}
