import './App.css'
import {Helmet} from "react-helmet"
import Tiles from "./components/Tiles"
import BackgroundVideo from "./components/BackgroundVideo"
import SidebarMenu from "./components/SidebarMenu"
import ReactAudioPlayer from "react-audio-player"
import chesstheme from "./assets/sounds/chesstheme.mp3"
import styled from "styled-components"
import * as TbIcons from "react-icons/tb"
import useLocalStorage from "use-local-storage"

const PlayChessThemeButton = styled.button`
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

function App() {
  const [play, setPlay] = useLocalStorage("play" ? false : true)

  const changePlayChessTheme = () => {
    const newPlay = play ? false : true
    setPlay(newPlay)
  }

  return (
    <div className="main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chess - Learn and Play</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Title" />
      </Helmet>
      <SidebarMenu />
      <PlayChessThemeButton onClick={changePlayChessTheme}>
        {play ? (<TbIcons.TbMusic />) : (<TbIcons.TbMusicOff />)}
        {play ? (<ReactAudioPlayer src={chesstheme} autoPlay loop volume={0.5} />) : null}
      </PlayChessThemeButton>
      <BackgroundVideo />
      <Tiles />
    </div>
  )
}

export default App