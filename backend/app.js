const express = require('express');
const mongoose = require('mongoose');


const offerRouter = require("./routes/offerRoutes");
const router = require("./routes/TimetableRoutes");

const app  = express();

//middleware
app.use(express.json());
app.use("/offer", offerRouter);
app.use("/timetables",router);



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



