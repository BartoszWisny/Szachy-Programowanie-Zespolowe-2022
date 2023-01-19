import React, {useEffect, useState, useCallback, useMemo} from "react"
import "./Learnanalyze.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import useLocalStorage from "use-local-storage"
import styled from "styled-components"
import * as IoIcons from "react-icons/io"
import {GridLoader} from "react-spinners"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import {database} from "../FirebaseConfig"
import {gameSubject, initGame, resetGame, moveAN, undoMove, getLastMoveCaptured, getStockfishFen} from "../components/Game"
import Chessboard from "../components/Chessboard"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"
import * as FaIcons from "react-icons/fa"
import moveSound from "../assets/sounds/move.mp3"
import captureSound from "../assets/sounds/capture.mp3"
import Stockfish from "../components/Stockfish"

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

const StockfishButton = styled.button`
  position: absolute;
  background-color: ${({disabled, theme}) => (disabled ? (theme === "lightmode" ? "var(--gray7)" : "var(--gray4)") 
  : (theme === "lightmode" ? "var(--primary)" : "var(--secondary)"))};
  color: ${({disabled, theme}) => (disabled ? (theme === "lightmode" ? "var(--gray4)" : "var(--gray7)") 
  : (theme === "lightmode" ? "var(--secondary)" : "var(--primary)"))};
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

function Learnanalyze() {
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
    }, 5000)
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

  const [user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser)
      }
    })
  }, [auth])

  const [games, setGames] = useState([])

  const fetchData = useCallback(async () => {
    let conditions = []
    conditions.push(where("whiteID", "==", user.uid))
    conditions.push(where("status", "==", "ended"))
    const query1 = query(collection(database, "games"), ...conditions)

    await getDocs(query1)
      .then((querySnapshot) => {
        const data = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id}))
        setGames(array => array.concat(data))
    }) 

    conditions = []
    conditions.push(where("blackID", "==", user.uid))
    conditions.push(where("status", "==", "ended"))
    const query2 = query(collection(database, "games"), where("blackID", "==", user.uid), where("status", "==", "ended"))
    await getDocs(query2)
      .then((querySnapshot) => {
        const data = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id}))
        setGames(array => array.concat(data))
    })
  }, [user])

  const [fetched, setFetched] = useState(false)
  const [userPieces, setUserPieces] = useState([])
  const [chosenGame, setChosenGame] = useState(null)
  const [playerPieces, setPlayerPieces] = useState(null)

  useEffect(() => {
    if(user !== null && games.length === 0 && !fetched) {
      fetchData()
      setFetched(true)
    }

    const getUserGamesData = async () => {
      if (user !== null && games !== null) {
        for (let i = 0; i < games.length; i++) {
          if (games[i].whiteID === user.uid) {
            setUserPieces(array => array.concat(["w"]))

            if (games[i].result === "white") {
              games[i].result = "Win"
            } else if (games[i].result === "black") {
              games[i].result = "Lose"
            } else if (games[i].result === "draw") {
              games[i].result = "Draw"
            }
          } else if (games[i].blackID === user.uid) {
            setUserPieces(array => array.concat(["b"]))

            if (games[i].result === "white") {
              games[i].result = "Lose"
            } else if (games[i].result === "black") {
              games[i].result = "Win"
            } else if (games[i].result === "draw") {
              games[i].result = "Draw"
            }
          }
        }

        for (let i = 0; i < games.length; i++) {
          let whitePlayerID = games[i].whiteID
          let blackPlayerID = games[i].blackID  
          const userCollectionRef = collection(database, "leaderboards")
          const getWhiteUser = query(userCollectionRef, where("userID", "==", whitePlayerID))
          const querySnapshotWhite = await getDocs(getWhiteUser)
    
          querySnapshotWhite.forEach((doc) => {
            games[i].whiteID = doc.data().username
          })
    
          const getBlackUser = query(userCollectionRef, where("userID", "==", blackPlayerID))
          const querySnapshotBlack = await getDocs(getBlackUser)
    
          querySnapshotBlack.forEach((doc) => {
            games[i].blackID = doc.data().username
          })
        }
      }
    }      

    getUserGamesData()
  }, [games, fetchData, fetched, user])

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

  const stockfish = useMemo(() => {
    return new Stockfish()
  }, [])
  
  stockfish.setSkillLevel(20)  
  stockfish.setMoveTime(1000)
  const [stockfishMove, setStockfishMove] = useState("")

  const stockfishEngineMove = useCallback(() => {
    const getMove = setInterval(() => {
      const bestMove = stockfish.getBestMove()
        
      if (!bestMove && !stockfish.isThinking) {
        stockfish.searchBestMoveMoveTime(getStockfishFen())
      } else if (bestMove) {
        if (stockfishMove === "") {
          setStockfishMove(bestMove)
          stockfish.bestMove = null
        }
        
        setHintShowed(true)
        clearInterval(getMove)
      }
    }, 1000)
  }, [stockfish, stockfishMove])

  const [hintShowed, setHintShowed] = useState(true)

  useEffect(() => {
    if (playGame === false && hintShowed === false) {
      stockfishEngineMove()
    }
  }, [playGame, hintShowed, stockfishMove, stockfishEngineMove])

  return (
    <div className="learnanalyze" data-theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Helmet>
          <meta charSet="utf-8" />
            <title>Analyze games</title>
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
          <div className="games_table" style={{zIndex: 0}}>
            {games !== null && chosenGame === null && (<table className="games_table_columns">
              <thead className="games_table_header">
                <tr>
                  <th>User</th>
                  <th></th>
                  <th>Opponent</th>
                  <th>Result</th>
                  <th>Analyze</th>
                </tr>
              </thead>
              {games !== null && chosenGame === null && games.map((val, key) => {
                return (
                  <tbody key={key}>
                    <tr>
                      <td><b>{userPieces[key] === "w" ? val.whiteID : val.blackID}</b></td>
                      <td style={{minWidth: "min(3rem, min(4.5vw, 4.5vh))"}}>vs</td>
                      <td><b>{userPieces[key] === "w" ? val.blackID : val.whiteID}</b></td>
                      <td><b>{val.result}</b></td>
                      <td style={{minWidth: "min(8rem, min(20vw, 20vh))"}}><button className="analyze_button" onClick={() => {setChosenGame(val.moves); setPlayerPieces(userPieces[key])}}>
                      Analyze</button></td>
                    </tr>
                  </tbody>
                )
              })}
            </table>)}
          </div>}
          {games !== null && chosenGame === null && <div className="table_padding"/>}
          {chosenGame && (<div>
            <BackButton theme={theme} onClick={() => {backMove(); setStockfishMove("")}} 
            disabled={!hintShowed || playGame || moveCounter === 0 ? true : false}>
              <AiIcons.AiOutlineCaretLeft/>
            </BackButton>
            <NextButton theme={theme} onClick={() => {nextMove(); setStockfishMove("")}} 
            disabled={!hintShowed || playGame || moveCounter === chosenGame.length ? true : false}>
              <AiIcons.AiOutlineCaretRight/>
            </NextButton>
            <PlayButton theme={theme} onClick={() => {setPlayGame(!playGame); setStockfishMove("")}}
            disabled={!hintShowed || moveCounter === chosenGame.length ? true : false}>
              {playGame && moveCounter !== chosenGame.length ? <FaIcons.FaPauseCircle/> : <FaIcons.FaPlayCircle/>}
            </PlayButton>
            <StockfishButton theme={theme} onClick={() => setHintShowed(false)} 
            disabled={!hintShowed || playGame || moveCounter === chosenGame.length ? true : false}>
              <BsIcons.BsQuestionCircleFill/>
            </StockfishButton>
            <div className="board_container_analyze">
              <Chessboard className="chessboard" playerPieces={playerPieces} board={board} turn={turn} boardtype={"analyze"}/>
            </div>
            <h2 style={{color: theme === "lightmode" ? "var(--primary)" : "var(--secondary)", 
            fontSize: "min(1.4rem, min(3vw, 3vh))", marginLeft: "min(1.5rem, min(3.2vw, 3.2vh))", 
            marginTop: "min(0.5rem, min(1.05vw, 1.05vh))", paddingBottom: "min(0.2rem, 0.6vh)"}}>
            Next move played ➜ {moveCounter === chosenGame.length ? "-" : chosenGame[moveCounter].from + " " + chosenGame[moveCounter].to}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Best move ➜ {stockfishMove === "" ? "-" : stockfishMove}</h2>
          </div>)}
        <SwitchThemeButton onClick={switchTheme} style={{zIndex: "9"}}>
          {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
        </SwitchThemeButton>
      </DndProvider>
      {console.log(stockfishMove)}
    </div>
  )
}

export default Learnanalyze
