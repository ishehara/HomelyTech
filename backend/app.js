const express = require('express');
const mongoose = require('mongoose');

const Userrouter = require("./routes/UserRoutes"); //Insert user route
const offerRouter = require("./routes/offerRoutes");
const router = require("./routes/TimetableRoutes");

const app  = express();
const cors = require('cors');


//middleware
app.use(express.json());
app.use(cors());
app.use("/users",Userrouter);
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


//Register-------------------------------------------------
//Call Register Model
require("./models/Register");
const User = mongoose.model("Register");
app.post("/register", async(req,res) =>{
    const { name,gmail,password} = req.body;
    try{
        await User.create({
            name,
            gmail,
            password,
        })
        res.send({status:"ok"});
    }catch(err){
        res.send({status:"err"});
    }
});


//Login--------------------------------------------

app.post("/login", async (req, res)=>{
  const {gmail,password} = req.body;
  try{
      const user = await User.findOne({gmail});
      if(!user){
          return res.json({err:"user Not Found"})
      }
      if(user.password === password){
          return res.json({ status: "ok" });
      }else{
          return res.json({err: "incorret password"});
      }

  }catch(err){
      console.error(err);
      res.status(500).json({err:"server Err"})
  }

});





