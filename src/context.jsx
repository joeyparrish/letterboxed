import { createContext, useState, useContext, useEffect } from 'react';
import { loadWords } from './utils';

const letters = [
  ["Y", "N", "E"], // top
  ["M", "I", "J"], // left
  ["A", "U", "O"], // right
  ["R", "S", "P"]  // bottom
];

const circleCoordinates = [
  [175, 100],
  [300, 100],
  [425, 100],
  
  [100, 175],
  [100, 300],
  [100, 425],

  [500, 175],
  [500, 300],
  [500, 425],

  [175, 500],
  [300, 500],
  [425, 500]
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

  // debug mode
  __debug: false,
  loading: true
};

function generateMap(letters) {
  const map = {};
  letters.forEach((row, i) => {
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
      return "letters must be on different sides";
    }
  }
  if(change.intent === "rewind") {
    // maybe there's something to check here?
  }
  if(change.intent === "submit") {
    if(state.currentGuess.length < 3) {
      return "guess must be 3 letters or more";
    }
    if(!state.dictionary.has(state.currentGuess)) {
      return `${state.currentGuess} is not a recognized word`;
    }
  }

  return false
}

export function GameProvider({ children }) {
  const [state, set] = useState(baseGame);
  const { loading } = state;

  function setState(change) {
    const error = checkForErrors(change, state);
    if(error) {
      set({ ...state, error })
    } else {
      set({ ...state, ...change, error: "" });
    }
  }

  const loadDictionary = async () => {
    const dictionary = await loadWords()

    setState({
      dictionary,
      loading: false
    })
  }

  useEffect(() => {
    if(loading) {
      loadDictionary();
    }
  })

  return !loading ? (
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
  ) : "loading...";
}