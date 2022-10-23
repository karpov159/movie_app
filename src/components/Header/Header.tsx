import { NavLink } from 'react-router-dom';
import {
	BASE,
	MOVIES,
	ANIMATIONS,
	TVSHOWS,
	ACTORS,
} from '../../core/config/RoutesConfig';
import { ProfileIcon, SearchIcon, NotifyIcon } from '../Icons';
import { useAppDispatch, useAppSelector } from '../../core/store';
import {
	setActiveGenre,
	changeCurrentPage,
	changeCurrentTab,
	changeSearchField,
} from '../../core/store/MoviesSlice';
import { ChangeEvent } from 'react';

import logo from '../../assets/logo.svg';
import './Header.scss';

interface Tabs {
	name: string;
	path: string;
}

const Header = () => {
	const dispatch = useAppDispatch();
	const currentTab = useAppSelector((state) => state.movies.currentTab);
	const searchField = useAppSelector((state) => state.movies.searchField);

	const handleClick = (tabName: string) => {
		dispatch(setActiveGenre({ name: '', num: null }));
		dispatch(changeCurrentPage(1));
		dispatch(changeCurrentTab(tabName));
		dispatch(changeSearchField(''));
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeSearchField(e.target.value));
	};

	const tabsData: Tabs[] = [
		{
			name: 'Movies',
			path: MOVIES.PATH,
		},
		{
			name: 'TV shows',
			path: TVSHOWS.PATH,
		},
		{
			name: 'Animations',
			path: ANIMATIONS.PATH,
		},
		{
			name: 'Actors',
			path: ACTORS.PATH,
		},
	];

	const createTabs = (tabs: Tabs[]) => {
		return tabs.map((tab) => {
			const classes =
				currentTab === tab.name
					? 'header__link header__link_active'
					: 'header__link';

			return (
				<div key={tab.name} className={classes}>
					<NavLink
						onClick={() => handleClick(tab.name)}
						end
						to={tab.path}>
						{tab.name}
					</NavLink>
				</div>
			);
		});
	};

	const tabs = createTabs(tabsData);

	return (
		<header className='header'>
			<NavLink onClick={() => handleClick('')} end to={BASE.PATH}>
				<img className='header__logo' src={logo} alt='logo' />
			</NavLink>

			<div className='header__menu'>{tabs}</div>

			<div className='header__options'>
				<div className='header__option header__option-search'>
					<form className='form'>
						<input
							onChange={handleChange}
							value={searchField}
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
