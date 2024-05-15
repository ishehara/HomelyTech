
// refundRoutes.js
const express = require("express");
const router = express.Router();
const refundController = require("../controllers/refundControllers");

router.get("/", refundController.getAllRefund);
router.post("/", refundController.addRefund);
router.get("/:id", refundController.getById);
router.put("/:id", refundController.updateRefund);
router.delete("/:id", refundController.deleteRefund);


module.exports = router;
