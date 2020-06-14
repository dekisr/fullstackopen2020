import styled from 'styled-components'

const StyledMenu = styled.ul`
  padding: 0.5rem;
  border: 1px solid dimgrey;
  & li {
    padding: 0.125rem;
    margin-right: 0.5rem;
    display: inline-block;
    list-style-type: none;
  }
  & li a {
    text-decoration: none;
  }
  & li a:hover {
    text-decoration: underline;
  }

  & li:last-of-type {
    margin-right: 0;
  }

`

export default StyledMenu
