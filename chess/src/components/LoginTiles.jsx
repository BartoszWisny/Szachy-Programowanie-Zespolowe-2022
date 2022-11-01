import React from "react"
import * as FaIcons from "react-icons/fa"
import * as MdIcons from "react-icons/md"
import styled from "styled-components"
import Input from "./Input"

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
  
function LoginTile(props) {
  /* const navigate = useNavigate();
  const route = () => {
    navigate(props.path);
  }; */

  return(
    <div className="logintile">
      <Input type="text" placeholder="Email"/>
      <Input type="password" placeholder="Password"/>
      <button className="logintile_button1" /*onClick={route}*/>
        <LoginIcon>
          <MdIcons.MdEmail />
          <LoginTitle>
            Login with email
          </LoginTitle>
        </LoginIcon>
      </button>
      <h2>or</h2>
      <button className="logintile_button2" /*onClick={route}*/>
        <LoginIcon>
          <FaIcons.FaGoogle />
          <LoginTitle>
            Login with Google
          </LoginTitle>
        </LoginIcon>
      </button>
      <button className="logintile_button3" /*onClick={route}*/>
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
