import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LobbyPage from './component/LobbyPage/LobbyPage';
import CodeBlockPage from './component/CodeBlockPage/CodeBlockPage';

function App() {
	console.log('app is reload');

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<LobbyPage />}
				/>
				<Route
					path="/:id"
					element={<CodeBlockPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
