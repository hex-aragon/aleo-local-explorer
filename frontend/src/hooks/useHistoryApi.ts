import { useQuery } from '@tanstack/react-query'
import { useSettings } from '../state/settingsContext'

export interface HistoryBlockRow {
  height: number
  hash: string
  previous_hash: string | null
  indexed_at: number
  raw_json: string
}

export function useHistoryBlocks(before?: number) {
  const { historyApiUrl } = useSettings()
  const enabled = historyApiUrl.trim().length > 0

  return useQuery({
    queryKey: ['history-blocks', historyApiUrl, before],
    queryFn: async ({ signal }) => {
      const base = historyApiUrl.replace(/\/+$/, '')
      const params = new URLSearchParams({ limit: '25' })
      if (before !== undefined) params.set('before', String(before))
      const res = await fetch(`${base}/blocks?${params}`, { signal })
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      return (await res.json()) as HistoryBlockRow[]
    },
    enabled,
    retry: false,
  })
}
