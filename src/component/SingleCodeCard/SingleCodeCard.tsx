import React from 'react';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import './SingleCodeCard.css';
const SingleCodeCard: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	const { title } = props;
	return (
		<div className="subject-information">
			<div id="card-information">
				<div className="block-subject">{title}</div>
			</div>
			<div id="text-area-container">
				<textarea
					id="text-area"
					placeholder="enter your code...."
				/>
			</div>
			<div id="submit-button">SUBMIT</div>
		</div>
	);
};

export default SingleCodeCard;
