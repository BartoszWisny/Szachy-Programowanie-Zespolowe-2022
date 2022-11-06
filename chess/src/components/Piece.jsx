import React from "react"
import {useDrag, DragPreviewImage} from "react-dnd"
import {getPossibleMoves} from "./Game"

const Piece = ({piece: {type, color}, position, turn}) => {  
  const [{isDragging}, drag, preview] = useDrag({
    type: "piece",
    item: {id: `${position}_${type}_${color}`},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const image = require(`../assets/chessboard/${type}_${color}.png`)

  return (
    <div>
      <DragPreviewImage className="previewimage" connect={preview} src={image} />
      <div className="piececontainer" ref={drag} style={{opacity: isDragging ? 0 : 1}}>
        <img src={image} alt="chess" className={`piece_${type}`} />
      </div>
      {isDragging ? getPossibleMoves(position).map((pos) => (
        <div key={pos}
          style={{
            background: "red",
            width: "10%",
            height: "10%",
            position: "absolute", 
            left: ((pos.charCodeAt(0) - position.charCodeAt(0)) * 100 + 45 * (turn === "w" ? 1 : -1)) * (turn === "w" ? 1 : -1) + "%", 
            top: ((position.charCodeAt(1) - pos.charCodeAt(1)) * 100 + 45 * (turn === "w" ? 1 : -1)) * (turn === "w" ? 1 : -1) + "%",
            /* border: "2px solid red", */
            borderRadius: "5px",
            zIndex: 1,
        }} />
      )) : null}
    </div>
  )
}

export default Piece
