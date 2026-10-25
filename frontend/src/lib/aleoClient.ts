export interface RpcConfig {
  baseUrl: string
  network: string
}

export class AleoRpcError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.name = 'AleoRpcError'
    this.status = status
  }
}

function buildUrl({ baseUrl, network }: RpcConfig, path: string): string {
  const base = baseUrl.replace(/\/+$/, '')
  const net = network.replace(/^\/+|\/+$/g, '')
  const cleanPath = path.replace(/^\/+/, '')
  return `${base}/${net}/${cleanPath}`
}

async function rpcFetch<T>(config: RpcConfig, path: string, signal?: AbortSignal): Promise<T> {
  const url = buildUrl(config, path)
  let res: Response
  try {
    res = await fetch(url, { signal })
  } catch (err) {
    throw new AleoRpcError(
      `Could not reach ${url}. Is the node running and is the RPC URL correct?`,
    )
  }
  if (!res.ok) {
    throw new AleoRpcError(`${res.status} ${res.statusText} — ${url}`, res.status)
  }
  return (await res.json()) as T
}

// --- Blocks -----------------------------------------------------------

export function getLatestBlock(config: RpcConfig, signal?: AbortSignal) {
  return rpcFetch<Record<string, unknown>>(config, '/block/latest', signal)
}

export function getLatestHeight(config: RpcConfig, signal?: AbortSignal) {
  return rpcFetch<number>(config, '/block/height/latest', signal)
}

export function getBlock(config: RpcConfig, heightOrHash: string | number, signal?: AbortSignal) {
  return rpcFetch<Record<string, unknown>>(config, `/block/${heightOrHash}`, signal)
}

export function getBlocksRange(config: RpcConfig, start: number, end: number, signal?: AbortSignal) {
  return rpcFetch<Record<string, unknown>[]>(config, `/blocks?start=${start}&end=${end}`, signal)
}

// --- Transactions -------------------------------------------------------

export function getTransaction(config: RpcConfig, id: string, signal?: AbortSignal) {
  return rpcFetch<Record<string, unknown>>(config, `/transaction/${id}`, signal)
}

// --- Peers ----------------------------------------------------------------

export function getPeersAll(config: RpcConfig, signal?: AbortSignal) {
  return rpcFetch<string[]>(config, '/peers/all', signal)
}

export function getPeersAllMetrics(config: RpcConfig, signal?: AbortSignal) {
  return rpcFetch<Record<string, unknown>>(config, '/peers/all/metrics', signal)
}

// --- Misc -------------------------------------------------------------

export function getVersion(config: RpcConfig, signal?: AbortSignal) {
  return rpcFetch<string>(config, '/version', signal)
}

// --- Search helpers ---------------------------------------------------

export type SearchKind = 'height' | 'blockHash' | 'transactionId' | 'unknown'

export function classifySearchTerm(term: string): SearchKind {
  const trimmed = term.trim()
  if (/^\d+$/.test(trimmed)) return 'height'
  if (/^at1[a-z0-9]+$/i.test(trimmed)) return 'transactionId'
  if (/^ab1[a-z0-9]+$/i.test(trimmed)) return 'blockHash'
  return 'unknown'
}
