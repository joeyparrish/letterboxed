import { useGame } from './context';

export default function Modal({ id, stateName, children }) {
  const [ state, setState ] = useGame();

  const closeModal = () => {
    const closeState = {};
    closeState[stateName] = false;
    setState(closeState);
  };

  const className = state[stateName] ? 'modal open' : 'modal';
  if (state[stateName]) {
    document.activeElement.blur();
  }

  return (
    <div id={id} className={className}>
      <button className="closeButton" onClick={closeModal}>&times;</button>
      { children }
    </div>
  );
}
