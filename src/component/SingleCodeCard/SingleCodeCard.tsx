import React, { useEffect, useState } from 'react';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import './SingleCodeCard.css';
import io, { Socket } from 'socket.io-client';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ObjectId } from 'mongoose';
import { DefaultEventsMap } from '@socket.io/component-emitter';
const CONNECTION_PORT = 'https://localhost:7000';

const SingleCodeCard: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	const [socket, setSocket] = useState<Socket<
		DefaultEventsMap,
		DefaultEventsMap
	> | null>(null);

	const data = useSelector((state: RootState) => state.codeBlocks.value);
	const { title, code, _id } = props;
	const [SubmitModal, setSubmitModal] = useState(false);
	// const [socket, setSocket] = useState<any>(null);
	// const [socketConnected, setSocketConnected] = useState(false);
	const [newCodeBlock, setNewCodeBlock] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const codeData: ICodeBlock | undefined = data?.find((subject: ICodeBlock) => {
		return subject._id?.toString() === _id;
	});
	useEffect(() => {
		const newSocket = io(CONNECTION_PORT);
		setSocket(newSocket);

		return () => newSocket.disconnect();
	}, [CONNECTION_PORT]);

	console.log(socket);
	useEffect(() => {
		socket?.emit('join_Subject', codeData);
	}, [codeData]);
	const handelCodeBlockChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewCodeBlock(event.target.value);
		const updateCode = {
			...codeData,
			code: event.target.value,
		};
		socket?.emit('newCode', updateCode);
	};

	// const sendMessage = () => {
	//     setLoggedIn(true);
	//     const updateCode = {
	//         ...codeData,
	//         code: newCodeBlock,
	//     };
	//     socket.emit('newCode', updateCode);
	// };
	// const handelCodeBlockChange = (
	// 	event: React.ChangeEvent<HTMLTextAreaElement>
	// ) => {
	// 	const data = { ...codeData, code: event.target.value };
	// 	socket.emit('code_block', data);
	// 	setNewCodeBlock(event.target.value);
	// };

	// const handelSubmit = async () => {
	// 	const updateCode = {
	// 		...codeData,
	// 		code: newCodeBlock,
	// 	};
	// 	if (updateCode._id) {
	// 		console.log(updateCode);
	// 		// await updateCodeData(updateCode._id, updateCode);
	// 		// const down = true;
	// 		// socket.emit('code_block', { updateCode, down });
	// 	}
	// 	console.log('pass');
	// 	setNewCodeBlock('');
	// 	setSubmitModal(false);
	// };

	// const handelCancel = () => {
	// 	setSubmitModal(false);
	// };
	// useEffect(() => {
	// 	const socket = io('http://localhost:7000');
	// 	setSocket(socket);
	// 	socket.on('connection', () => {
	// 		setSocketConnected(true);
	// 		console.log('Socket connection:', socket);
	// 	});

	// socket.on('disconnect', () => {
	// 	setSocketConnected(false);
	// });
	// return () => {
	// 	socket.disconnect();
	// };
	// }, []);

	// socket.emit('chat-message', { code: newCodeBlock });
	// const updateCode = {
	// 	...codeData,
	// 	code: newCodeBlock,
	// };
	// if (updateCode._id) {
	// 	await updateCodeData(updateCode._id, updateCode);
	// }

	// const updateCodeData = async (_id: ObjectId, newData: ICodeBlock) => {
	//     try {
	//         const response = await fetch(`http://localhost:7000/codeBlock`, {
	//             method: 'PUT',
	//             body: JSON.stringify({
	//                 _id: _id,
	//                 data: newData,
	//             }),
	//             headers: {
	//                 'Content-type': 'application/json; charset=UTF-8',
	//             },
	//         });
	//         const data = await response.json();
	//         // window.location.reload();
	//         if (!response.ok) {
	//             throw new Error(data.message);
	//         }
	//     } catch (err) {
	//         console.error(err);
	//         throw err;
	//     }
	// };
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
					onChange={(e) => {
						handelCodeBlockChange(e);
					}}
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
								// onClick={sendMessage}
								// onClick={handelSubmit}
								className="confirm-submit">
								Confirm
							</button>
							<button
								// onClick={handelCancel}
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
