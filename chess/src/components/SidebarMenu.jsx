import React, {useState} from "react"
import styled from "styled-components"
import {Link} from "react-router-dom"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as BiIcons from "react-icons/bi"
import {SidebarData} from "./SidebarData"
import SubMenu from "./SubMenu"
import {useNavigate} from "react-router-dom"
import {NotificationContainer} from "react-notifications"
import 'react-notifications/lib/notifications.css'
import { getAuth, signOut } from "firebase/auth"
import * as TbIcons from "react-icons/tb"
import ReactAudioPlayer from "react-audio-player"
import chesstheme from "../assets/sounds/chesstheme.mp3"
import useLocalStorage from "use-local-storage"
import { useLocation } from "react-router-dom"

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

const Nav = styled.div`
  position: relative;
  background-color: var(--primary);
  opacity: 0.98;
  height: 2.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 9;
`

const NavIcon = styled(Link)`
  color: var(--secondary);
  opacity: 0.98;  
  margin-left: 0.6rem;
  font-size: 1.4rem;
  height: 2.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const SidebarNav = styled.nav`
  background-color: var(--primary);
  opacity: 0.98;
  width: 16rem;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: ${({sidebar}) => (sidebar ? '0': '-100%')};
  transition: 500ms;
  z-index: 10;
`

const AccountMenu = styled.nav`
  background-color: var(--primary);
  opacity: 0.98;
  margin-top: 2.2rem;
  width: 10rem;
  height: 2.2rem;
  display: flex;
  justify-content: flex-start;
  position: fixed;
  top: ${({accountSidebar}) => (accountSidebar ? '0': '-100%')};
  right: 0;
  transition: 500ms;
  z-index: 8;
`

const AccountMenuWrap = styled.div`
  background-color: var(--primary);
  opacity: 0.98;
  width: 100%;
`

const SidebarWrap = styled.div`
  background-color: var(--primary);
  opacity: 0.98;
  width: 100%;
`

const HomeButton = styled.button`
  background-color: var(--primary);
  color: var(--secondary);
  opacity: 0.98;  
  margin-left: 0.6rem;
  font-size: 1.4rem;
  height: 2.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  border: 0;
`

const LoginButton = styled.button`
  background-color: var(--primary);
  color: var(--secondary);
  opacity: 0.98; 
  position: absolute; 
  right: 0.6rem;
  font-size: 1.6rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 0;
`

const SidebarMenu = () => {
  const getAccessToken = () => localStorage.getItem('logged_in')
  const isAuthenticated = () => !!getAccessToken()
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  const [accountSidebar, setAccountSidebar] = useState(false)
  const showAccountSidebar = () => setAccountSidebar(!accountSidebar)
  const navigate = useNavigate();
  const homeRoute = () => {
    navigate("/");
  };
  const loginRoute = () => {
    navigate("/login");
  };

  const [play, setPlay] = useLocalStorage("play" ? false : true)

  const changePlayChessTheme = () => {
    const newPlay = play ? false : true
    setPlay(newPlay)
  }

  const signOutButton = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem("logged_in")
      navigate("/");
      window.location.reload(false);
    }).catch((error) => {
      // console.log(error)
      // An error happened.
    });
  }

  const location = useLocation()

  return (
    <div className="sidebar_menu">
      <Nav className="nav">
        <NavIcon to="#" className="nav_icon" draggable="false">
          <FaIcons.FaBars onClick={showSidebar}/>
        </NavIcon>
        <HomeButton onClick={homeRoute}>
          <AiIcons.AiFillHome/>
        </HomeButton>
        {location.pathname === "/" ? <PlayChessThemeButton onClick={changePlayChessTheme}>
          {play ? (<TbIcons.TbMusic />) : (<TbIcons.TbMusicOff />)}
          {play ? (<ReactAudioPlayer src={chesstheme} autoPlay loop volume={0.5} />) : null}
        </PlayChessThemeButton> : null}
        {isAuthenticated() ?
          <LoginButton onClick={showAccountSidebar}>
            <BiIcons.BiUser/>
          </LoginButton>
         :
          <LoginButton onClick={loginRoute}>
            <BiIcons.BiLogIn/>
          </LoginButton>
        }
      </Nav>
      <SidebarNav sidebar={sidebar} className="sidebar_nav">
        <SidebarWrap className="sidebar_wrap">
          <NavIcon to="#" draggable="false">
            <IoIcons.IoIosCloseCircle onClick={showSidebar} />
          </NavIcon>
          {SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} handleClick={null}/>
          })}
        </SidebarWrap>
      </SidebarNav>
      <AccountMenu accountSidebar={accountSidebar} className="sidebar_nav">
        <AccountMenuWrap className="sidebar_wrap">
          <SubMenu item={{
            title: "Logout",
            icon: <BiIcons.BiLogOut size={"1.2rem"}/>}} handleClick={signOutButton}/>
        </AccountMenuWrap>
      </AccountMenu>
      <NotificationContainer/>
    </div>
  )
}

export default SidebarMenu
