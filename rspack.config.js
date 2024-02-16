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

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/main.jsx",
  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
    copy: {
      patterns: [
        { from: 'icon.svg', context: 'public' },
        { from: 'manifest.json', context: 'public' },
        // So arcane, but if we don't specify a "to", it unpacks the folder.
        { from: 'puzzle-sources', context: 'public', to: 'puzzle-sources' },
      ],
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
    ],
  },
};
