export default function Buttons({restart, deleteLetter, submit, help}) {
  return (
    <div id="buttonRow" className="fill">
      <button onClick={restart}>Restart</button>
      <button onClick={deleteLetter}>Delete</button>
      <button onClick={submit}>Enter</button>
      <button id="helpButton" onClick={help}>?</button>
    </div>
  );
}
