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

const offset = 125;

function Letter({ state, addLetter, letter, x, y }) {
  return (
    <text
      onClick={() => addLetter(letter)}
      x={x}
      y={y}
      className={letterClasses({letter, state})}>
      {letter}
    </text>
  )
}

function Set({ letters, addLetter, state, placement}) {
  switch (placement) {
    case 'top':
      return letters.map((letter, i) => (
          <Letter
            addLetter={addLetter}
            state={state}
            key={i}
            x={300 + (offset * (i - 1))}
            y={75}
            letter={letter} />
        )
      );

    case 'left':
      return (
        <g>
          {letters.map((letter, i) => (
            <Letter
              addLetter={addLetter}
              state={state}
              key={i}
              x={60}
              y={320 + (offset * (i - 1))}
              letter={letter} />
          ))}
        </g>
      );

    case 'right':
      return (
        <g>
          {letters.map((letter, i) => (
          <Letter
            addLetter={addLetter}
            state={state}
            key={i}
            x={540}
            y={320 + (offset * (i - 1))}
            letter={letter} />
          ))}
        </g>
      );

    case 'bottom':
      return (
        <g>
          {letters.map((letter, i) => (
            <Letter
              addLetter={addLetter}
              state={state}
              key={i}
              x={300 + (offset * (i - 1))}
              y={565}
              letter={letter} />
          ))}
        </g>
      );
  }

  return null;
}

export default function Letters({state, addLetter}) {
  if (!state.puzzle.letters?.length) {
    // Not loaded yet.
    return (<></>);
  }

  return (
    <g>
      <Set addLetter={addLetter} letters={state.puzzle.letters[0]}
           state={state} placement="top" />
      <Set addLetter={addLetter} letters={state.puzzle.letters[1]}
           state={state} placement="left" />
      <Set addLetter={addLetter} letters={state.puzzle.letters[2]}
           state={state} placement="right" />
      <Set addLetter={addLetter} letters={state.puzzle.letters[3]}
           state={state} placement="bottom" />
    </g>
  )
}
