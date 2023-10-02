import "./App.css";
import Input from "./Input";
import Box from "./Box";
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
		</GameProvider>
	);
}

export default App;
