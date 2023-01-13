import React, {useState} from "react"
import modalpuzzles from "../assets/modalpuzzles.jpg"
import "./ModalPuzzles.css"
import {useNavigate} from "react-router-dom"
import {BlurhashCanvas} from "react-blurhash"
import {LazyLoadImage} from "react-lazy-load-image-component"

const ModalPuzzles = ({open}) => {
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
    window.location.reload(false)
  }

  const modalpuzzleshash="MED9-.%$GG~B=|K+-n~9S~TL#%%g%$-p%M"

  return (open ?
    <div className="overlaypuzzles">
      <div className="modalpuzzles_container">
        <LazyLoadImage src={modalpuzzles} className="modalpuzzles_image" alt="chess" onLoad={handleLoad} 
        beforeLoad={handleLoadStarted} />
        {!isLoaded && isLoadStarted && (<BlurhashCanvas className="modalpuzzles_blurhash" hash={modalpuzzleshash} punch={1} />)}
        <div className="modalpuzzles_content">
          <h1 className="modalpuzzles_title" style={{fontSize: "min(2rem, min(4.5vw, 4.5vh))"}}>CONGRATULATIONS</h1>
          <p className="modalpuzzles_result" style={{fontSize: "min(1rem, min(2.25vw, 2.25vh))"}}>Puzzle has been solved correctly</p>
          <button className="modalpuzzles_button1" onClick={homeRoute}>Return to homepage</button>
          <button className="modalpuzzles_button2" onClick={refreshPage}>Next puzzle</button>
        </div>
      </div>
    </div>
    : null
  )
}

export default ModalPuzzles
