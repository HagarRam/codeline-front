import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import { RootState } from '../../store/store';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import SingleCodeCard from '../SingleCodeCard/SingleCodeCard';

const CodeBlockPage: React.FC = () => {
	const data = useSelector((state: RootState) => state.codeBlocks.value);
	let codeID = useParams<string>();
	const codeData: ICodeBlock | undefined = data?.find((subject: ICodeBlock) => {
		return subject._id?.toString() === codeID.id;
	});
	if (codeData) {
	} else {
		console.log('information not found');
	}

	return (
		<div id="body">
			<NavBar />
			<div>
				<SingleCodeCard
					title={codeData?.title ?? ''}
					code={codeData?.code ?? ''}
					_id={codeData?._id}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default CodeBlockPage;
