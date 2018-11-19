import { RSAA } from "redux-api-middleware";

export const LOAD_USERS_REQUEST = "@@orders/LOAD_USERS_REQUEST";
export const LOAD_USERS_SUCCESS = "@@orders/LOAD_USERS_SUCCESS";
export const LOAD_USERS_FAILURE = "@@orders/LOAD_USERS_FAILURE";

export const loadUsers = (options = {}) => {
  const workshopId = options.workshopId;
  const page = options.page || 0;
  const limit = options.limit || 5;
  const search = options.search || "";

  return {
    [RSAA]: {
      types: [LOAD_USERS_REQUEST, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE],
      endpoint: `/api/admin/users?page=${page}&limit=${limit}&search=${search}}`,
      method: "GET"
    }
  };
};
