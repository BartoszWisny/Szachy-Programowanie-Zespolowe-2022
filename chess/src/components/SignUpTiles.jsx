import React, {useState} from "react"
import * as FaIcons from "react-icons/fa"
import styled from "styled-components"
import Input from "./Input"
import {Link} from "react-router-dom"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { auth } from "../FirebaseConfig"
import { useNavigate } from 'react-router-dom'
import {NotificationManager} from "react-notifications"
import { database } from "../FirebaseConfig"
import { doc, setDoc, getDoc } from "firebase/firestore"

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
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function signUp() {
    if(validateEmail(email)) {
      if(firstName === "" || lastName === "") {
        NotificationManager.error('First name or last name cannot be empty.', 'Error:', 5000, () => {});
      }
      else {
        if(password === confirmPassword) {
          if(password.length >= 6) {
            createUserWithEmailAndPassword(auth, email, password)
              .then(async (result) => {
                const user = result.user;

                updateProfile(user, {displayName: firstName + " " + lastName});
                sendEmailVerification(user).then((result) => {
                }).catch((error) => {
                });

                const userid = user.uid
                const username = result.user.displayName ? result.user.displayName : result.user.email
                const docRef = doc(database, "leaderboards",  userid)
                const docSnap = await getDoc(docRef)

                if (typeof docSnap.data() === "undefined") {
                  setDoc(docRef, {
                    userID: userid,
                    username: username,
                    gamesWon: 0,
                    draws: 0,
                    gamesLost: 0,
                    points: 600
                  }).then(() => {

                  }).catch(() => {

                  })
                }

                localStorage.setItem("logged_in", "true")
                navigate("/");
              })
              .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                  NotificationManager.error('Account using this email already exists.', 'Error:', 5000, () => {});
                }
              });
          }
          else {
            NotificationManager.error('Password should have at least 6 characters.', 'Error:', 5000, () => {});
          }
        }
        else {
          NotificationManager.error('Passwords are not the same.', 'Error:', 5000, () => {});
        }
      }
    }
    else {
      NotificationManager.error('Invalid email address.', 'Error:', 5000, () => {});
    }

  }

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
