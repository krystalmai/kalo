const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authentication");
const userController = require("../controllers/userController");
const validators = require("../middlewares/validators");
const { body, param } = require("express-validator");

/**
 * @route POST /users
 * @description Register new user
 * @access Public
 * @body {name, email, password}
 */
router.post(
  "/",
  //validator middleware to handle error before going into controller
  validators.validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  userController.register
);

/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */
router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser);


//=========================

/**
 * @route GET /users?page=1&limit=10
 * @description Get users with pagination
 * @access Login required
 */
router.get("/", authMiddleware.loginRequired, userController.getUsers);



/**
 * @route GET /users/:id
 * @description Get a user profile
 * @access Login required
 */
// router.get(
//   "/:id",
//   // authMiddleware.loginRequired,
//   // validators.validate([
//   //   param("id").exists().isString().custom(validators.checkObjectId),
//   // ]),
//   userController.getSingleUser
// );

/**
 * @route PUT /users/:id
 * @description Update user profile
 * @access Login required
 * @body {avatarUrl, goal:{calories, protein, carbs, fat}}
 */
// router.put("/:id", authMiddleware.loginRequired, userController.updateProfile);

module.exports = router;
