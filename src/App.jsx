import Archive from "./Archive";
import ErrorPage from "./ErrorPage";
import Input from "./Input";
import Box from "./Box";
import Buttons from "./Buttons";
import Game, { gameDataLoaderFactory } from "./Game";
import Help from "./Help";
import Menu from "./Menu";
import Modal from "./Modal";
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
]);

export default function App() {
  return (
    <>
      <Menu />
      <RouterProvider router={router} />
    </>
  );
}
