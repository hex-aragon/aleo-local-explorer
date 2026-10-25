import { Route, Routes } from 'react-router-dom'
import { Shell } from './components/layout/Shell'
import { Dashboard } from './routes/Dashboard'
import { BlockDetail } from './routes/BlockDetail'
import { TransactionDetail } from './routes/TransactionDetail'
import { Peers } from './routes/Peers'
import { Settings } from './routes/Settings'
import { History } from './routes/History'

function NotFound() {
  return <div className="text-sm text-text-dim">Page not found.</div>
}

function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="block/:heightOrHash" element={<BlockDetail />} />
        <Route path="transaction/:id" element={<TransactionDetail />} />
        <Route path="peers" element={<Peers />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
