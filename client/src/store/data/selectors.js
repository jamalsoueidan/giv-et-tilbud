import { createSelector } from "reselect";
import * as R from "ramda";

const getData = state => state.data;
const getUser = state => state.user;

const findWorkshop = id => R.find(R.propEq("_id", id));

export const getSelectedWorkshop = createSelector(
  getData,
  getUser,
  (data, user) => {
    if (R.isNil(data.selectedWorkshopId)) {
      return user.workshops[0];
    } else {
      return findWorkshop(data.selectedWorkshopId)(user.workshops);
    }
  }
);
