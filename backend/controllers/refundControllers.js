// refundControllers.js
const Refund = require("../models/refundModel");


const getAllRefund = async (req, res, next) => {
    try {
        const refunds = await Refund.find();
        return res.status(200).json({ refunds });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const addRefund = async (req, res, next) => {
    try {
        const refund = new Refund(req.body);
        await refund.save();
        return res.status(200).json({ refund });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getById = async (req, res, next) => {
    try {
        const refund = await Refund.findById(req.params.id);
        if (!refund) {
            return res.status(404).json({ message: "Refund not found" });
        }
        return res.status(200).json({ refund });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateRefund = async (req, res, next) => {
    try {
        const refund = await Refund.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!refund) {
            return res.status(404).json({ message: "Refund not found" });
        }
        return res.status(200).json({ refund });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteRefund = async (req, res, next) => {
    try {
        const refund = await Refund.findByIdAndDelete(req.params.id);
        if (!refund) {
            return res.status(404).json({ message: "Refund not found" });
        }
        return res.status(200).json({ message: "Refund deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllRefund,
    addRefund,
    getById,
    updateRefund,
    deleteRefund,
  
};