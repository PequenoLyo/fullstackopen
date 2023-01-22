import Anecdote from './Anecdote'

import { useDispatch, useSelector } from 'react-redux';
import { voteOn } from '../reducers/anecdoteReducer';
import { sortAnecdotes } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);
  
  const handleVote = (anecdote) => {
    dispatch(voteOn(anecdote.id))
    dispatch(sortAnecdotes())
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote anecdote={anecdote} handleVote={handleVote} />
      ))}
    </div>
  );
};

export default AnecdoteList