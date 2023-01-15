import React, {useEffect, useState} from "react"
import "./About.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
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

function About() {
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
    <div className="about" data-theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
          <title>About</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
      <div className="img" data-theme={theme} />
      {loading ? 
        <div>
          <GridLoader color={theme === "lightmode" ? "var(--primary)" : "var(--secondary)"} loading={loading} size={50} 
          speedMultiplier={1} style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          userSelect: "none"}}/>
        </div> :
        <div style={{maxWidth: "min(60rem, 90vw)", margin: "min(4.8rem, min(5vw, 5vh)) auto"}}> 
          <div className="title" style={{color: theme === "lightmode" ? "var(--primary)" : "var(--secondary)"}}>
            <p>Welcome to <b> Chess - Learn And Play </b></p>
          </div>
          <div className="description" style={{color: theme === "lightmode" ? "var(--primary)" : "var(--secondary)"}}>
            
            We are happy that you decided to practice your chess skills with us. On our website you can play chess
            in four different ways. You can play online with other users with the <b>Play 1 vs 1 (online)</b> mode.
            You can also play with your friends on the same device using the <b>Play 1 vs 1 (offline)</b> mode.
            If you'd like to have a go at playing against a professional chess engine (Stockfish), choose <b>Play vs computer</b>.
            In the section <b>Play vs our chess AI</b> you can play against an experimental engine that we created from scratch.<br /> <br />

            If you feel like learning something new, visit <b>Watch games</b> and <b>Analyze Games</b> sections. There you can
            watch other players' games and try to draw conclusions, either on your own or with the help of a chess engine. <br /> <br />

            If you like more extraordinary challenges that require strategic thinking, you can open the <b>Puzzles</b> section.
            Every 15 seconds a new riddle is fetched from a database. Will you be able to checkmate your opponent in one move only? <br /> <br />

            You can also find out how good you are at chess and compare yourself to other users by checking
            your position in our <b>Leaderboards</ b>. <br /> <br />

            Do you want to give us some feedback or report a bug? Go to the <b>Feedback</b> tab and share your opinion with us.
            We will be grateful for any ideas that will help us improve this website. <br /> <br />

          </div>

          <div className="footer" style={{color: theme === "lightmode" ? "var(--primary)" : "var(--secondary)"}}>
            <p><b>Created by:</b></p> 
            <p> Bartosz Wiśny, Jakub Sokołowski, Wojciech Mulka, Maurycy Sosnowski, Karol Dzwonkowski </p> 
            <p> You can contact our team at: chesslearnandplay@gmail.com </p>
          </div>

        </div>
        }
      <SwitchThemeButton onClick={switchTheme} style={{zIndex: "9"}}>
        {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
      </SwitchThemeButton>
    </div>
  )
}

export default About
