import React from 'react'
import { cx } from '../../utils/format'

const SUCCESS_CLS = 'bg-[#E8F8F1] text-[#0F9F72] border border-[#BCEBD8]'
const INFO_CLS = 'bg-[#EAF3FF] text-[#2676D9] border border-[#C4DCFC]'
const WARNING_CLS = 'bg-[#FFF5DD] text-[#D88900] border border-[#FDE4A9]'
const DANGER_CLS = 'bg-[#FFECEC] text-[#D64545] border border-[#FAC5C5]'
const DEFAULT_CLS = 'bg-[#F8FAFD] text-[#667A99] border border-[#DCE6F2]'

const MAP = {
  compliant: SUCCESS_CLS,
  paid: SUCCESS_CLS,
  completed: SUCCESS_CLS,
  cleared: SUCCESS_CLS,
  verified: SUCCESS_CLS,
  scanned: SUCCESS_CLS,
  synced: SUCCESS_CLS,
  pending: WARNING_CLS,
  queued: WARNING_CLS,
  'on route': WARNING_CLS,
  'active now': INFO_CLS,
  'in transit': INFO_CLS,
  retry: DANGER_CLS,
  failed: DANGER_CLS,
  overdue: DANGER_CLS,
  defaulter: DANGER_CLS,
  'non-compliant': DANGER_CLS,
  flagged: DANGER_CLS,
  refused: DANGER_CLS,
  locked: DANGER_CLS,
  default: DEFAULT_CLS
}

export default function StatusBadge({ status }) {
  const key = String(status || '').toLowerCase()
  const cls = MAP[key] || MAP.default
  return (
    <span className={cx('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-bold shadow-2xs', cls)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
