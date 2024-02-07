export default function Title({state}) {
  return (
    <div className="fill">
      <h1 className={state.puzzle.titleClass}>{state.puzzle.title}</h1>
      <h2>
        <img className="authorImage" src={state.puzzle.authorImage} />
        {state.puzzle.author}
      </h2>
    </div>
  );
}
