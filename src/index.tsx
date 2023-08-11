import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.scss';
import globalconfig from './config';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
