import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import config from "./config";

const CREATE_ORDER_RESPONSE = "CREATE_ORDER_RESPONSE";
export const createOrderResponse = order => ({
  type: CREATE_ORDER_RESPONSE,
  order
});

export const createOrder = body => dispatch => {
  axios
    .post(`https://${config[process.env.NODE_ENV].apiUrl}/api/orders`, body)
    .then(response => dispatch(createOrderResponse(response.data.order)))
    .catch(function(error) {
      console.log(error);
    });
};

const TOGGLE_PROPERTY = "TOGGLE_PROPERTY";
export const toggleProperty = (name, value) => ({
  type: TOGGLE_PROPERTY,
  name,
  value
});

const rootReducer = combineReducers({
  properties: (state = [], action) => {
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
  },
  order: (state = {}, action) => {
    if (action.type === CREATE_ORDER_RESPONSE) {
      return action.order;
    }

    return state;
  }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
        value: "iPhone"
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
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
