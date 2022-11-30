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

const SuggestionTiles = () => {
  return (
    <div className="suggestiontiles">
      <SuggestionTile />
    </div>
  )
}

const SuggestionIcon = styled.span`
`

const SuggestionTitle = styled.span`
  margin-left: 1rem;
`
  
function SuggestionTile(props) {
  const [username, setUsername] = useState("")

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const [email, setEmail] = useState("")

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const [suggestion, setSuggestion] = useState("")

  const handleSuggestionChange = e => {
    setSuggestion(e.target.value)
  }

  const [emailsent, setEmailSent] = useState(false)
  const [emailerr, setEmailErr] = useState(false)
  const [firebasesent, setFirebaseSent] = useState(false)
  const [firebaseerr, setFirebaseErr] = useState(false)

  const handleEmailSubmit = () => {
    emailjs.send("service_xgy9mk9", "template_axgktrw", {
      subject: "Suggestion",
      username: username,
      email: email,
      message: suggestion,
    }, "cur1mLFSh_8f6S6iY").then(() => {
      setEmailSent(true)
      setUsername("")
      setEmail("")
      setSuggestion("")
    }).catch(() => {
      setEmailErr(true)      
      setUsername("")
      setEmail("")
      setSuggestion("")
    })
  }

  const userCollectionRef = collection(database, "suggestion")
  const handleFirebaseSubmit = () => {
    addDoc(userCollectionRef, {
      username: username,
      email: email,
      suggestion: suggestion
    }).then(() => {
      setFirebaseSent(true)
      setUsername("")
      setEmail("")
      setSuggestion("")
    }).catch(() => {
      setFirebaseErr(true)      
      setUsername("")
      setEmail("")
      setSuggestion("")
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
      <div className="suggestiontile">
        <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
        <Input type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <TextArea type="suggestion" placeholder="Suggestion" value={suggestion} onChange={handleSuggestionChange}/>
        <button className="suggestiontile_button" onClick={() => {handleEmailSubmit(); if(!emailerr) handleFirebaseSubmit()}}>
          <SuggestionIcon>
            <RiIcons.RiSendPlaneFill />
            <SuggestionTitle>
              Send your suggestion
            </SuggestionTitle>
          </SuggestionIcon>
        </button>
      </div>
    </div>
  )
}

export default SuggestionTiles
