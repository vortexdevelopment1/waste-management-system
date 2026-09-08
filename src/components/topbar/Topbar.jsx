import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Search, LogOut, ShieldCheck, UserCheck, Truck, User } from 'lucide-react'
import { useRole } from '../../hooks/useRole'
import { ROLES } from '../../data/roles'
import ThemeToggle from '../ui/ThemeToggle.jsx'

export default function Topbar({ title, subtitle }) {
  const { role, setRole, roleInfo, currentUser, logout } = useRole()
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const roleIcons = {
    admin: ShieldCheck,
    supervisor: UserCheck,
    driver: Truck,
    user: User
  }

  const RoleIcon = role ? (roleIcons[role] || User) : User

  return (
    <header className="h-16 border-b border-border bg-surface/95 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-6 shadow-panel">
      <div>
        <h1 className="text-base font-bold text-ink tracking-tight leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-ink-muted mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3.5">
        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 bg-surface border border-border rounded-xl px-3 py-1.5 text-xs text-ink-muted w-60 focus-within:border-civic-teal focus-within:bg-surface focus-within:ring-2 focus-within:ring-civic-teal/10 transition-all shadow-panel">
          <Search size={14} className="text-ink-muted shrink-0" />
          <input
            type="text"
            placeholder="Search property, ticket, beat…"
            className="bg-transparent border-none outline-none text-xs text-ink w-full placeholder:text-ink-faint"
          />
        </div>

        {/* Live Clock & System Status */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-surface border border-border text-xs font-mono text-ink-muted tabular shadow-panel">
          <span className="w-2 h-2 rounded-full bg-civic-teal animate-pulse" />
          <span>{now.toLocaleTimeString('en-IN', { hour12: false })}</span>
        </div>

        {/* Day / Night Theme Switch */}
        <div className="flex items-center pl-1 border-l border-border">
          <ThemeToggle size="sm" showLabel={true} />
        </div>

        {/* Notifications Button */}
        <button
          title="Notifications"
          className="relative w-9 h-9 rounded-xl border border-border bg-surface hover:bg-surface-alt flex items-center justify-center text-ink-muted hover:text-ink transition-colors shadow-panel cursor-pointer"
        >
          <Bell size={15} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-civic-rose text-[10px] font-bold flex items-center justify-center text-white ring-2 ring-surface shadow-xs">
            3
          </span>
        </button>

        {/* User Profile & Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2.5 border border-border bg-surface hover:bg-surface-alt rounded-xl pl-2 pr-3 py-1.5 transition-colors shadow-panel cursor-pointer"
          >
            <span className="w-7 h-7 rounded-lg bg-civic-tealDim border border-civic-teal/30 flex items-center justify-center text-civic-teal">
              <RoleIcon size={14} />
            </span>
            <div className="text-left hidden md:block">
              <div className="text-xs text-ink font-bold leading-none">
                {currentUser?.name || roleInfo?.label || 'User'}
              </div>
              <div className="text-[10px] text-ink-muted font-medium capitalize mt-0.5">
                {roleInfo?.label || role}
              </div>
            </div>
            <ChevronDown size={13} className="text-ink-faint ml-0.5" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-72 bg-surface border border-border rounded-2xl shadow-card overflow-hidden z-30 divide-y divide-border animate-fadeIn">
              {/* Profile Header */}
              <div className="p-3.5 bg-surface-alt">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-civic-tealDim border border-civic-teal/30 flex items-center justify-center text-civic-teal shrink-0">
                    <RoleIcon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-ink truncate">
                      {currentUser?.name || roleInfo?.label}
                    </div>
                    <div className="text-[11px] text-ink-muted truncate">
                      {currentUser?.designation || roleInfo?.title}
                    </div>
                    <div className="text-[10px] text-civic-teal font-mono font-medium truncate mt-0.5">
                      {currentUser?.email || `${role}@swm.gov.in`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Switcher */}
              <div className="p-2 space-y-1">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                  Switch Active Role
                </div>
                {Object.values(ROLES).map((r) => {
                  const Icon = roleIcons[r.id] || User
                  const isActive = role === r.id
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRole(r.id)
                        setOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-civic-tealDim text-civic-teal font-bold border border-civic-teal/30'
                          : 'hover:bg-surface-alt text-ink-muted hover:text-ink border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} className={isActive ? 'text-civic-teal' : 'text-ink-muted'} />
                        <div>
                          <div className="text-xs font-semibold">{r.label}</div>
                          <div className="text-ink-faint text-[10px] font-normal">{r.title}</div>
                        </div>
                      </div>
                      {isActive && (
                        <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-civic-tealDim text-civic-teal border border-civic-teal/30 font-mono font-bold">
                          Active
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Sign Out Option */}
              <div className="p-1.5 bg-surface-alt/50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-civic-rose hover:bg-civic-roseDim rounded-xl transition-colors font-semibold cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Log Out & Exit</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
