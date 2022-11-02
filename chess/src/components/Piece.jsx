import React from "react"
import {useDrag, DragPreviewImage} from "react-dnd"

const Piece = ({piece: {type, color}, position}) => {
  const [{isDragging}, drag, preview] = useDrag({
    type: "piece",
    item: {id: `${position}_{type}_${color}`},
    collect: (monitor) => {
      return {isDragging: !!monitor.isDragging()}
    }
  })

  const image = require(`../assets/chessboard/${type}_${color}.png`)

  return (
    <div>
      <DragPreviewImage className="previewimage" connect={preview} src={image} />
      <div className="piececontainer" ref={drag} style={{opacity: isDragging ? 0 : 1}}>
        <img src={image} alt="chess" className={`piece_${type}`} />
      </div>
    </div>
  )
}

export default Piece
