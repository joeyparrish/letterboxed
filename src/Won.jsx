export default function Won({state}) {
  return (
    <div className="fill">
      <h1>Congratulations!</h1>
      <p>You solved it in <b>{state.existingWords.length} words</b>!</p>
      <div className="bigIcon">🎉</div>
    </div>
  );
}
