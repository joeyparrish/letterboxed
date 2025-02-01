#!/usr/bin/env node
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

(async () => {
  const {generateSW} = require('workbox-build');
  const {count, size, warnings} = await generateSW({
    globDirectory: 'dist/',
    globPatterns: [
      '!(*.map)',
      // Everything but archive.json, which needs an explicit network-first strategy.
      'puzzle-sources/*',
      'puzzle-sources/standard/2*.json',
    ],
    runtimeCaching: [
      {
        urlPattern: ({url}) => url.pathname.endsWith('archive.json'),
        handler: 'NetworkFirst',
      },
    ],
    skipWaiting: true,
    swDest: 'dist/service-worker.js',
  });

  if (warnings.length > 0) {
    console.warn(`Warnings encountered while generating a service worker: ${warnings.join('\n')}`);
  }
  console.log(`Generated a service worker to precache ${count} files, totaling ${size} bytes.`);
})();
