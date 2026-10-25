const { getLatestHeight, getBlocksRange, getPeersAll } = require('./aleoClient')

const MAX_BLOCK_RANGE = 50

function startPoller({ db, rpcUrl, network, intervalMs }) {
  const insertBlock = db.prepare(
    'INSERT OR REPLACE INTO blocks (height, hash, previous_hash, raw_json, indexed_at) VALUES (?, ?, ?, ?, ?)',
  )
  const insertPeerSnapshot = db.prepare(
    'INSERT INTO peer_snapshots (raw_json, captured_at) VALUES (?, ?)',
  )
  const getMaxHeight = db.prepare('SELECT MAX(height) as maxHeight FROM blocks')

  const insertBlocks = db.transaction((blocks) => {
    for (const block of blocks) {
      const height = block?.header?.metadata?.height
      if (typeof height !== 'number') continue
      const hash = typeof block?.block_hash === 'string' ? block.block_hash : null
      const previousHash = typeof block?.previous_hash === 'string' ? block.previous_hash : null
      insertBlock.run(height, hash, previousHash, JSON.stringify(block), Math.floor(Date.now() / 1000))
    }
  })

  let running = false

  // Backfills gap-aware: tracks the highest height already stored and pulls
  // forward from there in <=MAX_BLOCK_RANGE chunks until caught up, so a
  // slow poll interval never silently drops blocks the way a naive
  // "fetch /latest/block once a minute" loop would.
  async function tick() {
    if (running) return
    running = true
    try {
      const latestHeight = await getLatestHeight(rpcUrl, network)
      const { maxHeight } = getMaxHeight.get()
      let nextHeight = maxHeight === null ? 0 : maxHeight + 1

      while (nextHeight <= latestHeight) {
        const end = Math.min(nextHeight + MAX_BLOCK_RANGE, latestHeight + 1)
        const blocks = await getBlocksRange(rpcUrl, network, nextHeight, end)
        insertBlocks(blocks)
        nextHeight = end
      }

      try {
        const peers = await getPeersAll(rpcUrl, network)
        insertPeerSnapshot.run(JSON.stringify(peers), Math.floor(Date.now() / 1000))
      } catch (err) {
        console.error('[poller] failed to fetch peers:', err.message)
      }
    } catch (err) {
      console.error('[poller] tick failed:', err.message)
    } finally {
      running = false
    }
  }

  tick()
  const timer = setInterval(tick, intervalMs)
  return () => clearInterval(timer)
}

module.exports = { startPoller }
