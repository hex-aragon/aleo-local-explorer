import { NavLink, Outlet } from 'react-router-dom'
import { ConnectionBadge } from '../common/ConnectionBadge'
import { SearchBar } from './SearchBar'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/peers', label: 'Peers' },
  { to: '/history', label: 'History' },
  { to: '/settings', label: 'Settings' },
]

function navLinkClass(isActive: boolean) {
  return `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-surface-2 text-text' : 'text-text-dim hover:text-text'
  }`
}

export function Shell() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2 pr-2">
            <div className="h-6 w-6 rounded-md bg-accent" />
            <span className="font-semibold">Aleo Local Explorer</span>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => navLinkClass(isActive)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <ConnectionBadge />
          </div>
          <div className="order-last w-full sm:order-none sm:w-80">
            <SearchBar />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
