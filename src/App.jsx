import Archive from "./Archive";
import Input from "./Input";
import Box from "./Box";
import Buttons from "./Buttons";
import Help from "./Help";
import Menu from "./Menu";
import Modal from "./Modal";
import Won from "./Won";
import { GameProvider } from './context';
import { createHashRouter, RouterProvider } from 'react-router-dom';

function Game() {
  return (
    <GameProvider>
      <div className="row fill">
        <Input />
      </div>

      <div className="row fill">
        <Box />
        <Buttons />
      </div>

      <Modal id="helpModal" stateName="help">
        <Help />
      </Modal>
      <Modal id="wonModal" stateName="won">
        <Won />
      </Modal>
    </GameProvider>
  );
}

const router = createHashRouter([
  {
    path: "",
    element: <Game />,
  },
  {
    path: "archive",
    element: <Archive />,
  },
]);

export default function App() {
  return (
    <div>
      <Menu />
      <RouterProvider router={router} />
    </div>
  );
}
