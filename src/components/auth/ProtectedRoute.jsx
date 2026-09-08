import React from 'react'
import { Navigate, useLocation, Link } from 'react-router-dom'
import { useRole } from '../../hooks/useRole'
import { canAccess } from '../../data/roles'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export default function ProtectedRoute({ children, moduleKey }) {
  const { isAuthenticated, role, roleInfo } = useRole()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (moduleKey && !canAccess(role, moduleKey)) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface border border-border rounded-xl p-6 text-center shadow-panel">
          <div className="w-12 h-12 rounded-xl bg-civic-roseDim border border-civic-rose/30 flex items-center justify-center mx-auto mb-4 text-civic-rose">
            <ShieldAlert size={24} />
          </div>
          <h2 className="text-lg font-semibold text-ink mb-1">Access Restricted</h2>
          <p className="text-xs text-ink-muted leading-relaxed mb-4">
            Your current role <span className="font-semibold text-ink">({roleInfo?.label || role})</span> does not have authorization to view the <span className="font-mono text-civic-teal">[{moduleKey}]</span> module under municipal SWM policy.
          </p>
          <div className="p-3 bg-surface-alt border border-border rounded-lg text-left text-[11px] text-ink-faint mb-5">
            <div className="font-medium text-ink mb-0.5">Need Access?</div>
            Contact the Chief SWM Administrator or switch to a role with field / administrative privileges in the top-right menu.
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-civic-teal text-surface font-medium text-xs rounded-lg hover:bg-civic-teal/90 transition-colors"
          >
            <ArrowLeft size={14} />
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return children
}
