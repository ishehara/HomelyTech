const express = require('express');
const mongoose = require('mongoose');


const offerRouter = require("./routes/offerRoutes");
const userrouter = require("./routes/UserRoutes");  //Insert user route
const registerRouter = require("./routes/RegisterRoutes"); // Import Register routes
const loginRouter = require("./routes/LoginRoutes"); //Import Login routes
const OtpRoutes = require("./routes/OtpRoutes"); //Import Login routes
const router = require("./routes/TimetableRoutes");
const Paymentrouter = require("./routes/PaymentRoutes");
const Refundrouter = require("./routes/refundRoutes");
const InventoryRouter = require("./routes/InventoryRoute");
const advertisementRouter = require("./routes/AdRoute");
const feedbackrouter = require("./routes/FeedbackRoutes");
const bookingRouter = require("./routes/BookingRoutes");
const sproviderRouter = require("./routes/SproviderRoutes");


const cors = require('cors');
const app  = express();


//middleware
app.use(express.json());
app.use(cors());
app.use("/offer", offerRouter);
app.use("/timetables",router);
app.use("/register", registerRouter); // Register routes
app.use("/login",loginRouter); //Login routes
app.use("/users",userrouter);
app.use("/validate-otp",OtpRoutes);
app.use("/payments",Paymentrouter);
app.use("/refund",Refundrouter);
app.use("/invetory",InventoryRouter);
app.use("/ads",advertisementRouter);
app.use("/feedbacks", feedbackrouter);

app.use("/bookings", bookingRouter);

app.use("/sproviders", sproviderRouter);// service provider routes



// db urls
const DB_URL = "mongodb+srv://mlislbest:e2maM0icBFO32HBu@clusterdemo.gzrv8dg.mongodb.net/"


// DB connection
mongoose.connect(DB_URL)
.then(() => console.log('Connected to DB'))
.catch((err) => console.log("Not connected to DB",err));






// Start the server on port 5000
app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });







