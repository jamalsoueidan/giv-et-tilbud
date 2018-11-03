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
  {
    /*properties: [
      {
        name: "zip",
        value: "8220"
      },
      {
        name: "device",
        value: "iphone"
      },
      {
        name: "model",
        value: "8"
      },
      {
        name: "color",
        value: "gold"
      },
      {
        name: "issue",
        value: "battery"
      },
      {
        name: "datetime",
        value: "2018-11-05T15:00:00+01:00"
      },
      {
        name: "customer",
        value: {
          first_name: "jamal",
          last_name: "soueidan",
          email: "asd@gmail.com",
          phone: "86 34 56 78",
          address: "dortesvej 21 1 th"
        }
      }
    ]*/
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
