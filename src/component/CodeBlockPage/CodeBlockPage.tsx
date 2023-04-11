import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import { RootState } from '../../store/store';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

const CodeBlockPage: React.FC = () => {
	const data = useSelector((state: RootState) => state.codes.value);
	let codeID = useParams<string>();
	const codeData: ICodeBlock | undefined = data?.find((subject: ICodeBlock) => {
		return subject._id?.toString() === codeID.id;
	});
	if (codeData) {
	} else {
		console.log('information not found');
	}

	return (
		<div>
			<NavBar />
			<div>singlepage</div>
			<Footer />
		</div>
	);
};

export default CodeBlockPage;
