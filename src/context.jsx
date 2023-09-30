import { createContext, useState, useContext } from 'react';

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
  __debug: false
};

function generateMap(letters) {
  const map = {};
  letters.forEach((row, i) => {
    row.forEach((letter, j) => {
      map[letter] = {
        className: "",
        coords: circleCoordinates[i * 3 +  j]
      }
    });
  });
  return map;
}

const Game = createContext(baseGame);
export const useGame = () => useContext(Game);

function checkForErrors(change, state) {
  if(change.intent === "guess") {
    if(!/^[a-zA-Z]+$/.test(change.currentGuess) && change.currentGuess !== "") {
      return "Guesses must be letters only";
    }
    // we also need to check if the letters are on the right side,
    // which is basically the whole schtick of the game
  }
  if(change.intent === "rewind") {
    // maybe there's something to check here?
  }
  if(change.intent === "submit") {
    if(state.currentGuess.length < 3) {
      return "Guess must be 3 letters or more"
    }
    // also check if word is valid
  }

  return false
}

export function GameProvider({ children }) {
  const [state, set] = useState(baseGame);

  function setState(change) {
    const error = checkForErrors(change, state);
    if(error) {
      set({ ...state, error })
    } else {
      set({ ...state, ...change, error: "" });
    }
  }

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