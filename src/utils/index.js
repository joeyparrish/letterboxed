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
