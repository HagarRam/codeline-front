import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import './CodeBlockCard.css';
const CodeBlockCard: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	const { title, _id } = props;
	const navigate = useNavigate();
	return (
		<div
			className="block"
			onClick={() => navigate(`/${_id}`)}>
			<div id="card-information">
				<div className="subject-block">{title}</div>
			</div>
		</div>
	);
};

export default CodeBlockCard;
