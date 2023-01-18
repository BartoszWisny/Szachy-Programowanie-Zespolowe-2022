import React, {useEffect, useState, useCallback} from "react"
import "./Learnwatch.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import useLocalStorage from "use-local-storage"
import styled from "styled-components"
import * as IoIcons from "react-icons/io"
import {GridLoader} from "react-spinners"
import {collection, getDocs} from "firebase/firestore"
import {database} from "../FirebaseConfig"
import {gameSubject, initGame, resetGame, moveAN, undoMove, getLastMoveCaptured} from "../components/Game"
import Chessboard from "../components/Chessboard"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import * as AiIcons from "react-icons/ai"
import * as FaIcons from "react-icons/fa"
import moveSound from "../assets/sounds/move.mp3"
import captureSound from "../assets/sounds/capture.mp3"
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

const BackButton = styled.button`
  position: absolute;
  background-color: ${({disabled, theme}) => (disabled ? (theme === "lightmode" ? "var(--gray7)" : "var(--gray4)") 
  : (theme === "lightmode" ? "var(--primary)" : "var(--secondary)"))};
  color: ${({disabled, theme}) => (disabled ? (theme === "lightmode" ? "var(--gray4)" : "var(--gray7)") 
  : (theme === "lightmode" ? "var(--secondary)" : "var(--primary)"))};
  opacity: 0.98;
  bottom: min(6rem, min(12.7vw, 12.7vh));
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

const NextButton = styled.button`
  position: absolute;
  background-color: ${({disabled, theme}) => (disabled ? (theme === "lightmode" ? "var(--gray7)" : "var(--gray4)") 
  : (theme === "lightmode" ? "var(--primary)" : "var(--secondary)"))};
  color: ${({disabled, theme}) => (disabled ? (theme === "lightmode" ? "var(--gray4)" : "var(--gray7)") 
  : (theme === "lightmode" ? "var(--secondary)" : "var(--primary)"))};
  opacity: 0.98;
  bottom: min(6rem, min(12.7vw, 12.7vh));
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

const PlayButton = styled.button`
  position: absolute;
  background-color: ${({disabled, theme}) => (disabled ? (theme === "lightmode" ? "var(--gray7)" : "var(--gray4)") 
  : (theme === "lightmode" ? "var(--primary)" : "var(--secondary)"))};
  color: ${({disabled, theme}) => (disabled ? (theme === "lightmode" ? "var(--gray4)" : "var(--gray7)") 
  : (theme === "lightmode" ? "var(--secondary)" : "var(--primary)"))};
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

function Learnwatch() {
  const [board, setBoard] = useState([])
  const [turn, setTurn] = useState()

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

  function playMoveSound() {
    new Audio(moveSound).play().then(() => {
    }).catch(error => {
    })
  }

  function playCaptureSound() {
    new Audio(captureSound).play().then(() => {
    }).catch(error => {
    })
  }

  function getRandomInt(int) {
    return Math.floor(Math.random() * int);
  }

  const [chosenGame, setChosenGame] = useState(null)
  const [white, setWhite] = useState(null)
  const [black, setBlack] = useState(null)
  const [result, setResult] = useState(null)

  const fetchData = useCallback(async () => {
    await getDocs(collection(database, "masterGames"))
      .then((querySnapshot) => {
        const data = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id}))
        const masterGames = data
        const random = getRandomInt(masterGames.length)
        const randomGame = masterGames[random]
        const chess = new Chess()
        chess.loadPgn(randomGame.pgn)
        setWhite(randomGame.white)
        setBlack(randomGame.black)
        setResult(randomGame.result === "white" ? "white won" : (randomGame.result === "black" ? "black won" : "draw"))
        setChosenGame(chess.history())
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const [moveCounter, setMoveCounter] = useState(0)

  const nextMove = useCallback(() => {
    const move = chosenGame[moveCounter]
    moveAN(move)
    setMoveCounter(moveCounter + 1)

    if (getLastMoveCaptured()) {
      playCaptureSound()
    } else {
      playMoveSound()
    }
  }, [chosenGame, moveCounter])

  const backMove = useCallback(() => {
    undoMove()
    setMoveCounter(moveCounter - 1)
  }, [moveCounter])

  const [playGame, setPlayGame] = useState(false)

  useEffect(() => {
    if (playGame === true && moveCounter !== chosenGame.length) {
      let timeout = setTimeout(nextMove, 1500)

      return () => {
        clearTimeout(timeout)
      }
    } else if (playGame === true && moveCounter === chosenGame.length) {
      setPlayGame(false)
    }
  }, [playGame, moveCounter, chosenGame, nextMove])

  return (
    <div className="learnwatch" data-theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Helmet>
          <meta charSet="utf-8" />
            <title>Watch games</title>
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
            {chosenGame && (<div>
              <BackButton theme={theme} onClick={backMove} disabled={playGame || moveCounter === 0 ? true : false}>
                <AiIcons.AiOutlineCaretLeft/>
              </BackButton>
              <NextButton theme={theme} onClick={nextMove} disabled={playGame || moveCounter === chosenGame.length ? true : false}>
                <AiIcons.AiOutlineCaretRight/>
              </NextButton>
              <PlayButton theme={theme} onClick={() => setPlayGame(!playGame)} 
              disabled={moveCounter === chosenGame.length ? true : false}>
                {playGame && moveCounter !== chosenGame.length ? <FaIcons.FaPauseCircle/> : <FaIcons.FaPlayCircle/>}
              </PlayButton>
              <h2 style={{color: theme === "lightmode" ? "var(--primary)" : "var(--secondary)", 
              fontSize: "min(1.4rem, min(3vw, 3vh))", marginLeft: "min(1.5rem, min(3.2vw, 3.2vh))", 
              marginTop: "min(0.5rem, min(1.05vw, 1.05vh))"}}>{white} vs {black} ➜ {result}</h2>
              <div className="board_container_watch">
                <Chessboard className="chessboard" board={board} turn={turn} boardtype={"watch"}/>
                <div className="board_padding"/>
              </div>
            </div>)}
          </div>}      
        <SwitchThemeButton onClick={switchTheme} style={{zIndex: "9"}}>
          {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
        </SwitchThemeButton>
      </DndProvider>
    </div>
  )
}

export default Learnwatch
