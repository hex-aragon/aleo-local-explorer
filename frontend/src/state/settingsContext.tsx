import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { RpcConfig } from '../lib/aleoClient'

export const DEFAULT_RPC_URL = 'http://localhost:3030'
export const DEFAULT_NETWORK = 'testnet'

interface SettingsContextValue {
  rpcUrl: string
  network: string
  historyApiUrl: string
  rpcConfig: RpcConfig
  setRpcUrl: (value: string) => void
  setNetwork: (value: string) => void
  setHistoryApiUrl: (value: string) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [rpcUrl, setRpcUrl] = useLocalStorage('aleo-explorer:rpcUrl', DEFAULT_RPC_URL)
  const [network, setNetwork] = useLocalStorage('aleo-explorer:network', DEFAULT_NETWORK)
  const [historyApiUrl, setHistoryApiUrl] = useLocalStorage('aleo-explorer:historyApiUrl', '')

  const rpcConfig = useMemo<RpcConfig>(() => ({ baseUrl: rpcUrl, network }), [rpcUrl, network])

  const value = useMemo<SettingsContextValue>(
    () => ({ rpcUrl, network, historyApiUrl, rpcConfig, setRpcUrl, setNetwork, setHistoryApiUrl }),
    [rpcUrl, network, historyApiUrl, rpcConfig, setRpcUrl, setNetwork, setHistoryApiUrl],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider')
  return ctx
}
