const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regiSchema = new Schema({
    name:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    },

    gmail:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    },

    password:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    }

});

module.exports = mongoose.model(
    "Register",  //file name
    regiSchema    //funtion name
    

)