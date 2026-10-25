import { Link, useParams } from 'react-router-dom'
import { useBlock } from '../hooks/useAleoQueries'
import { blockHeight, blockTimestamp, get, relativeTime } from '../lib/format'
import { CopyableHash } from '../components/common/CopyableHash'
import { RawJsonView } from '../components/common/RawJsonView'
import { StatCard } from '../components/common/StatCard'

function txId(tx: unknown): string | undefined {
  const direct = get(tx, ['id'])
  if (typeof direct === 'string') return direct
  const nested = get(tx, ['transaction', 'id'])
  if (typeof nested === 'string') return nested
  return undefined
}

export function BlockDetail() {
  const { heightOrHash } = useParams<{ heightOrHash: string }>()
  const { data: block, isLoading, isError, error } = useBlock(heightOrHash)

  if (isLoading) {
    return <div className="text-sm text-text-dim">Loading block…</div>
  }

  if (isError || !block) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-text-dim">
        Couldn't find block <span className="font-mono">{heightOrHash}</span>.
        {error instanceof Error && <div className="mt-2 text-text-faint">{error.message}</div>}
      </div>
    )
  }

  const height = blockHeight(block)
  const timestamp = blockTimestamp(block)
  const hash = get(block, ['block_hash'])
  const previousHash = get(block, ['previous_hash'])
  const header = get(block, ['header']) as Record<string, unknown> | undefined
  const authority = get(block, ['authority'])
  const ratifications = get(block, ['ratifications'])
  const transactions = get(block, ['transactions'])
  const abortedTxIds = get(block, ['aborted_transaction_ids'])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Block {height ?? heightOrHash}</h1>
        {typeof height === 'number' && height > 0 && (
          <Link to={`/block/${height - 1}`} className="text-sm text-accent hover:underline">
            ← previous
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Hash" value={typeof hash === 'string' ? <CopyableHash value={hash} /> : '—'} />
        <StatCard
          label="Previous hash"
          value={typeof previousHash === 'string' ? <CopyableHash value={previousHash} /> : '—'}
        />
        <StatCard label="Timestamp" value={relativeTime(timestamp)} />
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-text-dim">Header</h2>
        <div className="rounded-xl border border-border bg-surface p-4">
          {header ? (
            <RawJsonView data={header} label="Header fields" />
          ) : (
            <span className="text-sm text-text-faint">No header data.</span>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-text-dim">
          Transactions {Array.isArray(transactions) ? `(${transactions.length})` : ''}
        </h2>
        <div className="overflow-hidden rounded-xl border border-border">
          {Array.isArray(transactions) && transactions.length > 0 ? (
            <ul>
              {transactions.map((tx, i) => {
                const id = txId(tx)
                return (
                  <li key={id ?? i} className="border-b border-border px-4 py-2.5 text-sm last:border-0">
                    {id ? (
                      <Link to={`/transaction/${id}`} className="font-mono text-accent hover:underline">
                        {id}
                      </Link>
                    ) : (
                      <RawJsonView data={tx} label={`Transaction #${i}`} />
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-text-faint">No transactions in this block.</div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <section>
          <h2 className="mb-2 text-sm font-semibold text-text-dim">Authority</h2>
          <div className="rounded-xl border border-border bg-surface p-4">
            <RawJsonView data={authority} label="Authority (raw)" />
          </div>
        </section>
        <section>
          <h2 className="mb-2 text-sm font-semibold text-text-dim">Ratifications</h2>
          <div className="rounded-xl border border-border bg-surface p-4">
            <RawJsonView data={ratifications} label="Ratifications (raw)" />
          </div>
        </section>
      </div>

      {Array.isArray(abortedTxIds) && abortedTxIds.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-text-dim">Aborted transactions</h2>
          <div className="rounded-xl border border-border bg-surface p-4">
            <RawJsonView data={abortedTxIds} label="Aborted transaction IDs" />
          </div>
        </section>
      )}

      <RawJsonView data={block} label="Full block (raw)" />
    </div>
  )
}
