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
import { auth } from "../FirebaseConfig"

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

function loginGoogle() {
  const provider = new GoogleAuthProvider();
  
  signInWithPopup(auth, provider) // signInWithRedirect
    .then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error); 
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
      console.log(result); // GraphAPI access token: EAAPtF26rDYYBAO8JlwxKXjUvGuvENvY3lrIuip7mPPJnDCO7CETZCJ07zwrFXV5CZA7BdmYMJm9pNZCqxY1ddH4tIGcwQM6t9zc0ZCitdMfAP884wKUPV4PEHquoEJiiasNZBW6kUESJy54ZB0FLa4hdWSF07VNpwx6j62oTKokgBgJiOPkmHBEIRAZCYHFQeiyRzWvUJ9TzdZBnKaPK7ONoOUya3U67PhuU52Eq063SNGgAZCxHuzzkO
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
            const password = "asdffdsa"; // TODO popup do wpisania hasła

            signInWithEmailAndPassword(auth, email, password).then((result) => {
              linkWithCredential(auth.currentUser, credential).then((result) => {
                console.log(result);
              }).catch((error) => {
                console.log(error);
              });
            }).catch((error) => {
              console.log(error);
            });

            return;
          }

          if (result[0] === 'google.com') {
            const provider = new GoogleAuthProvider();

            signInWithPopup(auth, provider).then((result) => {
              linkWithCredential(auth.currentUser, credential).then((result) => {
                console.log(result);
              }).catch((error) => {
                console.log(error);
              });
            });
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    });
}

function signOut() {
  const auth = getAuth();
  signOut().then(() => {
      // Sign-out successful.
  }).catch((error) => {
      console.log(error)
      // An error happened.
  });
}

function LoginTile() {
  function login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
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
      <h2>or</h2>
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
    </div>
  )
}

export default LoginTiles
