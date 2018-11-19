import { RSAA } from "redux-api-middleware";

export const LOAD_WORKSHOPS_REQUEST = "@@workshops/LOAD_WORKSHOPS_REQUEST";
export const LOAD_WORKSHOPS_SUCCESS = "@@workshops/LOAD_WORKSHOPS_SUCCESS";
export const LOAD_WORKSHOPS_FAILURE = "@@workshops/LOAD_WORKSHOPS_FAILURE";

export const loadWorkshops = (options = {}) => {
  const page = options.page || 0;
  const limit = options.limit || 5;
  const search = options.search || "";

  return {
    [RSAA]: {
      types: [
        LOAD_WORKSHOPS_REQUEST,
        LOAD_WORKSHOPS_SUCCESS,
        LOAD_WORKSHOPS_FAILURE
      ],
      endpoint: `/api/admin/workshops?page=${page}&limit=${limit}&search=${search}`,
      method: "GET"
    }
  };
};

export const LOAD_BY_ID_REQUEST = "@@workshops/LOAD_BY_ID_REQUEST";
export const LOAD_BY_ID_SUCCESS = "@@workshops/LOAD_BY_ID_SUCCESS";
export const LOAD_BY_ID_FAILURE = "@@workshops/LOAD_BY_ID_FAILURE";

export const loadById = (options = {}) => {
  return {
    [RSAA]: {
      types: [LOAD_BY_ID_REQUEST, LOAD_BY_ID_SUCCESS, LOAD_BY_ID_FAILURE],
      endpoint: `/api/admin/workshops/${options.id}?page=${
        options.page
      }&limit=${options.limit}`,
      method: "GET"
    }
  };
};
