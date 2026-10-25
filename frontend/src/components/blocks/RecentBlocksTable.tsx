import { Link } from 'react-router-dom'
import { useRecentBlocks } from '../../hooks/useAleoQueries'
import { blockHash, blockHeight, blockTimestamp, relativeTime, transactionCount } from '../../lib/format'
import { CopyableHash } from '../common/CopyableHash'

export function RecentBlocksTable() {
  const { data, isLoading, isError } = useRecentBlocks()

  if (isError) {
    return <div className="text-sm text-text-dim">Couldn't load recent blocks.</div>
  }

  const blocks = [...(data ?? [])].sort((a, b) => (blockHeight(b) ?? 0) - (blockHeight(a) ?? 0))

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface text-left text-xs uppercase tracking-wide text-text-faint">
            <th className="px-4 py-2.5 font-medium">Height</th>
            <th className="px-4 py-2.5 font-medium">Hash</th>
            <th className="px-4 py-2.5 font-medium">Age</th>
            <th className="px-4 py-2.5 font-medium text-right">Transactions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && blocks.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-text-faint">
                Loading…
              </td>
            </tr>
          )}
          {!isLoading && blocks.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-text-faint">
                No blocks yet.
              </td>
            </tr>
          )}
          {blocks.map((block, i) => {
            const height = blockHeight(block)
            const hash = blockHash(block)
            return (
              <tr key={height ?? i} className="border-b border-border last:border-0 hover:bg-surface">
                <td className="px-4 py-2.5">
                  <Link to={`/block/${height}`} className="font-mono text-accent hover:underline">
                    {height ?? '—'}
                  </Link>
                </td>
                <td className="px-4 py-2.5">{hash ? <CopyableHash value={hash} /> : '—'}</td>
                <td className="px-4 py-2.5 text-text-dim">{relativeTime(blockTimestamp(block))}</td>
                <td className="px-4 py-2.5 text-right text-text-dim">{transactionCount(block) ?? 0}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
