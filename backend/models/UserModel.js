const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{                     //Input data 
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
    },

    fullname:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    },

    address:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    },

    //Add userLevel field
    userLevel:{
        type:String,
        default:'normal'  //Default value as 'normal'
    }
});

module.exports = mongoose.model(
    "UserModel",  //file name
    userSchema    //funtion name
    

)