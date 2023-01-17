import React, {useEffect, useState /* , useCallback */} from "react"
import "./Learnwatch.css"
import {Helmet} from "react-helmet"
import SidebarMenu from "../components/SidebarMenu"
import useLocalStorage from "use-local-storage"
import styled from "styled-components"
import * as IoIcons from "react-icons/io"
import {GridLoader} from "react-spinners"

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

function Learnwatch() {
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

  /* function shuffle() { 
    return 0.5 - Math.random() 
  } 

  function getRandomInt(int) {
    return Math.floor(Math.random() * int)
  }

  // const [games, setGames] = useState([])
  const [game, setGame] = useState(null) */

  /* const getGMGames = useCallback(async () => {
    const url1 = "https://api.chess.com/pub/titled/GM"
    const response1 = await fetch(url1)
    const data1 = await response1.json()
    const GMs = data1.players
    const randomGM = GMs[getRandomInt(GMs.length)]
    const url2 = `https://api.chess.com/pub/player/${randomGM}`
    const response2 = await fetch(url2)
    const data2 = await response2.json()
    const gmname = data2.name ? data2.name : data2.username
    const url3 = `https://api.chess.com/pub/player/${randomGM}/games/archives`
    const response3 = await fetch(url3)
    const data3 = await response3.json()
    const gmarchives = data3.archives
    const randomarchive = getRandomInt(gmarchives.length)
    const archive = gmarchives[randomarchive]
    const url4 = archive
    const response4 = await fetch(url4)
    const data4 = await response4.json()
    const gmgames = data4.games
    const randomgame = getRandomInt(gmgames.length)
    const gmgame = gmgames[randomgame]
    const gmgametype = gmgame.rules
    let gmgameresult = ""
    let gmopponentname = "" */


    // gms.sort(shuffle)
    // const randomgms = gms.slice(0, 5)
    // let games = []

    /* for (let i = 0; i < randomgms.length; i++) {
      const url2 = `https://api.chess.com/pub/player/${randomgms[i]}`
      const response2 = await fetch(url2)
      const data2 = await response2.json()
      const gmname = data2.name ? data2.name : data2.username
      const url3 = `https://api.chess.com/pub/player/${randomgms[i]}/games/archives`
      const response3 = await fetch(url3)
      const data3 = await response3.json()
      const gmarchives = data3.archives
      const randomarchive = getRandomInt(gmarchives.length)
      const archive = gmarchives[randomarchive]
      const url4 = archive
      const response4 = await fetch(url4)
      const data4 = await response4.json()
      const gmgames = data4.games
      const randomgame = getRandomInt(gmgames.length)
      const gmgame = gmgames[randomgame]
      const gmgametype = gmgame.rules
      let gmgameresult = ""
      let gmopponentname = ""
    
      if (gmgame.black["@id"] === `https://api.chess.com/pub/player/${randomgms[i]}`) {
        gmgameresult = gmgame.black.result === "win" ? "Win" : 
                       (gmgame.black.result === "chechmated" ? "Checkmated" :
                       (gmgame.black.result === "agreed" ? "Draw agreed" : 
                       (gmgame.black.result === "repetition" ? "Draw by repetition" : 
                       (gmgame.black.result === "timeout" ? "Timeout" : 
                       (gmgame.black.result === "resigned" ? "Resigned" : 
                       (gmgame.black.result === "stalemate" ? "Stalemate" : 
                       (gmgame.black.result === "lose" ? "Lose" : 
                       (gmgame.black.result === "insufficient" ? "Insufficient material" : 
                       (gmgame.black.result === "50move" ? "Draw by 50-move rule" : 
                       (gmgame.black.result === "kingofthehill" ? "Opponent king reached the hill" : 
                       (gmgame.black.result === "threecheck" ? "Checked for the 3rd time" : 
                       (gmgame.black.result === "timevsinsufficient" ? "Draw by timeout vs insufficient material" :
                       (gmgame.black.result === "bughousepartnerlose" ? "Bughouse partner lost" : null)))))))))))))
        const url5 = gmgame.white["@id"]
        const response5 = await fetch(url5)
        const data5 = await response5.json()
        gmopponentname = data5.name ? data5.name : data5.username
      } else if (gmgame.white["@id"] === `https://api.chess.com/pub/player/${randomgms[i]}`) {
        gmgameresult = gmgame.white.result === "win" ? "Win" : 
                       (gmgame.white.result === "chechmated" ? "Checkmated" :
                       (gmgame.white.result === "agreed" ? "Draw agreed" : 
                       (gmgame.white.result === "repetition" ? "Draw by repetition" : 
                       (gmgame.white.result === "timeout" ? "Timeout" : 
                       (gmgame.white.result === "resigned" ? "Resigned" : 
                       (gmgame.white.result === "stalemate" ? "Stalemate" : 
                       (gmgame.white.result === "lose" ? "Lose" : 
                       (gmgame.white.result === "insufficient" ? "Insufficient material" : 
                       (gmgame.white.result === "50move" ? "Draw by 50-move rule" : 
                       (gmgame.white.result === "kingofthehill" ? "Opponent king reached the hill" : 
                       (gmgame.white.result === "threecheck" ? "Checked for the 3rd time" : 
                       (gmgame.white.result === "timevsinsufficient" ? "Draw by timeout vs insufficient material" :
                       (gmgame.white.result === "bughousepartnerlose" ? "Bughouse partner lost" : null)))))))))))))
        const url5 = gmgame.black["@id"]
        const response5 = await fetch(url5)
        const data5 = await response5.json()
        gmopponentname = data5.name ? data5.name : data5.username
      }

      const gmgamepgn = gmgame.pgn

      const gmgameinfo = {
        gmname: gmname,
        gmopponentname: gmopponentname,
        gmgametype: gmgametype,
        gmgameresult: gmgameresult,
        gmgamepgn: gmgamepgn
      }

      console.log(gmgameinfo)
      games[i] = gmgameinfo
    }

    setGames(games)
    // setLoading(false)
  }, []) 

  useEffect(() => {
    getGMGames()
  }, [getGMGames]) */

  return (
    <div className="learnwatch" data-theme={theme}>
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
        </div> : null}
        {/* <div>
          <div className="score_table" style={{zIndex: 0}}>
            <table className="score_table_columns">
              <thead className="score_table_header">
                <tr>
                  <th>Player</th>
                  <th>Opponent</th>
                  <th>Game type</th>
                  <th>Result</th>
                  <th>Watch</th>
                </tr>
              </thead>
              {games.map((val, key) => {
              return (
                <tbody key={key}>
                  <tr>
                    <td><b>{val.gmname}</b></td>
                    <td>{val.gmopponentname}</td>
                    <td>{val.gmgametype}</td>
                    <td>{val.gmgameresult}</td>
                    <button>Watch</button>
                  </tr>
                </tbody>
              )
              })}
            </table>
          </div>
          <div className="table_padding"/>
            </div> } */}
      <SwitchThemeButton onClick={switchTheme} style={{zIndex: "9"}}>
        {theme === "lightmode" ? (<IoIcons.IoIosSunny />) : (<IoIcons.IoIosMoon />)}
      </SwitchThemeButton>
    </div>
  )
}

export default Learnwatch
