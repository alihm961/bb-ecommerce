import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';
import App from './App';
// import { QueueProvider } from './context/QueueContext';
import './styles/globals.css';
import './styles/variables.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <BrowserRouter>
        {/* <QueueProvider> */}
          <App />
        {/* </QueueProvider> */}
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);
