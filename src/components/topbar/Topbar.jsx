import React, { useEffect, useState } from 'react'
import { Bell, ChevronDown, Search } from 'lucide-react'
import { useRole } from '../../hooks/useRole'
import { ROLES } from '../../data/roles'

export default function Topbar({ title, subtitle }) {
  const { role, setRole, roleInfo } = useRole()
  const [now, setNow] = useState(new Date())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <header className="h-16 border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-20 flex items-center justify-between px-5">
      <div>
        <h1 className="text-[15px] font-semibold text-ink leading-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-ink-faint">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-surface-alt border border-border rounded-md px-2.5 py-1.5 text-xs text-ink-faint w-52">
          <Search size={13} />
          <span>Search property, ticket, vehicle…</span>
        </div>

        <div className="font-mono text-xs text-ink-muted tabular hidden sm:block">
          {now.toLocaleTimeString('en-IN', { hour12: false })}
        </div>

        <button className="relative w-8 h-8 rounded-md border border-border bg-surface-alt flex items-center justify-center text-ink-muted hover:text-ink">
          <Bell size={14} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-civic-rose text-[9px] flex items-center justify-center text-white">3</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 border border-border bg-surface-alt rounded-md pl-2 pr-2.5 py-1.5"
          >
            <span className="w-6 h-6 rounded-full bg-civic-tealDim border border-civic-teal/30 flex items-center justify-center text-[10px] text-civic-teal font-semibold">
              {roleInfo.label[0]}
            </span>
            <span className="text-xs text-ink">{roleInfo.label}</span>
            <ChevronDown size={12} className="text-ink-faint" />
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-64 bg-surface border border-border rounded-md shadow-panel overflow-hidden z-30">
              {Object.values(ROLES).map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setRole(r.id); setOpen(false) }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-surface-alt ${role === r.id ? 'bg-surface-alt' : ''}`}
                >
                  <div className="text-ink font-medium">{r.label}</div>
                  <div className="text-ink-faint text-[11px]">{r.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
