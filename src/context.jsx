import { createContext, useState, useContext, useEffect } from 'react';
import { letters } from './utils/letters';
import { dictionary } from './utils/dictionary';

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
  if(change.intent === "guess") {
    if(!/^[a-zA-Z]+$/.test(change.currentGuess) && change.currentGuess !== "") {
      return "guesses must be letters only";
    }
    const lastLetter = change
      .currentGuess
      .substring(change.currentGuess.length - 1, change.currentGuess.length);

    // this letter doesn't exist
    if(!state.letterMap[lastLetter] && change.currentGuess.length > 0) {
      return "no such letter on the board";
    }

    // Typing or removing the first letter of the game cannot
    // produce an invalid path
    if(change.currentGuess.length <= 1) {
      return false;
    }

    const secondToLastLetter = change
      .currentGuess
      .substring(change.currentGuess.length - 2, change.currentGuess.length - 1);

    console.debug('checking path from ', secondToLastLetter, 'to', lastLetter);
    const [,, group1] = state.letterMap[secondToLastLetter];
    const [,, group2] = state.letterMap[lastLetter];
    if(group1 == group2) {
      return "consecutive letters must be on different sides";
    }
  }
  if(change.intent === "rewind") {
    // maybe there's something to check here?
  }
  if(change.intent === "submit") {
    if(state.currentGuess.length < 3) {
      return "guess must be 3 letters or more";
    }
    if(!dictionary.has(state.currentGuess) && state.__debug === false) {
      return `${state.currentGuess} is not a recognized word`;
    }
  }

  return false
}

export function GameProvider({ children }) {
  const [state, set] = useState(baseGame);
  const {} = state;

  function setState(change) {
    const error = checkForErrors(change, state);
    if(error) {
      set({ ...state, error })
    } else {
      set({ ...state, ...change, error: "" });
    }
  }

  function forwardKeyboardEvents(e) {
    const input = document.getElementById('input');
    if (e.target != input) {
      const e2 = new KeyboardEvent(e.type, e);
      console.log({e, e2});
      input.focus();
      input.dispatchEvent(e2);
    }
  }

  document.addEventListener('keydown', forwardKeyboardEvents);
  document.addEventListener('keyup', forwardKeyboardEvents);
  document.addEventListener('keypress', forwardKeyboardEvents);

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
