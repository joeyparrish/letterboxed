import Paths from './Paths';
import Letters from './Letters';
import Circles from './Circles';

export default function Box({state, addLetter}) {
  return (
    <svg
      className="letter-box"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600">
      <rect
        x="100"
        y="100"
        width="400"
        height="400"
        fill="white"
        stroke="black"/>

      <Paths state={state} />
      <Letters state={state} addLetter={addLetter} />
      <Circles state={state} addLetter={addLetter} />
    </svg>
  );
}
