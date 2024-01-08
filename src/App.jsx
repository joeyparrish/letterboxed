import Input from "./Input";
import Box from "./Box";
import Buttons from "./Buttons";
import Modal from "./Modal";
import Won from "./Won";
import { GameProvider } from './context';
import reference from './assets/reference.svg';

export default function App() {
  return (
    <GameProvider>
      <div className="row fill">
        <Input />
      </div>
      <div className="row fill">
        <Box />
      </div>
      <div className="row fill">
        <Buttons />
      </div>
      <Modal id="helpModal" stateName="help">
        <h1>How To Play</h1>

        <p>Create words using letters around the square</p>

        <img src={reference} alt="example game" />

        <ul>
          <li>Connect letters to spell words</li>
          <li>Words must be at least 3 letters long</li>
          <li>Consecutive letters cannot be from the same side</li>
          <li>The last letter of a word becomes the first letter of the next word (e.g. THY &gt; YES &gt; SINCE)</li>
          <li>Words cannot be proper nouns or hyphenated</li>
          <li>No cussing, either (sorry)</li>
          <li>Use all letters to win!</li>
        </ul>

        <p>New puzzles are released at 3 a.m. EST.</p>
        <p>The original game can be found <a href="https://www.nytimes.com/puzzles/letter-boxed">here</a>.</p>
      </Modal>
      <Modal id="wonModal" stateName="won">
        <Won />
      </Modal>
    </GameProvider>
  );
}
