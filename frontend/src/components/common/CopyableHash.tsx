import { useState } from 'react'

function truncate(value: string, head: number, tail: number) {
  if (value.length <= head + tail + 3) return value
  return `${value.slice(0, head)}...${value.slice(-tail)}`
}

export function CopyableHash({
  value,
  head = 10,
  tail = 6,
  className = '',
}: {
  value: string
  head?: number
  tail?: number
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      title={value}
      className={`group inline-flex items-center gap-1.5 font-mono text-[13px] text-text hover:text-accent transition-colors ${className}`}
    >
      <span>{truncate(value, head, tail)}</span>
      <span className="text-text-faint group-hover:text-accent text-xs">
        {copied ? '✓' : '⧉'}
      </span>
    </button>
  )
}
