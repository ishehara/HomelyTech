const express = require("express");
const router = express.Router();

const Payment = require("../models/PaymentModel"); //insert model
const PaymentController = require("../controllers/PaymentControllers") ;//insert Controllers


router.get("/",PaymentController.getAllPayments);
router.post("/",PaymentController.addPayments);
router.get("/:id",PaymentController.getById);
router.put("/:id",PaymentController.updatePayment);
router.delete("/:id",PaymentController.deletePayment);

//export
module.exports = router;