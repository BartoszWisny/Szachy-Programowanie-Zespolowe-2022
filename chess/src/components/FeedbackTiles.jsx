import React, {useState} from "react"
import * as RiIcons from "react-icons/ri"
import styled from "styled-components"
import Input from "./Input"
import TextArea from "./TextArea"
import {database} from "../FirebaseConfig"
import {addDoc, collection} from "firebase/firestore"

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

  const userCollectionRef = collection(database, "feedback")
  const handleSend = () => {
    addDoc(userCollectionRef, {
      username: username,
      email: email,
      feedback: feedback
    }).then(() => {
      if (!alert("Message sent successfully!")) {
        setUsername("")
        setEmail("")
        setFeedback("")
      }
    }).catch((error) => {
      alert(error.message)
    })
  }

  return(
    <div className="feedbacktile">
      <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
      <Input type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
      <TextArea type="feedback" placeholder="Feedback" value={feedback} onChange={handleFeedbackChange}/>
      <button className="feedbacktile_button" onClick={handleSend}>
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
