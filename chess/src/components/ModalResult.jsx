import React, {useState} from "react"
import modalresultdraw from "../assets/modalresultdraw.jpg"
import modalresultwinblack from "../assets/modalresultwinblack.jpg"
import modalresultwinwhite from "../assets/modalresultwinwhite.jpg"
import "./ModalResult.css"
import {useNavigate} from "react-router-dom"
import {resetGame} from "./Game"
import {BlurhashCanvas} from "react-blurhash"
import {LazyLoadImage} from "react-lazy-load-image-component"

const ModalResult = ({open, result, winner}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    setLoadStarted(true);
  };
  
  const navigate = useNavigate();
  const homeRoute = () => {
    navigate("/");
  };

  const modalresultwinwhitehash="MAGuH;~W?GI:E2xa9H-oxtIU~A9aE2%2xt"
  const modalresultwinblackhash="MLLV?b9ur?~AE3?a%1jFoe-o$fR*j[M|-o"
  const modalresultdrawhash="M8E_{m~p9F00xB4TM_o#-;xutSNGtR-;j["

  return (open ?
    <div className="overlay">
      <div className="modal_container">
        <LazyLoadImage src={winner === "w" ? modalresultwinwhite : (winner === "b" ? modalresultwinblack : modalresultdraw)} 
        className="modal_image" alt="chess" onLoad={handleLoad} beforeLoad={handleLoadStarted} />
        {!isLoaded && isLoadStarted && 
        (<BlurhashCanvas className="modal_blurhash" 
        hash={winner === "w" ? modalresultwinwhitehash : (winner === "b" ? modalresultwinblackhash : modalresultdrawhash)} 
        punch={1} />)}
        <div className="modal_content">
          <h1 className="modal_title">GAME OVER</h1>
          <p className="modal_result">{result}</p>
          <button className="modal_button1" onClick={resetGame}>Play again</button>
          <button className="modal_button2" onClick={homeRoute}>Return to homepage</button>
        </div>
      </div>
    </div>
    : null
  )
}

export default ModalResult
