import React from "react"

const Square = ({children, dark, position, check, turn}) => {
  const background = check ? "checksquare" : dark ? "darksquare" : "lightsquare"
  const number = (position.charAt(0) === "a" ? position.charAt(1) : null)
  const letter = (position.charAt(1) === "1" ? position.charAt(0) : null)

  return (
    <div className={`${background} chessboardsquare`}>
      {children}
      <h2 className="number" style={{color: dark ? "var(--lightsquare)" : "var(--darksquare)", 
      top: turn === "w" ? "0.1rem" : "3.5rem", left: turn === "w" ? "0.3rem" : "4.2rem"}}>{number}</h2>
      <h2 className="letter" style={{color: dark ? "var(--lightsquare)" : "var(--darksquare)", 
      bottom: turn === "w" ? "0.2rem" : "3.6rem", right: turn === "w" ? "0.3rem" : "4.1rem"}}>{letter}</h2>
    </div>
  )
}

export default Square