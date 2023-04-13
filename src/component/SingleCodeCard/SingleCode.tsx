import React, { useEffect, useMemo, useState } from 'react';
import { ICodeBlock } from '../../store/slices/codeDatasSlice';
import { io } from 'socket.io-client';
import './SingleCodeCard.css';
import { Socket } from 'dgram';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// const socket = SocketIO.connect('http://localhost:3001');

const SingleCode: React.FC<ICodeBlock> = (props: ICodeBlock) => {
	const [data, setData] = useState('');
	const { title, code, _id } = props;
	const codeBlockData = useSelector(
		(state: RootState) => state.codeBlocks.value
	);
	const codeData: ICodeBlock | undefined = codeBlockData?.find(
		(subject: ICodeBlock) => {
			return subject._id?.toString() === _id;
		}
	);
	useEffect(() => {
		const socket = io('http://localhost:7000', {
			query: { data: codeData },
		});
		socket.connect();
		// socket.connected = true;
		console.log(socket);
		return () => {
			socket.disconnect();
		};
	}, [codeData]);

	const socket = io('http://localhost:7000/', { query: { data: codeData } });
	console.log(socket);

	const sendMessage = () => {
		console.log('message');
		socket.emit('send_message', { message: 'hello' });
	};

	return (
		<div>
			<input
				value={data}
				type={'text'}
			/>
			<button
				onClick={sendMessage}
				className="confirm-submit">
				Confirm
			</button>
		</div>
	);
};

export default SingleCode;
