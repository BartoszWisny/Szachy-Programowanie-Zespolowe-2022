import React, {useState} from "react"
import modalmessagesent from "../assets/modalmessagesent.jpg"
import "./ModalMessageSent.css"
import {useNavigate} from "react-router-dom"
import {BlurhashCanvas} from "react-blurhash"
import {LazyLoadImage} from "react-lazy-load-image-component"

const ModalMessageSent = ({emailsent, firebasesent}) => {
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

  const modalmessagesenthash="MPJkJ*-U4T%MIV*0E2D%tRogRPRiWXxuM{"

  return ((emailsent && firebasesent) ?
    <div className="overlaymessagesent">
      <div className="modalmessagesent_container">
        <LazyLoadImage src={modalmessagesent} 
        className="modalmessagesent_image" alt="chess" onLoad={handleLoad} beforeLoad={handleLoadStarted} />
        {!isLoaded && isLoadStarted && 
        (<BlurhashCanvas className="modalmessagesent_blurhash" 
        hash={modalmessagesenthash} 
        punch={1} />)}
        <div className="modalmessagesent_content">
          <h1 className="modalmessagesent_title">MESSAGE SENT SUCCESSFULLY</h1>
          <button className="modalmessagesent_button1" onClick={refreshPage}>Return to this page</button>
          <button className="modalmessagesent_button2" onClick={homeRoute}>Return to homepage</button>
        </div>
      </div>
    </div> 
    : null
  )
}

export default ModalMessageSent
