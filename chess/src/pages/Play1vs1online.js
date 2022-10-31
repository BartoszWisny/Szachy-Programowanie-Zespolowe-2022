import React from "react"
import "./Play1vs1online.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Play1vs1online() {
  return (
    <div className="play1vs1online">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Play 1 vs 1 (online)</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Play1vs1online
