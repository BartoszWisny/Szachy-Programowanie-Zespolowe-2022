import React, {useEffect, useState, useCallback} from "react"
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

function Learnanalyze() {
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


  return (
    <div className="learnanalyze" data-theme={theme}>
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
          <table className="games_table_columns">
            <thead className="games_table_header">
              <tr>
                <th>User</th>
                <th></th>
                <th>Opponent</th>
                <th>Result</th>
                <th>Analyze</th>
              </tr>
            </thead>
            {games !== null && games.map((val, key) => {
              return (
                <tbody key={key}>
                  <tr>
                    <td><b>{userPieces[key] === "w" ? val.whiteID : val.blackID}</b></td>
                    <td>vs</td>
                    <td><b>{userPieces[key] === "w" ? val.blackID : val.whiteID}</b></td>
                    <td><b>{val.result}</b></td>
                    <td><button className="analyze_button">Analyze</button></td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>}
      <SwitchThemeButton onClick={switchTheme} style={{zIndex: "9"}}>
        {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
      </SwitchThemeButton>
    </div>
  )
}

export default Learnanalyze
