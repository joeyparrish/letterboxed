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

import reference from './assets/reference.svg';

export default function Help() {
  return (
    <div className="fill">
      <h1>How To Play</h1>

      <h2>Create words using letters around the square</h2>

      <img id="example-game" src={reference} alt="example game" />

      <ul>
        <li>Connect letters to spell words</li>
        <li>Words must be at least 3 letters long</li>
        <li>Consecutive letters cannot be from the same side</li>
        <li>The last letter of a word becomes the first letter of the next word
            (e.g. THY &gt; YES &gt; SINCE)</li>
        <li>Words cannot be proper nouns or hyphenated</li>
        <li>No cussing, either (sorry)</li>
        <li>Use all letters to win!</li>
      </ul>

      <p>New puzzles are released at 4 a.m. EST.</p>
      <p>"Poetic puzzles" are generated from two-word phrases found in
         English-language poetry.</p>
      <p>The original game can be found <a href="https://www.nytimes.com/puzzles/letter-boxed">here</a>.</p>
    </div>
  );
}
