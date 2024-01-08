import { useGame } from '../context';
import { joinIntoArray, uuid } from '../utils';

function WhiteSpan() {
  return <span className="join" key={uuid()}> - </span>;
}

function Guesses() {
  const [ state ] = useGame();
  const { existingWords } = state;

  const content = existingWords.length > 0 ?
      joinIntoArray(existingWords, WhiteSpan) : <br />;

  return (
    <div className="guesses">
      { content }
    </div>
  );
}

export default function Input() {
  const [ state, setState ] = useGame();
  const { currentGuess } = state;

  return (
    <div id="input" className="fill">
      <div id="currentGuess">{currentGuess}</div>
      <Guesses />
    </div>
  );
}
