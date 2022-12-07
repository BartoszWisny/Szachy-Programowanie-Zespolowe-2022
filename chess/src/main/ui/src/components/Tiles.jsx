import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import play1vs1online from "../assets/tiles/play1vs1online.jpg"
import playvscomputer from "../assets/tiles/playvscomputer.jpg"
import play1vs1offline from "../assets/tiles/play1vs1offline.jpg"
import playvsourchessai from "../assets/tiles/playvsourchessai.jpg"
import learnanalyze from "../assets/tiles/learnanalyze.jpg"
import learnwatch from "../assets/tiles/learnwatch.jpg"
import puzzles from "../assets/tiles/puzzles.jpg"
import leaderboards from "../assets/tiles/leaderboards.jpg"
import feedback from "../assets/tiles/feedback.jpg"
import about from "../assets/tiles/about.jpg"
import {BlurhashCanvas} from "react-blurhash"
import {LazyLoadImage} from "react-lazy-load-image-component"

const Tiles = () => {
  return (
    <div className="tiles">
      <Tile 
        img={play1vs1online}
        hash="M6H1iB0#9a~U0100%LogE1?H00IUkC9aW;"
        path="/play/1vs1online"
        title="Play 1 vs 1 (online)"
        description="Test yourself against online players"
        button="Play"/>
      <Tile 
        img={playvscomputer}
        hash="MiIOwyaeM{Mx%g~qjtbIWBRj?bofoga#Rj"
        path="/play/vscomputer"
        title="Play vs computer"
        description="Try to beat even the toughest bots"
        button="Play"/>
      <Tile 
        img={play1vs1offline}
        hash="MAF#],~XIA~VEl#k00Vr$jM_9G01%Mt8R*"
        path="/play/1vs1offline"
        title="Play 1 vs 1 (offline)"
        description="Play with your friend and enjoy the game"
        button="Play"/>
      <Tile 
        img={playvsourchessai}
        hash="M68N69WARgRm^io%0fnz9vxtxWWB~VR+k6"
        path="/play/vsourchessai"
        title="Play vs our chess AI"
        description="Play against our experimental chess AI"
        button="Play"/>
      <Tile 
        img={learnanalyze}
        hash="M7H^hHrEP79G0M024o~U?G^j4?tQ%LRk%1"
        path="/learn/analyze"
        title="Analyze games"
        description="Analyze the game and draw conclusions"
        button="Analyze"/>
      <Tile 
        img={learnwatch}
        hash="MaIEU.x[M{xaS4_NtRWAfRkCNeo#Rjn%og"
        path="/learn/watch"
        title="Watch games"
        description="Learn from the best of the best"
        button="Watch"/>
      <Tile 
        img={puzzles}
        hash="MbLEWw9Fxvt7D%~qM{x]WBMxnhayf,WCWD"
        path="/puzzles"
        title="Puzzles"
        description="Try yourself in different positions"
        button="Play"/>
      <Tile 
        img={leaderboards}
        hash="M2DI%vD5rs}sQ.v0Mc00NFI;5ss=IoJ.o#"
        path="/leaderboards"
        title="Leaderboards"
        description="Find out how good you are at chess"
        button="View"/>
      <Tile 
        img={feedback}
        hash="M9DJ0E00.SR4IA~qDjxuMxD%00~WxaE2n$"
        path="/feedback"
        title="Leave your feedback"
        description="Tell us what you think of our app"
        button="Leave"/>
      <Tile 
        img={about}
        hash="MIC?r]-;t7t7ay~qof%Mt7ayofRjoft7t7"
        path="/about"
        title="About"
        description="Get to know the app and its developers"
        button="Check out"/>
    </div>
  )
}
  
function Tile(props) {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    setLoadStarted(true);
  };

  const navigate = useNavigate();
  const route = () => {
    navigate(props.path);
  };

  return(
    <div className="tile">
      <div className="tile_body">
        <LazyLoadImage src={props.img} className="tile_image" alt="chess" onLoad={handleLoad} beforeLoad={handleLoadStarted} />
        {!isLoaded && isLoadStarted && 
        (<BlurhashCanvas className="tile_blurhash" hash={props.hash} punch={1} />)}
        <h2 className="tile_title">{props.title}</h2>
        <p className="tile_description">{props.description}</p>
      </div>
      <button className="tile_button" onClick={route}>{props.button}</button>
    </div>
  )
}

export default Tiles
