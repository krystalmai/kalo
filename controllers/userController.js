const userController = {};
const { sendResponse, AppError, catchAsync } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

userController.register = catchAsync(async (req, res, next) => {
  //Get data from request
  let { name, email, password } = req.body;
  //Business Logic Validation
  let user = await User.findOne({ email });
  if (user) throw new AppError(409, "Register Error", "User already exists");

  // Hash password with bcrypt
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
 
  user = await User.create({ name, email, password });

  //create accessToken after register success
  const accessToken = user.generateToken()
  //Response
  sendResponse(res, 200, true, { user, accessToken }, null, "Create user successful");
});
//============GET CURRENT USER=============
userController.getCurrentUser = catchAsync(async (req, res, next) => {})
//============GET USERS=============
userController.getUsers = catchAsync(async (req, res, next) => {})
//============GET USER BY ID=============
userController.getSingleUser = catchAsync(async (req, res, next) => {})
//============UPDATE PROFILE=============
userController.updateProfile = catchAsync(async (req, res, next) => {})
module.exports = userController;
