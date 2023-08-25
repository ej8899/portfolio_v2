import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.scss';

/* 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
*/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
