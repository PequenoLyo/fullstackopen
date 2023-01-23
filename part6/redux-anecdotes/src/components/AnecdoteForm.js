import anecdoteReducer, { newAnecdote } from '../reducers/anecdoteReducer';
import notificationReducer, { newNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.inputNewAnecdote.value;
    event.target.inputNewAnecdote.value = '';
    dispatch(newAnecdote(anecdote));
    dispatch(newNotification('New anecdote created successfully'))
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
