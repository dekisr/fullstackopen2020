import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch()
  const handleChange = (event) => {
    const filter = event.target.value
    // dispatch(setFilter(filter))
    props.setFilter(filter)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { setFilter })(Filter)
