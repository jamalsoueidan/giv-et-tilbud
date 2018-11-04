const JWT = require("jsonwebtoken");

module.exports = async (req, h) => {
  const token = req.headers["authorization"].split(" ")[1];
  const decoded = JWT.verify(token, process.env.SECRET_KEY);
  return {
    ...decoded,
    token
  };
};
