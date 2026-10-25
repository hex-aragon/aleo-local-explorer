const path = require('node:path')
const fs = require('node:fs')
const Database = require('better-sqlite3')

function openDb(dbPath) {
  const resolved = path.resolve(dbPath)
  fs.mkdirSync(path.dirname(resolved), { recursive: true })

  const db = new Database(resolved)
  db.pragma('journal_mode = WAL')

  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
  db.exec(schema)

  return db
}

module.exports = { openDb }
