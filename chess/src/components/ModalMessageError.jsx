import React, {useState} from "react"
import modalmessageerror from "../assets/modalmessageerror.jpg"
import "./ModalMessageError.css"
import {useNavigate} from "react-router-dom"
import {BlurhashCanvas} from "react-blurhash"
import {LazyLoadImage} from "react-lazy-load-image-component"

const ModalMessageError = ({emailerr, firebaseerr}) => {
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

  function refreshPage() {
    window.location.reload(false);
  }

  const modalmessageerrorhash="MCK^KE^%-j%LjE_MNLRPIUWBR=W?Rkx]M{"

  return ((emailerr || firebaseerr) ?
    <div className="overlaymessageerror">
      <div className="modalmessageerror_container">
        <LazyLoadImage src={modalmessageerror} 
        className="modalmessageerror_image" alt="chess" onLoad={handleLoad} beforeLoad={handleLoadStarted} />
        {!isLoaded && isLoadStarted && 
        (<BlurhashCanvas className="modalmessageerror_blurhash" 
        hash={modalmessageerrorhash} 
        punch={1} />)}
        <div className="modalmessageerror_content">
          <h1 className="modalmessageerror_title" style={{fontSize: "min(2rem, min(5vw, 5vh))"}}>MESSAGE NOT SENT</h1>
          <button className="modalmessageerror_button1" onClick={refreshPage}>Return to this page</button>
          <button className="modalmessageerror_button2" onClick={homeRoute}>Return to homepage</button>
        </div>
      </div>
    </div> 
    : null
  )
}

export default ModalMessageError
