import React, { useEffect, useState } from 'react';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import './SingleCodeCard.css';
import io from 'socket.io-client';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ObjectId } from 'mongoose';
const SingleCodeCard: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	const data = useSelector((state: RootState) => state.codeBlocks.value);
	const { title, code, _id } = props;
	const [SubmitModal, setSubmitModal] = useState(false);
	const [socket, setSocket] = useState<any>(null);
	const [newCodeBlock, setNewCodeBlock] = useState('');
	const [socketConnected, setSocketConnected] = useState(false);
	const codeData: ICodeBlock | undefined = data?.find((subject: ICodeBlock) => {
		return subject._id?.toString() === _id;
	});

	useEffect(() => {
		const socket = io('http://localhost:3000');
		socket.connected = true;
		setSocket(socket);
		console.log(socket);
		socket.on('connection', () => {
			setSocketConnected(true);
			console.log('Socket connection:', socket);
		});

		// socket.on('disconnect', () => {
		// 	setSocketConnected(false);
		// });
		// return () => {
		// 	socket.disconnect();
		// };
	}, []);

	const updateCodeData = async (_id: ObjectId, newData: ICodeBlock) => {
		try {
			const response = await fetch(`http://localhost:7000/codeBlock`, {
				method: 'PUT',
				body: JSON.stringify({
					_id: _id,
					data: newData,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			const data = await response.json();
			// window.location.reload();
			if (!response.ok) {
				throw new Error(data.message);
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	// socket.emit('chat-message', { code: newCodeBlock });
	// const updateCode = {
	// 	...codeData,
	// 	code: newCodeBlock,
	// };
	// if (updateCode._id) {
	// 	await updateCodeData(updateCode._id, updateCode);
	// }

	const handelSubmit = async () => {
		const updateCode = {
			...codeData,
			code: newCodeBlock,
		};
		if (updateCode._id) {
			console.log(updateCode);
			// await updateCodeData(updateCode._id, updateCode);
			// const down = true;
			// socket.emit('code_block', { updateCode, down });
		}
		console.log('pass');
		setNewCodeBlock('');
		setSubmitModal(false);
	};
	const handelCancel = () => {
		setSubmitModal(false);
	};

	const handelCodeBlockChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		console.log(event.target.value);
		socket.emit('code_block', event.target.value);
		setNewCodeBlock(event.target.value);
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
					value={newCodeBlock}
					onChange={handelCodeBlockChange}
				/>
				<div id="code-container">{code}</div>
			</div>

			<div
				id="submit-button"
				onClick={() => setSubmitModal(true)}>
				SUBMIT
			</div>
			{SubmitModal && (
				<div className="confirm-delete-modal">
					<div className="delete-modal-content">
						<div className="delete-modal-header">Are you sure?</div>
						<div className="confirm-buttons">
							<button
								onClick={handelSubmit}
								className="confirm-submit">
								Confirm
							</button>
							<button
								onClick={handelCancel}
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
