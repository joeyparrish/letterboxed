import { useGame } from '../context';

function deriveClass(letter, state) {
  // if the letter is the first letter of the current guess, this is a lead circle
  if(state.currentGuess[0] === letter) {
    return "lead";
  }

  // if the letter is in the current guess, this is an active circle
  if(state.currentGuess.includes(letter)) {
    return "active";
  }

  // if the letter is in a past guess, this is a past circle
  if(state.existingWords.some(word => word.includes(letter))) {
    return "past";
  }
}

function Circle({ letter }) {
  const [ state, setState ] = useGame();
  const { letterMap, currentGuess } = state;

  const [ x, y ] = letterMap[letter];
  const className = deriveClass(letter, state);

  function addLetter() {
    setState({
      currentGuess: currentGuess + letter,
      intent: "guess"
    });
  }

  return (
    <circle
      onClick={addLetter}
      cx={x}
      cy={y}
      r={12}
      className={className}
    />
  )

}

export default function Circles() {
  const [ state ] = useGame();
  const { letters } = state;
  return (
    <g>
      {letters.flat().map((letter, i) => (
        <Circle letter={letter} key={i} />
      ))}
    </g>
  )
}