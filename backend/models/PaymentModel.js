const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Regular expression for validating email addresses
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PaymentSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    gmail: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return emailRegex.test(value); // Test if value matches the email regex
            },
            message: props => `${props.value} is not a valid email address!`
        }
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
    promo: {
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
    },
    Status: {
        type: String
    }
});

module.exports = mongoose.model("PaymentModel", PaymentSchema);
