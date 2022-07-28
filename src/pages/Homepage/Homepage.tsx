import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Homepage = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default Homepage;
