const Payment = require("../models/PaymentModel");
const Offer = require("../models/offerModel")

//data display

const getAllPayments = async (req,res,next) => {
    let Payments;

    try{
        Payments = await Payment.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Payments){
        return res.status(404).json({message:"Payment Not Found"});
    }

    //display

    return res.status(200).json({Payments});

};

//data insert

const addPayments = async (req,res,next) =>{


    let {fname , gmail , address , Phone , ServiceType , amount ,promo, PaymentSlip,Status} = req.body;

    let offer = await Offer.findOne({
        promoCode: promo
    })

    if(promo){
        let percentage = offer.persentage;

        amount = amount - amount * (percentage / 100);
    }


    let payments;

    try{
        payments = new Payment ({fname,gmail,address,Phone,ServiceType,amount,PaymentSlip,Status});
        await payments.save();
    }catch(err){
        console.log(err);
    }

    //not inserting
    if(!payments){
        return res.status(404).json({message:"Payment Not Inserting"});
    }

    //display

    return res.status(200).json({payments: payments, amount: amount});
}

//get by id 

const getById = async (req,res,next) => {
    const id = req.params.id;

    let payment;

    try{
        payment = await Payment.findById(id);
    }catch(err){
        console.log(err);
    }

    //not inserting
    if(!payment){
        return res.status(404).json({message:"Couldn't display"});
    }

    //display

    return res.status(200).json({payment});

}

//update

const updatePayment = async (req,res,next) => {

    const id = req.params.id;
    const {fname , gmail , address , Phone , ServiceType , amount , PaymentSlip,Status} = req.body;

    let payments;

    try{
        payments = await Payment.findByIdAndUpdate(id,
            {fname:fname , gmail:gmail , address:address , Phone:Phone , ServiceType:ServiceType , amount:amount , PaymentSlip:PaymentSlip,Status:Status});
        payments = payments.save();
    }catch(err){
        console.log(err);
    }

    //not inserting
    if(!payments){
        return res.status(404).json({message:"Couldn't display"});
    }

    //display

    return res.status(200).json({payments});
}

// Delete User Details

const deletePayment = async (req, res, next) => {
    const id = req.params.id;

    let payment;
    try {
        payment = await Payment.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // If the payment doesn't exist, return a 404 response
    if (!payment) {
        return res.status(404).json({ message: "Payment Not Found" });
    }

    // Return a success response
    return res.status(200).json({ message: "Payment deleted successfully" });
};

exports.deletePayment = deletePayment;


exports.getAllPayments = getAllPayments ;
exports.addPayments = addPayments;
exports.getById = getById;
exports.updatePayment = updatePayment ;
exports.deletePayment = deletePayment;