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
  
function FeedbackTile(props) {
  const [username, setUsername] = useState("")

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const [email, setEmail] = useState("")

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const [feedback, setFeedback] = useState("")

  const handleFeedbackChange = e => {
    setFeedback(e.target.value)
  }

  const [emailsent, setEmailSent] = useState(false)
  const [emailerr, setEmailErr] = useState(false)
  const [firebasesent, setFirebaseSent] = useState(false)
  const [firebaseerr, setFirebaseErr] = useState(false)

  const handleEmailSubmit = () => {
    emailjs.send("service_xgy9mk9", "template_axgktrw", {
      subject: "Feedback",
      username: username,
      email: email,
      message: feedback,
    }, "cur1mLFSh_8f6S6iY").then(() => {
      setEmailSent(true)
      setUsername("")
      setEmail("")
      setFeedback("")
    }).catch(() => {
      setEmailErr(true)      
      setUsername("")
      setEmail("")
      setFeedback("")
    })
  }

  const userCollectionRef = collection(database, "feedback")
  const handleFirebaseSubmit = () => {
    addDoc(userCollectionRef, {
      username: username,
      email: email,
      feedback: feedback
    }).then(() => {
      setFirebaseSent(true)
      setUsername("")
      setEmail("")
      setFeedback("")
    }).catch(() => {
      setFirebaseErr(true)      
      setUsername("")
      setEmail("")
      setFeedback("")
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
      <div className="feedbacktile">
        <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
        <Input type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <TextArea type="feedback" placeholder="Feedback" value={feedback} onChange={handleFeedbackChange}/>
        <button className="feedbacktile_button" onClick={() => {handleEmailSubmit(); if(!emailerr) handleFirebaseSubmit()}}>
          <FeedbackIcon>
            <RiIcons.RiSendPlaneFill />
            <FeedbackTitle>
              Send your feedback
            </FeedbackTitle>
          </FeedbackIcon>
        </button>
      </div>
    </div>
  )
}

export default FeedbackTiles
