import { letterClasses } from './classes';

function Circle({ letter, state, addLetter }) {
  const [ x, y ] = state.puzzle.letterMap[letter];

  return (
    <circle
      onClick={() => addLetter(letter)}
      cx={x}
      cy={y}
      r={12}
      className={letterClasses({letter, state})}
    />
  );
}

export default function Circles({ state, addLetter }) {
  return (
    <g>
      {state.puzzle.letters.flat().map((letter, i) => (
        <Circle letter={letter} addLetter={addLetter} state={state} key={i} />
      ))}
    </g>
  )
}
