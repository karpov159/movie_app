import { NavLink, useNavigate } from 'react-router-dom';
import {
	BASE,
	MOVIES,
	ANIMATIONS,
	TVSHOWS,
	ACTORS,
} from '../../core/config/RoutesConfig';
import { ProfileIcon, SearchIcon, NotifyIcon } from '../Icons';

import logo from '../../assets/logo.svg';
import './Header.scss';

const Header = () => {
	const navigate = useNavigate();
	return (
		<header className='header'>
			<NavLink end to={BASE}>
				<img className='header__logo' src={logo} alt='logo' />
			</NavLink>

			<div className='header__menu'>
				<div className='header__link'>
					<NavLink end to={MOVIES}>
						Movies
					</NavLink>
				</div>
				<div className='header__link'>
					<NavLink end to={TVSHOWS}>
						TV shows
					</NavLink>
				</div>
				<div className='header__link'>
					<NavLink end to={ANIMATIONS}>
						Animations
					</NavLink>
				</div>
				<div className='header__link'>
					<NavLink end to={ACTORS}>
						Actors
					</NavLink>
				</div>
			</div>

			<div className='header__options'>
				<div className='header__option header__option-search'>
					<form className='form'>
						<input
							type='text'
							className='header__option-input'
							placeholder='Search'
						/>
						<button type='submit' className='header__option-btn'>
							<SearchIcon />
						</button>
					</form>
				</div>
				<button className='header__option'>
					<NotifyIcon />
				</button>
				<button className='header__option'>
					<ProfileIcon />
				</button>
			</div>
		</header>
	);
};

export default Header;
