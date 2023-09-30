import reference from '../assets/reference.svg';

export function Box2() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      viewBox="0 0 600 600">
      <rect
        x="100"
        y= "100"
        width="400"
        height="400"
        fill="rgba(255,255,255)"
        stroke="black"/>
      </svg>
  )
}

export default function Box() {
  return (
    <img src={reference} alt="reference Image" />
  )
}