import React from "react"
import "./Learnwatch.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Learnwatch() {
  return (
    <div className="learnwatch">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Watch games</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Learnwatch
