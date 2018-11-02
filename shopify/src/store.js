import { createStore, combineReducers } from "redux";

const TOGGLE_PROPERTY = "TOGGLE_PROPERTY";

export const toggleProperty = (name, value) => ({
  type: TOGGLE_PROPERTY,
  name,
  value
});

const properties = (state = [], action) => {
  if (action.type === TOGGLE_PROPERTY) {
    const { name, value } = action;
    return [
      ...state.filter(p => p.name !== name),
      {
        name,
        value
      }
    ];
  }

  return state;
};

const rootReducer = combineReducers({
  properties
});

const store = createStore(
  rootReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
