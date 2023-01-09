import React, {useState, useEffect, useRef} from "react"
import {useDrag, DragPreviewImage} from "react-dnd"
import {getPossibleMoves} from "./Game"

const Piece = ({playerPieces, piece: {type, color}, position, turn, boardtype}) => {  
  const [{isDragging}, drag, preview] = useDrag({
    type: "piece",
    item: {id: `${position}_${type}_${color}`},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const useOutsideClick = (callback) => {
    const ref = useRef()
    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback()
        }
      }  
      document.addEventListener('click', handleClick)
      return () => {
        document.removeEventListener('click', handleClick)
      }
    }, [ref, callback])
    return ref
  }
  const [clicked, setClicked] = useState(false)
  const handleClickOutside = () => {
    setClicked(false)
  }
  const ref = useOutsideClick(handleClickOutside)
  const handleClick = () => {
    setClicked(true)
  }

  function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
  }

  const image = require(`../assets/chessboard/${type}_${color}.png`)

  return (
    <div ref={isTouchDevice() ? ref : drag}>
      <DragPreviewImage className="previewimage" connect={preview} src={image}/>
      <div className="piececontainer" ref={isTouchDevice() ? (boardtype === "1vs1offline" ? (turn === color ? ref : handleClickOutside) 
      : (boardtype === "vsourchessai" || boardtype === "vscomputer" ? (playerPieces === turn ? ref : handleClickOutside) : (color === "w" ? ref : handleClickOutside))) 
      : (boardtype === "1vs1offline" ? (turn === color ? drag : handleClickOutside) : (boardtype === "vsourchessai" || boardtype === "vscomputer" ? (playerPieces === turn ? drag : handleClickOutside) 
      : (color === "w" ? drag : handleClickOutside)))} style={{opacity: isDragging ? 0 : 1, cursor: "grab"}} onClick={handleClick}>
        <img src={image} alt="chess" className={`piece_${type}`} />
      </div>
      {(isDragging && !isTouchDevice()) || (clicked && isTouchDevice()) ? getPossibleMoves(position).map((pos, i) => (
        <div key={i}
          style={{
            background: pos[1] ? "rgba(255, 0, 0, 0.7)" : "rgba(0, 255, 0, 0.7)",
            width: "30%",
            height: "30%",
            position: "absolute", 
            left: ((pos[0].charCodeAt(0) - position.charCodeAt(0)) * 100 + 35 * 
                  (boardtype === "1vs1offline" ? (turn === "w" ? 1 : -1) 
                  : (boardtype === "vsourchessai" || boardtype === "vscomputer" ? (playerPieces === "w" ? 1 : -1)
                  : 1))) * 
                  (boardtype === "1vs1offline" ? (turn === "w" ? 1 : -1) 
                  : (boardtype === "vsourchessai" || boardtype === "vscomputer" ? (playerPieces === "w" ? 1 : -1)
                  : 1)) + "%", 
            top: ((position.charCodeAt(1) - pos[0].charCodeAt(1)) * 100 + 35 * 
                 (boardtype === "1vs1offline" ? (turn === "w" ? 1 : -1) 
                 : (boardtype === "vsourchessai" || boardtype === "vscomputer" ? (playerPieces === "w" ? 1 : -1)
                 : 1))) * 
                 (boardtype === "1vs1offline" ? (turn === "w" ? 1 : -1) 
                 : (boardtype === "vsourchessai" || boardtype === "vscomputer" ? (playerPieces === "w" ? 1 : -1)
                 : 1)) + "%",
            borderRadius: "15px",
            zIndex: 1,
            pointerEvents: "none",
        }} />
      )) : null}
    </div>
  )
}

export default Piece
