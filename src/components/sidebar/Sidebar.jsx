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

  const RoleIcon = role ? (roleIcons[role] || User) : User

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 border-r border-border bg-surface flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 px-5 h-16 border-b border-border">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25">
            <Recycle size={19} className="stroke-[2.2]" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-ink tracking-tight">ASUTOS SWM</div>
            <div className="text-[10px] text-emerald-600 font-bold tracking-wider uppercase font-mono">Operations Platform</div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="overflow-y-auto py-3.5 px-3 space-y-1 max-h-[calc(100vh-175px)]">
          <div className="px-3.5 py-1 text-[10px] uppercase font-bold text-ink-faint tracking-wider">
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
                    'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs transition-all duration-150 font-medium',
                    isActive
                      ? 'bg-civic-tealDim text-civic-teal font-bold border border-civic-teal/30 shadow-xs'
                      : 'text-ink-muted hover:text-ink hover:bg-surface-alt border border-transparent'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={16} className={`shrink-0 ${isActive ? 'text-civic-teal stroke-[2.2]' : 'text-ink-muted'}`} />
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* User Info & Quick Logout Footer */}
      <div className="p-3 border-t border-border bg-surface-alt/60">
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-surface border border-border shadow-soft">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-civic-tealDim border border-civic-teal/30 text-civic-teal flex items-center justify-center shrink-0 font-semibold shadow-2xs">
              <RoleIcon size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-ink truncate leading-tight">
                {currentUser?.name || roleInfo?.label || 'User'}
              </div>
              <div className="text-[10px] text-ink-muted font-medium capitalize mt-0.5 truncate">
                {roleInfo?.label || role}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-ink-faint hover:text-civic-rose hover:bg-civic-roseDim transition-colors shrink-0 cursor-pointer"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  )
}
