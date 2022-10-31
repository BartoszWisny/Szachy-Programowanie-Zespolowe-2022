import React from "react"
import "./Login.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Login() {
  return (
    <div className="logn">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Log In</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Login

