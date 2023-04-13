import React from 'react';
import { useSelector } from 'react-redux';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import { RootState } from '../../store/store';
import CodeBlockCard from '../CodeBlockCard/CodeBlockCard';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import './LobbyPage.css';
const LobbyPage: React.FC = () => {
	const codeBlockData = useSelector(
		(state: RootState) => state.codeBlocks?.value
	);
	return (
		<div id="body">
			<NavBar />
			<div id="lobby-page-container">
				<h1>Choose Code Block</h1>
				<div id="all-the-blocks">
					{codeBlockData?.map((subject: ICodeBlock, index: number) => {
						return (
							<CodeBlockCard
								_id={subject._id}
								title={subject.title}
								code={subject.code}
								key={index}
							/>
						);
					})}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default LobbyPage;
