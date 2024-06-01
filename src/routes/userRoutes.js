const express = require("express");
const router = express.Router();
const userController = require('../contoller/userController');


router.post('/sign',userController.createUser)

router.post('/login', userController.loginUser);
    


module.exports = router;