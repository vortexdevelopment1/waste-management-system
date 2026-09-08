import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Recycle, ShieldCheck, UserCheck, Truck, User, Lock, Mail,
  Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, Clock, Sparkles,
  KeyRound, Shield
} from 'lucide-react'
import { DEMO_CREDENTIALS, ROLES } from '../data/roles.js'
import { useRole } from '../hooks/useRole.js'
import ThemeToggle from '../components/ui/ThemeToggle.jsx'

export default function Login() {
  const { login, loginAsRole, isAuthenticated } = useRole()
  const navigate = useNavigate()
  const location = useLocation()

  const [identifier, setIdentifier] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('admin')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // If already authenticated, navigate to dashboard or previous route
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  // Live IST Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const roleIcons = {
    admin: ShieldCheck,
    supervisor: UserCheck,
    driver: Truck,
    user: User
  }

  const roleStyles = {
    admin: {
      border: 'hover:border-amber-400 hover:shadow-card',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/70',
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-100 text-amber-800',
      btn: 'hover:bg-amber-100 text-amber-800'
    },
    supervisor: {
      border: 'hover:border-emerald-400 hover:shadow-card',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/70',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-800',
      btn: 'hover:bg-emerald-100 text-emerald-800'
    },
    driver: {
      border: 'hover:border-blue-400 hover:shadow-card',
      activeBorder: 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/70',
      badge: 'bg-blue-50 text-blue-800 border-blue-200',
      iconBg: 'bg-blue-100 text-blue-800',
      btn: 'hover:bg-blue-100 text-blue-800'
    },
    user: {
      border: 'hover:border-teal-400 hover:shadow-card',
      activeBorder: 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/70',
      badge: 'bg-teal-50 text-teal-800 border-teal-200',
      iconBg: 'bg-teal-100 text-teal-800',
      btn: 'hover:bg-teal-100 text-teal-800'
    }
  }

  function handleQuickFill(cred) {
    setSelectedRole(cred.role)
    setIdentifier(cred.username)
    setPassword(cred.password)
    setError('')
  }

  function handleInstantLogin(roleKey) {
    setLoading(true)
    setError('')
    setTimeout(() => {
      loginAsRole(roleKey)
      setLoading(false)
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }, 250)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!identifier.trim() || !password.trim()) {
      setError('Please provide both username/email and password.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const res = login(identifier, password)
      setLoading(false)
      if (res.success) {
        const from = location.state?.from?.pathname || '/'
        navigate(from, { replace: true })
      } else {
        setError(res.error)
      }
    }, 350)
  }

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col justify-between relative overflow-hidden font-sans selection:bg-civic-teal selection:text-surface">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-civic-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-civic-saffron/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-civic-leaf/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner / Gov Identity */}
      <header className="border-b border-border/70 bg-surface/80 backdrop-blur-md px-6 py-3.5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-civic-tealDim border border-civic-teal/30 flex items-center justify-center shadow-sm">
              <Recycle size={22} className="text-civic-teal animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-ink text-base">ASUTOS SWM</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-civic-tealDim text-civic-teal border border-civic-teal/30 font-mono font-medium">
                  v2.6 COMMAND CENTER
                </span>
              </div>
              <p className="text-[11px] text-ink-muted">
                Ministry of Housing & Urban Affairs • Swachh Bharat Mission 2.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-ink-faint">
            <div className="hidden sm:flex items-center gap-1.5 bg-surface-alt px-3 py-1.5 rounded-lg border border-border">
              <Clock size={13} className="text-emerald-600" />
              <span className="text-ink">
                {currentTime.toLocaleTimeString('en-IN', { hour12: false })} IST
              </span>
              <span className="text-[10px] text-ink-muted">
                ({currentTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })})
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              IoT Grid Online
            </div>
            <ThemeToggle size="sm" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-alt border border-border text-xs text-ink-muted mb-3">
            <Sparkles size={13} className="text-civic-saffron" />
            <span>Select a role or enter credentials to sign in</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
            Municipal Waste Command & Operations
          </h1>
          <p className="text-xs md:text-sm text-ink-muted mt-2">
            Integrated IoT monitoring, vehicle telematics, door-to-door collection tracking, and citizen service portal.
          </p>
        </div>

        {/* 4 Demo Roles Showcase & Fast Sign-in */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted flex items-center gap-2">
              <KeyRound size={14} className="text-civic-teal" />
              Demo Roles & Pre-configured Credentials (Choose 1 of 4)
            </h2>
            <span className="text-[11px] text-ink-faint hidden sm:inline">
              Click any role card to auto-fill or sign in instantly
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {DEMO_CREDENTIALS.map((cred) => {
              const Icon = roleIcons[cred.role] || Shield
              const style = roleStyles[cred.role]
              const isSelected = selectedRole === cred.role

              return (
                <div
                  key={cred.role}
                  onClick={() => handleQuickFill(cred)}
                  className={`group relative bg-surface border rounded-xl p-4 cursor-pointer transition-all duration-200 shadow-panel flex flex-col justify-between ${
                    isSelected ? style.activeBorder : `border-border ${style.border}`
                  }`}
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${style.iconBg} border border-current/20`}>
                        <Icon size={18} />
                      </div>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}>
                        {cred.label}
                      </span>
                    </div>

                    {/* Role Details */}
                    <h3 className="text-sm font-semibold text-ink group-hover:text-emerald-700 transition-colors">
                      {cred.title}
                    </h3>
                    <p className="text-[11px] text-ink-muted mt-0.5 leading-snug">
                      {cred.designation}
                    </p>
                    <p className="text-[10px] text-ink-faint mt-2 line-clamp-2">
                      {ROLES[cred.role].description}
                    </p>

                    {/* Credentials Preview */}
                    <div className="mt-3.5 pt-3 border-t border-border/60 space-y-1 text-[11px] font-mono">
                      <div className="flex items-center justify-between text-ink-muted">
                        <span className="text-ink-faint">User:</span>
                        <span className="text-ink font-medium bg-surface-alt px-1.5 py-0.5 rounded border border-border/60">
                          {cred.username}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-ink-muted">
                        <span className="text-ink-faint">Pass:</span>
                        <span className="text-ink font-medium bg-surface-alt px-1.5 py-0.5 rounded border border-border/60">
                          {cred.password}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleQuickFill(cred)
                      }}
                      className="flex-1 py-1.5 text-[11px] rounded-md bg-surface-alt hover:bg-surface-raised border border-border text-ink-muted hover:text-ink font-medium transition-colors"
                    >
                      Fill Form
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleInstantLogin(cred.role)
                      }}
                      className={`flex-1 py-1.5 text-[11px] rounded-md font-semibold transition-all border border-current/30 flex items-center justify-center gap-1 ${style.btn} bg-surface-alt`}
                    >
                      <span>Sign In</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Central Sign-In Card */}
        <div className="max-w-md w-full mx-auto bg-surface border border-border rounded-2xl p-6 md:p-7 shadow-panel relative">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
            <div>
              <h2 className="text-base font-semibold text-ink">Sign In to Account</h2>
              <p className="text-xs text-ink-muted mt-0.5">Use your designated municipal login</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-surface-alt border border-border flex items-center justify-center text-emerald-600">
              <Lock size={15} />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-600 animate-fadeIn">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Role Selector Tabs */}
          <div className="mb-4">
            <label className="block text-[11px] font-medium text-ink-muted mb-1.5">
              Quick Role Autofill:
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {DEMO_CREDENTIALS.map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => handleQuickFill(cred)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all text-center ${
                    selectedRole === cred.role
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold shadow-xs'
                      : 'bg-surface-alt text-ink-muted border-border hover:text-ink hover:bg-surface-raised'
                  }`}
                >
                  {cred.label}
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username/Email Input */}
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5">
                Username or Official Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
                  <Mail size={15} />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value)
                    setError('')
                  }}
                  placeholder="e.g. admin or admin@swm.gov.in"
                  className="w-full pl-9 pr-3 py-2.5 bg-surface-alt border border-border rounded-xl text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-ink-muted">
                  Password
                </label>
                <span className="text-[10px] text-ink-faint font-mono">
                  Demo: admin123 / super123 / driver123 / user123
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
                  <Lock size={15} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-surface-alt border border-border rounded-xl text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-faint hover:text-ink"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember Me / Session note */}
            <div className="flex items-center justify-between text-xs text-ink-muted pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-3.5 h-3.5 rounded bg-surface-alt border-border text-emerald-600 focus:ring-0 focus:ring-offset-0"
                />
                <span>Remember session</span>
              </label>
              <span className="text-emerald-700 text-[11px] hover:underline cursor-pointer font-medium">
                Help & Support
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-civic-teal text-white font-semibold text-xs tracking-wide hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-soft disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials…</span>
                </>
              ) : (
                <>
                  <span>Sign In to Command Center</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="mt-4 pt-3 border-t border-border/70 text-center">
            <p className="text-[11px] text-ink-faint">
              Need immediate test access? Click any role card above for 1-click login.
            </p>
          </div>
        </div>
      </main>

      {/* Footer with Statutory Badges */}
      <footer className="border-t border-border/70 bg-surface/50 backdrop-blur-sm py-4 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-faint">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-civic-leaf" />
            <span>SWM Rules 2026 Compliant • 7-Star Garbage Free City (GFC) Protocol</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-civic-teal" />
              AES-256 Auth
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-civic-teal" />
              IoT Sensor Grid
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-civic-teal" />
              Role-Based Access
            </span>
            <span className="text-ink-muted">© 2026 ASUTOS SWM Command Center</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
