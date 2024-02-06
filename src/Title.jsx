import { useGame } from './context';

export default function Title() {
  const [state, setState] = useGame();

  return (
    <div className="fill">
      <h1>{state.title}</h1>
      <h2><img class="authorImage" src={state.authorImage} /> {state.author}</h2>
    </div>
  );
}
