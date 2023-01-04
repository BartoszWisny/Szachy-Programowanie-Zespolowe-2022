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
import {NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';

const Nav = styled.div`
  background-color: var(--primary);
  opacity: 0.98;
  height: 2.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  const navigate = useNavigate();
  const homeRoute = () => {
    navigate("/");
  };
  const loginRoute = () => {
    navigate("/login");
  };

  return (
    <div className="sidebar_menu">
      <Nav className="nav">
        <NavIcon to="#" className="nav_icon" draggable="false">
          <FaIcons.FaBars onClick={showSidebar}/>
        </NavIcon>
        <HomeButton onClick={homeRoute}>
          <AiIcons.AiFillHome/>
        </HomeButton>
        <LoginButton onClick={loginRoute}>
          <BiIcons.BiLogIn/>
        </LoginButton>
      </Nav>
      <SidebarNav sidebar={sidebar} className="sidebar_nav">
        <SidebarWrap className="sidebar_wrap">
          <NavIcon to="#" draggable="false">
            <IoIcons.IoIosCloseCircle onClick={showSidebar} />
          </NavIcon>
          {SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />
          })}
        </SidebarWrap>
      </SidebarNav>
      <NotificationContainer/>
    </div>
  )
}

export default SidebarMenu
