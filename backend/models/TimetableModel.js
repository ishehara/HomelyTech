const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timetableSchema = new Schema({  
    name:{
        type:String,
        required:true,
    },

    technicianId:{
        type:String,
        required:true,
    },

    phoneNo:{
        type:Number,
        required:true,
    },

    date:{
        type:Date,
        required:true,
    },
    
    time:{
        type:String,
        required:true,
    },

    address:{
        type:String,
        required:true,
    }

});

module.exports = mongoose.model(
    "TimetableModel",//file name
    timetableSchema//function name
)