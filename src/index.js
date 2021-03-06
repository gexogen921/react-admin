import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createHashHistory} from 'history';
import './index.scss';
import App from './components/main/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers'

import auth from './auth';
import dataProvider from './components/routes';

const history = createHashHistory();

ReactDOM.render(
    <React.StrictMode>
        <Provider
            store={rootReducer({
                authProvider: auth,
                dataProvider,
                history,
            })}
        >
            <App authProvider={auth} dataProvider={dataProvider} history={history}/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
