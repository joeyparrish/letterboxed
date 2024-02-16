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

export default function Buttons({state, restart, deleteLetter, submit, help,
                                 yesterday}) {
  const yesterdayClass = state.yesterdayPuzzle.letters.length ? '' : 'hidden';
  return (
    <div id="buttonRow" className="fill">
      <button onClick={restart}>Restart</button>
      <button onClick={deleteLetter}>Delete</button>
      <button onClick={submit}>Enter</button>
      <button id="helpButton" onClick={help}>?</button>
      <button id="yesterdayButton" className={yesterdayClass}
              onClick={yesterday}>Yesterday's Solution</button>
    </div>
  );
}
