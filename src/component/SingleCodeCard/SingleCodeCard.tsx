import React, { useState } from 'react';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import './SingleCodeCard.css';
const SingleCodeCard: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	const [SubmitModal, setSubmitModal] = useState(false);
	const handelSubmit = () => {
		setSubmitModal(true);
	};
	const handelCancel = () => {
		setSubmitModal(false);
	};
	const { title, code } = props;
	return (
		<div className="subject-information">
			<div id="card-information">
				<div className="subject-title">{title}</div>
			</div>
			<div id="text-area-container">
				<textarea
					id="text-area"
					placeholder="enter your code...."
				/>
				<div id="code-container">{code}</div>
			</div>

			<div
				id="submit-button"
				onClick={() => handelSubmit()}>
				SUBMIT
			</div>
			{SubmitModal && (
				<div className="confirm-delete-modal">
					<div className="delete-modal-content">
						<div className="delete-modal-header">Are you sure?</div>
						<div className="confirm-buttons">
							<button
								// onClick={() => handelDeleteSubject(subject._id)}
								className="confirm-submit">
								Confirm
							</button>
							<button
								onClick={() => handelCancel()}
								className="cancel">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SingleCodeCard;
