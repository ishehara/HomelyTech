const express = require("express");
const router = express.Router();
//Insert Model
const Sprovider = require("../models/SproviderModel");
//Insert Controller
const SproviderController = require("../controllers/SproviderControllers");

router.get("/",SproviderController.getAllSproviders);
router.post("/",SproviderController.addSproviders);
router.get("/:id",SproviderController.getById);
router.put("/:id",SproviderController.updateSprovider);
router.delete("/:id",SproviderController.deleteSprovider);

// Route for service provider login
router.post("/login", SproviderController.serviceProviderLogin);



//export
module.exports = router;