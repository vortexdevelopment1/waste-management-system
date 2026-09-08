import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Recycle, LogOut, ShieldCheck, UserCheck, Truck, User } from 'lucide-react'
import { NAV } from '../../data/nav'
import { useRole } from '../../hooks/useRole'
import { canAccess } from '../../data/roles'
import { cx } from '../../utils/format'

export default function Sidebar() {
  const { role, roleInfo, currentUser, logout } = useRole()
  const navigate = useNavigate()

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
    admin: 'text-civic-saffron bg-civic-saffronDim/50 border-civic-saffron/30',
    supervisor: 'text-civic-teal bg-civic-tealDim/50 border-civic-teal/30',
    driver: 'text-civic-sky bg-civic-skyDim/50 border-civic-sky/30',
    user: 'text-civic-leaf bg-civic-leafDim/50 border-civic-leaf/30'
  }

  const RoleIcon = role ? (roleIcons[role] || User) : User
  const roleColorClass = role ? (roleColors[role] || 'text-civic-teal bg-civic-tealDim/50 border-civic-teal/30') : ''

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 border-r border-border bg-surface flex flex-col justify-between">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-2.5 px-4 h-16 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-civic-tealDim border border-civic-teal/30 flex items-center justify-center">
            <Recycle size={18} className="text-civic-teal" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-ink">ASUTOS SWM</div>
            <div className="text-[10px] text-ink-faint tracking-wider font-mono">COMMAND CENTER</div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="overflow-y-auto py-3 px-2.5 space-y-0.5 max-h-[calc(100vh-175px)]">
          <div className="px-2.5 py-1 text-[10px] uppercase font-semibold text-ink-faint tracking-wider">
            {roleInfo?.label || 'Role'} Navigation
          </div>
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
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors',
                    isActive
                      ? 'bg-civic-tealDim text-civic-teal font-medium border border-civic-teal/30 shadow-sm'
                      : 'text-ink-muted hover:text-ink hover:bg-surface-alt border border-transparent'
                  )
                }
              >
                <Icon size={15} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* User Info & Quick Logout Footer */}
      <div className="p-3 border-t border-border bg-surface-alt/40">
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-surface border border-border">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 ${roleColorClass}`}>
              <RoleIcon size={14} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-ink truncate leading-none">
                {currentUser?.name || roleInfo?.label || 'User'}
              </div>
              <div className="text-[10px] text-ink-faint font-mono uppercase tracking-wider mt-0.5 truncate">
                {roleInfo?.label || role}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="w-7 h-7 rounded-md flex items-center justify-center text-ink-faint hover:text-civic-rose hover:bg-civic-roseDim/50 transition-colors shrink-0"
          >
            <LogOut size={13} />
          </button>
        </div>

        <div className="mt-2 text-[10px] text-ink-faint leading-tight text-center">
          SWM Rules 2026 • 7-Star GFC Protocol
        </div>
      </div>
    </aside>
  )
}
