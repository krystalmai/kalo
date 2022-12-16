const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {

  //Get data from request
  const { email, password } = req.body;

  //Business Logic Validation
  const user = await User.findOne({ email }, "+password");
  if (!user) return next(new AppError(400, "Invalid credentials", "Login Error"));

  
  //Process
  const isMatch = await bcrypt.compare(password, user.password); //check if pasword matches
  if (!isMatch) return next(new AppError(400, "Wrong password", "Login Error"));


  accessToken = await user.generateToken();

  //Response 
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Login successful"
  );
});

module.exports = authController;