import Anecdote from './Anecdote'

import { useDispatch, useSelector } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) => anecdote.content.includes(state.filter))
      .sort(function (a, b) {
        return b.votes - a.votes
      })
  )

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
