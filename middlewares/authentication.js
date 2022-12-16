const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { AppError } = require("../helpers/utils");
const authMiddleware = {};


authMiddleware.loginRequired = (req, res, next) => {
  try {
    //unpack tokenString from request headers
    const tokenString = req.headers.authorization;

    // validate token
    if (!tokenString)
      return next(new AppError(401, "Login required", "Authentication Error"));
    
    
    const token = tokenString.replace("Bearer ", ""); // clean up string 

    // Verify 
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return next(new AppError(401, "Token expired", "Authentication Error"));
        } else {
          return next(
            new AppError(401, "Token is invalid", "Authentication Error")
          );
        }
      }
      req.userId = payload._id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;