import React, {useState} from "react"
import "./ModalResetPassword.css"
import {Link} from "react-router-dom"
import ModalInput from "./ModalInput";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {NotificationManager} from "react-notifications";
import * as IoIcons from "react-icons/io";
import styled from "styled-components";

const NavIcon = styled(Link)`
  color: var(--primary);
  opacity: 0.98;
  margin-top: min(0.4rem, 1.3vw);
  margin-right: min(0.4rem, 1.3vw);
  margin-left: auto;
  font-size: min(2rem, 6.4vw);
  height: min(2rem, 6.4vw);
  width: min(2rem, 6.4vw);
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ModalResetPassword = ({open, stateChanger}) => {
  const [email, setEmail] = useState("")

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  function sendResetEmail() {
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
      })
      .catch((error) => {
      });

    NotificationManager.info('A reset email was sent if a matching account was found.', '', 5000, () => {});
  }

  const handleClose = event => {
    stateChanger(false);
  }

  return (open ?
    <div className="overlayresetpassword">
      <div className="modalresetpassword_container">
        <NavIcon to="#" draggable="false">
          <IoIcons.IoIosCloseCircle onClick={handleClose}/>
        </NavIcon>
        <p className="modalresetpassword_title" style={{fontSize: "min(1rem, 3.2vw)"}}>
        Provide the email address linked to your account:</p>
        <ModalInput id="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <button className="modalresetpassword_button1" onClick={sendResetEmail}>Send password change email</button>
      </div>
    </div>
    : null
  )
}

export default ModalResetPassword
