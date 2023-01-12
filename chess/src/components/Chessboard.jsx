import React, {useCallback, useEffect, useState, useRef, useMemo} from "react"
import ChessboardSquare from "./ChessboardSquare"
import {getEngineFen, move, getLastMoveCaptured, handleMove, getMove, getStockfishFen, getChessDBFen, moveAN} from "./Game"
import Stockfish from "../components/Stockfish"
import moveSound from "../assets/sounds/move.mp3"
import captureSound from "../assets/sounds/capture.mp3"
import silenceSound from "../assets/sounds/silence.mp3"

const Chessboard = ({playerPieces, isGameOver, board, turn, boardtype, engine, stockfishLevel, puzzleMoves, puzzleFen}) => {
  const [currentChessboard, setCurrentChessboard] = useState([])
  const [ourChessEngineMove, setOurChessEngineMove] = useState("")
  const [stockfishMove, setStockfishMove] = useState("")
  const [chessDBMove, setChessDBMove] = useState("")
  const [engineSource, setEngineSource] = useState("")
  const [puzzleMoveCounter, setPuzzleMoveCounter] = useState(0)
  const [sound, setSound] = useState(false)

  function playMoveSound() {
    new Audio(moveSound).play().then(() => {
    }).catch(error => {
    })
  }

  function playCaptureSound() {
    new Audio(captureSound).play().then(() => {
    }).catch(error => {
    })
  }

  function playSilenceSound() {
    new Audio(silenceSound).play().then(() => {
    }).catch(error => {
    })
  }

  const chessEngineMove = useCallback(async () => {
    const fen = getEngineFen()
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

  const stockfish = useMemo(() => {
    return new Stockfish()
  }, [])
  
  if (stockfishLevel) {
    stockfish.setSkillLevel(stockfishLevel)
  }
  
  stockfish.setMoveTime(500)

  const stockfishEngineMove = useCallback(() => {
    const getMove = setInterval(() => {
      setEngineSource("stockfish")  
      const bestMove = stockfish.getBestMove()
        
      if (!bestMove && !stockfish.isThinking) {
        stockfish.searchBestMoveMoveTime(getStockfishFen())
      } else if (bestMove) {
        setStockfishMove(bestMove)
        stockfish.bestMove = null
        const positions = stockfishMove.split(' ')

        if (positions.length === 2) {
          move(positions[0], positions[1])
        } else if (positions.length === 3) {
          move(positions[0], positions[1], positions[2])
        }

        clearInterval(getMove)
      }
    }, 1000)
  }, [stockfish, stockfishMove])

  const chessDBEngineMove = useCallback(async () => {
    const fen = getChessDBFen()
    const url = `https://www.chessdb.cn/cdb.php?action=querybest&board=${fen}&json=1`
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.status === "ok") {
      setEngineSource("chessdb")
      setChessDBMove(data.move)
      const positions = data.move.match("^([a-h][1-8])([a-h][1-8])([qrbn])?")
      setSound(!sound)

      if (positions.length === 3) {
        move(positions[1], positions[2])
      } else if (positions.length === 4) {
        move(positions[1], positions[2], positions[3])
      }

      if (chessDBMove !== "" && sound === true) { 
        if (getLastMoveCaptured()) {
          playCaptureSound()
        } else {
          playMoveSound()
        }
      }
    } else if (data.status === "nobestmove") {
      setEngineSource("stockfish")
      stockfishEngineMove()
    }
  }, [chessDBMove, sound, stockfishEngineMove])

  useEffect(() => {
    if (boardtype === "vsourchessai" && turn === (playerPieces === "w" ? "b" : "w") && !isGameOver) {
      chessEngineMove()
    }
  }, [playerPieces, isGameOver, turn, boardtype, ourChessEngineMove, chessEngineMove])

  useEffect(() => {
    if (boardtype === "vscomputer" && turn === (playerPieces === "w" ? "b" : "w") && engine === "stockfish" && !isGameOver) {
      stockfishEngineMove()
    }
  }, [playerPieces, isGameOver, turn, boardtype, engine, stockfishMove, stockfishEngineMove])

  useEffect(() => {
    if (boardtype === "vscomputer" && turn === (playerPieces === "w" ? "b" : "w") && engine === "chessdb" && !isGameOver) {
      chessDBEngineMove()
    }
  }, [playerPieces, isGameOver, turn, boardtype, engine, chessDBMove, chessDBEngineMove])

  useEffect(() => {
    if (boardtype === "puzzles" && turn === (playerPieces === "w" ? "b" : "w")) {
      if (puzzleMoveCounter <= puzzleMoves.length - 1) {
        setTimeout(function() {
          moveAN(puzzleMoves[puzzleMoveCounter])
          setPuzzleMoveCounter(puzzleMoveCounter + 1)
        }, 1000)
      }
    }
  }, [playerPieces, turn, boardtype, puzzleMoves, puzzleMoveCounter])

  useEffect(() => {
    if (boardtype === "1vs1offline") {
      setCurrentChessboard(turn === "w" ? board.flat() : board.flat().reverse())
    } else if (boardtype === "vsourchessai") {
      setCurrentChessboard(playerPieces === "w" ? board.flat() : board.flat().reverse())
    } else if (boardtype === "vscomputer") {
      if (sound === true && turn === playerPieces) { 
        if (getLastMoveCaptured()) {
          playCaptureSound()
        } else {
          playMoveSound()
        }
      }

      setSound(true && getStockfishFen() !== "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" && engineSource === "stockfish")
      setCurrentChessboard(playerPieces === "w" ? board.flat() : board.flat().reverse())
    } else if (boardtype === "puzzles") {
      if (sound === true && turn === playerPieces) { 
        if (getLastMoveCaptured()) {
          playCaptureSound()
        } else {
          playMoveSound()
        }
      }

      setSound(true && getStockfishFen() !== puzzleFen)
      setCurrentChessboard(playerPieces === "w" ? board.flat() : board.flat().reverse())
    } else {
      setCurrentChessboard(board.flat())
    }
  }, [playerPieces, board, turn, boardtype, sound, engineSource])

  function getXYPosition(i) {
    const x = boardtype === "1vs1offline" ? (turn === "w" ? i % 8 : Math.abs(i % 8 - 7)) 
              : (boardtype === "vsourchessai" || boardtype === "vscomputer" || boardtype === "puzzles" ? 
              (playerPieces === "w" ? i % 8 : Math.abs(i % 8 - 7)) 
              : i % 8)
    const y = boardtype === "1vs1offline" ? (turn === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8)) 
              : (boardtype === "vsourchessai" || boardtype === "vscomputer" || boardtype === "puzzles" ? 
              (playerPieces === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8)) 
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

  const [positionClicked, setPositionClicked] = useState(null)
  const previousPositionClicked = useRef();

  useEffect(() => {
    previousPositionClicked.current = positionClicked;
  }, [positionClicked])

  function handleClicked(positionClicked) {
    setPositionClicked(positionClicked)
    if (previousPositionClicked.current != null && positionClicked != null) {
      const move = getMove(previousPositionClicked.current, positionClicked)
      const captured = move.map((i) => (i.captured))
      move.length !== 0 ? (captured[0] ? playCaptureSound() : playMoveSound()) : playSilenceSound()
      handleMove(previousPositionClicked.current, positionClicked)
    }
  }

  return (
    <div className="chessboard" style={{pointerEvents: isGameOver ? "none" : "null"}}>
      {currentChessboard.map((piece, i) => (
        <div key={i} className="square">
          <ChessboardSquare playerPieces={playerPieces} piece={piece} dark={isDark(i)} position={getPosition(i)}
          turn={turn} boardtype={boardtype} changePositionClicked={positionClicked => handleClicked(positionClicked)}/>
        </div>
      ))}
    </div>
  )
}

export default Chessboard
