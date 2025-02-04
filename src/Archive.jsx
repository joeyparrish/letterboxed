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

import { useEffect, useState } from 'react';

import { loadStandardGameArchive } from './utils';

function PuzzleList() {
  const [archiveDates, setArchiveDates] = useState([]);

  async function fetchArchive() {
    const data = await loadStandardGameArchive();
    data.reverse();  // newest first
    setArchiveDates(data);
  }

  useEffect(() => {
    fetchArchive();
  }, []);

  const list = [];
  for (const date of archiveDates) {
    const dateLink = `#standard/${date}`;
    list.push(
        <li key={date}><a href={dateLink}>{date}</a></li>
    );
  }
  return list;
}

export default function Archive() {
  return (
    <div id="archive">
      <h1>Puzzle Archive</h1>
      <ul>
        <PuzzleList />
      </ul>
    </div>
  );
}
