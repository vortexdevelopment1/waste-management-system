export function cx(...args) {
  return args.filter(Boolean).join(' ')
}

export function formatINR(n) {
  if (n === null || n === undefined) return '—'
  return '₹' + Number(n).toLocaleString('en-IN')
}

export function formatNum(n, suffix = '') {
  if (n === null || n === undefined) return '—'
  return Number(n).toLocaleString('en-IN') + suffix
}
