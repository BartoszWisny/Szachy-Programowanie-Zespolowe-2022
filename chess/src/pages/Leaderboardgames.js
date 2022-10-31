import React from "react"
import "./Leaderboardgames.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Leaderboardgames() {
  return (
    <div className="leaderboardgames">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Leaderboard - games</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Leaderboardgames
