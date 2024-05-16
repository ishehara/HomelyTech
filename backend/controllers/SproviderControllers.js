const Sprovider = require("../models/SproviderModel");

// Login function
const serviceProviderLogin = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(`Request received: ${req.method} ${req.path}`, JSON.stringify(req.body));
  try {
    const serviceProvider = await Sprovider.findOne({ username, password });
    console.log(`Request received: ${req.method} ${req.path}`, JSON.stringify(serviceProvider));
    if (!serviceProvider) {
      return res.status(401).json({ status: "error", message: "Invalid username or password" });
    }
    return res.status(200).json({ status: "ok", message: "Login successful", provider: serviceProvider });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// Data display part
const getAllSproviders = async (req, res, next) => {
  try {
    const sproviders = await Sprovider.find();
    if (!sproviders || sproviders.length === 0) {
      return res.status(404).json({ message: "No service providers found" });
    }
    return res.status(200).json({ sproviders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Register
const SregisterSprovider = async (req, res, next) => {
  const { username, gmail, fullname, password, phonenumber, servicetype, serviceareas } = req.body;
  try {
    const existingSprovider = await Sprovider.findOne({ $or: [{ username }, { gmail }] });
    if (existingSprovider) {
      return res.send({ status: "error", message: "Username or email already exists" });
    }
    await Sprovider.create({
      username,
      gmail,
      fullname,
      password,
      phonenumber,
      servicetype,
      serviceareas,
    });
    res.send({ status: "ok" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send({ status: "error", message: "Failed to register user" });
  }
};

//Data Insert 
const addSproviders = async (req, res, next) => {
  const { username, gmail, fullname, password, phonenumber, servicetype, serviceareas } = req.body;
  let sproviders;

  try {
    // Check if the user already exists
    const existingUser = await Sprovider.findOne({ username });
    console.log(`Request received: ${req.method} ${req.path}`, JSON.stringify(existingUser));
    // If user already exists, return an error
    if (existingUser) {
      return res.status(200).json({ status: "error", message: "User already exists" });
    }
    sproviders = new Sprovider({ username, gmail, fullname, password, phonenumber, servicetype, serviceareas });
    await sproviders.save();
    
    // Successfully inserted data to the database
    return res.status(201).json({ status: "ok", message: "Service provider registered successfully" });
  } catch (err) {
    console.log(err);
    // Error occurred while inserting data
    return res.status(500).json({ status: "error", message: "Failed to register service provider" });
  }
};

 //Get by Id
 const getById = async ( req, res, next ) => {

  const id = req.params.id;
  let sprovider;

  try{
    sprovider = await Sprovider.findById(id);
  }catch (err){
    cpnsole.log(err);
  }

  //not available users
  if( !sprovider){
    return res.status(404).json({message: "User Not Found"});  
   }
     return res.status(200).json({ sprovider});

};


//Update User Details
const updateSprovider = async (req, res, next) => {
  const id = req.params.id;
  const { username, gmail, fullname, password,phonenumber,servicetype,serviceareas } = req.body;
  
  let sproviders;

  try{
    sproviders = await Sprovider.findByIdAndUpdate(id,
      {username: username, gmail:gmail, fullname:fullname, password:password, phonenumber: phonenumber, servicetype:servicetype, serviceareas: serviceareas});
      sproviders = await sproviders.save();
  }catch(err){
    console.log(err);
  }

  //not available users
  if( !sproviders){
    return res.status(404).json({message: "Unable to updtae user details"});  
   }
     return res.status(200).json({ sproviders});
};

//Delete User Details
const deleteSprovider = async (req, res, next ) => {
  const id = req.params.id;

    let sproviders;
    try{
      sproviders = await Sprovider.findByIdAndDelete(id)
    }catch (err){
      console.log(err);
    }
    if( !sproviders){
        return res.status(404).json({message: "Unable to Delete User Details"});  
    }
    return res.status(200).json({ sproviders});
    





};

module.exports = {
  serviceProviderLogin,
  getAllSproviders,
  SregisterSprovider,
  addSproviders,
  getById,
  updateSprovider,
  deleteSprovider
};
