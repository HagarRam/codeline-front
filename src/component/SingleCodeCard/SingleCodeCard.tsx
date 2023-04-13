import React, { useEffect, useState } from 'react';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import './SingleCodeCard.css';
import io from 'socket.io-client';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ObjectId } from 'mongoose';
const CONNECTION_PORT = 'http://localhost:7000';

const SingleCodeCard: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	const data = useSelector((state: RootState) => state.codeBlocks.value);
	const { title, code, _id } = props;
	const [SubmitModal, setSubmitModal] = useState(false);
	const [messageList, setMessageList] = useState<string[]>([`${code}`]);
	const [newCodeBlock, setNewCodeBlock] = useState<any>(messageList);
	const [readOnly, setReadOnly] = useState<boolean>(true);
	const codeData: ICodeBlock | undefined = data?.find((subject: ICodeBlock) => {
		return subject._id?.toString() === _id;
	});

	const newSocket = io(CONNECTION_PORT);
	useEffect(() => {
		newSocket.emit('join_Subject', codeData);
		newSocket.on('receive_code', function (data) {
			setNewCodeBlock(data);
		});
		newSocket.on('isMentor', (socketReadOnly) => {
			setReadOnly(socketReadOnly);
		});
		return () => {
			newSocket.off('receive_code');
		};
	}, []);

	useEffect(() => {
		newSocket.on('receive_code', (data) => {
			console.log('data', data);
			setNewCodeBlock(data);
		});
		return () => {
			const updateCode = {
				...codeData,
				code: newCodeBlock,
			};
			newSocket.emit('user_disconnect', updateCode);
			newSocket.disconnect();
		};
	}, [CONNECTION_PORT]);

	const handelCodeBlockChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewCodeBlock(event.target.value);
		const updateCode = {
			...codeData,
			readOnly: readOnly,
			code: event.target.value,
		};
		newSocket.emit('new_code', updateCode);
	};

	const handelSubmit = async () => {
		const updateCode = {
			...codeData,
			code: newCodeBlock,
		};
		console.log(updateCode, 'new');
		if (updateCode._id) {
			console.log(updateCode);
			// await updateCodeData(updateCode._id, updateCode);
			setNewCodeBlock('');
			setSubmitModal(false);
		}
	};
	const handelCancel = () => {
		setSubmitModal(false);
	};
	// const updateCodeData = async (_id: ObjectId, newData: ICodeBlock) => {
	// 	try {
	// 		const response = await fetch(`http://localhost:7000/codeBlock`, {
	// 			method: 'PUT',
	// 			body: JSON.stringify({
	// 				_id: _id,
	// 				data: newData,
	// 			}),
	// 			headers: {
	// 				'Content-type': 'application/json; charset=UTF-8',
	// 			},
	// 		});
	// 		const data = await response.json();
	// 		window.location.reload();
	// 		if (!response.ok) {
	// 			throw new Error(data.message);
	// 		}
	// 	} catch (err) {
	// 		console.error(err);
	// 		throw err;
	// 	}
	// };
	return (
		<div className="subject-information">
			<div id="card-information">
				<div className="subject-title">{title}</div>
			</div>
			<div id="only-read-title">
				{readOnly ? 'Only Read' : '	Edit Your Code'}
			</div>
			<div id="text-area-container">
				{!readOnly ? (
					<textarea
						id="text-area"
						placeholder="enter your code...."
						value={newCodeBlock}
						onChange={(e) => {
							handelCodeBlockChange(e);
						}}
					/>
				) : (
					<textarea
						readOnly
						id="text-area"
						placeholder="enter your code...."
						value={newCodeBlock}
						onChange={(e) => {
							handelCodeBlockChange(e);
						}}
					/>
				)}
				<div id="code-container">
					{messageList.map((message, index) => (
						<div key={index}>{message}</div>
					))}
				</div>
			</div>

			<button
				id="submit-button"
				onClick={() => setSubmitModal(true)}>
				UPDATE CODE
			</button>
			{SubmitModal && (
				<div className="confirm-modal">
					<div className="modal-content">
						<div className="modal-header">Are you sure?</div>
						<div className="modal-confirm-buttons">
							<button
								onClick={handelSubmit}
								className="confirm-button">
								Confirm
							</button>
							<button
								onClick={handelCancel}
								className="cancel-button">
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
