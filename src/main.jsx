/*
 * Copyright (C) 2023-2024 Sivan Mehta, Joey Parrish
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

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';

ReactDOM.createRoot(document.getElementById('container')).render(
  <App />
);

(async () => {
  if ('serviceWorker' in navigator) {
    try {
      const thisFolder = location.pathname.replace(/\/index.html$/, '/');
      const registration = await navigator.serviceWorker.register(
          'service-worker.js', {scope: thisFolder});
      console.log('Service worker registration succeeded:', registration);
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
    }
  } else {
    console.error('Service workers are not supported.');
  }
})();
