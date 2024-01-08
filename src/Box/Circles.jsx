import { useGame } from '../context';
import { letterClasses } from './classes';

function Circle({ letter }) {
  const [ state, setState ] = useGame();
  const { letterMap, currentGuess } = state;
  const [ x, y ] = letterMap[letter];

  function addLetter() {
    setState({
      currentGuess: currentGuess + letter,
      intent: "guess",
    });
  }

  return (
    <circle
      onClick={addLetter}
      cx={x}
      cy={y}
      r={12}
      className={letterClasses(letter, state)}
    />
  );
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
