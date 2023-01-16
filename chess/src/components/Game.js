import {Chess} from "chess.js"
import {BehaviorSubject} from "rxjs"
import {NotificationManager} from "react-notifications"

// let promotion = "rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5"

const chess = new Chess()

export const gameSubject = new BehaviorSubject({
  board: chess.board()
})

export function initGame() {
  updateGame()
}

export function resetGame() {
  chess.reset()
  updateGame()
}

export function setGame(fen) {
  chess.load(fen)
  updateGame()
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
}

export function move(from, to, promotion, boardtype, puzzleMove) {
  const temporaryMove = {from, to}

  if (promotion) {
    temporaryMove.promotion = promotion
  }

  const isLegal = chess.move(temporaryMove)

  if (isLegal) {
    if (typeof boardtype === "undefined") {
      updateGame()
    } else {
      if (puzzleMove.from === from && puzzleMove.to === to) {
        if (typeof puzzleMove.promotion === "undefined") {
          updateGame()
          NotificationManager.success("Correct move!", '', 3000, () => {})
        } else if (promotion !== null) {
          if (puzzleMove.promotion === promotion) {
            updateGame()
            NotificationManager.success("Correct move!", '', 3000, () => {})
          } else {
            NotificationManager.error("Wrong move! Try again.", '', 3000, () => {})
            chess.undo()
            updateGame()
          }
        }
      } else {
        NotificationManager.error("Wrong move! Try again.", '', 3000, () => {})
        chess.undo()
        updateGame()
      }
    }
  }
}

export function moveAN(move) {
  chess.move(move, { sloppy: true })
  updateGame()
}

export function getHistory() {
  return chess.history()
}

export function getPiece(square) {
  return chess.get(square)
}

export function getPossibleMoves(from) {
  const moves = chess.moves({verbose: true}).filter(move => move.from === from)
  const squares = moves.map((i) => ([i.to, i.captured]))
  return squares
}

export function getLastMove() {
  let lastMove = chess.history({verbose: true}).slice(-1)
  return (lastMove.length > 0 ? lastMove[0].to : "")
}

export function getLastMoveCaptured() {
  let lastMove = chess.history({verbose: true}).slice(-1)
  return (lastMove.length > 0 ? (lastMove[0].captured ? true : false) : false)
}

export function isCheck() {
  return chess.isCheck()
}

export function getTurn() {
  return chess.turn()
}

export function getMove(from, to) {
  return chess.moves({verbose: true}).filter(move => move.from === from && move.to === to)
}

export function getEngineFen() {
  let fen = chess.fen().replaceAll("/", "_")
  return fen
}

export function getStockfishFen() {
  return chess.fen()
}

export function getChessDBFen() {
  return chess.fen()
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
