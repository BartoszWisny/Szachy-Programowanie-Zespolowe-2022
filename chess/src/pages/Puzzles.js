import React, {useEffect, useState, useCallback} from "react"
import "./Puzzles.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import {gameSubject, initGame, resetGame, setGame, getTurn} from "../components/Game"
import Chessboard from "../components/Chessboard"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import useLocalStorage from "use-local-storage"
import styled from "styled-components"
import * as IoIcons from "react-icons/io"
import {GridLoader} from "react-spinners"
import {Chess} from "chess.js"
import * as HiIcons from "react-icons/hi"
import * as BsIcons from "react-icons/bs"
import ModalPuzzles from "../components/ModalPuzzles"

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

const HintButton = styled.button`
  position: absolute;
  background-color: ${({theme}) => (theme === "lightmode" ? "var(--primary)" : "var(--secondary)")};
  color: ${({theme}) => (theme === "lightmode" ? "var(--secondary)" : "var(--primary)")};
  opacity: 0.98;
  bottom: min(2.5rem, min(5.3vw, 5.3vh)); 
  right: min(6rem, min(12.7vw, 12.7vh));
  font-size: min(3rem, min(6.35vw, 6.35vh));
  height: min(3rem, min(6.35vw, 6.35vh));
  width: min(3rem, min(6.35vw, 6.35vh));
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  border: 0;
  border-radius: min(0.4rem, min(0.85vw, 0.85vh));
`

const SolutionButton = styled.button`
  position: absolute;
  background-color: ${({theme}) => (theme === "lightmode" ? "var(--primary)" : "var(--secondary)")};
  color: ${({theme}) => (theme === "lightmode" ? "var(--secondary)" : "var(--primary)")};
  opacity: 0.98;
  bottom: min(2.5rem, min(5.3vw, 5.3vh)); 
  right: min(2.5rem, min(5.3vw, 5.3vh)); 
  font-size: min(3rem, min(6.35vw, 6.35vh));
  height: min(3rem, min(6.35vw, 6.35vh));
  width: min(3rem, min(6.35vw, 6.35vh));
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  border: 0;
  border-radius: min(0.4rem, min(0.85vw, 0.85vh));
`

function Puzzles() {
  const [board, setBoard] = useState([])
  const [turn, setTurn] = useState()
  const [playerPieces, setPlayerPieces] = useState("")
  const [puzzleMoves, setPuzzleMoves] = useState("")
  const [puzzleFen, setPuzzleFen] = useState("")
  const [puzzleTitle, setPuzzleTitle] = useState("")
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    resetGame()
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board)
      setTurn(game.turn)
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
    // console.log(data)
    setGame(data.fen)
    setPuzzleFen(data.fen)
    // console.log(getTurn())
    setTurn(getTurn())
    setPlayerPieces(getTurn())
    setPuzzleTitle(data.title)
    // console.log(data.title)
    // console.log(data.pgn)
    const tempChess = new Chess()
    tempChess.loadPgn(data.pgn, { sloppy: true })
    const moves = tempChess.history({ verbose: true })
    setPuzzleMoves(moves)
    // console.log(moves)
    /* setGame("rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5")
    setPuzzleFen("rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5")
    setTurn(getTurn())
    setPlayerPieces(getTurn())
    setPuzzleTitle("test")
    const moves = [{from: 'd7', to: 'c8', promotion: 'q'} ]
    setPuzzleMoves(moves) */
  }, [])

  useEffect(() => {
    getPuzzles()
  }, [getPuzzles])

  const [hint, setHint] = useState(false)
  const [solution, setSolution] = useState(false)

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
            <HintButton theme={theme} onClick={() => setHint(true && playerPieces === turn)}>
              <HiIcons.HiLightBulb/>
            </HintButton>
            <SolutionButton theme={theme} onClick={() => setSolution(true && playerPieces === turn)}>
              <BsIcons.BsQuestionCircleFill/>
            </SolutionButton>
            <h2 style={{color: theme === "lightmode" ? "var(--primary)" : "var(--secondary)", 
            fontSize: "min(1.4rem, min(3vw, 3vh))", marginLeft: "min(1.5rem, min(3.2vw, 3.2vh))", 
            marginTop: "min(0.5rem, min(1.05vw, 1.05vh))"}}>{puzzleTitle} ➜ {playerPieces === "w" ? "white" : "black"} to move</h2>
            <ModalPuzzles open={solved}/>
            <div className="board_container_puzzle">
              <Chessboard className="chessboard" playerPieces={playerPieces} board={board} turn={turn} boardtype={"puzzles"}
              puzzleMoves={puzzleMoves} puzzleFen={puzzleFen} puzzleHint={hint} puzzleSolution={solution} 
              changeHint={() => setHint(false)} changeSolution={() => setSolution(false)} changeSolved={() => setSolved(true)}/>
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

export default Puzzles
