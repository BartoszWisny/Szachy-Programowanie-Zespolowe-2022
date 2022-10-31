import React from "react"
import "./Leaderboardminigames.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Leaderboardminigames() {
  return (
    <div className="leaderboardminigames">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Leaderboard - minigames</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Leaderboardminigames
