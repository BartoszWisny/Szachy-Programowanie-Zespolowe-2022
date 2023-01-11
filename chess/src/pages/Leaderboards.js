import React, {useEffect, useState, useCallback} from "react"
import "./Leaderboards.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import useLocalStorage from "use-local-storage"
import styled from "styled-components"
import * as IoIcons from "react-icons/io"
import {GridLoader} from "react-spinners"
import { collection, getDocs } from "firebase/firestore"
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


function Leaderboards() {
  const [theme, setTheme] = useLocalStorage("theme" ? "darkmode" : "lightmode")
  
  const switchTheme = () => {
    const newTheme = theme === "lightmode" ? "darkmode" : "lightmode"
    setTheme(newTheme)
  }

  const [loading, setLoading] = useState(false)

// const data = [
//     { username: "Player1", wins: 21, draws: 7, defeats: 2, points: 290},
//     { username: "Player2", wins: 19, draws: 8, defeats: 4, points: 265},
//     { username: "Player3", wins: 18, draws: 9, defeats: 4, points: 254},
//     { username: "Player4", wins: 17, draws: 9, defeats: 9, points: 203},
//     { username: "Player5", wins: 6, draws: 11, defeats: 10, points: 102},
//     { username: "Player6", wins: 6, draws: 3, defeats: 1, points: 92},
//     { username: "Player7", wins: 3, draws: 0, defeats: 4, points: 70},
//   ]

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const [leaderboards, setLeaderboards] = useState([]);

  const fetchData = useCallback(async () => {
    await getDocs(collection(database, "leaderboards"))
      .then((querySnapshot) => {
        const data = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id}))
        setLeaderboards(data)
        // console.log(data)
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="leaderboards" data-theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
          <title>Leaderboard - games</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
      {loading ? 
        <div>
          <GridLoader color={theme === "lightmode" ? "var(--primary)" : "var(--secondary)"} loading={loading} size={50} 
          speedMultiplier={1} style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          userSelect: "none"}}/>
        </div> : 
          <div className="score_table">
          <table className="score_table_columns">
            <thead className="score_table_header">
              <tr>
                <th>Username</th>
                <th>Wins</th>
                <th>Draws</th>
                <th>Defeats</th>
                <th>Points</th>
              </tr>
            </thead>
            {leaderboards.sort(function(a, b){return b.points - a.points}).map((val, key) => {
             return (
              <tbody key={key}>
                <tr>
                  <td><b>{val.username}</b></td>
                  <td>{val.gamesWon}</td>
                  <td>{val.draws}</td>
                  <td>{val.gamesLost}</td>
                  <td>{val.points}</td>
                </tr>
              </tbody>
            )
            })}
         </table>
        </div> }
      <SwitchThemeButton onClick={switchTheme}>
        {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
      </SwitchThemeButton>
      {console.log(leaderboards)}
    </div>
  )
}

export default Leaderboards