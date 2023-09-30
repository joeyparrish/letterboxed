import { createContext, useState, useContext } from 'react';

export const backgroundColor = "#faa6a4";

const baseGame = {
  currentGuess: "", // current guess
  existingWords: [], // list of existing words
  error: "", // error state
  intent: "", // last intended user action
  __debug: localStorage.getItem("__debug") // debug mode
};

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
  if(change.intent === "debug") {
    localStorage.setItem("__debug", change.__debug)
  }

  return false
}

export function GameProvider({ children }: React.PropsWithChildren) {
  const [state, set] = useState(baseGame);

  function setState(change: Partial<GameState>) {
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