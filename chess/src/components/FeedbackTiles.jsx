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
import {NotificationManager} from "react-notifications";

const FeedbackTiles = () => {
  return (
    <div className="feedbacktiles">
      <FeedbackTile />
    </div>
  )
}

const FeedbackIcon = styled.span`
`

const FeedbackTitle = styled.span`
  margin-left: 1rem;
`

function FeedbackTile() {
  const [username, setUsername] = useState("")

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const [email, setEmail] = useState("")

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const [subject, setSubject] = useState("")

  const handleSubjectChange = e => {
    setSubject(e.target.value)
  }

  const [message, setMessage] = useState("")

  const handleMessageChange = e => {
    setMessage(e.target.value)
  }

  const [emailsent, setEmailSent] = useState(false)
  const [emailerr, setEmailErr] = useState(false)
  const [firebasesent, setFirebaseSent] = useState(false)
  const [firebaseerr, setFirebaseErr] = useState(false)

  const handleEmailSubmit = () => {
    if (username !== "" && email !== "" && subject !== "" && message !== "") {
      emailjs.send("service_xgy9mk9", "template_axgktrw", {
        username: username,
        email: email,
        subject: subject,
        message: message
      }, "cur1mLFSh_8f6S6iY").then(() => {
        setEmailSent(true)
        setUsername("")
        setEmail("")
        setSubject("")
        setMessage("")
      }).catch(() => {
        setEmailErr(true)      
        setUsername("")
        setEmail("")
        setSubject("")
        setMessage("")
      })
    } else {
      NotificationManager.error('Make sure you have filled in all the fields!', 'Error:', 5000, () => {});
    }
  }

  const userCollectionRef = collection(database, "feedback")
  const handleFirebaseSubmit = () => {
    if (username !== "" && email !== "" && subject !== "" && message !== "") {
      addDoc(userCollectionRef, {
        username: username,
        email: email,
        subject: subject,
        message: message
      }).then(() => {
        setFirebaseSent(true)
        setUsername("")
        setEmail("")
        setSubject("")
        setMessage("")
      }).catch(() => {
        setFirebaseErr(true)      
        setUsername("")
        setEmail("")
        setSubject("")
        setMessage("")
      })
    }
  }

  return(
      <div className="feedbacktile">
        <ModalMessageSent emailsent={emailsent} firebasesent={firebasesent}/>
        <ModalMessageError emailerr={emailerr} firebaseerr={firebaseerr}/>
        <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
        <Input type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <Input type="text" placeholder="Subject" value={subject} onChange={handleSubjectChange}/>
        <TextArea type="message" placeholder="Message" value={message} onChange={handleMessageChange}/>
        <button className="feedbacktile_button" type="submit" onClick={() => {handleEmailSubmit(); if(!emailerr) handleFirebaseSubmit()}}>
          <FeedbackIcon>
            <RiIcons.RiSendPlaneFill />
            <FeedbackTitle>
              Send your feedback
            </FeedbackTitle>
          </FeedbackIcon>
        </button>
    </div>
  )
}

export default FeedbackTiles
