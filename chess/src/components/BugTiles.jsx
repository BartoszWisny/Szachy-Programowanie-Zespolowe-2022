import React, {useState} from "react"
import * as RiIcons from "react-icons/ri"
import styled from "styled-components"
import Input from "./Input"
import TextArea from "./TextArea"
import {database} from "../FirebaseConfig"
import {addDoc, collection} from "firebase/firestore"

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

  const userCollectionRef = collection(database, "bug")
  const handleSend = () => {
    addDoc(userCollectionRef, {
      username: username,
      email: email,
      bug: bug
    }).then(() => {
      if (!alert("Message sent successfully!")) {
        setUsername("")
        setEmail("")
        setBug("")
      }
    }).catch((error) => {
      alert(error.message)
    })
  }

  return(
    <div className="bugtile">
      <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
      <Input type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
      <TextArea type="bug" placeholder="Bug" value={bug} onChange={handleBugChange}/>
      <button className="bugtile_button" onClick={handleSend}>
        <BugIcon>
          <RiIcons.RiSendPlaneFill />
          <BugTitle>
            Send your bug
          </BugTitle>
        </BugIcon>
      </button>
    </div>
  )
}

export default BugTiles
