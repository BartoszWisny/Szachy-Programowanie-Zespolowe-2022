import React, {useState, useEffect} from "react"
import Square from "./Square"
import Piece from "./Piece"
import {useDrop} from "react-dnd"
import {handleMove, gameSubject, isCheck, getTurn, getMove, getLastMove} from "./Game"
import Promotion from "./Promotion"
import moveSound from "../assets/sounds/move.mp3"
import captureSound from "../assets/sounds/capture.mp3"
import silenceSound from "../assets/sounds/silence.mp3"

const ChessboardSquare = ({playerPieces, piece, dark, position, turn, boardtype}) => {
  const [promotion, setPromotion] = useState(null)

  function playMoveSound() {
    new Audio(moveSound).play()
  }

  function playCaptureSound() {
    new Audio(captureSound).play()
  }

  function playSilenceSound() {
    new Audio(silenceSound).play()
  }

  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition, type, color] = item.id.split('_')
      const move = getMove(fromPosition, position)
      const captured = move.map((i) => (i.captured))
      move.length !== 0 && type && color === turn ? (captured[0] ? playCaptureSound() : playMoveSound()) : playSilenceSound()
      handleMove(fromPosition, position)
    }
  })

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({pendingPromotion}) => 
      pendingPromotion && pendingPromotion.to === position ? 
      setPromotion(pendingPromotion) 
      : setPromotion(null)
    )
    return () => subscribe.unsubscribe()
  }, [position])
  
  return (
    <div className="chessboardsquare" ref={boardtype === "1vs1offline" ? drop : (boardtype === "vsourchessai" ? 
      (playerPieces === turn ? drop : null) : (turn === "w" ? drop : null))}>
      <Square playerPieces={playerPieces} dark={dark} position={position} isMove={position === getLastMove()} check={isCheck() 
        && piece ? (piece.type === "k" && piece.color === getTurn() ? true : false) : false} turn={turn} 
        boardtype={boardtype}>
        {promotion && boardtype === "1vs1offline" ? <Promotion promotion={promotion} /> /* to be done for other types of boards */
        : (promotion && boardtype === "vsourchessai" && playerPieces === turn ? <Promotion promotion={promotion} />  
        : (piece ? (<Piece playerPieces={playerPieces} piece={piece} position={position} turn={turn} boardtype={boardtype}/>)
        : null))}
      </Square>
    </div>
  )
}

export default ChessboardSquare
