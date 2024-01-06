import Input from "./Input";
import Box from "./Box";
import Buttons from "./Buttons";
import { GameProvider } from './context';

function App() {
	return (
		<GameProvider>
			<div className="row">
				<Input />
			</div>
			<div className="row">
				<Box />
			</div>
			<div className="row">
				<Buttons />
			</div>
		</GameProvider>
	);
}

export default App;
