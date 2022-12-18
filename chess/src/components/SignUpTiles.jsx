import React, {useState} from "react"
import * as FaIcons from "react-icons/fa"
import styled from "styled-components"
import Input from "./Input"
import {Link} from "react-router-dom"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { auth } from "../FirebaseConfig"

const SignUpTiles = () => {
  return (
    <div className="signuptiles">
      <SignUpTile />
    </div>
  )
}

const SignUpIcon = styled.span`
`

const SignUpTitle = styled.span`
  margin-left: 1rem;
`



function SignUpTile() {
  function signUp() {
    if(password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;

          updateProfile(user, {displayName: firstName + " " + lastName});
          sendEmailVerification(user).then((result) => {
            console.log(result);
          }).catch((error) => {
            console.log(error);
          });
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {

    }
  }
  /* const navigate = useNavigate();
  const route = () => {
    navigate(props.path);
  }; */

  const [firstName, setFirstName] = useState("")

  const handleFirstNameChange = e => {
    setFirstName(e.target.value)
  }

  const [lastName, setLastName] = useState("")

  const handleLastNameChange = e => {
    setLastName(e.target.value)
  }

  const [email, setEmail] = useState("")

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const [password, setPassword] = useState("")

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const [confirmPassword, setConfirmPassword] = useState("")

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value)
  }

  return(
    <div className="signuptile">
      <Input id="firstname" type="text" placeholder="First name" value={firstName} onChange={handleFirstNameChange}/>
      <Input id="lastname" type="text" placeholder="Last name" value={lastName} onChange={handleLastNameChange}/>
      <Input id="email" type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
      <Input id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      <Input id="confirmpassword" type="password" placeholder="Confirm password" value={confirmPassword}
      onChange={handleConfirmPasswordChange}/>
      <button className="signuptile_button1"  onClick={signUp} >
        <SignUpIcon>
          <FaIcons.FaUserPlus />
          <SignUpTitle>
            Sign up
          </SignUpTitle>
        </SignUpIcon>
      </button>
      <b className="signuptile_loginlink">Already have an account? <Link to="/login"
      style={{color: "var(--primary)"}}>Sign in</Link></b>
    </div>
  )
}

export default SignUpTiles
