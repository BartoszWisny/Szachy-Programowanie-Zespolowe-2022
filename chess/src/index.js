import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {HashRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Play1vs1online from "./pages/Play1vs1online"
import Playvscomputer from "./pages/Playvscomputer"
import Play1vs1offline from "./pages/Play1vs1offline"
import Playvsourchessai from "./pages/Playvsourchessai"
import Learnanalyze from "./pages/Learnanalyze"
import Learnwatch from "./pages/Learnwatch"
import Puzzles from "./pages/Puzzles"
import Leaderboards from "./pages/Leaderboards"
import Feedback from "./pages/Feedback"
import About from "./pages/About"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/play/1vs1online" element={<Play1vs1online/>}/>
      <Route path="/play/vscomputer" element={<Playvscomputer/>}/>
      <Route path="/play/1vs1offline" element={<Play1vs1offline/>}/>
      <Route path="/play/vsourchessai" element={<Playvsourchessai/>}/>
      <Route path="/learn/analyze" element={<Learnanalyze/>}/>
      <Route path="/learn/watch" element={<Learnwatch/>}/>
      <Route path="/puzzles" element={<Puzzles/>}/>
      <Route path="/leaderboards" element={<Leaderboards/>}/>
      <Route path="/feedback" element={<Feedback/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
  </HashRouter>
)
