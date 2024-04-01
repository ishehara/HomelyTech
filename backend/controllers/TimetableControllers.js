const Timetable = require("../model/TimetableModel");
//data display
const getAllTimetables = async(req, res, next) => {
    let Timetables;
    //get all timetables
    try{
        timetables = await Timetable.find();
    }catch (err){
        console.log(err);
    }
    //not found
    if(!timetables){
        return res.status(404).json({message:"Timetable not found"});
    } 
    //Display all timetables
    return res.status(200).json({ timetables });
};


//data insert
const addTimetables = async(req, res, next) => {

    const{ name, technicianId, phoneNo, date, time, address } = req.body;
    
    let timetables;
    try {
        timetables = new Timetable({name, technicianId, phoneNo, date, time, address});
        await timetables.save();
    } catch (error) {
        console.log(err);
    }
    //not insert users
    if(!timetables){
        return res.status(404).json({message: "unable to add timetables"});
    }
    return res.status(200).json({ timetables });
};

//get by Id/one
const getById = async (req, res, next) =>{

    const technicianId = req.params.technicianId;

    let timetables;

    try {
        timetables = await Timetable.findOne({technicianId:technicianId})
    } catch (err) {
        console.log(err);
    }
    //not available timetables
    if(!timetables){
        return res.status(404).json({message: "Timetable Not Found"});
    }
    return res.status(200).json({ timetables });
};
//update timetable details
const updateTimetable = async (req, res, next) =>{
    const technicianId = req.params.technicianId;
    const{ name, phoneNo, date, time, address } = req.body;

    let timetables;

    try {
        timetables = await Timetable.findOneAndUpdate(
            { technicianId: technicianId }, // Find timetable by technicianId
            { name, phoneNo, date, time, address }, // Updated values
            { new: true } // Return the updated document
        );
        
    } catch (err) {
        console.log(err);
    }
    //not available timetables
    if(!timetables){
        return res.status(404).json({message: "Unable to update timetable details"});
    }
    return res.status(200).json({ timetables });
};

//Delete timetable details
const deleteTimtable = async(req, res, next) => {
    const technicianId = req.params.technicianId;

    let timetables;

    try {
        timetables = await Timetable.findOneAndDelete({ technicianId: technicianId })
    } catch (err) {
        console.log(err);
    }
    if(!timetables){
        return res.status(404).json({message: "Unable to delete timetable details"});
    }
    return res.status(200).json({ timetables });
};

exports.getAllTimetables = getAllTimetables;
exports.addTimetables = addTimetables;
exports.getById = getById;
exports.updateTimetable = updateTimetable;
exports.deleteTimtable = deleteTimtable;