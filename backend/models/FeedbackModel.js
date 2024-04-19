const mongoose = require('mongoose');
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

 
      
});

module.exports = mongoose.model(
 "FeedbackModel",//file name
  feedbackSchema//function name
)