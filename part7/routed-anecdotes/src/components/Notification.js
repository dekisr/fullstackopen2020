import React from 'react'

const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    marginTop: '0.5rem',
    borderWidth: 1,
  }
  return !message ? null : <div style={style}>{message}</div>
}

export default Notification
