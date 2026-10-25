# Aleo Local Explorer — indexer (optional)

The hosted explorer talks to your Aleo node live, which only covers what the
node itself can currently serve. This indexer is an **optional** local
service you can run yourself to keep a growing SQLite history of blocks, so
the explorer's History page has something to page through beyond that.

Nothing else depends on this — the frontend works fully without it.

## Setup

```
cd indexer
npm install
cp .env.example .env   # adjust ALEO_RPC_URL / ALEO_NETWORK if needed
npm start
```

This starts an API on `http://localhost:4000` and begins backfilling block
history into `data/aleo-local-explorer.sqlite`, starting from height 0 and
catching up to your node's latest height, then continuing to poll.

Point the explorer at it: open **Settings** in the app and set
**History API URL** to `http://localhost:4000`.

## API

- `GET /health`
- `GET /blocks?limit=25&before=<height>` — paginated, newest first
- `GET /blocks/:heightOrHash`
- `GET /peers/latest`
