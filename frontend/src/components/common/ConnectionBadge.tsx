import { useConnectionStatus } from '../../hooks/useAleoQueries'

export function ConnectionBadge() {
  const { isError, isSuccess, isLoading } = useConnectionStatus()

  const state = isLoading ? 'checking' : isSuccess ? 'connected' : isError ? 'disconnected' : 'checking'

  const dotClass = {
    checking: 'bg-text-faint',
    connected: 'bg-success',
    disconnected: 'bg-danger',
  }[state]

  const label = {
    checking: 'Checking…',
    connected: 'Connected',
    disconnected: 'Disconnected',
  }[state]

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-dim">
      <span className={`h-2 w-2 rounded-full ${dotClass}`} />
      {label}
    </div>
  )
}
