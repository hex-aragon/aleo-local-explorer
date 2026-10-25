import { useParams } from 'react-router-dom'
import { useTransaction } from '../hooks/useAleoQueries'
import { CopyableHash } from '../components/common/CopyableHash'
import { RawJsonView } from '../components/common/RawJsonView'

export function TransactionDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: tx, isLoading, isError, error } = useTransaction(id)

  if (isLoading) {
    return <div className="text-sm text-text-dim">Loading transaction…</div>
  }

  if (isError || !tx) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-text-dim">
        Couldn't find transaction <span className="font-mono">{id}</span>.
        {error instanceof Error && <div className="mt-2 text-text-faint">{error.message}</div>}
      </div>
    )
  }

  const type = (tx as Record<string, unknown>).type

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Transaction</h1>
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="text-xs font-medium uppercase tracking-wide text-text-faint">ID</div>
        <div className="mt-1.5">{id && <CopyableHash value={id} head={16} tail={10} />}</div>
        {typeof type === 'string' && (
          <>
            <div className="mt-3 text-xs font-medium uppercase tracking-wide text-text-faint">Type</div>
            <div className="mt-1 text-sm">{type}</div>
          </>
        )}
      </div>
      <RawJsonView data={tx} label="Full transaction (raw)" />
    </div>
  )
}
