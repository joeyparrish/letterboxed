/*
 * Copyright (C) 2023-2024 Sivan Mehta, Joey Parrish
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

import { countRepeatedLetters, resultsEncoder } from './Results';

function shareText(text, url) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text + '\n\n' + url);
  }

  if (navigator.share) {
    navigator.share({
      title: 'Letterboxed',
      text: text,
      url: url,
    }).catch((error) => {
      console.error('Failed to share:', error);
    });
  }
}

export default function Won({state}) {
  if (state.won) {
    const encoded = resultsEncoder({state});
    const resultsURL = new URL(`#results/${encoded}`, location.href);

    const solution = state.existingWords;
    const numWords = solution.length;
    const numRepeatedLetters = countRepeatedLetters(solution);

    // We say "from {title}", so if the title starts with "from" (as in the
    // poetry puzzles), drop it here.
    const title = state.puzzle.title.replace(/^from /, '');

    const resultsText = `I solved Letterboxed from ${title}` +
                        ` in ${numWords} words with` +
                        ` ${numRepeatedLetters} repeated letters!`;

    const onClick = () => shareText(resultsText, resultsURL);

    return (
      <div className="fill">
        <h1>Congratulations!</h1>
        <div>
           You solved it with:
           <ul>
             <li><b>{numWords} words</b></li>
             <li><b>{numRepeatedLetters} repeated letters</b></li>
           </ul>
        </div>

        <div className="bigIcon">🎉</div>

        <button id="shareButton" onClick={onClick}>Copy Results</button>
      </div>
    );
  } else {
    return (<></>);
  }
}
