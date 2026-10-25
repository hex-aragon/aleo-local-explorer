function buildUrl(baseUrl, network, path) {
  const base = baseUrl.replace(/\/+$/, '')
  const net = network.replace(/^\/+|\/+$/g, '')
  const cleanPath = path.replace(/^\/+/, '')
  return `${base}/${net}/${cleanPath}`
}

async function rpcFetch(baseUrl, network, path) {
  const url = buildUrl(baseUrl, network, path)
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} — ${url}`)
  }
  return res.json()
}

function getLatestHeight(baseUrl, network) {
  return rpcFetch(baseUrl, network, '/block/height/latest')
}

function getBlocksRange(baseUrl, network, start, end) {
  return rpcFetch(baseUrl, network, `/blocks?start=${start}&end=${end}`)
}

function getPeersAll(baseUrl, network) {
  return rpcFetch(baseUrl, network, '/peers/all')
}

module.exports = { getLatestHeight, getBlocksRange, getPeersAll }
