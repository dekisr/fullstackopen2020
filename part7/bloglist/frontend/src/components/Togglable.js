import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useImperativeHandle } from 'react'
import StyledTogglable from '../styles/TogglableStyles'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <StyledTogglable>
      <StyledTogglable.Toggle visible={visible ? 'none' : ''}>
        <StyledTogglable.Button onClick={toggleVisibility}>
          {props.buttonLabel}
        </StyledTogglable.Button>
      </StyledTogglable.Toggle>
      <StyledTogglable.Toggle visible={visible ? '' : 'none'}>
        {props.children}
        <StyledTogglable.CancelButton
          onClick={toggleVisibility}
          className="toggle cancel"
        >
          cancel
        </StyledTogglable.CancelButton>
      </StyledTogglable.Toggle>
    </StyledTogglable>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
