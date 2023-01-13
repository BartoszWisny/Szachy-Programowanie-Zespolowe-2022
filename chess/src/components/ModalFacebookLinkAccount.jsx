import React, {useState} from "react"
import "./ModalFacebookLinkAccount.css"
import {Link, useNavigate} from "react-router-dom"
import ModalInput from "./ModalInput";
import {getAuth, linkWithCredential, signInWithEmailAndPassword} from "firebase/auth";
import {NotificationManager} from "react-notifications";
import styled from "styled-components";
import * as IoIcons from "react-icons/io";

const NavIcon = styled(Link)`
  color: var(--primary);
  opacity: 0.98;
  margin-top: 0.4rem;
  margin-right: 0.6rem;
  margin-left: auto;
  font-size: 1.4rem;
  height: 2.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ModalFacebookLinkAccount = ({open, email, credential, stateChanger}) => {
  const [password, setPassword] = useState("")

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleClose = event => {
    stateChanger(false);
  }
  
  const navigate = useNavigate()

  function loginAndLink() {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result)
        linkWithCredential(auth.currentUser, credential).then((result) => {
          console.log(result)
          localStorage.setItem("logged_in", "true")
          navigate("/");
        }).catch((error) => {
          // console.log(error)
        });
      })
      .catch((error) => {
        // console.log(error)
        NotificationManager.error('Incorrect password.', 'Error:', 5000, () => {})
      });
  }

  return (open ?
    <div className="overlayfacebooklinkaccount">
      <div className="modalfacebooklinkaccount_container">
        <NavIcon to="#" draggable="false">
          <IoIcons.IoIosCloseCircle onClick={handleClose}/>
        </NavIcon>
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
