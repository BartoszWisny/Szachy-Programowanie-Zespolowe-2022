import React, {useState} from "react"
import modalresultdraw from "../assets/modalresultdraw.jpg"
import modalresultwinblack from "../assets/modalresultwinblack.jpg"
import modalresultwinwhite from "../assets/modalresultwinwhite.jpg"
import "./ModalResult.css"
import {useNavigate} from "react-router-dom"
import {BlurhashCanvas} from "react-blurhash"
import {LazyLoadImage} from "react-lazy-load-image-component"

const ModalResult = ({open, result, winner, online}) => {
  const [isLoaded, setLoaded] = useState(false)
  const [isLoadStarted, setLoadStarted] = useState(false)

  const handleLoad = () => {
    setLoaded(true)
  }

  const handleLoadStarted = () => {
    setLoadStarted(true)
  }
  
  const navigate = useNavigate()
  const homeRoute = () => {
    navigate("/")
  }

  function refreshPage() {
    if (online) {
      navigate("/play/1vs1online")
    } else {
      window.location.reload(false)
    }
  }

  const modalresultwinwhitehash="MAGuH;~W?GI:E2xa9H-oxtIU~A9aE2%2xt"
  const modalresultwinblackhash="MLLV?b9ur?~AE3?a%1jFoe-o$fR*j[M|-o"
  const modalresultdrawhash="M8E_{m~p9F00xB4TM_o#-;xutSNGtR-;j["

  return (open ?
    <div className="overlayresult">
      <div className="modalresult_container">
        <LazyLoadImage src={winner === "w" ? modalresultwinwhite : (winner === "b" ? modalresultwinblack : modalresultdraw)} 
        className="modalresult_image" alt="chess" onLoad={handleLoad} beforeLoad={handleLoadStarted} />
        {!isLoaded && isLoadStarted && 
        (<BlurhashCanvas className="modalresult_blurhash" 
        hash={winner === "w" ? modalresultwinwhitehash : (winner === "b" ? modalresultwinblackhash : modalresultdrawhash)} 
        punch={1} />)}
        <div className="modalresult_content">
          <h1 className="modalresult_title" style={{fontSize: "min(2rem, min(4.5vw, 4.5vh))"}}>GAME OVER</h1>
          <p className="modalresult_result" style={{fontSize: "min(1rem, min(2.25vw, 2.25vh))"}}>{result}</p>
          <button className="modalresult_button1" onClick={refreshPage}>Play again</button>
          <button className="modalresult_button2" onClick={homeRoute}>Return to homepage</button>
        </div>
      </div>
    </div>
    : null
  )
}

export default ModalResult
