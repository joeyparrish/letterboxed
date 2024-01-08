import { createContext, useState, useContext } from 'react';
import { letters } from './utils/letters';
import { dictionary } from './utils/dictionary';
import { deleteLetter, submit } from './Buttons';

const circleCoordinates = [
  // top
  [175, 100],
  [300, 100],
  [425, 100],

  // left
  [100, 175],
  [100, 300],
  [100, 425],

  // right
  [500, 175],
  [500, 300],
  [500, 425],

  // bottom
  [175, 500],
  [300, 500],
  [425, 500],
];

const baseGame = {
  // current guess
  currentGuess: "",
  // list of existing words
  existingWords: [],
  // error state
  error: "",
  // last intended user action
  intent: "",
  // list of letters
  letters,
  // generated location map of the letters
  letterMap: generateMap(letters),
  // did the player win?
  won: false,
  // showing help menu
  help: false,

  // debug mode
  __debug: false,
};

function generateMap(letterList) {
  const map = {};
  letterList.forEach((row, i) => {
    row.forEach((letter, j) => {
      // store the coordinates and group in which the letter is located
      map[letter] = [...circleCoordinates[i * 3 +  j], i];
    });
  });
  return map;
}

const Game = createContext(baseGame);
export const useGame = () => useContext(Game);

function checkForErrors(change, state) {
  if (change.intent === "guess") {
    if (!/^[a-zA-Z]+$/.test(change.currentGuess) && change.currentGuess !== "") {
      return "guesses must be letters only";
    }

    const lastLetter = change.currentGuess[change.currentGuess.length - 1];

    // this letter doesn't exist
    if (!state.letterMap[lastLetter] && change.currentGuess.length > 0) {
      return "no such letter on the board";
    }

    // Typing or removing the first letter of the game cannot
    // produce an invalid path
    if (change.currentGuess.length <= 1) {
      return false;
    }

    const secondToLastLetter =
        change.currentGuess[change.currentGuess.length - 2];

    console.debug('checking path from ', secondToLastLetter, 'to', lastLetter);
    const [,, group1] = state.letterMap[secondToLastLetter];
    const [,, group2] = state.letterMap[lastLetter];
    if (group1 == group2) {
      return "consecutive letters must be on different sides";
    }
  }

  if (change.intent === "submit") {
    if (state.currentGuess.length < 3) {
      return "guess must be 3 letters or more";
    }
    if (!dictionary.has(state.currentGuess) && state.__debug === false) {
      return `${state.currentGuess} is not a recognized word`;
    }
  }

  return false;
}

export function GameProvider({ children }) {
  const [state, set] = useState(baseGame);

  function setState(change) {
    const error = checkForErrors(change, state);
    if (error) {
      set({ ...state, error });
    } else {
      set({ ...state, ...change, error: "" });
    }
  }

  function keyHandler(e) {
    const { currentGuess } = state;

    console.debug('keyHandler', e.key);

    if (e.key === 'Escape') {
      // close all modals
      return setState({
        help: false,
        won: false,
      });
    }

    // Ignore all other keys while modals are showing.
    if (state.help || state.won) {
      return;
    }

    if (e.key === 'Backspace') {
      return deleteLetter(state, setState);
    } else if (e.key === 'Enter') {
      return submit(state, setState);
    } else if (e.key === '?') {
      return setState({ help: true });
    } else if (e.key === '.') {
      // Off by default, uncomment to enable debugging in your deployment
      /*
      return setState({
        __debug: !__debug,
        intent: "debug",
      });
      */
    } else if (/^[a-zA-Z]$/.exec(e.key) !== null) {
      return setState({
        intent: 'guess',
        currentGuess: currentGuess + e.key.toUpperCase(),
      });
    }
  }

  // Use on* attributes instead of addEventListener, or the handler will get
  // re-added on each re-render of the component.
  document.onkeyup = keyHandler;

  return (
    <Game.Provider value={[state, setState]}>
      {children}
      {
        state.__debug && (
          <pre>
            {JSON.stringify(state, null, 2)}
          </pre>
        )
      }
    </Game.Provider>
  );
}
