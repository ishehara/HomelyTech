const User = require("../models/UserModel");
const Register = require("../models/Register");
const { randomInt } = require('crypto');
const nodemailer = require('nodemailer');

let storedOTP; // Declare a global variable to store the OTP

//data display part

const getAllUsers = async ( req, res, next) => {   
     
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

//Register
const RegisterUser = async ( req, res, next) => {   //data display function
     
    const { username,gmail,password,fullname,address } = req.body;
    try {
        // Check if username or gmail already exists
        const existingUser = await User.findOne({ $or: [{ username }, { gmail }] });
        
        //console.log(`Request received: ${req.method} ${req.path}`, JSON.stringify(req.body));

        if (existingUser) {
            // If either username or gmail exists, return error
            return res.send({ status: "error", message: "Username or email already exists" });
        }
        await User.create({
            username,
            gmail,
            password,
            fullname,
            address,
        });
        res.send({ status: "ok" });
    } catch (err) {
        console.error("Error registering user:", err);
        // Send error response with meaningful message
        res.status(500).send({ status: "error", message: "Failed to register user" });
    }

};

//Login
const LoginUser = async (req, res)=>{
    //const id = req.params.id;
    const {gmail,password} = req.body;
    try{
        console.log(`Request received: ${req.method} ${req.path}`, JSON.stringify(req.body));
        const user = await User.findOne({gmail});
        if(!user){
            return res.json({err:"user Not Found"})
        }
        if(user.password === password){
            // Generate a 4-digit OTP
            const otp = generateOTP(user);
            console.log('OTP : ', otp);
            return res.json({ status: "ok", user });
        }else{
            return res.json({err: "incorret password"});
        }

    }catch(err){
        console.error(err);
        res.status(500).json({err:"server Err"})
    }

};


// Validate OTP
const validateOTP = async (req, res) => {
    const { otp, gmail } = req.body;
    
    // Check if the submitted OTP matches the stored OTP
    if (otp === storedOTP) {
        // OTP is valid
        try {
            const user = await User.findOne({gmail});
            if(!user){
                return res.json({err:"user Not Found"})
            }
            // Return user details along with the success message
            return res.json({ status: "ok", message: "OTP verification successful", user });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err: "Internal server error", message: "OTP verification failed" });
        }
    } else {
        // OTP is invalid
        return res.json({ err: "Incorrect OTP", message: "OTP verification failed" });
    }
};



//data Insert part
const addUsers = async (req, res, next) => {
    const { username, gmail, password, fullname, address } = req.body;
    let user;

    try {
        // Check if username or gmail already exists
        const existingUser = await User.findOne({ $or: [{ username }, { gmail }] });
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "Username or email already exists" });
        }

        // Add user level field (assuming default as 'normal')
        const userLevel = 'normal';
        user = new User({ username, gmail, password, fullname, address, userLevel });
        await user.save();

        // Check if user was successfully saved
        if (!user) {
            return res.status(404).json({ message: "Unable to add user" });
        }

        // Return success response with the inserted user
        return res.status(200).json({ status: "ok", user });
    } catch (err) {
        console.error("Error adding user:", err);
        // Send error response with meaningful message
        return res.status(500).json({ status: "error", message: "Failed to add user" });
    }
};


//Get by Id
const getById = async ( req, res, next ) => {

    const id = req.params.id;

    let users;
    console.log(`Info: Fetching user details for user with ID: ${id}`);
    try{
        users = await User.findById(id);
        console.log('User details:', users); // Log the user details
    }catch (err){
        console.error(`Info: Error fetching user details: ${err.message}`);
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
    const { username, gmail, password, fullname, address } = req.body;

    try {
        // Find the user by ID and update the specified fields
        const updatedUser = await User.findByIdAndUpdate(id, {
            username: username,
            gmail: gmail,
            password: password,
            fullname: fullname,
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

// Function to generate a 4-digit OTP
async function generateOTP(user) {
    console.log("user email", user.gmail)
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpString = otp.toString(); // Convert OTP to string

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tharushinawodya80@gmail.com', // Your Gmail email address
            pass: 'braq gewa btoa dmyz' // Your Gmail app code
        }
    });
    // Construct HTML email template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>OTP Email Template</title>
        <style>
            /* Add your CSS styles here */
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #007bff;
            }
            p {
                margin-bottom: 20px;
            }
            .otp-code {
                font-size: 24px;
                font-weight: bold;
                color: #28a745;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Your OTP Code</h1>
            <p>Dear ${user.username},</p>
            <p>Your OTP code for authentication is:</p>
            <p class="otp-code">${otpString}</p>
            <p>Please use this OTP code to complete your authentication process.</p>
            <p>Thank you!</p>
        </div>
    </body>
    </html>
    `;

    // Set up email data
    const mailOptions = {
        from: 'tharushinawodya80@gmail.com', // Sender address
        to: user.gmail, // Recipient address
        subject: 'OTP Verification',
        html: htmlTemplate // HTML content for email
    };
    try {
        console.log("OTP ",otpString);
        // Send the email
        await transporter.sendMail(mailOptions);

        // Store the generated OTP in the global variable
        storedOTP = otpString; // Store the OTP as a string
        console.log("OTP mail sent");
        return storedOTP;
    } catch (error) {
        console.error('Email sending failed:', error);
        throw new Error('Failed to send OTP via email');
    }

}

exports.RegisterUser = RegisterUser;
exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.LoginUser = LoginUser;
exports.validateOTP = validateOTP;