import { LatestBlockStats } from '../components/blocks/LatestBlockCard'
import { RecentBlocksTable } from '../components/blocks/RecentBlocksTable'
import { PeersTable } from '../components/peers/PeersTable'

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <LatestBlockStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-text-dim">Recent blocks</h2>
          <RecentBlocksTable />
        </section>
        <section>
          <h2 className="mb-3 text-sm font-semibold text-text-dim">Peers</h2>
          <PeersTable />
        </section>
      </div>
    </div>
  )
}
