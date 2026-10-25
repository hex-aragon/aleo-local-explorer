import { usePeers } from '../../hooks/useAleoQueries'

function peerLabel(peer: unknown): string {
  if (typeof peer === 'string') return peer
  if (peer && typeof peer === 'object') {
    const obj = peer as Record<string, unknown>
    const candidate = obj.ip ?? obj.address ?? obj.addr
    if (typeof candidate === 'string') return candidate
  }
  return JSON.stringify(peer)
}

export function PeersTable() {
  const { data, isLoading, isError } = usePeers()

  if (isError) {
    return <div className="text-sm text-text-dim">Couldn't load peers.</div>
  }

  const peers = data ?? []

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface text-left text-xs uppercase tracking-wide text-text-faint">
            <th className="px-4 py-2.5 font-medium">#</th>
            <th className="px-4 py-2.5 font-medium">Peer</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && peers.length === 0 && (
            <tr>
              <td colSpan={2} className="px-4 py-6 text-center text-text-faint">
                Loading…
              </td>
            </tr>
          )}
          {!isLoading && peers.length === 0 && (
            <tr>
              <td colSpan={2} className="px-4 py-6 text-center text-text-faint">
                No peers connected.
              </td>
            </tr>
          )}
          {peers.map((peer, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-surface">
              <td className="px-4 py-2.5 text-text-faint">{i + 1}</td>
              <td className="px-4 py-2.5 font-mono text-text">{peerLabel(peer)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
