const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  customerName: {
    type: String,
    required: true
  },
  serviceProviderName: {
    type: String,
    required: true
  },
  serviceProviderId: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: String,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  request: {
    type: String,
    required: false
  },
  hourlyRate: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("BookingModel", bookingSchema);