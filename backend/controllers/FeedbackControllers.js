const Feedback = require("../models/FeedbackModel");
//data display
const getAllFeedbacks = async(req,res,next) =>{
    let feedbacks;

    try{
        feedbacks = await Feedback.find();

    }catch(err){
        console.log(err);
    }
    //not found
    if(!feedbacks){
        return res.status(404).json({message:"Feedback not found"});
    }
    //Display all feedbacks

    return res.status(200).json({feedbacks})
};

//data Insert
const addFeedbacks = async(req,res,next)=>{
    const{feedback,rating,image} = req.body;
     let feedbacks;

    try{
        feedbacks = new Feedback({feedback,rating,image});
        await feedbacks.save();
    } catch(err){
        console.log(err)
    }
    // not insert feedbacks
    if(!feedbacks){
        return res.status(404).send({message:"unable to add feedback"});
    }
    return res.status(200).json({feedbacks});

}
//  Get by Id
const getById = async(req,res,next)=>{
      const id = req.params.id;
      let feedback;
      try{
        feedback = await Feedback.findById(id);
      }catch(err){
         console.log(err);
      }
//not available feedback
if(!feedback){
    return res.status(404).send({message:" feedback not found"});
}
return res.status(200).json({feedback});

}

//update/edit feedback
const updateFeedback = async (req, res, next) => {
    const id = req.params.id;
    const { feedback, rating, image } = req.body;
  
    try {
      const feedbacks = await Feedback.findByIdAndUpdate(id, {
        feedback,
        rating,
        image
      }, { new: true }); // Add { new: true } to return the updated document
  
      if (!feedbacks) {
        return res.status(404).send({ message: "Unable to update/edit feedback" });
      }
      return res.status(200).json({ feedbacks });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  };

//Delete User Details

const deleteFeedback = async(req,res,next)=>{
    const id = req.params.id;
    let feedback;

    try{
        feedback=await Feedback.findByIdAndDelete(id)  
    }catch(err){
        console.log(err);
    }
    if(!feedback){
        return res.status(404).send({message:" Unable to Dlete feedback"});
    }
    return res.status(200).json({feedback});
    

};



exports.getAllFeedbacks = getAllFeedbacks;
exports.addFeedbacks = addFeedbacks;
exports.getById = getById;
exports.updateFeedback = updateFeedback;
exports.deleteFeedback = deleteFeedback;
