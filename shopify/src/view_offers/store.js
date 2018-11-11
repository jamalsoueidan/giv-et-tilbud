import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import config from "../config";

const GET_ORDER_RESPONSE = "GET_ORDER_RESPONSE";
export const getOrderResponse = order => ({
  type: GET_ORDER_RESPONSE,
  order
});

export const getOrder = (options = {}) => dispatch => {
  axios
    .get(
      `https://${config[process.env.NODE_ENV].apiUrl}/api/offers?token=${
        options.token
      }&key=${options.key}`
    )
    .then(response => dispatch(getOrderResponse(response.data)))
    .catch(function(error) {
      console.log(error);
    });
};

const rootReducer = combineReducers({
  order: (state = {}, action) => {
    if (action.type === GET_ORDER_RESPONSE) {
      return action.order;
    }
    return state;
  }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
