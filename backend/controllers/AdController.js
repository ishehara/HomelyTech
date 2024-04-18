const Ad = require("../models/AdModel");

//data display
const getAllAds = async (req, res, next) => {

    let ads;

    try{
        ads = await Ad.find();
    }catch (err) {
        console.log(err);
    }

    //not found
    if(!ads){
        return res.status(404).json({message:"Ad not found"});
    }
    //Display all ads
    return res.status(200).json({ ads });
};

//data Insert
const addAds = async (req, res, next) => {

    const {adTitle,serviceType,reqDate,noOfDays,area,adDescription,contactNumber,email,date} = req.body;

    let ads;

    try {
        ads = new Ad({adTitle,serviceType,reqDate,noOfDays,area,adDescription,contactNumber,email,date});
        await ads.save();
    }catch (err) {
        console.log(err);
    }
    //if ads are not inserted
    if (!ads){
        return res.status(404).send({message:"unable to add ads"});
    }
    return res.status(200).json({ ads });
};

//Get by ID
const getById = async (req, res, next) => {

    const id = req.params.id;

    let ad;

    try {
        ad = await Ad.findById(id);
    }catch (err) {
        console.log(err);
    }
    //Ads not available
    if (!ad){
        return res.status(404).send({message:"Ad not found"});
    }
    return res.status(200).json({ ad });
}

//Update Ad Details
const updateAd = async (req, res, next) => {

    const id = req.params.id;
    const {adTitle,serviceType,reqDate,noOfDays,area,adDescription,contactNumber,email,date} = req.body;

    let ads;

    try {
        ads = await Ad.findByIdAndUpdate(id, 
            {adTitle:adTitle, serviceType:serviceType, reqDate:reqDate, noOfDays:noOfDays, area:area, adDescription:adDescription, contactNumber:contactNumber, email:email});
            ads = await ads.save();
    }catch(err) {
        console.log(err);
    }
    //Unable to update
    if (!ads){
        return res.status(404).send({message:"Unable to update ad details"});
    }
    return res.status(200).json({ ads });
};

//Delete Advertisement
const deleteAd = async (req, res, next) => {
    const id = req.params.id;

    let ad;

    try{
        ad = await Ad.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    //Unable to update
    if (!ad){
        return res.status(404).send({message:"Unable to delete ad details"});
    }
    return res.status(200).json({ ad });

};

exports.getAllAds = getAllAds;
exports.addAds = addAds;
exports.getById = getById;
exports.updateAd = updateAd;
exports.deleteAd = deleteAd;
