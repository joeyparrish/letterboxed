import { letterClasses } from './classes';

const offset = 125;

function Letter({ state, addLetter, letter, x, y }) {
  return (
    <text
      onClick={() => addLetter(letter)}
      x={x}
      y={y}
      className={letterClasses({letter, state})}>
      {letter}
    </text>
  )
}

function Set({ letters, addLetter, state, placement}) {
  switch (placement) {
    case 'top':
      return letters.map((letter, i) => (
          <Letter
            addLetter={addLetter}
            state={state}
            key={i}
            x={300 + (offset * (i - 1))}
            y={75}
            letter={letter} />
        )
      );

    case 'left':
      return (
        <g>
          {letters.map((letter, i) => (
            <Letter
              addLetter={addLetter}
              state={state}
              key={i}
              x={60}
              y={320 + (offset * (i - 1))}
              letter={letter} />
          ))}
        </g>
      );

    case 'right':
      return (
        <g>
          {letters.map((letter, i) => (
          <Letter
            addLetter={addLetter}
            state={state}
            key={i}
            x={540}
            y={320 + (offset * (i - 1))}
            letter={letter} />
          ))}
        </g>
      );

    case 'bottom':
      return (
        <g>
          {letters.map((letter, i) => (
            <Letter
              addLetter={addLetter}
              state={state}
              key={i}
              x={300 + (offset * (i - 1))}
              y={565}
              letter={letter} />
          ))}
        </g>
      );
  }

  return null;
}

export default function Letters({state, addLetter}) {
  if (!state.puzzle.letters?.length) {
    // Not loaded yet.
    return (<></>);
  }

  return (
    <g>
      <Set addLetter={addLetter} letters={state.puzzle.letters[0]}
           state={state} placement="top" />
      <Set addLetter={addLetter} letters={state.puzzle.letters[1]}
           state={state} placement="left" />
      <Set addLetter={addLetter} letters={state.puzzle.letters[2]}
           state={state} placement="right" />
      <Set addLetter={addLetter} letters={state.puzzle.letters[3]}
           state={state} placement="bottom" />
    </g>
  )
}
