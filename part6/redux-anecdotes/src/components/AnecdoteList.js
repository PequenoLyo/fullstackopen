import Anecdote from './Anecdote'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { setAnecdotes } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort(function (a, b) {
        return b.votes - a.votes
      })
  )

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  const handleVote = (anecdote) => {
    dispatch(voteOn(anecdote.id))
  }

  console.log(anecdotes)
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
