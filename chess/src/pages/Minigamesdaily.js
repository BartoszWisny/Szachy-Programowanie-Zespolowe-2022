import React, {useEffect, useState} from "react"
import "./Minigamesdaily.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import {gameSubject, initGame, resetGame} from "../components/Game"
import Chessboard from "../components/Chessboard"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import ModalResult from "../components/ModalResult"
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

function Minigamesdaily() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
  const [winner, setWinner] = useState()

  useEffect(() => {
    resetGame()
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setTimeout(function() {
        setTurn(game.turn);
      }, 1000)
      setWinner(game.winner)
    })
    return () => subscribe.unsubscribe()
  }, [])

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
    <div className="minigamesdaily" data-theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Helmet>
          <meta charSet="utf-8" />
            <title>Daily challenge</title>
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
          <div>
            <ModalResult open={isGameOver} result={result} winner={winner}/>
            <div className="board_container">
              <Chessboard className="chessboard" board={board} turn={turn}/>
            </div>
          </div> }
        <SwitchThemeButton onClick={switchTheme}>
          {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
        </SwitchThemeButton>
      </DndProvider>
    </div>
  )
}

export default Minigamesdaily

