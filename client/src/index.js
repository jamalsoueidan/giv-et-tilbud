import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers  } from 'redux'
import { apiMiddleware } from 'redux-api-middleware';
import { CALL_API } from 'redux-api-middleware';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const get = () => ({
  [CALL_API]: {
    types: ['a', 'b', 'c'],
    endpoint: '/api',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
});

function todos(state = [], action) {
  console.log(action)
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const reducer = combineReducers({ todos, counter })
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer)

console.log(store.getState())

store.dispatch(get())

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
