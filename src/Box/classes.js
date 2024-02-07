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
