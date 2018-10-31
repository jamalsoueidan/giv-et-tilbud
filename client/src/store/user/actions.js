import { RSAA } from "redux-api-middleware";

export const LOGIN_REQUEST = "@@user/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "@@user/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "@@user/LOGIN_FAILURE";

export const IS_AUTHENTICATED_REQUEST = "@@user/IS_AUTHENTICATED_REQUEST";
export const IS_AUTHENTICATED_SUCCESS = "@@user/IS_AUTHENTICATED_SUCCESS";
export const IS_AUTHENTICATED_FAILURE = "@@user/IS_AUTHENTICATED_FAILURE";

export const LOGOUT_REQUEST = "@@user/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "@@user/LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "@@user/LOGOUT_FAILURE";

const login = (email, password) => ({
  [RSAA]: {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    endpoint: "/api/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password
    })
  }
});

const isAuthenticated = token => ({
  [RSAA]: {
    types: [
      IS_AUTHENTICATED_REQUEST,
      IS_AUTHENTICATED_SUCCESS,
      IS_AUTHENTICATED_FAILURE
    ],
    endpoint: "/api/isAuthenticated",
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  }
});

const logout = () => ({
  [RSAA]: {
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    endpoint: "/api/logout",
    method: "GET"
  }
});

export { login, isAuthenticated, logout };
