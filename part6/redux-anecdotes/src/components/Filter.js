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

  return (
    <form>
      <label htmlFor="filter">Filter:</label>
      <input type="text" id="filter" onChange={handleChange} />
    </form>
  )
}

export default connect(null, { setFilter })(Filter)
