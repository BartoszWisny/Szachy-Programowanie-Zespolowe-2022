import React from "react"
import "./Login.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import LoginTiles from "../components/LoginTiles"

function Login() {
  return (
    <div className="login">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Login</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
      <LoginTiles />
    </div>
  )
}

export default Login
