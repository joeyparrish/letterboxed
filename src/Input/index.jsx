import { useGame } from '../context';
import { fancyJoin } from '../utils'

function WhiteSpan() {
  return <span className="join"> - </span>;
}

function Guesses() {
  const [ state ] = useGame();
  const { existingWords, error } = state;

  const content = existingWords.length > 0 ?
    fancyJoin(existingWords, <WhiteSpan/>) : <br />;

  const errorString = error ? error : <br />;

  return (
    <div>
      <p>
        { content }
      </p>
      <p className='error'>
        { errorString }
      </p>
    </div>
  )
}

function Buttons({ keyDown }) {
  const restartButton = (
    <button onClick={() => keyDown({ key: 'Escape' })}>Restart</button>
  )

  const submitButton = (
    <button onClick={() => keyDown({ key: 'Enter' })}>Submit</button>
  );

  const deleteButton = (
    <button onClick={() => keyDown({ key: '__delete' })}>Delete</button>
  )

  return (
    <div>
      {restartButton}
      {submitButton}
      {deleteButton}
    </div>
  )
}

function createKeyDown(state, setState) {
  return function keyDown(e) {
    const { currentGuess, existingWords, __debug } = state;
    console.debug('keydown', e.key)
    // if we are adding a new guess
    if(e.key == "Enter") {
      return setState({
        existingWords: [...existingWords, currentGuess],
        currentGuess: currentGuess.substring(currentGuess.length - 1, currentGuess.length),
        intent: "submit"
      });
    }

    // if we are rewinding from a current guess to a previous guess
    if(e.key === "Backspace" && currentGuess.length === 1 && state.existingWords.length > 0) {
      const previousWord = existingWords.pop();
      return setState({
        currentGuess: previousWord,
        existingWords,
        intent: "rewind"
      });
    }

    // simulating the backspace key via the delete button
    if(e.key === "__delete") {
      // there's nothing to delete at the beginning of the game
      if(currentGuess.length === 0) {
        return;
      }
      // manually do the rewind event
      if(currentGuess.length == 1 && state.existingWords.length > 0) {
        const previousWord = existingWords.pop();
        return setState({
          currentGuess: previousWord,
          existingWords,
          intent: "rewind"
        });
      }
      // simulate a deletion
      if(currentGuess.length >= 1) {
        // simulate the backspace key
        setState({
          currentGuess: currentGuess.substring(0, currentGuess.length - 1),
          intent: "guess"
        });
        // then invoke the event again
        return keyDown({ key: "Backspace" });
      }
    }

    // restart the game
    if(e.key === 'Escape') {
      return setState({
        currentGuess: "",
        existingWords: [],
      });
    }

    // show debugging info
    if(e.key === ".") {
      return setState({
        __debug: !__debug,
        intent: "debug"
      });
    }
  }
}

export default function Input() {
  const [ state, setState ] = useGame();
  const { currentGuess } = state;

  function onChange(e) {
    // if we are adding a letter or removing a letter
    console.debug('onChange', e.target.value)
    const value = e.target.value.toUpperCase();

    return setState({
      currentGuess: value,
      intent: "guess"
    });
  }

  const keyDown = createKeyDown(state, setState);

  return (
    <div>
      <input type="text" onChange={onChange} onKeyDown={keyDown} value={currentGuess} />
      <Buttons keyDown={keyDown} />
      <Guesses />
    </div>
  )
}