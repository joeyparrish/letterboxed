import { createContext, useEffect, useContext, useState } from 'react';
import { deleteLetter, submit } from './Buttons';
import { loadStandardGameData } from './utils';
import archiveDates from '../public/puzzle-sources/standard/archive.json';

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
  // dictionary of valid words
  dictionary: new Set(),
  // list of sides, each of which is a list of letters
  letters: [],
  // generated location map of the letters
  letterMap: {},
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
      // Silent error.
      return true;
    }

    const lastLetter = change.currentGuess[change.currentGuess.length - 1];

    // this letter doesn't exist
    if (!state.letterMap[lastLetter] && change.currentGuess.length > 0) {
      // Silent error.
      return true;
    }

    // Typing or removing the first letter of the game cannot
    // produce an invalid path
    if (change.currentGuess.length <= 1) {
      // No error.
      return false;
    }

    const secondToLastLetter =
        change.currentGuess[change.currentGuess.length - 2];

    console.debug('checking path from ', secondToLastLetter, 'to', lastLetter);
    const [,, group1] = state.letterMap[secondToLastLetter];
    const [,, group2] = state.letterMap[lastLetter];
    if (group1 == group2) {
      // Silent error.
      return true;
    }
  }

  if (change.intent === "submit") {
    if (state.currentGuess.length < 3) {
      return "Too short";
    }
    if (!state.dictionary.has(state.currentGuess) && state.__debug === false) {
      return "Not a word";
    }
  }

  // No error.
  return false;
}

async function loadGameData(setState) {
  const mostRecentDate = archiveDates[archiveDates.length - 1];

  let gameData;
  try {
    gameData = await loadStandardGameData(new Date(mostRecentDate));
  } catch (error) {
    setState({hardError: 'Failed to load game data!'});
    return;
  }

  // Reorder the NYT sides into the order expected here.
  const letters = [
    gameData.sides[0].split(''),
    gameData.sides[3].split(''),
    gameData.sides[1].split(''),
    gameData.sides[2].split(''),
  ];

  setState({
    letters,
    letterMap: generateMap(letters),
    dictionary: new Set(gameData.dictionary),
  });
}

export function GameProvider({ children }) {
  const [state, setStateRaw] = useState(baseGame);

  function setState(change) {
    const error = checkForErrors(change, state);
    if (error === true) {
      // silent error, ignoring some input
    } else if (error) {
      // error message shown
      setStateRaw({ ...state, error });
    } else {
      // good input, make changes, clear any error
      setStateRaw({ ...state, ...change, error: "" });
    }
  }

  function keyHandler(e) {
    const { currentGuess } = state;

    // Don't let "enter" activate a button after we've typed into the doc.
    if (document.activeElement) document.activeElement.blur();

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

  useEffect(() => {
    if (state.letters.length || state.hardError) {
      // We already tried to load.
      return;
    }

    loadGameData(setState);
  });

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
