import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import './css/global.scss';
import route from './router';
import store from './store';

ReactDOM.render(
  // <App />,
  // document.getElementById('root') as HTMLElement
  <Provider store={store}>
    {route}
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
