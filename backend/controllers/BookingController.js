const Booking = require("../models/BookingModel");

// Create a new booking
const createBooking = async (req, res, next) => {
  const {
    customerName,
    serviceProviderName,
    serviceProviderId,
    serviceType,
    appointmentDate,
    appointmentTime,
    address,
    request,
    hourlyRate
  } = req.body;

  const booking = new Booking({
    customerName,
    serviceProviderName,
    serviceProviderId,
    serviceType,
    appointmentDate,
    appointmentTime,
    address,
    request,
    hourlyRate
  });

  try {
    await booking.save();
    return res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error saving booking" });
  }
};

// Get all bookings
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    return res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching bookings" });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res, next) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching booking" });
  }
};

// Update a booking
const updateBooking = async (req, res, next) => {
  const bookingId = req.params.id;
  const {
    customerName,
    serviceProviderName,
    serviceProviderId,
    serviceType,
    appointmentDate,
    appointmentTime,
    address,
    request,
    hourlyRate
  } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        customerName,
        serviceProviderName,
        serviceProviderId,
        serviceType,
        appointmentDate,
        appointmentTime,
        address,
        request,
        hourlyRate
      },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Unable to update booking" });
    }
    return res.status(200).json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating booking" });
  }
};

// Delete a booking
const deleteBooking = async (req, res, next) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Unable to delete booking" });
    }
    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting booking" });
  }
};

// View a single booking by ID (for users)
const viewBooking = async (req, res, next) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId)
      .populate("serviceProviderId", "name email")
      .exec();
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching booking" });
  }
};

exports.createBooking = createBooking;
exports.getAllBookings = getAllBookings;
exports.getBookingById = getBookingById;
exports.updateBooking = updateBooking;
exports.deleteBooking = deleteBooking;
exports.viewBooking = viewBooking;
