import styled from 'styled-components'
import StyledApp from '../styles/AppStyles'

const StyledBlogForm = styled.form`
  width: 18.75rem;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.25rem;
  margin: 0.5rem;
`
const Button = styled(StyledApp.Button)``

StyledBlogForm.Button = Button
export default StyledBlogForm
