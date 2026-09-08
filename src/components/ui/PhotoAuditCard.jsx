import React from 'react'
import { Camera, MapPin, Clock } from 'lucide-react'

/**
 * Stands in for the "Mandatory Photo Upload Audit" viewports described
 * throughout the source doc (wet/dry/mixed waste photos, before/after
 * remediation, etc). In the real app this renders the captured image;
 * here it renders a labeled capture slot with GPS/time watermark meta.
 */
export default function PhotoAuditCard({ label, tone = 'teal', gps, time, note }) {
  const toneMap = {
    teal: 'from-civic-tealDim to-surface-alt border-civic-teal/25',
    leaf: 'from-civic-leafDim to-surface-alt border-civic-leaf/25',
    sky: 'from-civic-skyDim to-surface-alt border-civic-sky/25',
    rose: 'from-civic-roseDim to-surface-alt border-civic-rose/25',
    saffron: 'from-civic-saffronDim to-surface-alt border-civic-saffron/25'
  }
  return (
    <div className={`rounded-md border bg-gradient-to-br ${toneMap[tone]} p-3 flex flex-col justify-between min-h-[104px]`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-ink">{label}</span>
        <Camera size={13} className="text-ink-faint" />
      </div>
      {note && <p className="text-[11px] text-ink-muted mt-1 leading-snug">{note}</p>}
      <div className="flex items-center gap-3 mt-2 text-[10px] text-ink-faint font-mono">
        {gps && <span className="flex items-center gap-1"><MapPin size={10} />{gps}</span>}
        {time && <span className="flex items-center gap-1"><Clock size={10} />{time}</span>}
      </div>
    </div>
  )
}
