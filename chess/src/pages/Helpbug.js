import React from "react"
import "./Helpbug.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function Helpbug() {
  return (
    <div className="helpbug">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Report a bug</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default Helpbug
