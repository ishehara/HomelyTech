const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    },

    gmail:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    },

    age:{                     //Input data 
        type:Number,           //dataType
        required:true,         //validate
    },

    address:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    }

});

module.exports = mongoose.model(
    "UserModel",  //file name
    userSchema    //funtion name
    

)