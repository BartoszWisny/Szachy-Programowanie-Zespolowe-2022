import React from "react"
import "./Playvsourchessai.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Playvsourchessai() {
  return (
    <div className="playvsourchessai">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Play vs our chess AI</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Playvsourchessai
