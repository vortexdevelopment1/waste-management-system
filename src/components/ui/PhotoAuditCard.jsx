import React from 'react'
import { Camera, MapPin, Clock } from 'lucide-react'

export default function PhotoAuditCard({ label, tone = 'teal', gps, time, note }) {
  const badgeColors = {
    teal: 'bg-civic-tealDim text-civic-teal border-civic-teal/30',
    leaf: 'bg-civic-leafDim text-civic-leaf border-civic-leaf/30',
    sky: 'bg-civic-skyDim text-civic-sky border-civic-sky/30',
    rose: 'bg-civic-roseDim text-civic-rose border-civic-rose/30',
    saffron: 'bg-civic-saffronDim text-civic-saffron border-civic-saffron/30'
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-3.5 flex flex-col justify-between min-h-[110px] shadow-soft hover:shadow-card transition-all">
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${badgeColors[tone] || badgeColors.teal}`}>
          {label}
        </span>
        <Camera size={14} className="text-ink-muted" />
      </div>
      {note && <p className="text-xs text-ink font-semibold mt-2 leading-snug">{note}</p>}
      <div className="flex items-center gap-3 mt-2 text-[10px] text-ink-muted font-mono">
        {gps && <span className="flex items-center gap-1"><MapPin size={10} />{gps}</span>}
        {time && <span className="flex items-center gap-1"><Clock size={10} />{time}</span>}
      </div>
    </div>
  )
}
