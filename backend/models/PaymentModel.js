const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
   
    

    gmail: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    Phone: {
        type: Number,
        required: true
    },

    ServiceType: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    PaymentSlip: {
        type: String,
        required: true
    }


   
});

module.exports = mongoose.model(
    "PaymentModel", //file name
    PaymentSchema //function name
)