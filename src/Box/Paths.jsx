import { useGame } from '../context';

function Path({ word, current = false }) {
  if(word.length < 2) {
    return null;
  }

  const [ state ] = useGame();
  const { letterMap } = state;

  const children = [];

  for(let i = 1; i < word.length; i++) {
    const [ x1, y1 ] = letterMap[word[i - 1]];
    const [ x2, y2 ] = letterMap[word[i]];
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

export default function Paths() {
  const [ state ] = useGame();
  const { existingWords, currentGuess } = state;

  const pastWords = existingWords
    .map((word, i) => <Path word={word} key={i} />)
  const currentWord = <Path word={currentGuess} current={true} />;

  return (
    <g>
      {pastWords}
      {currentWord}
    </g>
  );
}
