CREATE TABLE IF NOT EXISTS blocks (
  height INTEGER PRIMARY KEY,
  hash TEXT UNIQUE,
  previous_hash TEXT,
  raw_json TEXT NOT NULL,
  indexed_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS peer_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  raw_json TEXT NOT NULL,
  captured_at INTEGER NOT NULL
);
