import React from "react"
import "./About.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"

function About() {
  return (
    <div className="about">
      <Helmet>
        <meta charSet="utf-8" />
          <title>About</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
    </div>
  )
}

export default About
