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
import { useNavigate } from 'react-router-dom'
import ModalFacebookLinkAccount from "./ModalFacebookLinkAccount";
import {NotificationManager} from 'react-notifications';

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
  const [show, setShow] = useState(false);
  const [credential, setCredential] = useState(undefined);

  function loginGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider) // signInWithRedirect
      .then((result) => {
        console.log(result);
        localStorage.setItem("logged_in", "true")
        navigate("/");
      }).catch((error) => {
      console.log(error);
      NotificationManager.error('Google login failed.', 'Error:', 5000, () => {});
    });
  }

  function loginFacebook() {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider) // signInWithRedirect
      .then((result) => {
        const {isNewUser} = getAdditionalUserInfo(result)

        if(isNewUser) {
          const user = result.user;

          sendEmailVerification(user).then((result) => {
            console.log(result);
          }).catch((error) => {
            console.log(error);
          });
        }
        console.log(result);
        localStorage.setItem("logged_in", "true")
        navigate("/");
        // GraphAPI access token: EAAPtF26rDYYBAO8JlwxKXjUvGuvENvY3lrIuip7mPPJnDCO7CETZCJ07zwrFXV5CZA7BdmYMJm9pNZCqxY1ddH4tIGcwQM6t9zc0ZCitdMfAP884wKUPV4PEHquoEJiiasNZBW6kUESJy54ZB0FLa4hdWSF07VNpwx6j62oTKokgBgJiOPkmHBEIRAZCYHFQeiyRzWvUJ9TzdZBnKaPK7ONoOUya3U67PhuU52Eq063SNGgAZCxHuzzkO
        // https://graph.facebook.com/1241216816608059/picture?width=480&access_token=EAAPtF26rDYYBAO8JlwxKXjUvGuvENvY3lrIuip7mPPJnDCO7CETZCJ07zwrFXV5CZA7BdmYMJm9pNZCqxY1ddH4tIGcwQM6t9zc0ZCitdMfAP884wKUPV4PEHquoEJiiasNZBW6kUESJy54ZB0FLa4hdWSF07VNpwx6j62oTKokgBgJiOPkmHBEIRAZCYHFQeiyRzWvUJ9TzdZBnKaPK7ONoOUya3U67PhuU52Eq063SNGgAZCxHuzzkO
        // Scheme: https://graph.facebook.com/USER_ID/picture?width=480&access_token=ACCESS_TOKEN
        // Or sth like: result.photoUrl + ?width=480&access_token=ACCESS_TOKEN
      })
      .catch((error) => {
        console.log(error);

        if(error.code === 'auth/account-exists-with-different-credential') {
          const credential = OAuthProvider.credentialFromError(error);
          const email = error.customData.email;

          fetchSignInMethodsForEmail(auth, email).then((result) => {
            if (result[0] === 'password') {
              setShow(true);
              setEmail(email);
              setCredential(credential);
            }

            if (result[0] === 'google.com') {
              const provider = new GoogleAuthProvider();

              signInWithPopup(auth, provider).then((result) => {
                linkWithCredential(auth.currentUser, credential).then((result) => {
                  console.log(result);
                  localStorage.setItem("logged_in", "true")
                  navigate("/");
                }).catch((error) => {
                  console.log(error);
                  NotificationManager.error('Facebook login failed.', 'Error:', 5000, () => {});
                });
              });
            }
          }).catch((error) => {
            console.log(error);
          });
        }
        NotificationManager.error('Facebook login failed.', 'Error:', 5000, () => {});
      });
  }

  function login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        localStorage.setItem("logged_in", "true")
        navigate("/");
      })
      .catch((error) => {
        console.log(error);

        NotificationManager.error('Invalid email or password.', 'Error:', 5000, () => {});
      });
  }

  /* const navigate = useNavigate();
  const route = () => {
    navigate(props.path);
  }; */

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
      <ModalFacebookLinkAccount open={show} email={email} credential={credential}/>
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
      style={{color: "var(--primary)"}}>Sign up</Link></b></div>
  )
}

export default LoginTiles