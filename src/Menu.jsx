/*
 * Copyright (C) 2024 Joey Parrish
 *
 * Letterboxed clone by Joey Parrish, forked from Sivan Mehta, under GPLv3.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <https://www.gnu.org/licenses/>.
 */

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
          <li><a onClick={toggleMenu} href="#">Latest Puzzle</a></li>
          <li><a onClick={toggleMenu} href="#poetry">Poetic Puzzle</a></li>
          <li><a onClick={toggleMenu} href="#archive">Archive</a></li>
        </ul>
      </div>
    </div>
  );
}
