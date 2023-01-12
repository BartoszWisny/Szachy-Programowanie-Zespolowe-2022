import React from "react"
import Square from "./Square"
import {move} from "./Game"

const promotionPieces = ['q', 'n', 'r', 'b']

const Promotion = ({promotion: {from, to, color}}) => {
  return ( 
    <div className="chessboard">
      {promotionPieces.map((piece, i) => (
        <div key={i} className="promotionsquare">
          <Square>
            <div className="promotioncontainer" onClick={() => move(from, to, piece)}>
              <img src={require(`../assets/chessboard/${piece}_${color}.png`)} 
              alt="chess" className={`promotionpiece_${piece}`}/>
            </div>
          </Square>
        </div>
      ))}
    </div>
  )
}

export default Promotion
