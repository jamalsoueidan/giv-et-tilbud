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
      const order = action.order;
      if (!order.offers) order.offers = [];
      return order;
    }
    return state;
  }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {
    order: {
      id: 713046851695,
      location: {
        type: "Point",
        coordinates: [10.109578, 56.164199]
      },
      email: "Hw2002@gmail.com",
      created_at: "2018-11-10T19:24:09.000Z",
      phone: "+4531317428",
      fulfillment_status: null,
      line_items: [
        {
          _id: "5be7305a2fb8e300163e884a",
          properties: [
            {
              _id: "5be7305a2fb8e300163e884f",
              name: "device",
              value: "iPhone"
            },
            {
              _id: "5be7305a2fb8e300163e884e",
              name: "model",
              value: "8"
            },
            {
              _id: "5be7305a2fb8e300163e884d",
              name: "color",
              value: "silver"
            },
            {
              _id: "5be7305a2fb8e300163e884c",
              name: "issue",
              value: "won't turn on"
            },
            {
              _id: "5be7305a2fb8e300163e884b",
              name: "datetime",
              value: "2018-11-11T12:23:40+01:00"
            }
          ]
        }
      ],
      shipping_address: {
        address1: "Edwin Rahrs Vej 75,",
        city: "Brabrand",
        zip: 8220
      },
      customer: {
        id: 853797797999,
        first_name: "Ahmad",
        last_name: "Scandae"
      },
      offers: [
        {
          _id: "5be85e9d76bb31bb98f103f5",
          customer_id: 863695208559,
          distance: "2,2 km",
          duration: "4 min.",
          order_id: 713046851695,
          workshop_id: "5be05103fce7045d08e63ddd",
          __v: 0,
          created_at: "2018-11-11T16:53:50.670Z",
          properties: [
            {
              _id: "5be85e9e1ca17a67947049ac",
              name: "message",
              value: "jadsmadsadsjoi"
            },
            {
              _id: "5be85e9e1ca17a67947049ab",
              name: "price",
              value: "10000"
            }
          ],
          workshop: {
            location: {
              type: "Point",
              coordinates: [10.1057, 56.1531]
            },
            _id: "5be05103fce7045d08e63ddd",
            name: "Jamal Soueidan",
            address: "Edwin Rahrsvej 75",
            zip: 8220,
            city: "Brabrand",
            email: "info@vandpibesalg.dk",
            phone: 31317428,
            created_at: "2018-11-05T14:17:39.950Z"
          }
        },
        {
          _id: "5be85f3576bb31bb98f10964",
          customer_id: 897323171951,
          distance: "7,3 km",
          duration: "15 min.",
          order_id: 713046851695,
          workshop_id: "5be85f281ca17a67947049ad",
          __v: 0,
          created_at: "2018-11-11T16:56:22.754Z",
          properties: [
            {
              _id: "5be85f361ca17a67947049af",
              name: "message",
              value: "okay du får et bud"
            },
            {
              _id: "5be85f361ca17a67947049ae",
              name: "price",
              value: "3000"
            }
          ],
          workshop: {
            location: {
              type: "Point",
              coordinates: [10.2060334, 56.1536379]
            },
            _id: "5be85f281ca17a67947049ad",
            name: "Teledoktor",
            address: "Søndergade 51",
            zip: 8000,
            city: "Aarhus",
            email: "info@teledokrtor.dk",
            phone: 31317428,
            created_at: "2018-11-11T16:56:08.690Z"
          }
        }
      ]
    }
  },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
