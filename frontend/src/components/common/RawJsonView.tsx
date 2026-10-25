export function RawJsonView({ data, label = 'Raw JSON' }: { data: unknown; label?: string }) {
  if (data === undefined || data === null) return null
  return (
    <details className="group mt-2">
      <summary className="cursor-pointer select-none text-xs text-text-faint hover:text-text-dim transition-colors">
        {label}
      </summary>
      <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-bg p-3 text-[12px] leading-relaxed text-text-dim">
        {JSON.stringify(data, null, 2)}
      </pre>
    </details>
  )
}
