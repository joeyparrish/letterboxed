import Input from "./Input";
import Box from "./Box";
import Buttons from "./Buttons";
import Help from "./Help";
import Modal from "./Modal";
import Won from "./Won";
import { GameProvider } from './context';

export default function App() {
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
