import React, {useState} from "react"
import "./ModalFacebookLinkAccount.css"
import {useNavigate} from "react-router-dom"
import ModalInput from "./ModalInput";
import {getAuth, linkWithCredential, signInWithEmailAndPassword} from "firebase/auth"
import {NotificationManager} from "react-notifications"

const ModalFacebookLinkAccount = ({open, email, credential}) => {
  const [password, setPassword] = useState("")

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }
  
  const navigate = useNavigate()

  function loginAndLink() {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result)
        linkWithCredential(auth.currentUser, credential).then((result) => {
          console.log(result)
        }).catch((error) => {
          // console.log(error)
        });
        navigate("/")
      })
      .catch((error) => {
        // console.log(error)
        NotificationManager.error('Incorrect password.', 'Error:', 5000, () => {})
      });
  }

  return (open ?
    <div className="overlayfacebooklinkaccount">
      <div className="modalfacebooklinkaccount_container">
        <p className="modalfacebooklinkaccount_title" style={{fontSize: "min(1rem, 3.2vw)"}}>
        Provided email is linked to an existing account. Login to link your facebook account:</p>
        <ModalInput id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <button className="modalfacebooklinkaccount_button1" onClick={loginAndLink}>Login and link account</button>
      </div>
    </div>
    : null
  )
}

export default ModalFacebookLinkAccount
