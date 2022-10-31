import React from "react"
import {useNavigate} from "react-router-dom"
import play1vs1online from "../assets/play1vs1online.jpeg"
import playvscomputer from "../assets/playvscomputer.jpg"
import play1vs1offline from "../assets/play1vs1offline.jpg"
import playvsourchessai from "../assets/playvsourchessai.jpg"
import learnanalyze from "../assets/learnanalyze.jpg"
import learnwatch from "../assets/learnwatch.jpg"
import minigamesdaily from "../assets/minigamesdaily.jpg"
import minigamespuzzles from "../assets/minigamespuzzles.jpg"
import leaderboardgames from "../assets/leaderboardgames.jpg"
import leaderboardminigames from "../assets/leaderboardminigames.jpg"
import helpfeedback from "../assets/helpfeedback.jpg"
import helpsuggestion from "../assets/helpsuggestion.jpg"
import helpbug from "../assets/helpbug.jpg"
import about from "../assets/about.jpg"

const Tiles = () => {
  return (
    <div className="tiles">
      <Tile 
        img={play1vs1online}
        path="/play/1vs1online"
        title="Play 1 vs 1 (online)"
        description="Test yourself against online players"
        button="Play"/>
      <Tile 
        img={playvscomputer}
        path="/play/vscomputer"
        title="Play vs computer"
        description="Try to beat even the toughest bots"
        button="Play"/>
      <Tile 
        img={play1vs1offline}
        path="/play/1vs1offline"
        title="Play 1 vs 1 (offline)"
        description="Play with your friend and enjoy the game"
        button="Play"/>
      <Tile 
        img={playvsourchessai}
        path="/play/vsourchessai"
        title="Play vs our chess AI"
        description="Play against our experimental chess AI"
        button="Play"/>
      <Tile 
        img={learnanalyze}
        path="/learn/analyze"
        title="Analyze games"
        description="Analyze the game and draw conclusions"
        button="Analyze"/>
      <Tile 
        img={learnwatch}
        path="/learn/watch"
        title="Watch games"
        description="Learn from the best of the best"
        button="Watch"/>
      <Tile 
        img={minigamesdaily}
        path="/minigames/daily"
        title="Daily challenge"
        description="Solve today's chess puzzle"
        button="Play"/>
      <Tile 
        img={minigamespuzzles}
        path="/minigames/puzzles"
        title="Puzzles"
        description="Try yourself in different positions"
        button="Play"/>
      <Tile 
        img={leaderboardgames}
        path="/leaderboard/games"
        title="Leaderboard - games"
        description="Find out how good you are at online games"
        button="View"/>
      <Tile 
        img={leaderboardminigames}
        path="/leaderboard/minigames"
        title="Leaderboard - minigames"
        description="Check how well you solve the puzzles"
        button="View"/>
      <Tile 
        img={helpfeedback}
        path="/help/feedback"
        title="Leave your feedback"
        description="Tell us what you think of our app"
        button="Leave"/>
      <Tile 
        img={helpsuggestion}
        path="/help/suggestion"
        title="Make a suggestion"
        description="Let us know about your interesting ideas"
        button="Suggest"/>
      <Tile 
        img={helpbug}
        path="/help/bug"
        title="Report a bug"
        description="Report bugs and we will fix them"
        button="Report"/>
      <Tile 
        img={about}
        path="/about"
        title="About"
        description="Get to know the app and its developers"
        button="Check out"/>
    </div>
  )
}
  
function Tile(props) {
  const navigate = useNavigate();
  const route = () => {
    navigate(props.path);
  };

  return(
    <div className="tile">
      <div className="tile_body">
        <img src={props.img} class="tile_image" alt="chess"/>
        <h2 className="tile_title">{props.title}</h2>
        <p className="tile_description">{props.description}</p>
      </div>
      <button className="tile_button" onClick={route}>{props.button}</button>
    </div>
  )
}

export default Tiles
