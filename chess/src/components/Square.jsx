import React from "react"

const Square = ({children, dark, position, isMove, check, turn, boardtype}) => {
  const background = isMove ? "ismovesquare" : (check ? "checksquare" : dark ? "darksquare" : "lightsquare")
  const number = (position ? (position.charAt(0) === "a" ? position.charAt(1) : null) : null)
  const letter = (position ? (position.charAt(1) === "1" ? position.charAt(0) : null) : null)

  return (
    <div className={`${background} chessboardsquare`}>
      {children}
      {position ? <div>
        <h2 className="number" style={{color: dark ? "var(--lightsquare)" : "var(--darksquare)", 
        top: boardtype === "1vs1offline" ? (turn === "w" ? "0.1rem" : "3.5rem") : "0.1rem", 
        left: boardtype === "1vs1offline" ? (turn === "w" ? "0.3rem" : "4.2rem") : "0.3rem"}}>{number}</h2>
        <h2 className="letter" style={{color: dark ? "var(--lightsquare)" : "var(--darksquare)", 
        bottom: boardtype === "1vs1offline" ? (turn === "w" ? "0.2rem" : "3.6rem") : "0.2rem", 
        right: boardtype === "1vs1offline" ? (turn === "w" ? "0.3rem" : "4.1rem") : "0.3rem"}}>{letter}</h2>
      </div> : null}
    </div>
  )
}

export default Square
