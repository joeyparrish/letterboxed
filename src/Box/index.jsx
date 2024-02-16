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

import Paths from './Paths';
import Letters from './Letters';
import Circles from './Circles';

export default function Box({state, addLetter}) {
  return (
    <svg
      className="letter-box"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600">
      <rect
        x="100"
        y="100"
        width="400"
        height="400"
        fill="white"
        stroke="black"/>

      <Paths state={state} />
      <Letters state={state} addLetter={addLetter} />
      <Circles state={state} addLetter={addLetter} />
    </svg>
  );
}
