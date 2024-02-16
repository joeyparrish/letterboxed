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

import Archive from "./Archive";
import ErrorPage from "./ErrorPage";
import Input from "./Input";
import Box from "./Box";
import Buttons from "./Buttons";
import Game, { gameDataLoaderFactory } from "./Game";
import Help from "./Help";
import Menu from "./Menu";
import Modal from "./Modal";
import Results, { resultsLoader } from "./Results";
import Title from "./Title";
import Won from "./Won";
import Yesterday from "./Yesterday";
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: "",
    element: <Game key="latest" />,
    loader: gameDataLoaderFactory('standard'),
    errorElement: <ErrorPage />,
  },
  {
    path: "standard/:date",
    loader: gameDataLoaderFactory('standard'),
    element: <Game key="old" />,
  },
  {
    path: "poetry",
    loader: gameDataLoaderFactory('poetry'),
    element: <Game key="poetry" />,
  },
  {
    path: "archive",
    element: <Archive />,
  },
  {
    path: "results/:details",
    loader: resultsLoader,
    element: <Results />,
  },
]);

export default function App() {
  return (
    <>
      <Menu />
      <RouterProvider router={router} />
    </>
  );
}
