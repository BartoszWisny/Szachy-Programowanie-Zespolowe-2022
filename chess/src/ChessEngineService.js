export async function getMove(fen) {
  const url = `https://chessengine-production-e09c.up.railway.app/api/json_getmove/${fen}/`
  const response = await fetch(url)
  return await response.json()
}

// http://20.56.132.135:8080/api/json_getmove/rnbqkbnr_pppppppp_8_8_8_8_PPPPPPPP_RNBQKBNR%20w%20KQkq%20-%200%201
// http://chessengine.westeurope.cloudapp.azure.com:8080/