import React from "react"

const Square = ({children, playerPieces, dark, position, isMove, check, hintPuzzle, turn, boardtype}) => {
  const background = isMove ? "ismovesquare" : (hintPuzzle ? "hintsquare" : (check ? "checksquare"
  : (dark ? "darksquare" : "lightsquare")))
  const number = (position ? (position.charAt(0) === "a" ? position.charAt(1) : null) : null)
  const letter = (position ? (position.charAt(1) === "1" ? position.charAt(0) : null) : null)

  return (
    <div className={`${background} chessboardsquare`}>
      {children}
      {position ? <div>
        <h2 className="number" style={{color: dark ? "var(--lightsquare)" : "var(--darksquare)", 
        top: boardtype === "1vs1offline" ? (turn === "w" ? "min(0.1rem, min(0.225vh, 0.225vw))" : "min(3.5rem, min(7.875vh, 7.875vw))") 
        : (boardtype === "vsourchessai" || boardtype === "vscomputer" || boardtype === "puzzles" || boardtype === "1vs1online" || boardtype === "analyze" ? 
        (playerPieces === "w" ? "min(0.1rem, min(0.225vh, 0.225vw))" : "min(3.5rem, min(7.875vh, 7.875vw))") 
        : "min(0.1rem, min(0.225vh, 0.225vw))"), 
        left: boardtype === "1vs1offline" ? (turn === "w" ? "min(0.3rem, min(0.675vh, 0.675vw))" : "min(4.2rem, min(9.45vh, 9.45vw))") 
        : (boardtype === "vsourchessai" || boardtype === "vscomputer" || boardtype === "puzzles" || boardtype === "1vs1online" || boardtype === "analyze" ? 
        (playerPieces === "w" ? "min(0.3rem, min(0.675vh, 0.675vw))" : "min(4.2rem, min(9.45vh, 9.45vw))") 
        : "min(0.3rem, min(0.675vh, 0.675vw))"), 
        fontSize: "min(1rem, min(2.25vh, 2.25vw))", userSelect: "none"}}>{number}</h2>
        <h2 className="letter" style={{color: dark ? "var(--lightsquare)" : "var(--darksquare)", 
        bottom: boardtype === "1vs1offline" ? (turn === "w" ? "min(0.2rem, min(0.45vh, 0.45vw))" : "min(3.6rem, min(8.1vh, 8.1vw))") 
        : (boardtype === "vsourchessai" || boardtype === "vscomputer" || boardtype === "puzzles" || boardtype === "1vs1online" || boardtype === "analyze" ? 
        (playerPieces === "w" ? "min(0.2rem, min(0.45vh, 0.45vw))" : "min(3.6rem, min(8.1vh, 8.1vw))") 
        : "min(0.2rem, min(0.45vh, 0.45vw))"), 
        right: boardtype === "1vs1offline" ? (turn === "w" ? "min(0.3rem, min(0.675vh, 0.675vw))" : "min(4.1rem, min(9.225vh, 9.225vw))") 
        : (boardtype === "vsourchessai" || boardtype === "vscomputer" || boardtype === "puzzles" || boardtype === "1vs1online" || boardtype === "analyze" ? 
        (playerPieces === "w" ? "min(0.3rem, min(0.675vh, 0.675vw))" : "min(4.1rem, min(9.225vh, 9.225vw))") 
        : "min(0.3rem, min(0.675vh, 0.675vw))"), 
        fontSize: "min(1rem, min(2.25vh, 2.25vw))", userSelect: "none"}}>{letter}</h2>
      </div> : null}
    </div>
  )
}

export default Square
