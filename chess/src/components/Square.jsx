import React from "react"

const Square = ({children, dark}) => {
  const background = dark ? "darksquare" : "lightsquare"

  return (
    <div className={`${background} chessboardsquare`}>
      {children}
    </div>
  )
}

export default Square
