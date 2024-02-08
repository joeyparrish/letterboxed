export default function Modal({ id, open, onClose, children }) {
  if (open) {
    document.activeElement.blur();
    return (
      <>
        <div className="modalScrim"></div>
        <div id={id} className="modal">
          <button className="closeButton" onClick={onClose}>&times;</button>
          { children }
        </div>
      </>
    );
  } else {
    return (<></>);
  }
}
