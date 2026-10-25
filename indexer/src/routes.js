const express = require('express')

function createRouter(db) {
  const router = express.Router()

  const listBlocks = db.prepare(
    'SELECT height, hash, previous_hash, indexed_at, raw_json FROM blocks ORDER BY height DESC LIMIT ?',
  )
  const listBlocksBefore = db.prepare(
    'SELECT height, hash, previous_hash, indexed_at, raw_json FROM blocks WHERE height < ? ORDER BY height DESC LIMIT ?',
  )
  const getBlockByHeight = db.prepare(
    'SELECT height, hash, previous_hash, indexed_at, raw_json FROM blocks WHERE height = ?',
  )
  const getBlockByHash = db.prepare(
    'SELECT height, hash, previous_hash, indexed_at, raw_json FROM blocks WHERE hash = ?',
  )
  const latestPeerSnapshot = db.prepare(
    'SELECT raw_json, captured_at FROM peer_snapshots ORDER BY id DESC LIMIT 1',
  )

  router.get('/health', (_req, res) => {
    res.json({ ok: true })
  })

  router.get('/blocks', (req, res) => {
    const parsedLimit = Number.parseInt(req.query.limit, 10)
    const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 100) : 25

    const parsedBefore = Number.parseInt(req.query.before, 10)
    const before = Number.isFinite(parsedBefore) ? parsedBefore : undefined

    const rows = before !== undefined ? listBlocksBefore.all(before, limit) : listBlocks.all(limit)
    res.json(rows)
  })

  router.get('/blocks/:heightOrHash', (req, res) => {
    const { heightOrHash } = req.params
    const row = /^\d+$/.test(heightOrHash)
      ? getBlockByHeight.get(Number(heightOrHash))
      : getBlockByHash.get(heightOrHash)

    if (!row) {
      res.status(404).json({ error: 'not found' })
      return
    }
    res.json({ ...row, block: JSON.parse(row.raw_json) })
  })

  router.get('/peers/latest', (_req, res) => {
    const row = latestPeerSnapshot.get()
    if (!row) {
      res.status(404).json({ error: 'no peer snapshots yet' })
      return
    }
    res.json({ captured_at: row.captured_at, peers: JSON.parse(row.raw_json) })
  })

  return router
}

module.exports = { createRouter }
