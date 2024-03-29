import Anecdote from './Anecdote'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
   const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort(function (a, b) {
        return b.votes - a.votes
      })
  )

  const dispatch = useDispatch()
  
  useEffect(() => { 
    dispatch(initializeAnecdotes())
  }, [dispatch])  

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(newNotification(`Voted on anecdote '${anecdote.content}'`, 5))
  }

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
