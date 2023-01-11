import React, {useEffect, useState, useCallback} from "react"
import "./Puzzles.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import {gameSubject, initGame, resetGame, setGame, getTurn} from "../components/Game"
import Chessboard from "../components/Chessboard"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
// import ModalResult from "../components/ModalResult"
import useLocalStorage from "use-local-storage"
import styled from "styled-components"
import * as IoIcons from "react-icons/io"
import {GridLoader} from "react-spinners"
import {Chess} from "chess.js"

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

function Puzzles() {
  const [board, setBoard] = useState([])
  // const [isGameOver, setIsGameOver] = useState()
  // const [result, setResult] = useState()
  const [turn, setTurn] = useState()
  const [playerPieces, setPlayerPieces] = useState("")
  const [puzzleMoves, setPuzzleMoves] = useState("")
  const [puzzleTitle, setPuzzleTitle] = useState("")
  // const [winner, setWinner] = useState()

  useEffect(() => {
    resetGame()
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      // setIsGameOver(game.isGameOver)
      // setResult(game.result)
      setTurn(game.turn)
      // setWinner(game.winner)
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

  const getPuzzles = useCallback(async () => {
    const url = `https://api.chess.com/pub/puzzle/random`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setGame(data.fen)
    console.log(getTurn())
    setTurn(getTurn())
    setPlayerPieces(getTurn())
    setPuzzleTitle(data.title)
    console.log(data.title)
    console.log(data.pgn)
    const tempChess = new Chess()
    tempChess.loadPgn(data.pgn, { sloppy: true })
    const moves = tempChess.history()
    setPuzzleMoves(moves)
    console.log(moves)
  }, [])

  useEffect(() => {
    getPuzzles()
  }, [getPuzzles])

  return (
    <div className="puzzles" data-theme={theme}>
      <DndProvider backend={HTML5Backend}>  
        <Helmet>
          <meta charSet="utf-8" />
            <title>Puzzles</title>
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
            <h1 style={{color: theme === "lightmode" ? "var(--primary)" : "var(--secondary)", 
            fontSize: "min(2rem, min(4.25vw, 4.25vh))"}}>{puzzleTitle}</h1>
            {/* <ModalResult open={isGameOver} result={result} winner={winner}/> */}
            <div className="board_container">
              <Chessboard className="chessboard" playerPieces={playerPieces} board={board} turn={turn} boardtype={"puzzles"}
              puzzleMoves={puzzleMoves}/>
              <div className="board_padding"/>
            </div>
          </div> }
        <SwitchThemeButton onClick={switchTheme}>
          {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
        </SwitchThemeButton>
      </DndProvider>
    </div>
  )
}

export default Puzzles
