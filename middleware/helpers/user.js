const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const NOT_AUTHORIZED = "not authorized";
const NO_TOKEN_NOT_AUTHORIZED = "not authorized, no token";

async function getUser(req) {
  // tikrina ar yra authorizacija su pradzia Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // tikrina ar yra tokenas
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return { status: 401, response: NO_TOKEN_NOT_AUTHORIZED };
      }
      // atsikoduojam tokena
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // kad nerodytu passwordo
      const user = await User.findById(decoded.id).select("-password");

      // viskas ok grazina useri
      return { status: 200, response: user };
    } catch (err) {
      console.log(err);
      return { status: 401, response: NOT_AUTHORIZED };
    }
  }

  return { status: 401, response: NOT_AUTHORIZED };
}

module.exports = { getUser, notAuthorizedMessage: NOT_AUTHORIZED };
