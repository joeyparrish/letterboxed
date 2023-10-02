import { useGame } from '../context';

function Guesses() {
  const [ state ] = useGame();
  const { existingWords } = state;

  return (
    <div>
      <p>
        {existingWords.join(" - ")}
      </p>
    </div>
  )
}

export default function Input() {
  const [ state, setState ] = useGame();
  const { currentGuess, existingWords, __debug } = state;

  function onChange(e) {
    // if we are adding a letter or removing a letter
    console.debug('onChange', e.target.value)
    const value = e.target.value.toUpperCase();

    return setState({
      currentGuess: value,
      intent: "guess"
    });
  }

  function keyDown(e) {
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
        currentGuess: previousWord + currentGuess,
        existingWords,
        intent: "rewind"
      });
    }

    if(e.key === ".") {
      return setState({
        __debug: !__debug,
        intent: "debug"
      });
    }
  }

  return (
    <div>
      <input type="text" onChange={onChange} onKeyDown={keyDown} value={currentGuess} />
      <button onClick={() => keyDown({ key: 'Enter'})}>Submit</button>
      <Guesses />
    </div>
  )
}