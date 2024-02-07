export default function Modal({ id, open, onClose, children }) {
  const className = open ? 'modal open' : 'modal';
  if (open) {
    document.activeElement.blur();
  }

  return (
    <div id={id} className={className}>
      <button className="closeButton" onClick={onClose}>&times;</button>
      { children }
    </div>
  );
}
