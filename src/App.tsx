import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header/Header.component';

function App() {
	return (
		<div className="app">
			<Header />
			<Outlet />
		</div>
	);
}

export default App;
