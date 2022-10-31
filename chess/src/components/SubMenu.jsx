import React, {useState} from "react"
import {Link} from "react-router-dom"
import styled from "styled-components"

const SidebarLink = styled(Link)`
  display: flex;
  color: var(--secondary);
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  list-style: none;
  height: 2.2rem;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    background-color: var(--secondary);
    color: var(--primary);
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
  color: var(--secondary);
  justify-content: left;
  align-items: center;
  padding-left: 2rem;
  list-style: none;
  height: 2.2rem;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    background-color: var(--secondary);
    color: var(--primary);
    cursor: pointer;
  }
`

const SubMenu = ({item}) => {
  const [subnav, setSubnav] = useState(false)
  const showSubnav = () => setSubnav(!subnav)
    
  return (
    <div>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
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
          <DropdownLink to={item.path} key={index}>
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
