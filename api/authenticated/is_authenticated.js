const JWT = require("jsonwebtoken");
const User = require("../../models/user");

module.exports = async (req, h) => {
  const token = req.headers["authorization"].split(" ")[1];
  const credentials = JWT.verify(token, process.env.SECRET_KEY);

  const user = await User.findOne({ _id: credentials.id });

  return {
    ...credentials,
    workshops: user.workshops,
    token
  };
};
