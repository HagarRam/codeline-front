import React, { useEffect, useState } from 'react';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import './SingleCodeCard.css';
import io, { Socket } from 'socket.io-client';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ObjectId } from 'mongoose';
import { DefaultEventsMap } from '@socket.io/component-emitter';
const CONNECTION_PORT = 'http://localhost:7000';

const SingleCodeCard: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	const [socket, setSocket] = useState<Socket<
		DefaultEventsMap,
		DefaultEventsMap
	> | null>(null);

	const data = useSelector((state: RootState) => state.codeBlocks.value);
	const { title, code, _id } = props;
	const [SubmitModal, setSubmitModal] = useState(false);
	const [codes, setCode] = useState('');
	const [messageList, setMessageList] = useState<string[]>([`${code}`]);
	const [newCodeBlock, setNewCodeBlock] = useState<any>(messageList);
	const [readOnly, setReadOnly] = useState(true);
	const codeData: ICodeBlock | undefined = data?.find((subject: ICodeBlock) => {
		return subject._id?.toString() === _id;
	});
	const codeDataStorageString: string | null = sessionStorage.getItem('Data');
	const codeDataStorage: ICodeBlock[] = codeDataStorageString
		? JSON.parse(codeDataStorageString)
		: [];
	const thisSubjectData: ICodeBlock | undefined = codeDataStorage.find(
		(subject: ICodeBlock) => {
			return subject._id?.toString() === _id;
		}
	);

	const newSocket = io(CONNECTION_PORT);
	useEffect(() => {
		newSocket.emit('join_Subject', codeData);
		newSocket.on('receive_message', function (data) {
			setNewCodeBlock(data);
		});
		newSocket.on('readOnly', (socketReadOnly) => {
			setReadOnly(socketReadOnly);
		});

		return () => {
			newSocket.off('receive_message');
		};
	}, []);

	useEffect(() => {
		setSocket(newSocket);
		newSocket.on('receive_message', (data) => {
			console.log('data', data);
			setNewCodeBlock(data);
		});
		return () => {
			newSocket.emit('user_disconnect', codeData);
			newSocket.disconnect();
		};
	}, [CONNECTION_PORT]);
	console.log(newCodeBlock);
	useEffect(() => {
		setReadOnly(false);
		newSocket.emit('join_Subject', codeData);
	}, [codeData]);

	const handelCodeBlockChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewCodeBlock(event.target.value);
		const updateCode = {
			...codeData,
			code: event.target.value,
		};

		newSocket.emit('new_code', updateCode);
		// newSocket.on('receive_message', function (data) {
		// 	setNewCodeBlock(data);
		// 	console.log(newCodeBlock, 'k');
		// });
	};

	const handelSubmit = async () => {
		const updateCode = {
			...codeData,
			code: newCodeBlock,
		};
		if (updateCode._id) {
			console.log(updateCode);
			// await updateCodeData(updateCode._id, updateCode);
		}
		setNewCodeBlock('');
		setSubmitModal(false);
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
			// window.location.reload();
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
