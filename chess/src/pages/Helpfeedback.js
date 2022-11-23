import React, {useEffect, useState} from "react"
import "./Helpfeedback.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import FeedbackTiles from "../components/FeedbackTiles"
import useLocalStorage from "use-local-storage"
import styled from "styled-components"
import * as IoIcons from "react-icons/io"
import {GridLoader} from "react-spinners"

const SwitchThemeButton = styled.button`
  background-color: var(--primary);
  color: var(--secondary);
  opacity: 0.98; 
  position: absolute; 
  right: 2.6rem;
  font-size: 1.6rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 0;
  top: 0;
`

function Helpfeedback() {
  const [theme, setTheme] = useLocalStorage("theme" ? "darkmode" : "lightmode")
  
  const switchTheme = () => {
    const newTheme = theme === "lightmode" ? "darkmode" : "lightmode"
    setTheme(newTheme)
  }

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
  
  return (
    <div className="helpfeedback" data-theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
          <title>Leave your feedback</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
      {loading ? 
        <div>
          <GridLoader color={theme === "lightmode" ? "var(--primary)" : "var(--secondary)"} loading={loading} size={100} 
          speedMultiplier={1} style={{display: "block", margin: "0 auto", paddingTop: "8%", width: "100vw", height: "100vh", 
          userSelect: "none"}}/>
          <h2 className="loading" style={{color: theme === "lightmode" ? "var(--primary)" : "var(--secondary)"}}>Loading...</h2>
        </div> :
        <FeedbackTiles /> }
      <SwitchThemeButton onClick={switchTheme}>
        {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
      </SwitchThemeButton>
    </div>
  )
}

export default Helpfeedback
