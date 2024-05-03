const Sprovider = require("../models/SproviderModel");

//data display part
const getAllSproviders = async ( req, res, next) => {   
     
    let Sproviders;
     //get all users
     try{
        sproviders = await Sprovider.find();
     }catch(err){
        console.log(err); 
    }

      //not found
      if (!sproviders){
        return res.status(404).json({message: "User not found"});
      }

      //Display all users
      return res.status(200).json({sproviders});
    };



    //Data Insert 
    const addSproviders = async (req, res, next) => {
      const { username, gmail, fullname, password,phonenumber,servicetype,serviceareas } = req.body;
    let sproviders;

    try{
      sproviders = new Sprovider ({username, gmail, fullname, password,phonenumber,servicetype,serviceareas });
      await sproviders.save();
    }catch (err){
      console.log(err);
    }

    //not insert data to database
    if (!sproviders){
      return res.status(404).json({message:"unable to add users"});
    }
    return res.status(200).json({sproviders});
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





  



    exports.getAllSproviders = getAllSproviders;
    exports.addSproviders = addSproviders;
    exports.getById =  getById;
    exports.updateSprovider = updateSprovider;
    exports.deleteSprovider = deleteSprovider;