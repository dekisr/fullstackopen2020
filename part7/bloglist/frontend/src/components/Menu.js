import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  const ul = {
    padding: '0.5rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const li = {
    display: 'inline-block',
    listStyleType: 'none'
  }
  return (
    <ul style={ul}>
      <li style={li}>
        <Link to="/">blogs</Link>
      </li>
      <li style={li}>
        <Link to="/users">users</Link>
      </li>
    </ul>
  )
}

export default Menu
