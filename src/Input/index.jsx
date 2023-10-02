import { useGame } from '../context';

function Guesses() {
  const [ state ] = useGame();
  const { existingWords } = state;

  return (
    <div>
      <p>
        {existingWords.length} word(s)
      </p>
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
    // if we are adding a letter
    const value = e.target.value.toUpperCase();
    const lastLetter = value[value.length - 1];
    const updatedLetterMap = {
      [lastLetter]: {
        ...state.letterMap[lastLetter],
        className: "lead"
      }
    }

    return setState({
      currentGuess: value,
      intent: "guess",
      letterMap: {
        ...state.letterMap,
        ...updatedLetterMap
      }
    });
  }

  function keyDown(e) {
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
      <hr />
      <Guesses />
      <p>Try to solve in 5 words</p>
    </div>
  )
}