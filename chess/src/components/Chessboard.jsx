import React, {useEffect, useState} from "react"
import ChessboardSquare from "./ChessboardSquare"

const Chessboard = ({board, turn}) => {
  const [currentChessboard, setCurrentChessboard] = useState([])
  useEffect(() => {
    setCurrentChessboard(turn === "w" ? board.flat() : board.flat().reverse())
  }, [board, turn])

  function getXYPosition(i) {
    const x = turn === "w" ? i % 8 : Math.abs(i % 8 - 7)
    const y = turn === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8)
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
    <div className="chessboard">
      {currentChessboard.map((piece, i) => (
        <div key={i} className="square">
          <ChessboardSquare piece={piece} dark={isDark(i)} position={getPosition(i)}/>
        </div>
      ))}
    </div>
  )
}

export default Chessboard
