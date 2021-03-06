import { RSAA } from "redux-api-middleware";

export const LOAD_USERS_REQUEST = "@@orders/LOAD_USERS_REQUEST";
export const LOAD_USERS_SUCCESS = "@@orders/LOAD_USERS_SUCCESS";
export const LOAD_USERS_FAILURE = "@@orders/LOAD_USERS_FAILURE";

export const loadUsers = (options = {}) => {
  const page = options.page || 0;
  const limit = options.limit || 5;
  return {
    [RSAA]: {
      types: [LOAD_USERS_REQUEST, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE],
      endpoint: `/api/admin/users?page=${page}&limit=${limit}`,
      method: "GET"
    }
  };
};

export const LOAD_USER_REQUEST = "@@orders/LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "@@orders/LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "@@orders/LOAD_USER_FAILURE";

export const loadById = user_id => {
  return {
    [RSAA]: {
      types: [LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE],
      endpoint: `/api/admin/users/${user_id}`,
      method: "GET"
    }
  };
};
