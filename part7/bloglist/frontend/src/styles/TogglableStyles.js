import styled from 'styled-components'
import StyledApp from '../styles/AppStyles'

const StyledToggable = styled.div``
const Toggle = styled.div`
  display: ${(props) => props.visible};
`
const Button = styled(StyledApp.Button)``
const CancelButton = styled(StyledApp.Button)`
  background-color: tomato;
  &:hover,
  &:active {
    background-color: firebrick;
  }
  &:active {
    text-decoration: line-through;
  }
`

StyledToggable.Toggle = Toggle
StyledToggable.Button = Button
StyledToggable.CancelButton = CancelButton
export default StyledToggable
