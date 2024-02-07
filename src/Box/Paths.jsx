function Path({ state, word, current = false }) {
  if (word.length < 2) {
    return null;
  }

  const children = [];

  for(let i = 1; i < word.length; i++) {
    const [ x1, y1 ] = state.puzzle.letterMap[word[i - 1]];
    const [ x2, y2 ] = state.puzzle.letterMap[word[i]];
    const path = `M ${x1} ${y1} L ${x2} ${y2} Z`;
    if (current) {
      children.push(
        // Underlay for each active path to make sure the white parts of the
        // dashed line are white and not transparent:
        <path d={path} className="active under" key={'under' + i} />,
        <path d={path} className="active" key={i} />);
    } else {
      children.push(
        <path d={path} className="past" key={i} />);
    }
  }

  return (
    <g>
      {children}
    </g>
  );
}

export default function Paths({state}) {
  const pastWords = state.existingWords.map((word, i) => (
    <Path state={state} word={word} key={i} />
  ));
  const currentWord = (
    <Path state={state} word={state.currentGuess} current={true} />
  );

  return (
    <g>
      {pastWords}
      {currentWord}
    </g>
  );
}
