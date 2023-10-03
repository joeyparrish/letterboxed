import reference from '../assets/reference.svg';

export default function Modal({ closeModal }) {
  return (
    <div className="modal">
      <div>
        <p>
          - Connect letters to spell words
        </p>
        <p>
          - Words must be at least 3 letters long
        </p>
        <p>
          - Consecutive letters cannot be from the same side
        </p>
        <p>
          - The last letter of a word becomes the first letter of the next word eg. THY &gt; YES &gt; SINCE
        </p>
        <p>
          - Words cannot be proper nouns or hyphenated
        </p>
        <p>
          - No profanity either, sorry
        </p>
        <p>
          - Use all letters to solve!
        </p>
        <p>
          - The original game can be found <a href="https://www.nytimes.com/puzzles/letter-boxed">here</a>
        </p>
        <button onClick={closeModal}>Close</button>
        <img src={reference} alt="letter boxed reference" />
      </div>
    </div>
  );
}