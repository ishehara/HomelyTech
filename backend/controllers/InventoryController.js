const Inventory = require("../models/InventoryModel");


//data display
const getAllDetails = async(req,res,next)=>{
    let invetory;

    try{
        invetory = await Inventory.find();
    }catch(err){
        console.log(err);
    }
    //not found
    if(!invetory){
        return res.status(404.).json({message:"User not fount"});
    }
    //Display all inventories
    return res.status(200).json({invetory});
};


//data insert
const addDetails = async (req, res, next) => {
    const { itemName,itemBrand, category, quantity, productCost,supplierName, supplierEmail, date } = req.body;
    let inventory;

    try {
        inventory = new Inventory({ itemName,itemBrand, category, quantity, productCost,supplierName, supplierEmail, date });
        await inventory.save();
    } catch (err) {
        console.log(err);
    }
    // If inventory is not inserted
    if (!inventory) {
        return res.status(404).json({ message: "Unable to add inventory" });
    }
    return res.status(200).json({ inventory });
}

//get by ID
const getById = async (req, res, next) =>{
    const id = req.params.id;
    let inventory;

    try{
        inventory = await Inventory.findById(id);
    }catch(err){
        console.log(err);
    }
    // If inventory id is not available
    if (!inventory) {
        return res.status(404).json({ message: "Details not found" });
    }
    return res.status(200).json({ inventory });
}

//update details
const updateDetails = async(req, res, next) =>{
    const id = req.params.id;
    const {itemName,itemBrand, category, quantity, productCost,supplierName, supplierEmail, date} = req.body;

    let inventory;
    try{
        inventory = await Inventory.findByIdAndUpdate(id,
            {itemName:itemName,itemBrand:itemBrand, category:category, quantity:quantity, productCost:productCost,supplierName:supplierName, supplierEmail:supplierEmail, date:date})
            inventory = await inventory.save(); 
    }catch{
        console.log(err)
    }
    // If inventory cannot update
    if (!inventory) {
        return res.status(404).json({ message: "Unable to inventory user details" });
    }
    return res.status(200).json({ inventory });

}

//delete inventory details
const deleteDetails = async (req, res, next) =>{
    const id = req.params.id;
    let inventory;

    try{
        inventory = await Inventory.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    // If inventory cannot delete
    if (!inventory) {
        return res.status(404).json({ message: "Unable to delete inventory details" });
    }
    return res.status(200).json({ inventory });
}

exports.getAllDetails = getAllDetails;
exports.addDetails = addDetails;
exports.getById = getById;
exports.updateDetails =updateDetails;
exports.deleteDetails =deleteDetails;