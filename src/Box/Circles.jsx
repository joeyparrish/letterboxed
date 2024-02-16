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

import { letterClasses } from './classes';

function Circle({ letter, state, addLetter }) {
  const [ x, y ] = state.puzzle.letterMap[letter];

  return (
    <circle
      onClick={() => addLetter(letter)}
      cx={x}
      cy={y}
      r={12}
      className={letterClasses({letter, state})}
    />
  );
}

export default function Circles({ state, addLetter }) {
  return (
    <g>
      {state.puzzle.letters.flat().map((letter, i) => (
        <Circle letter={letter} addLetter={addLetter} state={state} key={i} />
      ))}
    </g>
  )
}
