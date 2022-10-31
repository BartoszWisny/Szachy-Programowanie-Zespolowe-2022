import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {HashRouter, Routes, Route} from "react-router-dom"
import Play1vs1online from "./pages/Play1vs1online"
import Playvscomputer from "./pages/Playvscomputer"
import Play1vs1offline from "./pages/Play1vs1offline"
import Playvsourchessai from "./pages/Playvsourchessai"
import Learnanalyze from "./pages/Learnanalyze"
import Learnwatch from "./pages/Learnwatch"
import Minigamesdaily from "./pages/Minigamesdaily"
import Minigamespuzzles from "./pages/Minigamespuzzles"
import Leaderboardgames from "./pages/Leaderboardgames"
import Leaderboardminigames from "./pages/Leaderboardminigames"
import Helpfeedback from "./pages/Helpfeedback"
import Helpsuggestion from "./pages/Helpsuggestion"
import Helpbug from "./pages/Helpbug"
import About from "./pages/About"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/play/1vs1online" element={<Play1vs1online/>}/>
      <Route path="/play/vscomputer" element={<Playvscomputer/>}/>
      <Route path="/play/1vs1offline" element={<Play1vs1offline/>}/>
      <Route path="/play/vsourchessai" element={<Playvsourchessai/>}/>
      <Route path="/learn/analyze" element={<Learnanalyze/>}/>
      <Route path="/learn/watch" element={<Learnwatch/>}/>
      <Route path="/minigames/daily" element={<Minigamesdaily/>}/>
      <Route path="/minigames/puzzles" element={<Minigamespuzzles/>}/>
      <Route path="/leaderboard/games" element={<Leaderboardgames/>}/>
      <Route path="/leaderboard/minigames" element={<Leaderboardminigames/>}/>
      <Route path="/help/feedback" element={<Helpfeedback/>}/>
      <Route path="/help/suggestion" element={<Helpsuggestion/>}/>
      <Route path="/help/bug" element={<Helpbug/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
  </HashRouter>
)
