import styled from 'styled-components'
import AppStyles from './AppStyles'

const StyledBlog = styled.div`
  padding: 0.5rem;
  border: 1px solid;
  & form {
    margin-top: 0.188rem;
  }
  & form input {
    padding: calc(0.313rem - 2px);
    border: 1px solid dimgrey;
    border-radius: 0;
  }
`
const Like = styled(AppStyles.Button)`
  position: relative;
  top: -0.125rem;
  margin: 0.125rem;
  padding: 0.188rem;
  font-size: 0.75rem;
  text-transform: lowercase;
  background-color: deepskyblue;
  &:hover,
  &:active {
    outline: none;
    background-color: cornflowerblue;
  }
  &:active {
    text-decoration: underline;
  }
`
const Remove = styled(AppStyles.Button)`
  position: relative;
  top: -0.25rem;
  background-color: tomato;
  &:hover,
  &:active {
    background-color: firebrick;
  }
  &:active {
    text-decoration: line-through;
  }
`
const Comments = styled.ul`
  & li {
    padding: 0.188rem;
    list-style-type: circle;
  }
`
const AddComment = styled(AppStyles.Button)`
  padding: 0.313rem;
`

StyledBlog.Like = Like
StyledBlog.Remove = Remove
StyledBlog.Comments = Comments
StyledBlog.AddComment = AddComment

export default StyledBlog
