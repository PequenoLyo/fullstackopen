import { newAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.inputNewAnecdote.value;
    event.target.inputNewAnecdote.value = '';
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
