import Archive from "./Archive";
import ErrorPage from "./ErrorPage";
import Input from "./Input";
import Box from "./Box";
import Buttons from "./Buttons";
import Help from "./Help";
import Menu from "./Menu";
import Modal from "./Modal";
import Title from "./Title";
import Won from "./Won";
import { GameProvider, gameDataLoaderFactory } from './context';
import { createHashRouter, RouterProvider } from 'react-router-dom';

function Game() {
  return (
    <GameProvider>
      <div className="column fill">
        <Title />
        <div id="gameContainer">
          <div className="column fill">
            <Input />
          </div>

          <div className="column fill">
            <Box />
            <Buttons />
          </div>

          <Modal id="helpModal" stateName="help">
            <Help />
          </Modal>
          <Modal id="wonModal" stateName="won">
            <Won />
          </Modal>
        </div>
      </div>
    </GameProvider>
  );
}

const router = createHashRouter([
  {
    path: "",
    element: <Game />,
    loader: gameDataLoaderFactory('standard'),
    errorElement: <ErrorPage />,
  },
  {
    path: "standard/:date",
    loader: gameDataLoaderFactory('standard'),
    element: <Game />,
  },
  {
    path: "poetry",
    loader: gameDataLoaderFactory('poetry'),
    element: <Game />,
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
