import './App.css'
import {Helmet} from "react-helmet"
import Tiles from "./components/Tiles"
import BackgroundVideo from "./components/BackgroundVideo"
import SidebarMenu from "./components/SidebarMenu"

function App() {
  return (
    <div className="main">
      <Helmet>
        <meta charSet="utf-8" />
          <title>Chess - Learn and Play</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title" />
      </Helmet>
      <BackgroundVideo />
      <Tiles />
      <SidebarMenu />
    </div>
  )
}

export default App
