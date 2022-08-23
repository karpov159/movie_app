import { IMG_PATH } from '../../../helpers/constants';
import './ActorCard.scss';

interface ActorInfo {
	name: string;
	profile_path: string;
}

const ActorCard = ({ name, profile_path }: ActorInfo) => {
	return (
		<div className='actor'>
			<div className='actor__preview'>
				<img
					src={IMG_PATH + profile_path}
					alt={name}
					className='actor__preview-img'
				/>
				<div className='actor__preview-title'>{name}</div>
			</div>
		</div>
	);
};

export default ActorCard;
