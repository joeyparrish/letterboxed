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

import { joinIntoArray, uuid } from './utils';

function WhiteSpan() {
  return <span className="join" key={uuid()}> - </span>;
}

function Guesses({state, onErrorAnimationEnd}) {
  const content = state.existingWords.length > 0 ?
      joinIntoArray(state.existingWords, WhiteSpan) : <br />;

  const errorClass = state.hardError ? 'fatal' :
      (state.error ? 'active' : '');

  return (
    <div className="guesses overlay-host">
      { content }
      <div id="errorOverlay" className={errorClass}
           onAnimationEnd={onErrorAnimationEnd}>
        <div id="errorMessage">{ state.hardError || state.error }</div>
      </div>
    </div>
  );
}

export default function Input({state, onErrorAnimationEnd}) {
  return (
    <div id="input" className="fill">
      <div id="currentGuess">{state.currentGuess}</div>
      <Guesses state={state} onErrorAnimationEnd={onErrorAnimationEnd} />
    </div>
  );
}
