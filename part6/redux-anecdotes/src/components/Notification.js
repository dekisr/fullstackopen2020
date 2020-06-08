import React from 'react'
// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(({ notification }) => notification)
  const { notification } = props
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return !notification ? null : <div style={style}>{notification}</div>
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    notification: state.notification,
  }
}
export default connect(mapStateToProps)(Notification)
