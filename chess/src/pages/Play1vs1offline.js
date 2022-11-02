import React, {useEffect, useState} from "react"
import "./Play1vs1offline.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import {gameSubject, initGame, resetGame} from "../components/Game"
import Chessboard from "../components/Chessboard"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import ModalResult from "../components/ModalResult"

function Play1vs1offline() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
  const [winner, setWinner] = useState()

  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setTimeout(function() {
        setTurn(game.turn);
      }.bind(this), 1000);
      setWinner(game.winner)
    })
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <div className="play1vs1offline">
    <DndProvider backend={HTML5Backend}>
      <Helmet>
        <meta charSet="utf-8" />
          <title>Play 1 vs 1 (offline)</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
      <ModalResult open={isGameOver} result={result} winner={winner}/>
      <div className="board_container">
        <Chessboard className="chessboard" board={board} turn={turn}/>
      </div>
      </DndProvider>
    </div>
  )
}

export default Play1vs1offline
