import React, {useEffect, useState} from "react"
import "./Play1vs1offline.css"
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

function Play1vs1offline() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
  const [winner, setWinner] = useState()

  useEffect(() => {
    resetGame()
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setTimeout(function() {
        setTurn(game.turn)
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
    <div className="play1vs1offline" data-theme={theme}>
       <DndProvider backend={HTML5Backend}>
          <Helmet>
            <meta charSet="utf-8" />
              <title>Play 1 vs 1 (offline)</title>
              <link rel="canonical" href="http://mysite.com/example" />
              <meta name="description" content="Title" />
          </Helmet>
          <SidebarMenu />
          <div className="img" data-theme={theme}/>
          {loading ? 
            <div>
              <GridLoader color={theme === "lightmode" ? "var(--primary)" : "var(--secondary)"} loading={loading} size={50} 
              speedMultiplier={1} style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              userSelect: "none"}}/>
            </div> :
            <div>
              <div className="board_container">
                <div>
                  <ModalResult open={isGameOver} result={result} winner={winner}/>
                </div>
                <Chessboard className="chessboard" isGameOver={isGameOver} board={board} turn={turn} boardtype={"1vs1offline"}/>
                <div className="board_padding"/>
              </div>
            </div> }
          <SwitchThemeButton onClick={switchTheme} style={{zIndex: "9"}}>
            {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
          </SwitchThemeButton>
        </DndProvider>
    </div>
  )
}

export default Play1vs1offline
