import { useSelector, useDispatch } from 'react-redux'
import { voteOn } from './reducers/anecdoteReducer'
import { newAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    
    anecdotes.dispatch(voteOn(id))
  }

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.inputNewAnecdote.value
    event.target.inputNewAnecdote.value = ""
    dispatch(newAnecdote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteOn(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name='inputNewAnecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App