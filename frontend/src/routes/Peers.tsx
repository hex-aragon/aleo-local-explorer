import { usePeersMetrics } from '../hooks/useAleoQueries'
import { PeersTable } from '../components/peers/PeersTable'
import { RawJsonView } from '../components/common/RawJsonView'

export function Peers() {
  const { data: metrics } = usePeersMetrics()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Peers</h1>
      <PeersTable />
      {metrics !== undefined && (
        <div>
          <h2 className="mb-2 text-sm font-semibold text-text-dim">Metrics</h2>
          <RawJsonView data={metrics} label="Peer metrics (raw)" />
        </div>
      )}
    </div>
  )
}
