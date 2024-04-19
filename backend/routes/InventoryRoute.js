const express = require("express");
const router = express.Router();

//Insert Model
const Inventory = require("../models/InventoryModel");


//Insert controller
const InventoryController = require("../controllers/InventoryController");



router.get("/",InventoryController.getAllDetails);
router.post("/",InventoryController.addDetails);
router.get("/:id",InventoryController.getById);
router.put("/:id",InventoryController.updateDetails);
router.delete("/:id",InventoryController.deleteDetails);

//export
module.exports = router;