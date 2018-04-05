import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './store';
import { App } from './containers/App';
import { Callback } from './components/Callback'
import {initialState} from './containers/Map/reducers';
import { RouterToUrlQuery } from 'react-url-query';
import createBrowserHistory from 'history/createBrowserHistory';

const store = configureStore(initialState);
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
   <BrowserRouter history={history}>
    <div>
        <Route path="/:lat/:lon/:zoom/" render={(props) => {
          var username = localStorage.getItem('username');
          var layers = localStorage.getItem('layers');
          return <App {...props} username={username} layers={layers}/>
        }} />
        <Redirect from="/logout" to="/15/0/2/" />
    </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
