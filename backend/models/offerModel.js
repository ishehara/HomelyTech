const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  offerSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    persentage:{
        type: Number,
        required: true
    },
    promoCode:{
        type: String,
        required: true
    },
    startDate:{ 
        type: Date,
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    }
    // image:{
    //     type: Buffer,
    //     required: true
    // }

})

module.exports = mongoose.model('Offers', offerSchema);