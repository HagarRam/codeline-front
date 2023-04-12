import React, { useEffect, useState } from 'react';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import './SingleCodeCard.css';
import io from 'socket.io-client';

const SingleCodeCard: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	const { title, code } = props;
	const [SubmitModal, setSubmitModal] = useState(false);
	const [socket, setSocket] = useState<any>(null);
	const [codeBlock, setCodeBlock] = useState('');

	useEffect(() => {
		// Connect to Socket.IO server
		const socket = io('http://localhost:7000');

		socket.on('connect', () => {
			// Join the "code room" and emit the client's identifier
			socket.emit('join', 'code room');
			setSocket(socket);
		});

		socket.on('code block', (data: any) => {
			// Receive code block from server and update state
			setCodeBlock(data.code);
		});

		return () => {
			// Disconnect from Socket.IO server on component unmount
			socket.disconnect();
		};
	}, []);

	const handelSubmit = () => {
		// Emit code block to server
		socket.emit('code block', { code: codeBlock });
		setSubmitModal(true);
	};

	const handelCancel = () => {
		setSubmitModal(false);
	};

	const handelCodeBlockChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		// Update local state with code block
		setCodeBlock(event.target.value);
	};

	return (
		<div className="subject-information">
			<div id="card-information">
				<div className="subject-title">{title}</div>
			</div>
			<div id="text-area-container">
				<textarea
					id="text-area"
					placeholder="enter your code...."
					value={codeBlock}
					onChange={handelCodeBlockChange}
				/>
				<div id="code-container">{code}</div>
			</div>

			<div
				id="submit-button"
				onClick={handelSubmit}>
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
