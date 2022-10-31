import React from "react"
import "./Helpfeedback.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Helpfeedback() {
  return (
    <div className="helpfeedback">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Leave your feedback</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Helpfeedback
