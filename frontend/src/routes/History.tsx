import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistoryBlocks } from '../hooks/useHistoryApi'
import { useSettings } from '../state/settingsContext'
import { CopyableHash } from '../components/common/CopyableHash'

export function History() {
  const { historyApiUrl } = useSettings()
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const { data, isLoading, isError, error } = useHistoryBlocks(cursor)

  if (!historyApiUrl.trim()) {
    return (
      <div className="max-w-xl rounded-xl border border-border bg-surface p-6 text-sm text-text-dim">
        <h1 className="mb-2 text-base font-semibold text-text">Block history isn't set up</h1>
        <p>
          This explorer talks to your node live by default, which only covers what the node itself can
          serve. To browse deeper history, run the optional indexer:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-bg p-3 text-xs">
          {'cd indexer\nnpm install\nnpm start'}
        </pre>
        <p className="mt-3">
          Then set its URL (default <code className="text-text-faint">http://localhost:4000</code>) in{' '}
          <Link to="/settings" className="text-accent hover:underline">
            Settings
          </Link>
          .
        </p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-w-xl rounded-xl border border-border bg-surface p-6 text-sm text-text-dim">
        Couldn't reach the history API at <span className="font-mono">{historyApiUrl}</span>.
        {error instanceof Error && <div className="mt-2 text-text-faint">{error.message}</div>}
      </div>
    )
  }

  const blocks = data ?? []

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Block history</h1>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-xs uppercase tracking-wide text-text-faint">
              <th className="px-4 py-2.5 font-medium">Height</th>
              <th className="px-4 py-2.5 font-medium">Hash</th>
              <th className="px-4 py-2.5 font-medium">Indexed</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-text-faint">
                  Loading…
                </td>
              </tr>
            )}
            {!isLoading && blocks.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-text-faint">
                  No indexed blocks yet.
                </td>
              </tr>
            )}
            {blocks.map((b) => (
              <tr key={b.height} className="border-b border-border last:border-0 hover:bg-surface">
                <td className="px-4 py-2.5">
                  <Link to={`/block/${b.height}`} className="font-mono text-accent hover:underline">
                    {b.height}
                  </Link>
                </td>
                <td className="px-4 py-2.5">
                  <CopyableHash value={b.hash} />
                </td>
                <td className="px-4 py-2.5 text-text-dim">
                  {new Date(b.indexed_at * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {blocks.length > 0 && (
        <button
          type="button"
          onClick={() => setCursor(blocks[blocks.length - 1].height)}
          className="self-start rounded-lg border border-border px-3.5 py-2 text-sm text-text-dim hover:text-text transition-colors"
        >
          Load older
        </button>
      )}
    </div>
  )
}
