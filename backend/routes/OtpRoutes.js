const express = require("express");
const router = express.Router();
// mongoose = require("mongoose");
//const User = mongoose.model("Register");


//Insert Model
const User = require("../models/UserModel")

//Insert User Controller
const UserController = require("../controllers/UserControllers");

// Route for validating OTP
router.post("/", UserController.validateOTP);



//export
module.exports = router;