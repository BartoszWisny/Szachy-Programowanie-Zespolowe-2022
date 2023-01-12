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
      <SwitchThemeButton onClick={switchTheme} style={{zIndex: "9"}}>
        {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
      </SwitchThemeButton>
      {console.log(leaderboards)}
    </div>
  )
}

export default Leaderboards
