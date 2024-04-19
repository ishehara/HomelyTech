const Feedback = require("../models/FeedbackModel");

const getAllFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find();
        if (!feedbacks.length) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        return res.status(200).json({ feedbacks });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const addFeedbacks = async (req, res, next) => {
    const { feedback, rating } = req.body;
    try {
        const newFeedback = new Feedback({ feedback, rating });
        await newFeedback.save();
        return res.status(200).json({ newFeedback });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).send({ message: "Feedback not found" });
        }
        return res.status(200).json({ feedback });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateFeedback = async (req, res, next) => {
    const id = req.params.id;
    const { feedback, rating } = req.body;
    try {
        let updatedFeedback = await Feedback.findByIdAndUpdate(id, { feedback, rating }, { new: true });
        if (!updatedFeedback) {
            return res.status(404).send({ message: "Unable to update/edit feedback" });
        }
        return res.status(200).json({ updatedFeedback });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteFeedback = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(id);
        if (!deletedFeedback) {
            return res.status(404).send({ message: "Unable to Delete feedback" });
        }
        return res.status(200).json({ deletedFeedback });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllFeedbacks,
    addFeedbacks,
    getById,
    updateFeedback,
    deleteFeedback
};
