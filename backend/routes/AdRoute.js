const express = require("express");
const router = express.Router();
//Insert Model
const User = require("../models/AdModel");
//Insert Ad Controller
const AdController = require("../controllers/AdController");

router.get("/",AdController.getAllAds);
router.post("/",AdController.addAds);
router.get("/:id",AdController.getById);
router.put("/:id",AdController.updateAd);
router.delete("/:id",AdController.deleteAd);



//export
module.exports = router;