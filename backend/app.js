const express = require('express');
const mongoose = require('mongoose');


const offerRouter = require("./routes/offerRoutes");


const app  = express();

//middleware
app.use(express.json());
app.use("/offer", offerRouter);


const OFFERS_URL = "mongodb+srv://mlislbest:e2maM0icBFO32HBu@clusterdemo.gzrv8dg.mongodb.net/"


mongoose.connect(OFFERS_URL)
.then(() => console.log('Connected to MongoDB'))
.then(() =>{
    app.listen(5000);
}).catch((err) => console.log(err));



