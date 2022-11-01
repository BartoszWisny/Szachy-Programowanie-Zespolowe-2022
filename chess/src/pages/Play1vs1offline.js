import React/*, {useState}*/ from "react"
import "./Play1vs1offline.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
/* import Boardandpieces from "../components/Boardandpieces"
import {Chess} from "chess.js" */

function Play1vs1offline() {
  return (
    <div className="play1vs1offline">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Play 1 vs 1 (offline)</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
      {/* <Boardandpieces 
  /> */}
    </div>
  )
}

export default Play1vs1offline
