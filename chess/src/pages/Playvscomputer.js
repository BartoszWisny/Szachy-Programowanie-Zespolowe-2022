import React, {useEffect, useState} from "react"
import "./Playvscomputer.css"
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
import Box from "@material-ui/core/Box"
import Slider from "@material-ui/core/Slider"

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

function Playvscomputer() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
  const [winner, setWinner] = useState()
  const [playerPieces, setPlayerPieces] = useState("")
  const [engine, setEngine] = useState("")
  const [stockfishLevel, setStockfishLevel] = useState(10)
  const [stockfishLevelChosen, setStockfishLevelChosen] = useState(false)

  useEffect(() => {
    resetGame()
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
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

  const imagewhite = require(`../assets/chessboard/k_w.png`)
  const imageblack = require(`../assets/chessboard/k_b.png`)
  const stockfish = require(`../assets/stockfish.png`)
  const chessdb = require(`../assets/chessdb.png`)

  const marks = [ { value: 0, label: "0" }, { value: 5, label: "5" }, { value: 10, label: "10" }, { value: 15, label: "15" }, 
                { value: 20, label: "20" }, ]
  
  const handleSliderChange = (event, level) => {
    setStockfishLevel(level)
  }
  
  return (
    <div className="playvscomputer" data-theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Helmet>
          <meta charSet="utf-8" />
            <title>Play vs computer</title>
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
          {engine === "" && ( /* set style for mobile devices */
            <div className="overlaychooseengine">
              <div className="modalchooseengine_container">
                <div className="modalchooseengine_content">
                  <h1 className="modalchooseengine_title" style={{fontSize: "min(2rem, min(10vw, 10vh))"}}>CHOOSE ENGINE</h1>
                  <button className="modalchooseengine_button1" style={{height: "min(10rem, min(50vw, 50vh))",
                  width: "min(8.5rem, min(42.5vw, 42.5vh))"}} onClick={() => {setEngine("stockfish")}}>
                    <img src={stockfish} alt="chess" style={{maxHeight: "min(5rem, min(25vw, 25vh))"}}/>
                    <h2 style={{fontSize: "min(1.5rem, min(7.5vw, 7.5vh))"}}>Stockfish</h2>
                  </button>
                  <button className="modalchooseengine_button2" style={{height: "min(10rem, min(50vw, 50vh))", 
                  width: "min(8.5rem, min(42.5vw, 42.5vh))"}} onClick={() => setEngine("chessdb")}>
                    <img src={chessdb} alt="chess" style={{maxHeight: "min(5rem, min(25vw, 25vh))"}}/>
                    <h2 style={{fontSize: "min(0.8rem, min(4vw, 4vh))"}}>ChessDB</h2>
                    <h2 style={{fontSize: "min(0.8rem, min(4vw, 4vh))"}}>& Stockfish</h2>
                  </button>
                </div>
              </div>
            </div> )}
            {engine !== "" && !stockfishLevelChosen && ( /* set style for mobile devices */
              <div className="overlaychoosestockfishlevel">
                <div className="modalchoosestockfishlevel_container">
                  <div className="modalchoosestockfishlevel_content">
                    <h2 style={{marginTop: "min(1rem, min(5vw, 5vh))", marginBottom: "min(1rem, min(5vw, 5vh))", 
                    fontSize: "min(1.5rem, min(7.5vw, 7.5vh))"}}>Set Stockfish skill level:</h2>
                    <Box sx={{marginLeft: "min(1.5rem, min(7.5vw, 7.5vh))", width: "min(19rem, min(81vw, 90vh))"}}>
                      <Slider className="modalchoosestockfishlevel_slider" aria-label="Default" defaultValue={10} valueLabelDisplay="auto" 
                      value={stockfishLevel} step={1} marks={marks} min={0} max={20} onChange={handleSliderChange}/>
                    </Box>
                    <button className="modalchoosestockfishlevel_button1" onClick={() => setStockfishLevelChosen(true)}>Play vs computer</button>
                  </div>
                </div>
              </div> )}
          {playerPieces === "" && engine !== "" && stockfishLevelChosen && (
            <div className="overlaychoosepieces">
              <div className="modalchoosepieces_container">
                <div className="modalchoosepieces_content">
                  <h1 className="modalchoosepieces_title" style={{fontSize: "min(2rem, min(10vw, 10vh))"}}>CHOOSE PIECES</h1>
                  <button className="modalchoosepieces_button1" onClick={() => setPlayerPieces("w")}>
                    <img src={imagewhite} alt="chess" style={{maxHeight: "min(5rem, min(25vw, 25vh))"}}/>
                    <h2 style={{fontSize: "min(1.5rem, min(7.5vw, 7.5vh))"}}>WHITE</h2>
                  </button>
                  <button className="modalchoosepieces_button2" onClick={() => setPlayerPieces("b")}>
                    <img src={imageblack} alt="chess" style={{maxHeight: "min(5rem, min(25vw, 25vh))"}}/>
                    <h2 style={{fontSize: "min(1.5rem, min(7.5vw, 7.5vh))"}}>BLACK</h2>
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
                turn={turn} boardtype={"vscomputer"} engine={engine} stockfishLevel={stockfishLevel}/>
                <div className="board_padding"/>
              </div>
            </div>)}
          </div> }
        <SwitchThemeButton onClick={switchTheme}>
          {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
        </SwitchThemeButton>
      </DndProvider>
    </div>
  )
}

export default Playvscomputer
