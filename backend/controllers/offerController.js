const offer =  require('../models/offerModel');

//read data
const getAllOffers = async (req, res, next) => {

    let offers;

    try {
        offers = await offer.find();
    }catch(err){
        console.log(err);
    }

    //not found offers
    if(!offers){
        return res.status(404).json({message: "No offers found"});
    }

    //display all offers

    return res.status(200).json({offers});
}

//data insert
const createOffer = async (req, res, next) => {
    const {title, description, persentage, promoCode, startDate, dueDate} = req.body;

    const offers = new offer({
        title,
        description,
        persentage,
        promoCode,
        startDate,
        dueDate
    });

    try {
        await offers.save();
    }catch(err){
        console.log(err);
    }

    //if data not inserting
    if(!offers){
        return res.status(404).json({message: "Data not inserted"});
    }

    return res.status(201).json({offers});
}

//Get by id
const getOfferById = async (req, res, next) => {
    const offerId = req.params.id;

    let offers;

    try {
        offers = await offer.findById(offerId);
    }catch(err){
        console.log(err);
    }

    //if offer not found
    if(!offers){
        return res.status(404).json({message: "Offer not found"});
    }

    return res.status(200).json({offers});
}

//update offer
const updateOffer = async (req, res, next) => {
    const offerId = req.params.id;

    const {title, description, persentage, promoCode, startDate, dueDate} = req.body;

    let offers;

    try {
        offers = await offer.findByIdAndUpdate(offerId,
            {title: title, description: description, persentage: persentage, promoCode: promoCode, startDate: startDate, dueDate: dueDate});
            offers = await offers.save();
    }catch(err){
        console.log(err);
    }

    //if offer not found
    if(!offers){
        return res.status(404).json({message: "Unable to Update User Details"});
    }


    return res.status(200).json({offers});



}

//delete offer
const deleteOffer = async (req, res, next) => {
    const offerId = req.params.id;

    let offers;

    try {
        offers = await offer.findByIdAndDelete(offerId);
    }catch(err){
        console.log(err);
    }

    //if offer not found
    if(!offers){
        return res.status(404).json({message: "Unable to Delete Offer"});
    }

    return res.status(200).json({message: "Offer Deleted"});


}


exports.getAllOffers = getAllOffers;
exports.createOffer = createOffer;
exports.getOfferById = getOfferById;
exports.updateOffer = updateOffer;
exports.deleteOffer = deleteOffer;