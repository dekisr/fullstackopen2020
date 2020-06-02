import React from 'react'

const Notification = ({ notification }) => {
  return notification === null
    ? null
    : (
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
    )
}

export default Notification