const mongoose = require('mongoose');

const offer =  require('../models/offerModel');
const User = require("../models/UserModel");

const nodemailer = require("nodemailer");


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
    const {title, description, persentage, promoCode, startDate, dueDate, image} = req.body;

    const offers = new offer({
        title,
        description,
        persentage,
        promoCode,
        startDate,
        dueDate,
        image
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

    const {title, description, persentage, promoCode, startDate, dueDate, image} = req.body;

    let offers;

    try {
        offers = await offer.findByIdAndUpdate(offerId,
            {title: title, description: description, persentage: persentage, promoCode: promoCode, startDate: startDate, dueDate: dueDate, image: image},);
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

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    
    auth: {
        user: 'homelytech24@gmail.com', // Replace with your email
        pass: 'dmjggzwqjquqcign' // Replace with your email password
    }
});

const sendMailToUsers = async (offerDetails) => {
    try {
        const users = await User.find(); // Fetch all users from the user database

        if (!users || users.length === 0) {
            console.log("No users found to send emails.");
            return;
        }

        users.forEach((user) => {
            const mailOptions = {
                from: 'homelytech24@gmail.com', // Replace with your email
                to: user.gmail, // User email
                subject: 'New Offer Available!',
                text: `Hello ${user.fullname},\n\nWe have a new offer for you:\n\nTitle: ${offerDetails.title}\nDescription: ${offerDetails.description}\nPromo Code: ${offerDetails.promoCode}\nDiscount: ${offerDetails.persentage}%\nStart Date: ${offerDetails.startDate}\nEnd Date: ${offerDetails.dueDate}\nYou can visit our website through this link homelytech.lk\n\nBest regards,\nHomelyTech`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email: ", error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        });
    } catch (error) {
        console.error("Error fetching users: ", error);
    }
};
// Send email for specific offer
const sendMailForOffer = async (req, res, next) => {
    const offerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(offerId)) {
        return res.status(400).json({ message: "Invalid offer ID" });
    }

    let offerDetails;

    try {
        offerDetails = await offer.findById(offerId);
        if (!offerDetails) {
            return res.status(404).json({ message: "Offer not found" });
        }
        await sendMailToUsers(offerDetails);
        return res.status(200).json({ message: "Emails sent successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error sending emails" });
    }
};




exports.getAllOffers = getAllOffers;
exports.createOffer = createOffer;
exports.getOfferById = getOfferById;
exports.updateOffer = updateOffer;
exports.deleteOffer = deleteOffer;
exports.sendMailForOffer = sendMailForOffer;
