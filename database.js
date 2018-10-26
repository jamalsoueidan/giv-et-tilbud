var mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(
    `mongodb://${process.env.MONGODB_URI}`,
    { useNewUrlParser: true }
  );
  return mongoose;
};
