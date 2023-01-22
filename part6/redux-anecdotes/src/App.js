import AnecdoteList from './components/AnecdoteList'
import { useSelector, useDispatch } from 'react-redux';
import { voteOn } from './reducers/anecdoteReducer';
import { newAnecdote } from './reducers/anecdoteReducer';
import { sortAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

   const handleCreateAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.inputNewAnecdote.value;
    event.target.inputNewAnecdote.value = '';
    dispatch(newAnecdote(anecdote));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
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

export default App;
