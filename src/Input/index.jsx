import { useGame } from '../context';
import { fancyJoin, checkForWin, uuid } from '../utils';

function WhiteSpan() {
  return <span className="join" key={uuid()}> - </span>;
}

function Guesses() {
  const [ state ] = useGame();
  const { existingWords } = state;

  const content = existingWords.length > 0 ?
    fancyJoin(existingWords, <WhiteSpan/>) : <br />;

  return (
    <div className="guesses">
      { content }
    </div>
  );
}

function createKeyDownHandler(state, setState) {
  return function keyDown(e) {
    const { currentGuess, existingWords, __debug } = state;

    // if we are adding a new guess
    if (e.key == "Enter") {
      const newWords = [...existingWords, currentGuess];
      return setState({
        existingWords: newWords,
        currentGuess: currentGuess.substring(
            currentGuess.length - 1, currentGuess.length),
        intent: "submit",
        won: checkForWin(newWords),
      });
    }

    // if we are rewinding from a current guess to a previous guess
    if (e.key === "Backspace" && currentGuess.length === 1 &&
        state.existingWords.length > 0) {
      const previousWord = existingWords.pop();
      return setState({
        currentGuess: previousWord,
        existingWords,
        intent: "rewind",
      });
    }

    // simulating the backspace key via the delete button
    if (e.key === "__delete") {
      // there's nothing to delete at the beginning of the game
      if (currentGuess.length === 0) {
        return;
      }
      // manually do the rewind event
      if (currentGuess.length == 1 && state.existingWords.length > 0) {
        const previousWord = existingWords.pop();
        return setState({
          currentGuess: previousWord,
          existingWords,
          intent: "rewind",
        });
      }
      // simulate a deletion
      if (currentGuess.length >= 1) {
        // simulate the backspace key
        setState({
          currentGuess: currentGuess.substring(0, currentGuess.length - 1),
          intent: "guess",
        });
        // then invoke the event again
        return keyDown({ key: "Backspace" });
      }
    }

    // show help modal
    if (e.key === "?") {
      return setState({
        help: true,
      });
    }

    // restart the game
    if (e.key === '__restart') {
      return setState({
        currentGuess: "",
        existingWords: [],
        won: false,
      });
    }

    // show debugging info
    /* Off by default, uncomment to enable debugging in your deployment
    if (e.key === ".") {
      return setState({
        __debug: !__debug,
        intent: "debug",
      });
    }
    */

    // close all modals
    if (e.key === 'Escape') {
      return setState({
        help: false,
      });
    }
  }
}

export default function Input() {
  const [ state, setState ] = useGame();
  const { currentGuess } = state;

  return (
    <div id="input">
      <div id="currentGuess">{currentGuess}</div>
      <Guesses />
    </div>
  );
}
