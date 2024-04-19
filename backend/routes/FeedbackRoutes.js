const express = require("express");
const router = express.Router();
//Insert Modle

const Feedback = require("../models/FeedbackModel");
//Insert Feedback Controller 
const FeedbackController = require("../controllers/FeedbackControllers");

router.get("/",FeedbackController.getAllFeedbacks);
router.post("/",FeedbackController.addFeedbacks);
router.get("/:id",FeedbackController.getById);
router.put("/:id",FeedbackController.updateFeedback);
router.delete("/:id",FeedbackController.deleteFeedback);
//export
module.exports = router;