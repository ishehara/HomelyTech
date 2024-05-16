const express = require("express");
const router = express.Router();

//Insert Model
const User = require("../models/UserModel")

//Insert User Controller
const UserController = require("../controllers/UserControllers");
const SproviderController = require("../controllers/SproviderControllers")

router.post("/",UserController.RegisterUser);



//export
module.exports = router;