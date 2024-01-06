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

  // Write the dictionary. Note that the NYT game data's dictionary only
  // contains words that are possible with today's letters.
  gameData.dictionary.sort();
  const dictionaryCode =
      'export const dictionary = new Set(' +
      JSON.stringify(gameData.dictionary, null, '  ') +
      ');';
  fs.writeFileSync('src/utils/dictionary.js', dictionaryCode);

  // Write the letters, in the format expected by the original clone from
  // SivanMehta.
  const lettersCode =
      'export const letters = ' +
      JSON.stringify(gameData.sides.map(x => x.split('')), null, '  ') +
      ';';
  fs.writeFileSync('src/utils/letters.js', lettersCode);

  // Uncomment to see the data:
  //delete gameData.dictionary;
  //console.log(JSON.stringify(gameData, null, '  '));
}

scrape();
