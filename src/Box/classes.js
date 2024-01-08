export function letterClasses(letter, state) {
  const { existingWords, currentGuess } = state;

  // if the letter is the first letter of the current guess, this is a lead
  // circle
  const classNames = [];

  const lastLetter = currentGuess[currentGuess.length - 1];
  if (lastLetter === letter) {
    classNames.push('lead');
  }

  // if the letter is in the current guess, this is an active circle
  if (currentGuess.includes(letter)) {
    classNames.push('active');
  }

  // if the letter is in a past guess, this is a past circle
  if (existingWords.some(word => word.includes(letter))) {
    classNames.push('past');
  }

  return classNames.join(' ');
}
