import React from "react"
import "./Playvscomputer.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Playvscomputer() {
  return (
    <div className="playvscomputer">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Play vs computer</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Playvscomputer
