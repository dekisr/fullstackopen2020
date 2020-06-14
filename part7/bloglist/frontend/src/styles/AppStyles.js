import styled from 'styled-components'

const StyledApp = styled.main`
  padding: 2rem;
  & hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.0625rem;
    border: 0;
    background-color: gainsboro;
  }

  & h1 {
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
    font-size: 2rem;
  }
  & h2 {
    margin-top: 0.3125rem;
    margin-bottom: 0.3125rem;
    font-size: 1.5rem;
  }
  & h3 {
    margin-top: 0.188rem;
    margin-bottom: 0.188rem;
    font-size: 1.25rem;
  }

  & li {
    padding: 0.375rem;
    list-style-position: inside;
    list-style-type: square;
  }

  & form {
    padding: 0;
  }
  & form label {
    margin-right: 0.3rem;
  }
`

const Button = styled.button`
  margin: 0.125rem;
  padding: 0.375rem;
  border: none;
  font-size: 0.875rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 400ms ease;
  color: snow;
  background-color: dimgrey;
  &:hover {
    outline: 0.0625rem solid snow;
    outline-offset: -0.125rem;
  }
  &:active {
    outline-offset: -0.1875rem;
    background-color: dimgrey;
  }
`
StyledApp.Button = Button
export default StyledApp
