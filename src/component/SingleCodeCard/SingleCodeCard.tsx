import React, { useEffect, useState } from 'react';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import './SingleCodeCard.css';
import io from 'socket.io-client';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ObjectId } from 'mongoose';
const CONNECTION_PORT = 'http://localhost:7000';

const SingleCodeCard: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	console.log('start');

	const data = useSelector((state: RootState) => state.codeBlocks.value);
	const { title, code, _id } = props;
	const [SubmitModal, setSubmitModal] = useState(false);
	const [newSocket, setNewSocket] = useState<any>('0');
	const [num, setMum] = useState<any>('0');
	const [messageList, setMessageList] = useState<string[]>([`${code}`]);
	const [newCodeBlock, setNewCodeBlock] = useState<string>('');
	const [readOnly, setReadOnly] = useState<boolean>(false);
	const [youRight, setYouRight] = useState<boolean>(false);
	const currentData: ICodeBlock | undefined = data?.find(
		(subject: ICodeBlock) => {
			return subject._id?.toString() === _id;
		}
	);
	const [codeData, setCodeData] = useState(currentData);
	const [correctCodes, setCorrectCode] = useState<string>(
		`${codeData?.correctCode}`
	);
	useEffect(() => {
		const socket = io(CONNECTION_PORT);
		setNewSocket(socket);

		socket.on('isMentor', (socketReadOnly: any) => {
			if (socketReadOnly) {
				sessionStorage.setItem('isMentor', 'true');
				setReadOnly(socketReadOnly);
			} else {
				const isMentor = sessionStorage.getItem('isMentor') === 'true';
				setReadOnly(isMentor);
				if (!isMentor) {
					sessionStorage.removeItem('isMentor');
				}
			}

			// console.log(socketReadOnly);
			// if (socketReadOnly) {
			// 	sessionStorage.setItem('isMentor', 'true');
			// 	setReadOnly(socketReadOnly);
			// } else {
			// 	setReadOnly(socketReadOnly);
			// }
		});

		socket.on('code_update', (data: string) => {
			setMum(data);
			document.getElementById('text-area')?.removeAttribute('readonly');
			document.getElementById('text-area')?.setAttribute('innerHTML', data);
			document.getElementById('text-area')?.setAttribute('value', data);
			document.getElementById('text-area')?.setAttribute('readonly', 'true');
		});
	}, []);

	// if (sessionStorage.getItem('isMentor') === 'true') {
	// 	setReadOnly(true);
	// }

	// const isMentor = () => {
	// 	if (!readOnly) {
	// 		sessionStorage.setItem('isMentor', 'true');
	// 	} else {
	// 		sessionStorage.removeItem('isMentor');
	// 	}

	// 	// call the setReadOnly function based on the current state of the "isMentor" key in the session storage object
	// 	if (sessionStorage.getItem('isMentor') === 'true') {
	// 		setReadOnly(false);
	// 	} else {
	// 		setReadOnly(true);
	// 	}
	// };
	// isMentor();

	// const isMentor = async () => {
	// 	if (readOnly) {
	// 		sessionStorage.setItem('isMentor', 'true');
	// 	} else {
	// 		sessionStorage.removeItem('isMentor');
	// 	}

	// 	// call the setReadOnly function based on the current state of the "isMentor" key in the session storage object
	// 	if (sessionStorage.getItem('isMentor') === 'true') {
	// 		setReadOnly(true);
	// 	} else {
	// 		setReadOnly(false);
	// 	}
	// };
	// isMentor();
	// if (readOnly) {
	// 	sessionStorage.setItem('isMentor', 'true');
	// } else {
	// 	sessionStorage.removeItem('isMentor');
	// }

	// if (sessionStorage.getItem('isMentor') == 'true') {
	// 	setReadOnly(true);
	// } else {
	// 	setReadOnly(false);
	// }

	const handelCodeBlockChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		event.persist();
		newSocket.emit('new_code', event.target.innerHTML);
		setNewCodeBlock(event.target.value);

		if (correctCodes === event.target.innerHTML) {
			console.log('Correct');
			setYouRight(true);
		} else {
			setYouRight(false);
		}
	};

	const handelSubmit = async () => {
		const updateCode = {
			...codeData,
			code: newCodeBlock,
		};
		console.log(updateCode, 'new');
		if (updateCode._id) {
			await updateCodeData(updateCode._id, updateCode);
			setNewCodeBlock('');
			setSubmitModal(false);
		}
	};
	const handelCancel = () => {
		setSubmitModal(false);
	};

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
			window.location.reload();
			if (!response.ok) {
				throw new Error(data.message);
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	return (
		<div className="subject-information">
			<div id="card-information">
				<div className="subject-title">{title}</div>
			</div>
			<div id="only-read-title">
				{readOnly ? 'Only Read' : 'Edit Your Code'}
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
						value={num}
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
			{youRight && <div id="correct-code"> CORRECT CODE!!!</div>}
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
