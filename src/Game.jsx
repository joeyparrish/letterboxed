import Input from "./Input";
import Box from "./Box";
import Buttons from "./Buttons";
import Help from "./Help";
import Modal from "./Modal";
import Title from "./Title";
import Won from "./Won";

import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStandardGameData, loadPoetryGameData, checkForWin } from './utils';

const defaultGameState = {
  // current guess
  currentGuess: "",
  // list of existing words
  existingWords: [],

  // error state
  error: "",  // short-lived
  hardError: "",  // fatal

  // last intended user action
  intent: "",

  puzzle: {
    // dictionary of valid words
    dictionary: new Set(),
    // list of sides, each of which is a list of letters
    letters: [],
    // generated location map of the letters
    letterMap: {},
    // title of the puzzle
    title: "",
    // class associated with the title element
    titleClass: "",
    // author of the puzzle
    author: "",
    // author image URL
    authorImage: "",
  },

  // won game, winning modal shown
  won: false,
  // help modal shown
  help: false,
};

function checkForErrors(change, state) {
  if (change.intent === "guess") {
    if (!/^[a-zA-Z]+$/.test(change.currentGuess) && change.currentGuess !== "") {
      // Silent error.
      return true;
    }

    const lastLetter = change.currentGuess[change.currentGuess.length - 1];

    // this letter doesn't exist
    if (!state.puzzle.letterMap[lastLetter] && change.currentGuess.length > 0) {
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
    const [,, group1] = state.puzzle.letterMap[secondToLastLetter];
    const [,, group2] = state.puzzle.letterMap[lastLetter];
    if (group1 == group2) {
      // Silent error.
      return true;
    }
  }

  if (change.intent === "submit") {
    if (state.currentGuess.length < 3) {
      return "Too short";
    }
    if (!state.puzzle.dictionary.has(state.currentGuess)) {
      return "Not a word";
    }
  }

  // No error.
  return false;
}

export function gameDataLoaderFactory(type) {
  if (type == 'standard') {
    return ({params}) => loadStandardGameData(params.date);
  } else if (type == 'poetry') {
    return ({params}) => loadPoetryGameData();
  }
}

export default function Game() {
  const [state, setStateRaw] = useState(defaultGameState);

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

  function onErrorAnimationEnd() {
    setState({
      error: "",
    });
  }

  function addLetter(letter) {
    setState({
      currentGuess: state.currentGuess + letter,
      intent: "guess",
    });
  }

  function restart() {
    setState({
      currentGuess: "",
      existingWords: [],
      won: false,
    });
  }

  function submit() {
    const newWords = [...state.existingWords, state.currentGuess];
    const nextLetter = state.currentGuess.substring(
        state.currentGuess.length - 1, state.currentGuess.length);

    setState({
      existingWords: newWords,
      currentGuess: nextLetter,
      intent: "submit",
      won: checkForWin(newWords),
    });
  }

  function deleteLetter() {
    if (state.currentGuess.length === 0) {
      // empty, do nothing
    } else if (state.currentGuess.length === 1 && state.existingWords.length > 0) {
      // rewind to previous word
      const words = state.existingWords.slice();  // clone
      const previousWord = words.pop();
      setState({
        currentGuess: previousWord,
        existingWords: words,
        intent: "rewind",
      });
    } else {
      // delete a letter
      setState({
        currentGuess: state.currentGuess.substring(
            0, state.currentGuess.length - 1),
        intent: "guess",
      });
    }
  }

  function help() {
    console.log('help');
    setState({
      help: true,
    });
  }

  function closeModals() {
    setState({
      help: false,
      won: false,
    });
  }

  function keyHandler(e) {
    // Don't let "enter" activate a button after we've typed into the doc.
    if (document.activeElement) document.activeElement.blur();

    console.debug('keyHandler', e.key);

    if (e.key === 'Escape') {
      return closeModals();
    }

    // Ignore all other keys while modals are showing.
    if (state.help || state.won) {
      return;
    }

    if (e.key === 'Backspace') {
      return deleteLetter();
    } else if (e.key === 'Enter') {
      return submit();
    } else if (e.key === '?') {
      return help();
    } else if (/^[a-zA-Z]$/.exec(e.key) !== null) {
      return addLetter(e.key.toUpperCase());
    }
  }

  const gameData = useLoaderData();

  // Set state, but only when gameData changes, rather than on every state
  // change.
  useEffect(() => {
    setState(gameData);
  }, [
    gameData,
  ]);

  // Use on* attributes instead of addEventListener, or the handler will get
  // re-added on each re-render of the component.
  document.onkeyup = keyHandler;

  return (
    <div className="column fill">
      <Title state={state} />

      <div id="gameContainer">
        <div className="column fill">
          <Input state={state} />
        </div>

        <div className="column fill">
          <Box state={state} addLetter={addLetter} />
          <Buttons restart={restart} submit={submit}
                   deleteLetter={deleteLetter} help={help} />
        </div>

        <Modal id="helpModal" open={state.help} onClose={closeModals}>
          <Help />
        </Modal>

        <Modal id="wonModal" open={state.won} onClose={closeModals}>
          <Won state={state} />
        </Modal>
      </div>
    </div>
  );
}
