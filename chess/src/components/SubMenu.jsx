import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import styled from "styled-components"
import {getAuth, onAuthStateChanged} from "firebase/auth"

const SidebarLink = styled(Link)`
  display: flex;
  color: ${({mustBeLoggedIn, user}) => (mustBeLoggedIn && user ? "var(--secondary)" : (mustBeLoggedIn ? "var(--gray4)" : "var(--secondary)"))};
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  list-style: none;
  height: 2.2rem;
  text-decoration: none;
  font-size: 1rem;
  user-drag: none;

  &:hover {
    background-color: ${({mustBeLoggedIn, user}) => (mustBeLoggedIn && user ? "var(--secondary)" : (mustBeLoggedIn ? "var(--gray4)" : "var(--secondary)"))};
    color: ${({mustBeLoggedIn, user}) => (mustBeLoggedIn && user ? "var(--primary)" : (mustBeLoggedIn ? "var(--gray7)" : "var(--primary)"))};
    cursor: pointer;
  }
`

const SidebarLabel = styled.span`
  margin-left: 1rem;
`

const SidebarSubMenu = styled.span`
  
`

const DropdownLink = styled(Link)`
  display: flex;
  color: ${({mustBeLoggedIn, user}) => (mustBeLoggedIn && user ? "var(--secondary)" : (mustBeLoggedIn ? "var(--gray4)" : "var(--secondary)"))};
  justify-content: left;
  align-items: center;
  padding-left: 2rem;
  list-style: none;
  height: 2.2rem;
  text-decoration: none;
  font-size: 0.9rem;
  user-drag: none;

  &:hover {
    background-color: ${({mustBeLoggedIn, user}) => (mustBeLoggedIn && user ? "var(--secondary)" : (mustBeLoggedIn ? "var(--gray4)" : "var(--secondary)"))};
    color: ${({mustBeLoggedIn, user}) => (mustBeLoggedIn && user ? "var(--primary)" : (mustBeLoggedIn ? "var(--gray7)" : "var(--primary)"))};
    cursor: pointer;
  }
`

const SubMenu = (props) => {
  const {item, handleClick} = props
  const [subnav, setSubnav] = useState(false)
  const showSubnav = () => setSubnav(!subnav)

  const [user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser)
      }
    })
  }, [auth])
    
  return (
    <div>
      <SidebarLink to={user ? item.path : (item.mustBeLoggedIn ? null : item.path)} 
      onClick={handleClick === null ? (item.subNav && showSubnav) : handleClick} user={user} mustBeLoggedIn={item.mustBeLoggedIn}>
        <div>
          {item.icon}
          <SidebarLabel>
            {item.title}
          </SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav ? 
            <SidebarSubMenu>
              {item.iconOpened}
            </SidebarSubMenu>
            : item.subNav ? 
            <SidebarSubMenu>
              {item.iconClosed}
            </SidebarSubMenu>
            : null}
        </div>
      </SidebarLink>
      {subnav && item.subNav.map((item, index) => {
        return (
          <DropdownLink to={user ? item.path : (item.mustBeLoggedIn ? null : item.path)} user={user} 
          mustBeLoggedIn={item.mustBeLoggedIn}>
            {item.icon}
            <SidebarLabel>
              {item.title}
            </SidebarLabel>
          </DropdownLink>
        )
      })}
    </div>
  )
}

export default SubMenu
