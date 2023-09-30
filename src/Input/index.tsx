import { useGame } from '../context';

export default function Input() {
  const [ state, setState ] = useGame();

  const { currentGuess, existingWords } = state;


  function onChange(e) {
    // if we are adding a letter
    setState({
      currentGuess: e.target.value,
      intent: "guess"
    });
  }

  function keyDown(e) {
    // if we are adding a new guess
    if(e.key == "Enter") {
      setState({
        existingWords: [...existingWords, currentGuess],
        currentGuess: currentGuess.substring(currentGuess.length - 1, currentGuess.length),
        intent: "submit"
      });
    }

    // if we are rewinding from a current guess to a previous guess
    if(e.key === "Backspace" && currentGuess.length === 1 && state.existingWords.length > 0) {
      const previousWord = existingWords.pop();
      setState({
        currentGuess: previousWord + currentGuess,
        existingWords,
        intent: "rewind"
      });
      return;
    }
  }

  return (
    <div>
      <input type="text" onChange={onChange} onKeyDown={keyDown} value={currentGuess} />
      <hr />
      <p>Try to solve in 5 words</p>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  )
}