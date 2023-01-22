import Anecdote from './Anecdote';

import { useDispatch, useSelector } from 'react-redux';
import anecdoteReducer, {
  voteOn,
  sortAnecdotes,
} from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const handleVote = (anecdote) => {
    dispatch(voteOn(anecdote.id));
    //dispatch(sortAnecdotes())
  };

  // console.log(anecdotes);
  // const sortedAnecdotes = anecdotes.sort(function (a, b) {
  //   b.votes, a.votes;
  // });

  console.log(anecdotes);
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={handleVote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
