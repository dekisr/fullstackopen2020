// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE': {
      const id = action.data.id
      const anecdote = state.find((anecdote) => anecdote.id === id)
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )
    }
    default:
      return state
  }
}

// action creators
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data,
    })
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data,
    })
  }
}
export const voteUp = (id) => {
  return async (dispatch) => {
    await anecdoteService.updateVotes(id)
    dispatch({ type: 'VOTE', data: { id } })
  }
}

export default anecdoteReducer
