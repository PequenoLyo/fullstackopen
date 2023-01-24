import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      console.log(action.payload)
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const voteOn = (id) => {
  console.log('voting on', id)
  return {
    type: 'anecdotes/voteAnecdote',
    payload: id,
  }
}

export const newAnecdote = (anecdote) => {
  return {
    type: 'anecdotes/createAnecdote',
    payload: anecdote,
  }
}

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
