export function joinIntoArray(elements, delimiter) {
  let index = 1;
  const array = [elements[0]];
  while (index < elements.length) {
    array.push(delimiter);
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
