#!/usr/bin/env node

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
