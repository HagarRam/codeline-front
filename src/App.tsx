import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LobbyPage from './component/LobbyPage/LobbyPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<LobbyPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
