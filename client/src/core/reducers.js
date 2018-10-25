import { combineReducers  } from 'redux'
import { router5Reducer } from 'redux-router5'

/*const get = () => ({
  [CALL_API]: {
    types: ['a', 'b', 'c'],
    endpoint: '/api',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
});*/

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

export default combineReducers({ router: router5Reducer, todos, counter })
