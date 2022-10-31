import React from "react"
import "./Learnanalyze.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Learnanalyze() {
  return (
    <div className="learnanalyze">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Analyze games</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Learnanalyze
