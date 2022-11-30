import React, {useState} from "react"
import * as RiIcons from "react-icons/ri"
import styled from "styled-components"
import Input from "./Input"
import TextArea from "./TextArea"
import {database} from "../FirebaseConfig"
import {addDoc, collection} from "firebase/firestore"
import ModalMessageSent from "./ModalMessageSent"
import ModalMessageError from "./ModalMessageError"
import emailjs from "@emailjs/browser"

const BugTiles = () => {
  return (
    <div className="bugtiles">
      <BugTile />
    </div>
  )
}

const BugIcon = styled.span`
`

const BugTitle = styled.span`
  margin-left: 1rem;
`
  
function BugTile(props) {
  const [username, setUsername] = useState("")

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const [email, setEmail] = useState("")

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const [bug, setBug] = useState("")

  const handleBugChange = e => {
    setBug(e.target.value)
  }

  const [emailsent, setEmailSent] = useState(false)
  const [emailerr, setEmailErr] = useState(false)
  const [firebasesent, setFirebaseSent] = useState(false)
  const [firebaseerr, setFirebaseErr] = useState(false)

  const handleEmailSubmit = () => {
    emailjs.send("service_xgy9mk9", "template_axgktrw", {
      subject: "Bug",
      username: username,
      email: email,
      message: bug,
    }, "cur1mLFSh_8f6S6iY").then(() => {
      setEmailSent(true)
      setUsername("")
      setEmail("")
      setBug("")
    }).catch(() => {
      setEmailErr(true)      
      setUsername("")
      setEmail("")
      setBug("")
    })
  }

  const userCollectionRef = collection(database, "bug")
  const handleFirebaseSubmit = () => {
    addDoc(userCollectionRef, {
      username: username,
      email: email,
      bug: bug
    }).then(() => {
      setFirebaseSent(true)
      setUsername("")
      setEmail("")
      setBug("")
    }).catch(() => {
      setFirebaseErr(true)      
      setUsername("")
      setEmail("")
      setBug("")
    })
  }

  return(
    <div>
      <div>
        <ModalMessageSent emailsent={emailsent} firebasesent={firebasesent}/>
      </div>
      <div>
        <ModalMessageError emailerr={emailerr} firebaseerr={firebaseerr}/>
      </div>
      <div className="bugtile">
        <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
        <Input type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <TextArea type="bug" placeholder="Bug" value={bug} onChange={handleBugChange}/>
        <button className="bugtile_button" onClick={() => {handleEmailSubmit(); if(!emailerr) handleFirebaseSubmit()}}>
          <BugIcon>
            <RiIcons.RiSendPlaneFill />
            <BugTitle>
              Send your bug
            </BugTitle>
          </BugIcon>
        </button>
      </div>
    </div>
  )
}

export default BugTiles
