import Routes from '../../core/routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

function App() {
	return (
		<Router>
			<div className='App'>
				<Routes />
			</div>
		</Router>
	);
}

export default App;
