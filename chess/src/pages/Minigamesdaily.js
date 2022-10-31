import React from "react"
import "./Minigamesdaily.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Minigamesdaily() {
  return (
    <div className="minigamesdaily">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Daily challenge</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Minigamesdaily

