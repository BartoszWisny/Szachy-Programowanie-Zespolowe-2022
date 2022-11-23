import React, {useState} from "react"
import * as RiIcons from "react-icons/ri"
import styled from "styled-components"
import Input from "./Input"
import TextArea from "./TextArea"
import {database} from "../FirebaseConfig"
import {addDoc, collection} from "firebase/firestore"

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

  const userCollectionRef = collection(database, "suggestion")
  const handleSend = () => {
    addDoc(userCollectionRef, {
      username: username,
      email: email,
      suggestion: suggestion
    }).then(() => {
      if (!alert("Message sent successfully!")) {
        setUsername("")
        setEmail("")
        setSuggestion("")
      }
    }).catch((error) => {
      alert(error.message)
    })
  }

  return(
    <div className="suggestiontile">
      <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
      <Input type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
      <TextArea type="suggestion" placeholder="Suggestion" value={suggestion} onChange={handleSuggestionChange}/>
      <button className="suggestiontile_button" onClick={handleSend}>
        <SuggestionIcon>
          <RiIcons.RiSendPlaneFill />
          <SuggestionTitle>
            Send your suggestion
          </SuggestionTitle>
        </SuggestionIcon>
      </button>
    </div>
  )
}

export default SuggestionTiles
