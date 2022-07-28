import ReactDOM from 'react-dom/client';
import App from './components/App/App';

import './style/index.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(<App />);
