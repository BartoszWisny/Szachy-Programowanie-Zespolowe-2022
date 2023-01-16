import React, {useEffect, useState} from "react"
import "./Play1vs1onlinegame.css"
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
import {useParams} from "react-router-dom"
import {database} from "../FirebaseConfig"
import {updateDoc, doc, getDocs, collection, query, where, onSnapshot} from "firebase/firestore"

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

function Play1vs1onlinegame() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
  const [winner, setWinner] = useState()
  const playerPieces = localStorage.getItem("chosenPieces")
  const {gameID} = useParams()
  const [whitePlayer, setWhitePlayer] = useState(null)
  const [blackPlayer, setBlackPlayer] = useState(null)
  
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
    const docRef = doc(database, "games", gameID)

    onSnapshot(docRef, (doc) => {
      if (doc.data().status === "started") {
        setLoading(false)
      }
    })
  }, [gameID])

  useEffect(() => {
    const getUsersData = () => {
      let whitePlayerID = ""
      let blackPlayerID = ""
      const docUserIDRef = doc(database, "games", gameID)

      onSnapshot(docUserIDRef, async (doc) => {
        if (doc.data().status === "started") {
          whitePlayerID = doc.data().whiteID
          blackPlayerID = doc.data().blackID
          const userCollectionRef = collection(database, "leaderboards")
          const getWhiteUser = query(userCollectionRef, where("userID", "==", whitePlayerID))
          const querySnapshotWhite = await getDocs(getWhiteUser)

          querySnapshotWhite.forEach((doc) => {
            setWhitePlayer(doc.data().username)
          })

          const getBlackUser = query(userCollectionRef, where("userID", "==", blackPlayerID))
          const querySnapshotBlack = await getDocs(getBlackUser)

          querySnapshotBlack.forEach((doc) => {
            setBlackPlayer(doc.data().username)
          })
        }
      })
    }

    getUsersData()
  }, [gameID])

  useEffect(() => {
    if (isGameOver) {
      const docRef = doc(database, "games", gameID)
      const gameResult = result === "Black is the winner by checkmate!" ? "black" : (result === "White is the winner by checkmate!" ?
      "white" : "draw")

      updateDoc(docRef, {
        result: gameResult,
        status: "ended",
      }).then(() => {
        
      }).catch(() => {
        
      })
    }
  }, [gameID, isGameOver, result])

  return (
    <div className="play1vs1onlinegame" data-theme={theme}>
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
            <div>
              <ModalResult open={isGameOver} result={result} winner={winner} online={true}/>
            </div>
            <div className="board_container_online">
              <h2 style={{color: theme === "lightmode" ? "var(--primary)" : "var(--secondary)", marginBottom: "min(0.2rem, min(0.4vw, 0.4vh))", 
              textAlign: "right", fontSize: "min(1.2rem, min(2.5vw, 2.5vh))"}}>{playerPieces === "w" ? blackPlayer : whitePlayer}</h2>
              <Chessboard className="chessboard" playerPieces={playerPieces} isGameOver={isGameOver} board={board} 
              turn={turn} boardtype={"1vs1online"} onlineGameID={gameID}/>
              <h2 style={{color: theme === "lightmode" ? "var(--primary)" : "var(--secondary)", marginTop: "min(0.2rem, min(0.4vw, 0.4vh))",
              textAlign: "left", fontSize: "min(1.2rem, min(2.5vw, 2.5vh))"}}>{playerPieces === "w" ? whitePlayer : blackPlayer}</h2>
              <div className="board_padding_online"/>
            </div>
          </div>}
        <SwitchThemeButton onClick={switchTheme} style={{zIndex: "9"}}>
          {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
        </SwitchThemeButton>
      </DndProvider>
    </div>
  )
}

export default Play1vs1onlinegame
