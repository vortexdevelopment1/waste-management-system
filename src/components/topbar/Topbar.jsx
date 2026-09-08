import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Search, LogOut, ShieldCheck, UserCheck, Truck, User } from 'lucide-react'
import { useRole } from '../../hooks/useRole'
import { ROLES } from '../../data/roles'

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

  const roleColors = {
    admin: 'text-civic-saffron bg-civic-saffronDim border-civic-saffron/40',
    supervisor: 'text-civic-teal bg-civic-tealDim border-civic-teal/40',
    driver: 'text-civic-sky bg-civic-skyDim border-civic-sky/40',
    user: 'text-civic-leaf bg-civic-leafDim border-civic-leaf/40'
  }

  const RoleIcon = role ? (roleIcons[role] || User) : User
  const roleColorClass = role ? (roleColors[role] || 'text-civic-teal bg-civic-tealDim border-civic-teal/30') : ''

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

        <button
          title="Notifications"
          className="relative w-8 h-8 rounded-md border border-border bg-surface-alt flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
        >
          <Bell size={14} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-civic-rose text-[9px] flex items-center justify-center text-white">
            3
          </span>
        </button>

        {/* User Profile & Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 border border-border bg-surface-alt hover:bg-surface-raised rounded-md pl-2 pr-2.5 py-1.5 transition-colors"
          >
            <span
              className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-semibold ${roleColorClass}`}
            >
              <RoleIcon size={13} />
            </span>
            <div className="text-left hidden md:block">
              <div className="text-xs text-ink font-medium leading-none">
                {currentUser?.name || roleInfo?.label || 'User'}
              </div>
              <div className="text-[10px] text-ink-faint uppercase font-mono tracking-wider mt-0.5">
                {roleInfo?.label || role}
              </div>
            </div>
            <ChevronDown size={12} className="text-ink-faint ml-1" />
          </button>

          {open && (
            <div className="absolute right-0 mt-1 w-72 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden z-30 divide-y divide-border">
              {/* Profile Header */}
              <div className="p-3 bg-surface-alt">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${roleColorClass}`}>
                    <RoleIcon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-ink truncate">
                      {currentUser?.name || roleInfo?.label}
                    </div>
                    <div className="text-[11px] text-ink-muted truncate">
                      {currentUser?.designation || roleInfo?.title}
                    </div>
                    <div className="text-[10px] text-ink-faint font-mono truncate">
                      {currentUser?.email || `${role}@swm.gov.in`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Switcher */}
              <div className="p-2">
                <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                  Switch Active Role (4 Roles)
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
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-civic-tealDim text-civic-teal font-medium border border-civic-teal/20'
                          : 'hover:bg-surface-alt text-ink-muted hover:text-ink'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={14} />
                        <div>
                          <div className="text-ink text-xs font-medium">{r.label}</div>
                          <div className="text-ink-faint text-[10px]">{r.title}</div>
                        </div>
                      </div>
                      {isActive && (
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-civic-teal/20 text-civic-teal font-mono">
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
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-civic-rose hover:bg-civic-roseDim/50 rounded-lg transition-colors font-medium"
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
