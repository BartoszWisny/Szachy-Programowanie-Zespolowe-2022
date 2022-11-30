import React, {useState} from "react"
import * as FaIcons from "react-icons/fa"
import * as MdIcons from "react-icons/md"
import styled from "styled-components"
import Input from "./Input"
import {getAuth, signInWithPopup, /* signInWithEmailAndPassword, FacebookAuthProvider, */ GoogleAuthProvider} from "firebase/auth"

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

/* function login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
          
      })
      .catch(function (error) {
          
      });
} */

function loginGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
      .then((result) => {
          
      }).catch((error) => {
      
  });
}

/* function loginFacebook() {
  const provider = new FacebookAuthProvider();
const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    
  })
  .catch((error) => {
    
  });
} */

/* function signOut() {
  const auth = getAuth();
  signOut().then(() => {
      // Sign-out successful.
  }).catch((error) => {
      console.log(error)
      // An error happened.
  });
} */
  
function LoginTile(props) {
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
      <button className="logintile_button1" /* onClick={login} */>
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
      <button className="logintile_button3" /* onClick={loginFacebook} */>
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
