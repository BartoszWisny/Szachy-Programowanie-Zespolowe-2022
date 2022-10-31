import React from "react"
import "./Minigamespuzzles.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Minigamespuzzles() {
  return (
    <div className="minigamespuzzles">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Puzzles</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Minigamespuzzles
