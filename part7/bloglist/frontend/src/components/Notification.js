import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  return !notification.message ? null : (
    <div className={`notification ${notification.kind}`}>
      {notification.message}
    </div>
  )
}

export default Notification
