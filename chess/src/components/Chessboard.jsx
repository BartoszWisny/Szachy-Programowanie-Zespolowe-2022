import React, {useCallback, useEffect, useState} from "react"
import ChessboardSquare from "./ChessboardSquare"
import {getFen, handleMove} from "./Game"

const Chessboard = ({/* player, */ isGameOver, board, turn, boardtype}) => {
  const [currentChessboard, setCurrentChessboard] = useState([])
  const [ourChessEngineMove, setOurChessEngineMove] = useState("")

  const chessEngineMove = useCallback(async () => {
    const fen = getFen()
    const url = `https://chessengine-production-e09c.up.railway.app/api/json_getmove/${fen}/`
    const response = await fetch(url)
    const data = await response.json()
    setOurChessEngineMove(data[0])
    const positions = ourChessEngineMove.split(' ')
    handleMove(positions[0], positions[1])
  }, [ourChessEngineMove])

  useEffect(() => { // what about pawn promotion???
    if (boardtype === "vsourchessai" && turn === "b") {
      chessEngineMove()
    }
  }, [turn, boardtype, ourChessEngineMove, chessEngineMove])

  useEffect(() => {
    if (boardtype === "1vs1offline") {
      setCurrentChessboard(turn === "w" ? board.flat() : board.flat().reverse())
    } else {
      setCurrentChessboard(board.flat())
    }
  }, [board, turn, boardtype])

  function getXYPosition(i) {
    const x = boardtype === "1vs1offline" ? (turn === "w" ? i % 8 : Math.abs(i % 8 - 7)) : i % 8
    const y = boardtype === "1vs1offline" ? (turn === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8)) 
              : Math.abs(Math.floor(i / 8) - 7)
    return {x, y}
  }

  function isDark(i) {
    const {x, y} = getXYPosition(i)
    return (x + y) % 2 === 0
  }

  function getPosition(i) {
    const {x, y} = getXYPosition(i)
    const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x]
    return `${letter}${y + 1}`
  }

  return (
    <div className="chessboard" style={{pointerEvents: isGameOver ? "none" : "null"}}>
      {currentChessboard.map((piece, i) => (
        <div key={i} className="square">
          <ChessboardSquare piece={piece} dark={isDark(i)} position={getPosition(i)} turn={turn} boardtype={boardtype}/>
        </div>
      ))}
    </div>
  )
}

export default Chessboard
