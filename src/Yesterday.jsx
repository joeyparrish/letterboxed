import Box from './Box';
import reference from './assets/reference.svg';

export default function Yesterday({state}) {
  const yesterdayState = {
    currentGuess: "",
    puzzle: state.yesterdayPuzzle,
    existingWords: state.yesterdayPuzzle.ourSolution,
  };
  console.log({state, yesterdayState});

  return (
    <div className="fill">
      <h1>Our Solution to Yesterday's Puzzle</h1>

      <h2>{yesterdayState.existingWords.join(' - ')}</h2>

      <Box state={yesterdayState} />
    </div>
  );
}
