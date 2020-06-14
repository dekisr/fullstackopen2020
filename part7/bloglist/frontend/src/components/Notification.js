import React from 'react'
import { useSelector } from 'react-redux'
import StyledNotification from '../styles/NotificationStyles'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  return !notification.message ? null : (
    <StyledNotification kind={notification.kind}>
      {notification.message}
    </StyledNotification>
  )
}

export default Notification
