export function fancyJoin(elements, joiner) {
  let index = 1;
  let array = [elements[0]];
  while(index < elements.length) {
    array.push(joiner);
    array.push(elements[index]);
    index++;
  }
  return array;
}

export async function loadWords() {
  const content = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt')
    .then(res => res.text());
  
  const words = content
    .split('\n')
    .filter(word => word.length > 3);

  let dictionary = new Set();
  words.forEach(word => dictionary.add(word.trim().toUpperCase()));
  window.__dict = dictionary;

  return dictionary;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// this is done at the top level because we're not ever going to change the dictionary
// No Q, X, or Z because they're annoying
const consonants = 'BCDFGHJKLMNPRSTVWY';
const vowels = 'AEIOU';
const randomConsonants = shuffle(consonants.split(""));
const randomVowels = shuffle(vowels.split(""));
let _letters = [];
for(let i = 0; i < 4; i ++) {
  const row = randomConsonants.slice(4 * i, 4 * i + 2);
  row.push(randomVowels[i]);
  _letters.push(row);
}

export const letters = _letters;

export function checkForWin(existingWords) {
  let letterSet = new Set();
  existingWords.forEach(word => word
    .split("").forEach(letter => letterSet.add(letter))
  );
  const winCondition = letterSet.size === 12;

  return winCondition;
}

// this is not actual, real uuid, mostly to get around the react key warning
export function uuid() {
  return Math.random().toString(36).substring(2, 15);
}