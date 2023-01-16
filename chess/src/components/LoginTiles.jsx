import React, {useState} from "react"
import * as FaIcons from "react-icons/fa"
import * as MdIcons from "react-icons/md"
import styled from "styled-components"
import Input from "./Input"
import {
  getAuth,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  getAdditionalUserInfo,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification
} from "firebase/auth"
import {auth} from "../FirebaseConfig"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import ModalFacebookLinkAccount from "./ModalFacebookLinkAccount"
import {NotificationManager} from 'react-notifications'
import ModalResetPassword from "./ModalResetPassword"
import { database } from "../FirebaseConfig"
import { doc, setDoc, getDoc } from "firebase/firestore"

const LoginTiles = () => {
  return (
    <div className="logintiles">
      <LoginTile />
    </div>
  )
}

const LoginIcon = styled.span`
`

const LoginTitle = styled.span`
  margin-left: 1rem;
`

function LoginTile() {
  const navigate = useNavigate();
  const [showLink, setShowLink] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [credential, setCredential] = useState(undefined);

  const handleResetClick = event => {
    setShowReset(true);
  }

  function loginGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        localStorage.setItem("logged_in", "true")

        const userid = result.user.uid
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

        navigate("/")
      }).catch((error) => {
        NotificationManager.error('Google login failed.', 'Error:', 5000, () => {});
      });
  }

  function loginFacebook() {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const {isNewUser} = getAdditionalUserInfo(result)

        if(isNewUser) {
          const user = result.user;

          sendEmailVerification(user).then((result) => {
          }).catch((error) => {
          });
        }
        localStorage.setItem("logged_in", "true")

        const userid = result.user.uid
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

        navigate("/")
      })
      .catch((error) => {

        if(error.code === 'auth/account-exists-with-different-credential') {
          const credential = OAuthProvider.credentialFromError(error);
          const email = error.customData.email;

          fetchSignInMethodsForEmail(auth, email).then((result) => {
            if (result[0] === 'password') {
              setShowLink(true);
              setEmail(email);
              setCredential(credential);
            }

            if (result[0] === 'google.com') {
              const provider = new GoogleAuthProvider();

              signInWithPopup(auth, provider).then((result) => {
                linkWithCredential(auth.currentUser, credential).then((result) => {
                  localStorage.setItem("logged_in", "true")
                  navigate("/");
                }).catch((error) => {
                  NotificationManager.error('Facebook login failed.', 'Error:', 5000, () => {});
                });
              });
            }
          }).catch((error) => {
          });
        }
        else {
          NotificationManager.error('Facebook login failed.', 'Error:', 5000, () => {});
        }
      });
  }

  function login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        localStorage.setItem("logged_in", "true")

        const userid = result.user.uid
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

        navigate("/")
      })
      .catch((error) => {
        NotificationManager.error('Invalid email or password.', 'Error:', 5000, () => {});
      });
  }

  const [email, setEmail] = useState("")

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const [password, setPassword] = useState("")

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  return(
    <div className="logintile">
      <ModalResetPassword open={showReset} stateChanger={setShowReset}/>
      <ModalFacebookLinkAccount open={showLink} email={email} credential={credential} stateChanger={setShowLink}/>
      <Input id="email" type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
      <Input id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      <button className="logintile_button1"  onClick={login} >
        <LoginIcon>
          <MdIcons.MdEmail />
          <LoginTitle>
            Login with email
          </LoginTitle>
        </LoginIcon>
      </button>
      <button className="logintile_button2" onClick={loginGoogle}>
        <LoginIcon>
          <FaIcons.FaGoogle />
          <LoginTitle>
            Login with Google
          </LoginTitle>
        </LoginIcon>
      </button>
      <button className="logintile_button3" onClick={loginFacebook}>
        <LoginIcon>
          <FaIcons.FaFacebook />
          <LoginTitle>
            Login with Facebook
          </LoginTitle>
        </LoginIcon>
      </button>
      <b className="logintile_signuplink">Don't have an account yet? <Link to="/signup"
      style={{color: "var(--primary)"}}>Sign up</Link></b>
      <b className="logintile_resetlink"> <Link onClick={handleResetClick} style={{color: "var(--primary)"}}>Forgot password?</Link></b>
    </div>

  )
}

export default LoginTiles
