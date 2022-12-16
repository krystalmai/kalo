var express = require('express');
var router = express.Router();

const userRouter = require('./user.api')


router.use('/users', userRouter)

module.exports = router;
