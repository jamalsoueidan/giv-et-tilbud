const schema = require("./schema");
const mongoose = require("mongoose");
const model = mongoose.model("Order", schema);

module.exports = model;
