import { useState } from 'react';

export default function Menu() {
  const [ menuOpen, setMenuOpen ] = useState(false);

  const menuClass = menuOpen ? 'open' : '';
  const menuIcon = menuOpen ? 'X' : '\u2630';
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div id="menu" className={menuClass}>
      <div id="menuButton" onClick={toggleMenu}>
        {menuIcon}
      </div>
      <div id="menuItems">
        <ul>
          <li><a onClick={toggleMenu} href="#">Latest</a></li>
          <li><a onClick={toggleMenu} href="#archive">Archive</a></li>
        </ul>
      </div>
    </div>
  );
}
