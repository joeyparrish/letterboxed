// Delimiter should be a callback, so that each one can be an element with a
// unique ID.
export function joinIntoArray(elements, delimiterCallback) {
  let index = 1;
  const array = [elements[0]];
  while (index < elements.length) {
    array.push(delimiterCallback());
    array.push(elements[index]);
    index++;
  }
  return array;
}

export function checkForWin(existingWords) {
  const letterSet = new Set();

  for (const word of existingWords) {
    for (const letter of word) {
      letterSet.add(letter);
    }
  }

  return letterSet.size === 12;
}

// this is not actual, real uuid, mostly to get around the react key warning
export function uuid() {
  return Math.random().toString(36).substring(2, 15);
}

export async function loadStandardGameData(date) {
  const isoDate = date.toISOString().split('T')[0];
  const request = await fetch(`puzzle-sources/standard/${isoDate}.json`);
  if (!request.ok) {
    throw new Error('Request for game data failed!');
  }

  const gameData = await request.json();
  return gameData;
}
