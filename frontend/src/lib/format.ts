export function get(obj: unknown, path: string[]): unknown {
  let cur: unknown = obj
  for (const key of path) {
    if (cur === null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[key]
  }
  return cur
}

export function blockHeight(block: unknown): number | undefined {
  const h = get(block, ['header', 'metadata', 'height'])
  return typeof h === 'number' ? h : undefined
}

export function blockTimestamp(block: unknown): number | undefined {
  const t = get(block, ['header', 'metadata', 'timestamp'])
  return typeof t === 'number' ? t : undefined
}

export function blockHash(block: unknown): string | undefined {
  const h = get(block, ['block_hash'])
  return typeof h === 'string' ? h : undefined
}

export function transactionCount(block: unknown): number | undefined {
  const tx = get(block, ['transactions'])
  return Array.isArray(tx) ? tx.length : undefined
}

export function relativeTime(unixSeconds: number | undefined): string {
  if (unixSeconds === undefined) return '—'
  const deltaMs = Date.now() - unixSeconds * 1000
  const seconds = Math.round(deltaMs / 1000)
  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}
