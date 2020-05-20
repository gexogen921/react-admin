import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {routerMiddleware, connectRouter} from 'connected-react-router';
import { adminReducer, USER_LOGOUT } from 'react-admin';

import todo from './todo';

export default ({ authProvider, dataProvider, history }) => {
    const reducer = combineReducers({
        admin: adminReducer,
        router: connectRouter(history),
        todo
    });

    const resettableAppReducer = (state, action) =>
        reducer(action.type !== USER_LOGOUT ? state : undefined, action);

    const composeEnhancers =
        (process.env.NODE_ENV === 'development' &&
            typeof window !== 'undefined' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                trace: true,
                traceLimit: 25,
            })) ||
        compose;

    return createStore(
        resettableAppReducer,
        {},
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
            ),
        ),
    );
};
