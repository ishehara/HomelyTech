const mongoose = require("mongoose");
const { all } = require("../routes/FeedbackRoutes");
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
    
    feedback:{
        type:String,//data type
        required:true,//validate
    },

    rating:{
         type:Number,
         required:true,

    },
    image: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model(
 "FeedbackModel",//file name
  feedbackSchema//function name
)