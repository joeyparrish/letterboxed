import { joinIntoArray, uuid } from './utils';

function WhiteSpan() {
  return <span className="join" key={uuid()}> - </span>;
}

function Guesses({state, onErrorAnimationEnd}) {
  const content = state.existingWords.length > 0 ?
      joinIntoArray(state.existingWords, WhiteSpan) : <br />;

  const errorClass = state.hardError ? 'fatal' :
      (state.error ? 'active' : '');

  return (
    <div className="guesses overlay-host">
      { content }
      <div id="errorOverlay" className={errorClass}
           onAnimationEnd={onErrorAnimationEnd}>
        <div id="errorMessage">{ state.hardError || state.error }</div>
      </div>
    </div>
  );
}

export default function Input({state, onErrorAnimationEnd}) {
  return (
    <div id="input" className="fill">
      <div id="currentGuess">{state.currentGuess}</div>
      <Guesses state={state} onErrorAnimationEnd={onErrorAnimationEnd} />
    </div>
  );
}
