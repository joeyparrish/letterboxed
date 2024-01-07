import { useGame } from '../context';                                            
import { checkForWin } from '../utils';

function fakeKeyDown(metadata) {
  const event = new KeyboardEvent('keydown', metadata);
  const input = document.getElementById('input');
  input.focus();
  input.dispatchEvent(event);
}

function restart(state, setState) {
  setState({
    currentGuess: "",
    existingWords: [],
    won: false,
  });
}

function submit(state, setState) {
  const { currentGuess, existingWords } = state;

  const newWords = [...existingWords, currentGuess];
  return setState({
    existingWords: newWords,
    currentGuess: currentGuess.substring(currentGuess.length - 1, currentGuess.length),
    intent: "submit",
    won: checkForWin(newWords),
  });
}

function deleteLetter(state, setState) {
  const { currentGuess, existingWords } = state;

  if (currentGuess.length === 0) {
    // empty, do nothing
    return;
  } else if (currentGuess.length === 1 && state.existingWords.length > 0) {
    // rewind to previous word
    const previousWord = existingWords.pop();
    return setState({
      currentGuess: previousWord,
      existingWords,
      intent: "rewind",
    });
  } else {
    // delete a letter
    setState({
      currentGuess: currentGuess.substring(0, currentGuess.length - 1),
      intent: "guess"
    });
  }
}

function help(state, setState) {
  return setState({ help: true });
}

export default function Buttons() {
  const [ state, setState ] = useGame();

  const restartButton = (
    <button onClick={() => restart(state, setState)}>Restart</button>
  );

  const submitButton = (
    <button onClick={() => submit(state, setState)}>Enter</button>
  );

  const deleteButton = (
    <button onClick={() => deleteLetter(state, setState)}>Delete</button>
  );

  const helpButton = (
    <button id="helpButton" onClick={() => help(state, setState)}>?</button>
  );

  return (
    <div id="buttonRow">
      {restartButton}
      {deleteButton}
      {submitButton}
      {helpButton}
    </div>
  );
}
