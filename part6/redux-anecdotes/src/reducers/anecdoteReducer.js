import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {    
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
      console.log('appending')
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}


export default anecdoteSlice.reducer
