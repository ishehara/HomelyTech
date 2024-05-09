const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sproviderSchema = new Schema({

    username:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    },

    gmail:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    },

    fullname:{                     //Input data 
        type:String,           //dataType
        required:true,         //validate
    },

    password:{                     //Input data 
        type:String,               //dataType
        required:true,             //validate
    },

    phonenumber:{                     //Input data 
        type:Number,                 //dataType
        required:true,               //validate
    },

    servicetype:{                     //Input data 
        type:String,                  //dataType
        required:true,                //validate
    },

    serviceareas:{                     //Input data 
        type:String,                  //dataType
        required:true,                //validate
    },

    //Add userLevel field
    userLevel:{
        type:String,
        default:'service provider'  //Default value as 'service provider'
    }
});

module.exports = mongoose.model(
    "SproviderModel",  //file name
    sproviderSchema    //funtion name
    

)