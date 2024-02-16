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

export default function Title({state}) {
  return (
    <div className="fill">
      <h1 className={state.puzzle.titleClass}>{state.puzzle.title}</h1>
      <h2>
        <img className="authorImage" src={state.puzzle.authorImage} />
        {state.puzzle.author}
      </h2>
    </div>
  );
}
