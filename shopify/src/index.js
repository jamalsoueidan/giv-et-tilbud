import "moment/locale/da";

const createOrder = document.getElementById("create_order");
if (createOrder) {
  import("./create_order").then(module => module.default(createOrder));
}

const viewOffers = document.getElementById("view_offers");
if (viewOffers) {
  import("./view_offers").then(module => module.default(viewOffers));
}
