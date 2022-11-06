import {Chess} from "chess.js"
import {BehaviorSubject} from "rxjs"

const chess = new Chess()
export const gameSubject = new BehaviorSubject({
  board: chess.board()
})

export function initGame() {
  updateGame()
}

export function resetGame() {
  chess.reset();
  updateGame();
}

export function handleMove(from, to) {
  const promotions = chess.moves({verbose: true}).filter(move => move.promotion)

  if (promotions.some(promotion => `${promotion.from}:${promotion.to}` === `${from}:${to}`)) {
    const pendingPromotion = {from, to, color: promotions[0].color}
    updateGame(pendingPromotion)
  }

  const {pendingPromotion} = gameSubject.getValue()

  if (!pendingPromotion) {
    move(from, to)
  }

  move(from, to)
}

export function getPossibleMoves(from) {
  const moves = chess.moves({verbose: true}).filter(move => move.from === from)
  const squares = moves.map((i) => i.to)
  return squares
}

export function move(from, to, promotion) {
  const temporaryMove = {from, to}

  if (promotion) {
    temporaryMove.promotion = promotion
  }

  const isLegal = chess.move(temporaryMove)

  if (isLegal) {
    updateGame()
  }
}

function updateGame(pendingPromotion) {
  const isGameOver = chess.isGameOver()

  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    turn: chess.turn(),
    result: isGameOver ? getGameResult() : null,
    winner: winner()
  }

  gameSubject.next(newGame)
}

function getGameResult() {
  if (chess.isCheckmate()) {
    const winner = chess.turn() === "w" ? "Black" : "White"
    return `${winner} is the winner by checkmate!`
  } else if (chess.isDraw()) {
    let reason = "50-move rule"

    if (chess.isStalemate()) {
      reason = "stalemate"
    } else if (chess.isThreefoldRepetition()) {
      reason = "threefold repetition"
    } else if (chess.isInsufficientMaterial()) {
      reason = "insufficient material"
    }

    return `Draw by ${reason}!`
  } else {
    return "Unknown result!"
  }
}

function winner() {
  if (chess.isCheckmate()) {
    return chess.turn() === "w" ? "b" : "w"
  } else if (chess.isDraw()) {
    return "d"
  }
}
