import React, {useCallback, useEffect, useState} from "react"
import ChessboardSquare from "./ChessboardSquare"
import {getFen, move, getLastMoveCaptured} from "./Game"
import moveSound from "../assets/sounds/move.mp3"
import captureSound from "../assets/sounds/capture.mp3"

const Chessboard = ({playerPieces, isGameOver, board, turn, boardtype}) => {
  const [currentChessboard, setCurrentChessboard] = useState([])
  const [ourChessEngineMove, setOurChessEngineMove] = useState("")
  const [sound, setSound] = useState(false)

  function playMoveSound() {
    new Audio(moveSound).play()
  }

  function playCaptureSound() {
    new Audio(captureSound).play()
  }

  const chessEngineMove = useCallback(async () => {
    const fen = getFen()
    const url = `https://chessengine-production-e09c.up.railway.app/api/json_getmove/${fen}/`
    const response = await fetch(url)
    const data = await response.json()
    setOurChessEngineMove(data[0])
    const positions = ourChessEngineMove.split(' ')
    setSound(!sound)

    if (positions.length === 2) {
      move(positions[0], positions[1])
    } else if (positions.length === 3) {
      move(positions[0], positions[1], positions[2])
    }

    if (ourChessEngineMove !== "" && sound === true) { 
      if (getLastMoveCaptured()) {
        playCaptureSound()
      } else {
        playMoveSound()
      }
    }
  }, [ourChessEngineMove, sound])

  useEffect(() => {
    if (boardtype === "vsourchessai" && turn === (playerPieces === "w" ? "b" : "w") && !isGameOver) {
      chessEngineMove()
    }
  }, [playerPieces, isGameOver, turn, boardtype, ourChessEngineMove, chessEngineMove])

  useEffect(() => {
    if (boardtype === "1vs1offline") {
      setCurrentChessboard(turn === "w" ? board.flat() : board.flat().reverse())
    } else if (boardtype === "vsourchessai") {
      setCurrentChessboard(playerPieces === "w" ? board.flat() : board.flat().reverse())
    } else {
      setCurrentChessboard(board.flat())
    }
  }, [playerPieces, board, turn, boardtype])

  function getXYPosition(i) {
    const x = boardtype === "1vs1offline" ? (turn === "w" ? i % 8 : Math.abs(i % 8 - 7)) 
              : (boardtype === "vsourchessai" ? (playerPieces === "w" ? i % 8 : Math.abs(i % 8 - 7)) 
              : i % 8)
    const y = boardtype === "1vs1offline" ? (turn === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8)) 
              : (boardtype === "vsourchessai" ? (playerPieces === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8)) 
              : Math.abs(Math.floor(i / 8) - 7))
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
          <ChessboardSquare playerPieces={playerPieces} piece={piece} dark={isDark(i)} position={getPosition(i)}
          turn={turn} boardtype={boardtype}/>
        </div>
      ))}
    </div>
  )
}

export default Chessboard
