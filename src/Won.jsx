import { countRepeatedLetters, resultsEncoder } from './Results';

function shareText(text, url) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text + '\n\n' + url);
  }

  if (navigator.share) {
    navigator.share({
      title: 'Letterboxed',
      text: text,
      url: url,
    }).catch((error) => {
      console.error('Failed to share:', error);
    });
  }
}

export default function Won({state}) {
  if (state.won) {
    const encoded = resultsEncoder({state});
    const resultsURL = new URL(`#results/${encoded}`, location.href);

    const solution = state.existingWords;
    const numWords = solution.length;
    const numRepeatedLetters = countRepeatedLetters(solution);

    const resultsText = `I solved Letterboxed from ${state.puzzle.title}` +
                        ` in ${numWords} words with` +
                        ` ${numRepeatedLetters} repeated letters!`;

    const onClick = () => shareText(resultsText, resultsURL);

    return (
      <div className="fill">
        <h1>Congratulations!</h1>
        <div>
           You solved it with:
           <ul>
             <li><b>{numWords} words</b></li>
             <li><b>{numRepeatedLetters} repeated letters</b></li>
           </ul>
        </div>

        <div className="bigIcon">🎉</div>

        <button id="shareButton" onClick={onClick}>Copy Results</button>
      </div>
    );
  } else {
    return (<></>);
  }
}
