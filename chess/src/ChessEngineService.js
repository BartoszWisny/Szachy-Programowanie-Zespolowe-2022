export async function getEngineMove(fen) {
  const url = `https://chessengine-production-e09c.up.railway.app/api/json_getmove/${fen}/`
  const response = await fetch(url)
  return await response.json()
}
