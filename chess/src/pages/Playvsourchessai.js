import React from "react"
import "./Playvsourchessai.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import useLocalStorage from "use-local-storage"
import styled from "styled-components"
import * as IoIcons from "react-icons/io"

const SwitchThemeButton = styled.button`
  background-color: var(--primary);
  color: var(--secondary);
  opacity: 0.98; 
  position: absolute; 
  right: 3rem;
  font-size: 1.6rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 0;
  top: 0;
`

function Playvsourchessai() {
  const [theme, setTheme] = useLocalStorage("theme" ? "darkmode" : "lightmode")
  
  const switchTheme = () => {
    const newTheme = theme === "lightmode" ? "darkmode" : "lightmode"
    setTheme(newTheme)
  }

  return (
    <div className="playvsourchessai" data-theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
          <title>Play vs our chess AI</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
      <SwitchThemeButton onClick={switchTheme}>
        {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
      </SwitchThemeButton>
    </div>
  )
}

export default Playvsourchessai
