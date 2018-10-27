var mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(
    `mongodb://${process.env.MONGODB_URI}`,
    { useCreateIndex: true, useNewUrlParser: true }
  );
  return mongoose;
};
