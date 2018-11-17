import moment from "moment";

export default ({ datetime }) => {
  return moment(datetime).format("Do MMMM  YYYY, H:mm:ss");
};
