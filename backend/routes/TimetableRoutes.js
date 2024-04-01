const express = require("express");
const router = express.Router();
//Insert Model
const Timetable = require("../Model/TimetableModel");
//Insert Timetable Controller
const TimetableController = require("../Controllers/TimetableControllers");

router.get("/",TimetableController.getAllTimetables);
router.post("/",TimetableController.addTimetables);
router.get("/:technicianId",TimetableController.getById);
router.put("/:technicianId",TimetableController.updateTimetable);
router.delete("/:technicianId",TimetableController.deleteTimtable);

module.exports = router;