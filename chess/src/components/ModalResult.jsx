import React from "react"
import modalresultdraw from "../assets/modalresultdraw.jpg"
import modalresultwinblack from "../assets/modalresultwinblack.jpg"
import modalresultwinwhite from "../assets/modalresultwinwhite.jpg"
import "./ModalResult.css"
import {useNavigate} from "react-router-dom"
import {resetGame} from "./Game"

const ModalResult = ({open, result, winner}) => {
  const navigate = useNavigate();
  const homeRoute = () => {
    navigate("/");
  };

  return (open ?
    <div className="overlay">
      <div className="modal_container">
        <img className="modal_image" src={winner === "w" ? 
        modalresultwinwhite : (winner === "b" ? modalresultwinblack : modalresultdraw)} alt="chess"/>
        <div className="modal_content">
          <h1>GAME OVER</h1>
          <p>{result}</p>
          <button className="modal_button1" onClick={resetGame}>Play again</button>
          <button className="modal_button2" onClick={homeRoute}>Return to homepage</button>
        </div>
      </div>
    </div>
    : null
  )
}

export default ModalResult
