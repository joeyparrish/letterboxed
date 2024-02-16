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

export function letterClasses({letter, state}) {
  const classNames = [];

  const lastLetter = state.currentGuess[state.currentGuess.length - 1];

  // If the letter is the first letter of the current guess, this is a lead
  // circle.
  if (letter === lastLetter) {
    classNames.push('lead');
  }

  // If the letter is in the current guess, this is an active circle.
  if (state.currentGuess.includes(letter)) {
    classNames.push('active');
  }

  // If the letter is in a past guess, this is a past circle.
  if (state.existingWords.some(word => word.includes(letter))) {
    classNames.push('past');
  }

  return classNames.join(' ');
}
