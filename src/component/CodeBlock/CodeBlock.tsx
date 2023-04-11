import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICodeBlock } from '../../store/slices/CodeBlockSlice';
const CodeBlock: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	const { title, _id } = props;
	const navigate = useNavigate();
	return (
		<div
			className="block"
			onClick={() => navigate(`/${_id}`)}>
			<div id="card-information">
				<div className="block-subject">{title}</div>
			</div>
		</div>
	);
};

export default CodeBlock;
