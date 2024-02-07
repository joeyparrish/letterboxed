export default function Buttons({state, restart, deleteLetter, submit, help,
                                 yesterday}) {
  const yesterdayClass = state.yesterdayPuzzle.letters.length ? '' : 'hidden';
  return (
    <div id="buttonRow" className="fill">
      <button onClick={restart}>Restart</button>
      <button onClick={deleteLetter}>Delete</button>
      <button onClick={submit}>Enter</button>
      <button id="helpButton" onClick={help}>?</button>
      <button id="yesterdayButton" className={yesterdayClass}
              onClick={yesterday}>Yesterday's Solution</button>
    </div>
  );
}
