import React, {useEffect, useState} from "react"
import "./Play1vs1online.css"
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

function Play1vs1online() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
  const [winner, setWinner] = useState()
  // const [playerPieces, setPlayerPieces] = useState("")

  useEffect(() => {
    resetGame()
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setTurn(game.turn)
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

  /* const imagewhite = require(`../assets/chessboard/k_w.png`)
  const imageblack = require(`../assets/chessboard/k_b.png`)
  const imagerandom = require(`../assets/chessboard/k_r.png`) */

  /* const choosePieces = () => {
    const random = Math.random()

    if (random <= 0.5) {
      setPlayerPieces("w")
    } else {
      setPlayerPieces("b")
    }
  } */

  return (
    <div className="play1vs1online" data-theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Helmet>
          <meta charSet="utf-8" />
            <title>Play 1 vs 1 (online)</title>
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
            {/* {playerPieces === "" && (
              <div className="overlaychoosepiecesonline">
                <div className="modalchoosepiecesonline_container">
                  <div className="modalchoosepiecesonline_content">
                    <h1 className="modalchoosepiecesonline_title" style={{fontSize: "min(2rem, min(6.6vw, 6.6vh))"}}>CHOOSE PIECES</h1>
                    <button className="modalchoosepiecesonline_button1" onClick={() => setPlayerPieces("w")}>
                      <img src={imagewhite} alt="chess" style={{maxHeight: "min(5rem, min(16.5vw, 16.5vh))"}}/>
                      <h2 style={{fontSize: "min(1.5rem, min(5vw, 5vh))"}}>WHITE</h2>
                    </button>
                    <button className="modalchoosepiecesonline_button2" onClick={() => setPlayerPieces("b")}>
                      <img src={imageblack} alt="chess" style={{maxHeight: "min(5rem, min(16.5vw, 16.5vh))"}}/>
                      <h2 style={{fontSize: "min(1.5rem, min(5vw, 5vh))"}}>BLACK</h2>
                    </button>
                    <button className="modalchoosepiecesonline_button3" onClick={() => choosePieces()}>
                      <img src={imagerandom} alt="chess" style={{maxHeight: "min(5rem, min(16.5vw, 16.5vh))"}}/>
                      <h2 style={{paddingTop: "min(0.4rem, min(1.3vw, 1.3vh))", paddingBottom: "min(0.2rem, min(0.65vw, 0.65vh))",
                       fontSize: "min(1rem, min(3.3vw, 3.3vh))"}}>RANDOM</h2>
                    </button>
                  </div>
                </div>
              </div> )}
            {playerPieces !== "" && (
              <div>
                <div>
                  <ModalResult open={isGameOver} result={result} winner={winner}/>
                </div>
                <div className="board_container">
                  <Chessboard className="chessboard" playerPieces={playerPieces} isGameOver={isGameOver} board={board} 
                  turn={turn} boardtype={"1vs1online"}/>
                  <div className="board_padding"/>
                </div>
            </div>)} */}
            <div>
                <div>
                  <ModalResult open={isGameOver} result={result} winner={winner}/>
                </div>
                <div className="board_container">
                  <Chessboard className="chessboard" /* playerPieces={playerPieces} */ isGameOver={isGameOver} board={board} 
                  turn={turn} boardtype={"1vs1online"}/>
                  <div className="board_padding"/>
                </div>
            </div>
          </div> }
        <SwitchThemeButton onClick={switchTheme} style={{zIndex: "9"}}>
          {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
        </SwitchThemeButton>
      </DndProvider>
    </div>
  )
}

export default Play1vs1online
