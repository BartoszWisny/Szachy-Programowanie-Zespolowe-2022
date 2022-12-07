export async function getMove(fen) {
  const response = await fetch(`/api/json_getmove/${fen}`);
  return await response.json();
}
