import { useGame } from '../context';
import { letterClasses } from './classes';

const offset = 125;

function Letter({ letter, x, y }) {
  const [ state, setState ] = useGame();
  const { currentGuess } = state;

  function addLetter() {
    setState({
      currentGuess: currentGuess + letter,
      intent: "guess"
    });
  }

  return (
    <text
      onClick={addLetter}
      x={x}
      y={y}
      className={letterClasses(letter, state)}>
      {letter}
    </text>
  )
}

function Set({ letters, placement}) {
  if(placement === "top") {
    return letters.map((letter, i) => (
        <Letter
          key={i}
          x={300 + (offset * (i - 1))}
          y={75}
          letter={letter} />
      )
    )
  }

  if(placement === "left") {
    return (
      <g>
        {letters.map((letter, i) => (
          <Letter
            key={i}
            x={60}
            y={320 + (offset * (i - 1))}
            letter={letter} />
        ))}
      </g>
    )
  }

  if(placement === "right") {
    return (
      <g>
        {letters.map((letter, i) => (
        <Letter
          key={i}
          x={540}
          y={320 + (offset * (i - 1))}
          letter={letter} />
        ))}
      </g>
    )
  }

  if(placement === "bottom") {
    return (
      <g>
        {letters.map((letter, i) => (
          <Letter
            key={i}
            x={300 + (offset * (i - 1))}
            y={565}
            letter={letter} />
        ))}
      </g>
    )
  }

  return null
}

export default function Letters() {
  const [ state ] = useGame();
  const { letters } = state;
  return (
    <g>
      <Set letters={letters[0]} placement="top"/>
      <Set letters={letters[1]} placement="left"/>
      <Set letters={letters[2]} placement="right"/>
      <Set letters={letters[3]} placement="bottom"/>
    </g>
  )
}
