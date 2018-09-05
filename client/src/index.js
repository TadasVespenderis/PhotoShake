import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import queriesReducer from './reducers/queriesReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers ({
    queries: queriesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    ,document.getElementById('root'));
registerServiceWorker();


