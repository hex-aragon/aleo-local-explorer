import { useState } from 'react'
import { getLatestHeight } from '../lib/aleoClient'
import { DEFAULT_NETWORK, DEFAULT_RPC_URL, useSettings } from '../state/settingsContext'

type TestResult = { status: 'idle' } | { status: 'testing' } | { status: 'ok'; height: number } | { status: 'error'; message: string }

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-text-faint">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-accent focus:outline-none"
      />
    </label>
  )
}

export function Settings() {
  const { rpcUrl, network, historyApiUrl, setRpcUrl, setNetwork, setHistoryApiUrl } = useSettings()
  const [test, setTest] = useState<TestResult>({ status: 'idle' })

  const onTest = async () => {
    setTest({ status: 'testing' })
    try {
      const height = await getLatestHeight({ baseUrl: rpcUrl, network })
      setTest({ status: 'ok', height })
    } catch (err) {
      setTest({ status: 'error', message: err instanceof Error ? err.message : 'Request failed' })
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="text-lg font-semibold">Settings</h1>

      <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-text-dim">Node connection</h2>
        <Field label="RPC base URL" value={rpcUrl} onChange={setRpcUrl} placeholder={DEFAULT_RPC_URL} />
        <Field label="Network" value={network} onChange={setNetwork} placeholder={DEFAULT_NETWORK} />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onTest}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-dim transition-colors"
          >
            Test connection
          </button>
          {test.status === 'testing' && <span className="text-sm text-text-dim">Testing…</span>}
          {test.status === 'ok' && (
            <span className="text-sm text-success">Connected — latest height {test.height}</span>
          )}
          {test.status === 'error' && <span className="text-sm text-danger">{test.message}</span>}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-text-dim">Block history (optional)</h2>
        <p className="text-sm text-text-dim">
          By default this explorer only shows what your node can serve live. To browse history beyond that,
          run the optional local indexer from the repo's <code className="text-text-faint">indexer/</code>{' '}
          folder and point this at it.
        </p>
        <Field
          label="History API URL"
          value={historyApiUrl}
          onChange={setHistoryApiUrl}
          placeholder="http://localhost:4000"
        />
      </section>
    </div>
  )
}
