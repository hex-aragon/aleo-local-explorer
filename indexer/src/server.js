require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { openDb } = require('./db')
const { createRouter } = require('./routes')
const { startPoller } = require('./poller')

const PORT = Number(process.env.PORT) || 4000
const ALEO_RPC_URL = process.env.ALEO_RPC_URL || 'http://localhost:3030'
const ALEO_NETWORK = process.env.ALEO_NETWORK || 'testnet'
const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS) || 10000
const DB_PATH = process.env.DB_PATH || './data/aleo-local-explorer.sqlite'

const db = openDb(DB_PATH)

const app = express()
app.use(cors())
app.use(createRouter(db))

app.listen(PORT, () => {
  console.log(`Indexer API running on http://localhost:${PORT}`)
  console.log(`Polling ${ALEO_RPC_URL}/${ALEO_NETWORK} every ${POLL_INTERVAL_MS}ms`)
})

startPoller({ db, rpcUrl: ALEO_RPC_URL, network: ALEO_NETWORK, intervalMs: POLL_INTERVAL_MS })
