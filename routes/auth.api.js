const express = require('express')
const router = express.router
const authController = require('../controllers/authController')
const validators = require("../middlewares/validators");
const { body, param } = require("express-validator");
/**
 * @route POST /auth/login
 * @description Log in with email and password
 * @body {email, password}
 * @acces Public
 */
router.post("/login",
validators.validate([
  body("email", "Invalid email")
    .exists()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }),
  body("password", "Invalid password").exists().notEmpty(),
]),
 authController.loginWithEmail)

module.exports = router