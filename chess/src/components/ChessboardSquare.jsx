import React, {useState, useEffect} from "react"
import Square from "./Square"
import Piece from "./Piece"
import {useDrop} from "react-dnd"
import {handleMove, gameSubject, isCheck, getTurn} from "./Game"
import Promotion from "./Promotion"

const ChessboardSquare = ({piece, dark, position, turn}) => {
  const [promotion, setPromotion] = useState(null)

  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split('_')
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
    <div className="chessboardsquare" ref={drop}>
      <Square dark={dark} position={position} check={isCheck() && piece ? (piece.type === "k" && piece.color === getTurn() ? true : false) : false}>
        {promotion ? <Promotion promotion={promotion} /> 
        : piece ? (<Piece piece={piece} position={position} turn={turn} />)
        : null}
      </Square>
    </div>
  )
}

export default ChessboardSquare
