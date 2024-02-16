#!/usr/bin/env node
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

const fs = require('fs');
const safeEval = require('safe-eval');

async function scrape() {
  const response = await fetch('https://www.nytimes.com/puzzles/letter-boxed');
  if (!response.ok) {
    throw new Error(`Failed to fetch NYT page: HTTP ${response.status}`);
  }

  const text = await response.text();
  const match = /window.gameData\s*=(.*?)<\/script>/.exec(text);

  const gameData = safeEval(match[1]);

  // Write the entire game data.  Note that the NYT game data's dictionary only
  // contains words that are possible with today's letters.
  fs.writeFileSync(`public/puzzle-sources/standard/${gameData.printDate}.json`,
      JSON.stringify(gameData, null, 2) + '\n');

  const archivedDates = require(
      './public/puzzle-sources/standard/archive.json');
  if (!archivedDates.includes(gameData.printDate)) {
    archivedDates.push(gameData.printDate);
  }
  fs.writeFileSync(`public/puzzle-sources/standard/archive.json`,
      JSON.stringify(archivedDates, null, 2) + '\n');
}

scrape();
