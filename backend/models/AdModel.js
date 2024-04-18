const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adSchema = new Schema({
    adTitle:{
        type:String, //dataType
        required:true, //validate
        maxlength: 100
    },
    serviceType:{
        type:String, //dataType
        required:true, //validate
    },
    reqDate:{
        type:String, //dataType
        required:true, //validate
    },
    noOfDays:{
        type:Number, //dataType
        required:true, //validate
    },
    area:{
        type:String, //dataType
        required:true, //validate
    },
    adDescription:{
        type:String, //dataType
        required:true, //validate
        maxlength: 500
    },
    contactNumber:{
        type:String, //dataType
        required:true, //validate
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Validates if it's a 10-digit number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email:{
        type:String, //dataType
        required:true, //validate
        maxlength: 100,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validates email format
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    date:{
        type:Date, //dataType
        default:Date.now
    }
});

module.exports = mongoose.model(
    "AdModel", //file name
    adSchema //function name
)