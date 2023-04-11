import React from 'react';
import { useSelector } from 'react-redux';
import { ICodeBlock } from '../../store/slices/CodeBlockSlice';
import { RootState } from '../../store/store';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

const LobbyPage: React.FC = () => {
	const codeBlockData = useSelector(
		(state: RootState) => state.codeBlock.value
	);
	return (
		<div>
			<NavBar />
			<h1>Choose Code Block</h1>

			<Footer />
		</div>
	);
};

export default LobbyPage;
