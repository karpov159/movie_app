import { useEffect } from 'react';
import { changeShowedMessage } from '../../core/store/MoviesSlice';
import { useAppDispatch } from '../../core/store';

import './AddMessage.scss';

interface MessageInfo {
	message: string;
}

const AddMessage = ({ message }: MessageInfo) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const messageTimeout = setTimeout(() => {
			dispatch(changeShowedMessage(false));
		}, 3000);

		return () => {
			clearTimeout(messageTimeout);
		};
	}, [dispatch]);

	return <div className='add-message'>{message}</div>;
};

export default AddMessage;
