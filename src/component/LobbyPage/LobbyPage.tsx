import React from 'react';
import { useSelector } from 'react-redux';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import { RootState } from '../../store/store';
import CodeBlock from '../CodeBlock/CodeBlock';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

const LobbyPage: React.FC = () => {
	const codeBlockData = useSelector((state: RootState) => state.codes?.value);
	console.log(codeBlockData);
	return (
		<div>
			<NavBar />
			<h1>Choose Code Block</h1>
			<div>
				{codeBlockData?.map((subject: ICodeBlock) => {
					return (
						<CodeBlock
							_id={subject._id}
							title={subject.title}
							code={subject.code}
						/>
					);
				})}
			</div>
			<Footer />
		</div>
	);
};

export default LobbyPage;
