import { useGame } from '../context';
import { joinIntoArray, uuid } from '../utils';

function WhiteSpan() {
  return <span className="join" key={uuid()}> - </span>;
}

function Guesses() {
  const [ state, setState ] = useGame();
  const { existingWords, error } = state;

  const content = existingWords.length > 0 ?
      joinIntoArray(existingWords, WhiteSpan) : <br />;

  const errorClass = error ? 'active' : '';

  return (
    <div className="guesses overlay-host">
      { content }
      <div id="errorOverlay" className={errorClass}
           onAnimationEnd={() => setState({error: ""})}>
        <div id="errorMessage">{ error }</div>
      </div>
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
