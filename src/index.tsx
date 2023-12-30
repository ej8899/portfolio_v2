import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.scss';
import { ModalManager } from './components/modal/ModalManager';

/* 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
*/
// TODO see above - turn strictmode back on

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ModalManager>
    <App />
  </ModalManager>,
);
