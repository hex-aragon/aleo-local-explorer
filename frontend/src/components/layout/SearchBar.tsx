import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { classifySearchTerm } from '../../lib/aleoClient'

export function SearchBar({ className = '' }: { className?: string }) {
  const [term, setTerm] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = term.trim()
    if (!value) return

    const kind = classifySearchTerm(value)
    if (kind === 'transactionId') {
      navigate(`/transaction/${value}`)
    } else {
      // height and block hash both resolve through the block route;
      // an unknown-shaped term is tried as a block lookup too, and the
      // block detail page falls back to a clear not-found state.
      navigate(`/block/${value}`)
    }
    setTerm('')
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search by block height, block hash, or transaction ID"
        className="w-full rounded-lg border border-border bg-surface px-3.5 py-2 text-sm text-text placeholder:text-text-faint focus:border-accent focus:outline-none"
      />
    </form>
  )
}
