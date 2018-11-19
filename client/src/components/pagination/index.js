import React from "react";
import { TablePagination } from "@material-ui/core";

const Pagination = props => {
  const updateParams = (params = {}) => {
    const { route, navigate } = props;
    navigate(route.name, { ...route.params, ...params });
  };

  const handleChangePage = (event, page) => {
    updateParams({ page: page });
  };

  const handleChangeRowsPerPage = event => {
    updateParams({ limit: event.target.value });
  };

  return (
    <TablePagination
      component="div"
      count={props.count || 0}
      rowsPerPage={props.rowsPerPage || props.limit || 0}
      page={props.page || 0}
      backIconButtonProps={{
        "aria-label": "Forrige Side"
      }}
      labelRowsPerPage="Rækker per side:"
      nextIconButtonProps={{
        "aria-label": "Næste side"
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
