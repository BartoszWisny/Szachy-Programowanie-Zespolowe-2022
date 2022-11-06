import React from "react"

const Square = ({children, dark, position}) => {
  const background = dark ? "darksquare" : "lightsquare"
  const number = (position.charAt(0) === "a" ? position.charAt(1) : null)
  const letter = (position.charAt(1) === "1" ? position.charAt(0) : null)

  return (
    <div className={`${background} chessboardsquare`}>
      {children}
    </div>
  )
}

export default Square
