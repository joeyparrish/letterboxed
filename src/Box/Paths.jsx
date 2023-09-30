import { useGame } from '../context';

function Path({ word, current = false }) {
  if(word.length < 2) {
    return null;
  }

  const [ state ] = useGame();
  const { letterMap } = state;

  console.log(word, current);
  const paths = [];
  for(let i = 1; i < word.length; i++) {
    const [ x1, y1 ] = letterMap[word[i - 1]].coords;
    const [ x2, y2 ] = letterMap[word[i]].coords;
    paths.push(`M ${x1} ${y1} L ${x2} ${y2} Z`);
  }

  return (
    <g>
      {paths.map((d, i) => (
        <path d={d} className={current ? "active" : "past"} key={i}/>
      ))}
    </g>
  )
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