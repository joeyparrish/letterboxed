import { useGame } from '../context';

function deriveClass(letter) {
  return ""
}

function Circle({ letter }) {
  const [ state ] = useGame();
  const { letterMap } = state;

  const [ x, y ] = letterMap[letter];
  const className = deriveClass(letter);

  return (
    <circle
      cx={x}
      cy={y}
      r={12}
      className={className}
    />
  )

}

export default function Circles() {
  const [ state ] = useGame();
  const { letters } = state;
  return (
    <g>
      {letters.flat().map((letter, i) => (
        <Circle letter={letter} key={i} />
      ))}
    </g>
  )
}