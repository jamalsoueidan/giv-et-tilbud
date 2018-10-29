import { RSAA } from "redux-api-middleware";

export const LOGIN_REQUEST = "@@user/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "@@user/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "@@user/LOGIN_FAILURE";

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

export { login };
