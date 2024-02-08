import Box from './Box';

export default function Yesterday({state}) {
  const yesterdayState = {
    currentGuess: "",
    puzzle: state.yesterdayPuzzle,
    existingWords: state.yesterdayPuzzle.ourSolution,
  };

  return (
    <div className="fill">
      <h1>Our Solution to Yesterday's Puzzle</h1>

      <h2>{yesterdayState.existingWords.join(' - ')}</h2>

      <Box state={yesterdayState} />
    </div>
  );
}
