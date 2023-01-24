import { newAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.inputNewAnecdote.value;
    event.target.inputNewAnecdote.value = '';
    const anecdote = await anecdoteService.createNew(content)
    console.log(anecdote)
    dispatch(newAnecdote(anecdote));    
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="inputNewAnecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
