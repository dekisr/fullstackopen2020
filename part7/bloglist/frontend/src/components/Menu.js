import React from 'react'
import { Link } from 'react-router-dom'
import StyledMenu from '../styles/MenuStyles'

const Menu = () => {
  return (
    <StyledMenu>
      <li>
        <Link to="/">blogs</Link>
      </li>
      <li>
        <Link to="/users">users</Link>
      </li>
    </StyledMenu>
  )
}

export default Menu
