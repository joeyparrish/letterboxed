import reference from '../assets/reference.svg';

export default function Help() {
  return (
    <div className="fill">
      <h1>How To Play</h1>

      <p>Create words using letters around the square</p>

      <img id="example-game" src={reference} alt="example game" />

      <ul>
        <li>Connect letters to spell words</li>
        <li>Words must be at least 3 letters long</li>
        <li>Consecutive letters cannot be from the same side</li>
        <li>The last letter of a word becomes the first letter of the next word (e.g. THY &gt; YES &gt; SINCE)</li>
        <li>Words cannot be proper nouns or hyphenated</li>
        <li>No cussing, either (sorry)</li>
        <li>Use all letters to win!</li>
      </ul>

      <p>New puzzles are released at 4 a.m. EST.</p>
      <p>The original game can be found <a href="https://www.nytimes.com/puzzles/letter-boxed">here</a>.</p>
    </div>
  );
}
