/*
 * Copyright (C) 2024 Joey Parrish
 *
 * Letterboxed clone by Joey Parrish, forked from Sivan Mehta, under GPLv3.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <https://www.gnu.org/licenses/>.
 */

import Box from './Box';
import Modal from './Modal';

import { generateLetterMap } from './utils';
import { useLoaderData } from 'react-router-dom';

function stringToArray(string) {
  return string.split('').map(x => x.charCodeAt(0));
}

export function resultsLoader({params}) {
  const {details} = params;

  let json;
  let title, letters, solution;
  try {
    json = atob(details);
    [title, letters, solution] = JSON.parse(json);
  } catch (error) {
    console.error(error);
    return null;
  }

  return {
    title,
    letters: [
      letters.substring(0, 3).split(''),
      letters.substring(3, 6).split(''),
      letters.substring(6, 9).split(''),
      letters.substring(9, 12).split(''),
    ],
    solution,
  };
}

export function resultsEncoder({state}) {
  const title = state.puzzle.title;
  const letters = state.puzzle.letters.flat().join('');
  const solution = state.existingWords;

  const json = JSON.stringify([title, letters, solution]);
  const base64 = btoa(json);

  return base64;
}

export function countRepeatedLetters(solution) {
  const numLetters = solution.reduce((acc, word) => acc + word.length, 0);
  const numWords = solution.length;
  // Don't count the required repetitions between words.
  return numLetters - (numWords - 1) - 12;
}

function onClose() {
  location.hash = '#';
}

export default function Results() {
  const details = useLoaderData();

  if (details) {
    const resultState = {
      currentGuess: "",
      existingWords: details.solution,
      puzzle: {
        letters: details.letters,
        letterMap: generateLetterMap(details.letters),
      },
    };

    const numWords = details.solution.length;
    const numRepeatedLetters = countRepeatedLetters(details.solution);

    return (
      <Modal id="resultsModal" open="true" onClose={onClose}>
        <div className="fill">
          <h1>Solution to {details.title}</h1>

          <div className="counts">
            {numWords} words, {numRepeatedLetters} repeated letters
          </div>

          <details>
            <summary>Click to reveal</summary>

            <h2>{resultState.existingWords.join(' - ')}</h2>

            <Box state={resultState} />
          </details>
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal id="resultsModal" open="true" onClose={onClose}>
        <div className="fill">
          <h1>Invalid results link</h1>
        </div>
      </Modal>
    );
  }
}
