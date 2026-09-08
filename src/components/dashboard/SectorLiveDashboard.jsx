import React, { useState, useEffect } from 'react'
import {
  Settings, CheckCircle2, MapPin, Droplets,
  Package, Box, Cpu, Sprout, Columns, Home, Layers
} from 'lucide-react'
import SegregationMetricCards from './SegregationMetricCards.jsx'

const INITIAL_HOUSES = [
  {
    id: 'H-07',
    name: 'Mukherjee Villa',
    type: 'Wet',
    weight: '2.4 kg',
    time: '1:02:09',
    status: 'LOGGED',
    completed: true
  },
  {
    id: 'H-08',
    name: 'Sen Bari',
    type: 'Dry',
    weight: '1.8 kg',
    time: '1:02:09',
    status: 'LOGGED',
    completed: true
  },
  {
    id: 'H-09',
    name: 'Das Cottage',
    type: 'Wet',
    weight: '0.9 kg',
    time: '1:02:09',
    status: 'LOGGED',
    completed: true
  },
  {
    id: 'H-10',
    name: 'Pal House',
    type: 'Mixed',
    weight: '3.1 kg',
    time: '1:02:09',
    status: 'LOGGED',
    completed: true
  },
  {
    id: 'H-11',
    name: 'Roy Residence',
    type: 'Dry',
    weight: '1.2 kg',
    time: '1:02:09',
    status: 'LOGGED',
    completed: true
  },
  {
    id: 'H-12',
    name: 'Chatterjee',
    type: 'E-waste',
    weight: '--',
    time: '--:--',
    status: 'PENDING',
    completed: false
  }
]

const SEGREGATION_CHART_DATA = [
  { id: 'wet', label: 'Wet', percentage: 42, color: '#10B981' },
  { id: 'dry', label: 'Dry', percentage: 30, color: '#3B82F6' },
  { id: 'plastic', label: 'Plastic', percentage: 15, color: '#F59E0B' },
  { id: 'organic', label: 'Organic', percentage: 8, color: '#8B5CF6' },
  { id: 'ewaste', label: 'E-waste', percentage: 5, color: '#EF4444' }
]

export default function SectorLiveDashboard({ role = 'admin' }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [houses, setHouses] = useState(INITIAL_HOUSES)
  const [syncRate, setSyncRate] = useState(83)
  const [activeSector, setActiveSector] = useState('Sector H')
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [lastLoggedMessage, setLastLoggedMessage] = useState(null)

  // Real-time ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const loggedCount = houses.filter((h) => h.completed).length
  const totalCount = houses.length

  // Quick Action to log pending house H-12
  const handleToggleHouse = (houseId) => {
    setHouses((prev) =>
      prev.map((h) => {
        if (h.id === houseId) {
          if (h.completed) {
            return {
              ...h,
              status: 'PENDING',
              completed: false,
              weight: '--',
              time: '--:--'
            }
          } else {
            const timeStr = currentTime.toLocaleTimeString('en-IN', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })
            setLastLoggedMessage(`Household ${h.id} (${h.name}) successfully logged!`)
            setTimeout(() => setLastLoggedMessage(null), 3500)
            return {
              ...h,
              status: 'LOGGED',
              completed: true,
              weight: '1.6 kg',
              time: timeStr
            }
          }
        }
        return h
      })
    )
  }

  // Calculate SVG donut stroke offsets
  const circumference = 2 * Math.PI * 40
  let accumulatedPercent = 0
  const donutSegments = SEGREGATION_CHART_DATA.map((stat) => {
    const strokeDasharray = `${(stat.percentage / 100) * circumference} ${circumference}`
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference)
    accumulatedPercent += stat.percentage
    return {
      ...stat,
      strokeDasharray,
      strokeDashoffset
    }
  })

  return (
    <div className="space-y-6 font-sans text-ink">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER SECTION MATCHING USER'S IMAGE                               */}
      {/* ========================================================================= */}
      <div className="bg-surface border border-border rounded-2xl p-5 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Split Window Icon, Title, Sector Badge, Live Timestamp */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25">
            <Columns size={19} className="stroke-[2.2]" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-ink tracking-tight">
                Waste Management Dashboard
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 font-mono tracking-wider shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {activeSector.toUpperCase()} • LIVE
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>Route</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono text-slate-700 font-medium">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                }).toLowerCase()}
              </span>
              <span className="text-slate-300">•</span>
              <span className="capitalize text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                {role} Mode
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Sync Badge & Settings Cog */}
        <div className="flex items-center gap-3 self-end md:self-center">
          {/* Live Sync Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 font-mono shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>SYNC {syncRate}%</span>
          </div>

          {/* Settings Button */}
          <button
            type="button"
            onClick={() => setShowSettingsModal(true)}
            title="Dashboard Settings"
            className="w-9 h-9 rounded-xl border border-border bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all flex items-center justify-center shadow-2xs hover:rotate-45"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {lastLoggedMessage && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl px-4 py-3 flex items-center justify-between text-xs text-emerald-900 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span className="font-medium">{lastLoggedMessage}</span>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
            Synced Real-Time
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FIVE SMALL CARDS SHOWING PERCENTAGE OF WET, DRY, PLASTIC, ORGANIC, E-WASTE */}
      {/* ========================================================================= */}
      <SegregationMetricCards />

      {/* ========================================================================= */}
      {/* 3. MAIN DUAL-COLUMN GRID: LEFT ROUTE MAP, RIGHT HOUSE LIST & SEGREGATION  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================================= */}
        {/* LEFT COLUMN: COLLECTION ROUTE MAP (5 cols)                             */}
        {/* ======================================================================= */}
        <div className="lg:col-span-5 bg-surface border border-border rounded-2xl p-5 shadow-soft space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Collection Route Map
            </h2>
            <span className="px-3 py-1 rounded-full bg-ink text-white text-xs font-mono font-bold shadow-2xs">
              {loggedCount}/{totalCount} DONE
            </span>
          </div>

          {/* Route Timeline Nodes */}
          <div className="relative pl-6 space-y-3 my-2">
            {/* Vertical Connecting Line */}
            <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-civic-teal rounded-full" />

            {houses.map((house) => {
              const isDone = house.completed

              return (
                <div key={house.id} className="relative flex items-center group">
                  {/* Timeline Node Ring */}
                  <div
                    className={`absolute -left-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all bg-surface z-10 ${
                      isDone
                        ? 'border-civic-teal shadow-2xs'
                        : 'border-border'
                    }`}
                  >
                    {isDone ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-civic-teal" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-ink-faint" />
                    )}
                  </div>

                  {/* House Node Card */}
                  <div
                    onClick={() => handleToggleHouse(house.id)}
                    className={`flex-1 ml-2.5 rounded-xl p-3 border transition-all cursor-pointer flex items-center justify-between shadow-2xs ${
                      isDone
                        ? 'border-border bg-surface hover:border-civic-teal/40 hover:bg-surface-alt'
                        : 'border-border bg-surface-alt hover:border-border hover:bg-surface'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-ink">
                          {house.id}
                        </span>
                        <span className="text-xs text-ink-muted">
                          {house.type}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-civic-teal mt-0.5">
                        {house.name}
                      </div>
                    </div>

                    <div>
                      {isDone ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-civic-teal hover:opacity-90 text-white text-[11px] font-bold tracking-wide shadow-2xs transition-colors">
                          LOGGED
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF5DD] text-[#D88900] text-[11px] font-bold tracking-wide border border-[#FDE4A9] transition-colors">
                          PENDING
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bell Coverage Card - Fresh, Modern Environmental Styling */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-4 flex items-center justify-between shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white shrink-0">
                <MapPin size={20} className="stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">
                  Bell Coverage
                </h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  100m radius active
                </p>
              </div>
            </div>

            <div className="text-2xl font-black font-mono text-white tracking-tight">
              83%
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: HOUSE LIST (TOP) & WASTE SEGREGATION (BOTTOM) (7 cols)    */}
        {/* ======================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* --------------------------------------------------------------------- */}
          {/* HOUSE LIST • LIVE UPDATE                                              */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-surface border border-border rounded-2xl p-5 shadow-soft space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                House List • Live Update
              </h2>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-civic-teal bg-civic-tealDim border border-civic-teal/30 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-civic-teal animate-pulse" />
                UPDATING
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-ink-muted border-b border-border pb-2">
                    <th className="pb-2 font-bold">HOUSE</th>
                    <th className="pb-2 font-bold">RESIDENT</th>
                    <th className="pb-2 font-bold">WEIGHT</th>
                    <th className="pb-2 font-bold text-right">TIME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {houses.map((house) => {
                    const isDone = house.completed
                    return (
                      <tr
                        key={house.id}
                        onClick={() => handleToggleHouse(house.id)}
                        className="hover:bg-surface-alt transition-colors cursor-pointer group"
                      >
                        {/* House ID Pill */}
                        <td className="py-3 pr-2">
                          <span
                            className={`inline-block font-mono text-xs font-bold px-3 py-1 rounded-full text-center ${
                              isDone
                                ? 'bg-ink text-white'
                                : 'bg-surface-alt text-ink-muted border border-border'
                            }`}
                          >
                            {house.id}
                          </span>
                        </td>

                        {/* Resident */}
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1.5">
                            <Home
                              size={14}
                              className={isDone ? 'text-civic-teal' : 'text-ink-muted'}
                            />
                            <span
                              className={`font-semibold truncate max-w-[180px] sm:max-w-none ${
                                isDone ? 'text-ink' : 'text-ink-muted'
                              }`}
                            >
                              {house.name}
                              {house.type && (
                                <span className="text-ink-faint font-normal ml-1">
                                  • {house.type}
                                </span>
                              )}
                            </span>
                          </div>
                        </td>

                        {/* Weight */}
                        <td className="py-3 px-2 font-mono font-bold text-ink">
                          {house.weight}
                        </td>

                        {/* Time */}
                        <td className="py-3 pl-2 text-right">
                          <span
                            className={`inline-block font-mono text-xs px-2.5 py-0.5 rounded-full border ${
                              isDone
                                ? 'border-civic-teal/30 bg-civic-tealDim text-civic-teal font-medium'
                                : 'border-border bg-surface-alt text-ink-faint'
                            }`}
                          >
                            {house.time}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* WASTE SEGREGATION • LIVE ANALYTICS                                    */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-surface border border-border rounded-2xl p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                Waste Segregation • Live Analytics
              </h2>
              <span className="text-xs font-mono text-civic-teal font-bold bg-civic-tealDim px-2.5 py-0.5 rounded-full border border-civic-teal/30">
                99.1% High Accuracy
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Donut Chart with Center Percentage */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background track circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#DCE6F2"
                      strokeWidth="11"
                    />

                    {/* Donut Segments */}
                    {donutSegments.map((seg) => (
                      <circle
                        key={seg.id}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth="11"
                        strokeDasharray={seg.strokeDasharray}
                        strokeDashoffset={seg.strokeDashoffset}
                        strokeLinecap="butt"
                        className="transition-all duration-700"
                      />
                    ))}
                  </svg>

                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                    <span className="text-2xl font-black font-mono text-ink tracking-tight leading-none">
                      83%
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-ink-muted mt-1">
                      SEGREGATED
                    </span>
                  </div>
                </div>
              </div>

              {/* Segregation Progress Breakdown Bars */}
              <div className="sm:col-span-7 space-y-2.5">
                {SEGREGATION_CHART_DATA.map((cat) => (
                  <div key={cat.id} className="flex items-center gap-3 text-xs">
                    {/* Category Label + Color Dot */}
                    <div className="w-16 flex items-center gap-1.5 shrink-0 font-semibold text-ink">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span>{cat.label}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1 h-2.5 rounded-full bg-surface-alt border border-border overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${cat.percentage}%`,
                          backgroundColor: cat.color
                        }}
                      />
                    </div>

                    {/* Percentage */}
                    <div className="w-9 font-mono font-bold text-right text-ink shrink-0">
                      {cat.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-surface border border-border rounded-2xl p-6 max-w-md w-full shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-ink">
                Beat & Parameter Settings
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-ink-muted hover:text-ink text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-ink font-semibold mb-1">
                  Active Operational Sector
                </label>
                <select
                  value={activeSector}
                  onChange={(e) => setActiveSector(e.target.value)}
                  className="w-full bg-surface-alt border border-border rounded-xl px-3 py-2 text-ink outline-none focus:border-civic-teal cursor-pointer"
                >
                  <option value="Sector H">Sector H (Ward 04 — Active)</option>
                  <option value="Sector A">Sector A (Commercial Hub)</option>
                  <option value="Sector B">Sector B (Residential North)</option>
                  <option value="Sector C">Sector C (Industrial Belt)</option>
                </select>
              </div>

              <div>
                <label className="block text-ink font-semibold mb-1">
                  Telemetry Sync Rate
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={syncRate}
                  onChange={(e) => setSyncRate(Number(e.target.value))}
                  className="w-full accent-civic-teal cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ink-muted font-mono">
                  <span>50%</span>
                  <span className="text-civic-teal font-bold">{syncRate}% Synced</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 rounded-xl bg-civic-teal hover:opacity-90 text-white font-semibold text-xs shadow-soft transition-opacity cursor-pointer"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
