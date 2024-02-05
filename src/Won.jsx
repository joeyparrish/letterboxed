import { useGame } from './context';

export default function Won() {
  const [state, setState] = useGame();

  return (
    <div className="fill">
      <h1>Congratulations!</h1>
      <p>You solved it in <b>{state.existingWords.length} words</b>!</p>
      <div className="bigIcon">🎉</div>
    </div>
  );
}
