import { useQuery } from '@tanstack/react-query'
import {
  getBlock,
  getBlocksRange,
  getLatestBlock,
  getPeersAll,
  getPeersAllMetrics,
  getTransaction,
  getVersion,
} from '../lib/aleoClient'
import { useSettings } from '../state/settingsContext'

const LATEST_BLOCK_INTERVAL = 3000
const PEERS_INTERVAL = 8000
const RECENT_BLOCKS_WINDOW = 20

export function useLatestBlock() {
  const { rpcConfig } = useSettings()
  return useQuery({
    queryKey: ['block-latest', rpcConfig.baseUrl, rpcConfig.network],
    queryFn: ({ signal }) => getLatestBlock(rpcConfig, signal),
    refetchInterval: LATEST_BLOCK_INTERVAL,
    refetchIntervalInBackground: false,
    retry: false,
  })
}

function readHeight(block: Record<string, unknown> | undefined): number | undefined {
  const header = block?.header as Record<string, unknown> | undefined
  const metadata = header?.metadata as Record<string, unknown> | undefined
  const height = metadata?.height
  return typeof height === 'number' ? height : undefined
}

export function useRecentBlocks() {
  const { rpcConfig } = useSettings()
  const latest = useLatestBlock()
  const latestHeight = readHeight(latest.data)

  return useQuery({
    queryKey: ['blocks-range', rpcConfig.baseUrl, rpcConfig.network, latestHeight],
    queryFn: ({ signal }) => {
      const end = latestHeight! + 1
      const start = Math.max(0, end - RECENT_BLOCKS_WINDOW)
      return getBlocksRange(rpcConfig, start, end, signal)
    },
    enabled: latestHeight !== undefined,
    refetchInterval: LATEST_BLOCK_INTERVAL,
    refetchIntervalInBackground: false,
    retry: false,
  })
}

export function usePeers() {
  const { rpcConfig } = useSettings()
  return useQuery({
    queryKey: ['peers-all', rpcConfig.baseUrl, rpcConfig.network],
    queryFn: ({ signal }) => getPeersAll(rpcConfig, signal),
    refetchInterval: PEERS_INTERVAL,
    refetchIntervalInBackground: false,
    retry: false,
  })
}

export function usePeersMetrics() {
  const { rpcConfig } = useSettings()
  return useQuery({
    queryKey: ['peers-metrics', rpcConfig.baseUrl, rpcConfig.network],
    queryFn: ({ signal }) => getPeersAllMetrics(rpcConfig, signal),
    refetchInterval: PEERS_INTERVAL,
    refetchIntervalInBackground: false,
    retry: false,
  })
}

export function useBlock(heightOrHash: string | undefined) {
  const { rpcConfig } = useSettings()
  return useQuery({
    queryKey: ['block', rpcConfig.baseUrl, rpcConfig.network, heightOrHash],
    queryFn: ({ signal }) => getBlock(rpcConfig, heightOrHash!, signal),
    enabled: !!heightOrHash,
    retry: false,
  })
}

export function useTransaction(id: string | undefined) {
  const { rpcConfig } = useSettings()
  return useQuery({
    queryKey: ['transaction', rpcConfig.baseUrl, rpcConfig.network, id],
    queryFn: ({ signal }) => getTransaction(rpcConfig, id!, signal),
    enabled: !!id,
    retry: false,
  })
}

export function useConnectionStatus() {
  const { rpcConfig } = useSettings()
  return useQuery({
    queryKey: ['version', rpcConfig.baseUrl, rpcConfig.network],
    queryFn: ({ signal }) => getVersion(rpcConfig, signal),
    refetchInterval: LATEST_BLOCK_INTERVAL,
    refetchIntervalInBackground: false,
    retry: false,
  })
}
