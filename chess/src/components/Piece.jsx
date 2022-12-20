import React from "react"
import {useDrag, DragPreviewImage} from "react-dnd"
import {getPossibleMoves} from "./Game"

const Piece = ({piece: {type, color}, position, turn, boardtype}) => {  
  const [{isDragging}, drag, preview] = useDrag({
    type: "piece",
    item: {id: `${position}_${type}_${color}`},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const image = require(`../assets/chessboard/${type}_${color}.png`)

  return ( /* get starting color of player -> if not player then ref should be null */
    <div>
      <DragPreviewImage className="previewimage" connect={preview} src={image} />
      <div className="piececontainer" ref={boardtype === "1vs1offline" ? (turn === color ? drag : null) 
      : (color === "w" ? drag : null)} 
      style={{opacity: isDragging ? 0 : 1, cursor: "grab"}}>
        <img src={image} alt="chess" className={`piece_${type}`} />
      </div>
      {isDragging ? getPossibleMoves(position).map((pos, i) => (
        <div key={i}
          style={{
            background: pos[1] ? "rgba(255, 0, 0, 0.7)" : "rgba(0, 255, 0, 0.7)",
            width: "30%",
            height: "30%",
            position: "absolute", 
            left: ((pos[0].charCodeAt(0) - position.charCodeAt(0)) * 100 + 35 * 
                  (boardtype === "1vs1offline" ? (turn === "w" ? 1 : -1) : 1)) * 
                  (boardtype === "1vs1offline" ? (turn === "w" ? 1 : -1) : 1) + "%", 
            top: ((position.charCodeAt(1) - pos[0].charCodeAt(1)) * 100 + 35 * 
                 (boardtype === "1vs1offline" ? (turn === "w" ? 1 : -1) : 1)) * 
                 (boardtype === "1vs1offline" ? (turn === "w" ? 1 : -1) : 1) + "%",
            borderRadius: "15px",
            zIndex: 1,
            pointerEvents: "none",
        }} />
      )) : null}
    </div>
  )
}

export default Piece
