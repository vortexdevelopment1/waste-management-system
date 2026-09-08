import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Recycle, ScanFace } from 'lucide-react'
import { ROLES } from '../data/roles.js'
import { useRole } from '../hooks/useRole.js'

export default function Login() {
  const { setRole } = useRole()
  const navigate = useNavigate()

  function enter(roleId) {
    setRole(roleId)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-civic-tealDim border border-civic-teal/30 flex items-center justify-center mb-3">
            <Recycle size={22} className="text-civic-teal" />
          </div>
          <h1 className="text-lg font-semibold text-ink">ASUTOS SWM Command Center</h1>
          <p className="text-xs text-ink-faint mt-1">Select an interface to continue</p>
        </div>

        <div className="space-y-2">
          {Object.values(ROLES).map((r) => (
            <button
              key={r.id}
              onClick={() => enter(r.id)}
              className="w-full flex items-center justify-between border border-border bg-surface hover:border-civic-teal/30 rounded-lg px-4 py-3 text-left transition-colors"
            >
              <div>
                <div className="text-sm text-ink font-medium">{r.label}</div>
                <div className="text-[11px] text-ink-faint">{r.description}</div>
              </div>
              <ScanFace size={16} className="text-ink-faint" />
            </button>
          ))}
        </div>
        <p className="text-[10px] text-ink-faint text-center mt-6">Biometric Face-Auth login is simulated in this prototype.</p>
      </div>
    </div>
  )
}
