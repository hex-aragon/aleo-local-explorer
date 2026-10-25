import { useLatestBlock } from '../../hooks/useAleoQueries'
import { blockHash, blockHeight, blockTimestamp, relativeTime, transactionCount } from '../../lib/format'
import { CopyableHash } from '../common/CopyableHash'
import { StatCard } from '../common/StatCard'

export function LatestBlockStats() {
  const { data, isLoading, isError } = useLatestBlock()

  if (isError) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4 text-sm text-text-dim">
        Couldn't reach the node. Check the RPC URL and network in Settings.
      </div>
    )
  }

  const height = blockHeight(data)
  const hash = blockHash(data)
  const timestamp = blockTimestamp(data)
  const txCount = transactionCount(data)

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Latest height" value={isLoading ? '—' : height ?? '—'} hint={relativeTime(timestamp)} />
      <StatCard
        label="Latest hash"
        value={hash ? <CopyableHash value={hash} /> : '—'}
      />
      <StatCard label="Transactions" value={isLoading ? '—' : txCount ?? 0} hint="in latest block" />
      <StatCard label="Network" value="Local devnet" />
    </div>
  )
}
