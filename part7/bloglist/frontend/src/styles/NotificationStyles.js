import styled from 'styled-components'

const StyledNotification = styled.div`
  font-size: 1.25rem;
  border-style: solid;
  padding: 0.75rem;
  margin-bottom: 1rem;
  color: ${({ kind }) => (kind === 'error' ? 'tomato' : 'lightgreen')};
  background-color: ${({ kind }) => (kind === 'error' ? 'ivory' : 'mintcream')};
`

export default StyledNotification
