const express = require('express');
const mongoose = require('mongoose');


const offerRouter = require("./routes/offerRoutes");
const router = require("./routes/TimetableRoutes");
const Paymentrouter = require("./routes/PaymentRoutes");
const Refundrouter = require("./routes/refundRoutes");

const InventoryRouter = require("./routes/InventoryRoute");

const advertisementRouter = require("./routes/AdRoute");

const app  = express();
const cors = require('cors');


//middleware
app.use(express.json());
app.use(cors());
app.use("/offer", offerRouter);
app.use("/timetables",router);
app.use("/payments",Paymentrouter);
app.use("/refund",Refundrouter);

app.use("/invetory",InventoryRouter);


app.use("/ads",advertisementRouter);



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



