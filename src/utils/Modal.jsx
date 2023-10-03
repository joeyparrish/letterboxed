import reference from '../assets/reference.svg';

export default function Modal({ closeModal }) {
  return (
    <div className="modal">
      <div>
        <p>
          - Words must be at least 3 letters long
        </p>
        <p>
          - Words are formed by tapping letters in order
        </p>
        <p>
          - Consecutive letters cannot be from the same side
        </p>
        <p>
          - The last letter of a word becomes the first letter of the next word
        </p>
        <p>
          - Use all letters to win!
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
