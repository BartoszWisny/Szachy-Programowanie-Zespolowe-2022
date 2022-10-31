import React from "react"
import "./Helpsuggestion.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Helpsuggestion() {
  return (
    <div className="helpsuggestion">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Make a suggestion</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Helpsuggestion
