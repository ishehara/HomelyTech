const User = require("../models/UserModel");

//data display part

const getAllUsers = async ( req, res, next) => {   //data display function
     
    let Users;
     //get all users
     try{
        users = await User.find();
     }catch(err){
        console.log(err); 
        
      }

      //not found
      if (!users){
        return res.status(404).json({message: "User not found"});
      }

      //Display all users
      return res.status(200).json({ users });

};


//data Insert part
const addUsers = async (req, res, next) => {

    const {name,gmail,age,address} = req.body;

    let users;

    try{
        users = new User({name,gmail,age,address});
        await users.save();
    }catch (err) {
        console.log(err);
    }

    //not insert data to database
    if( !users){
        return res.status(404).json({message:"unable to add users"});
    }
    return res.status(200).json({ users});
};

//Get by Id
const getById = async ( req, res, next ) => {

    const id = req.params.id;

    let users;

    try{
        users = await User.findById(id);
    }catch (err){
        console.log(err);
    }

    //not available users
    if( !users){
        return res.status(404).json({message: "User Not Found"});  
    }
    return res.status(200).json({ users});

};

//Update user details
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, gmail, age, address } = req.body;

    try {
        // Find the user by ID and update the specified fields
        const updatedUser = await User.findByIdAndUpdate(id, {
            name: name,
            gmail: gmail,
            age: age,
            address: address // Include address in the update operation
        }, { new: true }); // Ensure to return the updated user object

        if (!updatedUser) {
            return res.status(404).json({ message: "Unable to Update User Details" });
        }

        return res.status(200).json({ user: updatedUser });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//Delete User Details
const deleteUser = async (req, res, next ) => {
    const id = req.params.id;

    let users;

    try{
        users = await User.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }
    if( !users){
        return res.status(404).json({message: "Unable to Delete User Details"});  
    }
    return res.status(200).json({ users});

};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
 