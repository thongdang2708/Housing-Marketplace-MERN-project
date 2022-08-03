
let asyncHandler = require("express-async-handler");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendResponse = require("../utils/emailConfig");
const crypto = require("crypto");



//@desc         Register
//@route        POST    /api/users/
//@access       Public


exports.register = asyncHandler(async (req, res, next) => {

    let {name, email, password} = req.body;
    

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill enough information")
    };

   
    let userExists = await User.findOne({email: email});

    if (userExists) {
        res.status(400)
        throw new Error("User exists already!")
    };

    // let salt = await bcrypt.genSalt(10);
    // let hashedPassword = await bcrypt.hash(password, salt);


    let user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data!")
    }
    
    

   
});

//@desc         Log In
//@route        POST   /api/users/login
//@access       Public

exports.login = asyncHandler(async (req, res, next) => {

    let {email, password} = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("Please fill information!");
    }

    let user = await User.findOne({email: email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            id: user._id,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials!")
    }
});

//@desc               Set Reset Password
//@route              POST   /api/users/setResetPassword
//@access             Public

exports.setResetPassword = asyncHandler(async (req, res, next) => {

    let {email, webpage_URL} = req.body;

    if (!email || !webpage_URL) {
        res.status(400)
        throw new Error("Please fill information!")
    };

    let user = await User.findOne({email: email});

    if (!user) {
        res.status(400)
        throw new Error("No user found!")
    };

    let resetToken = user.getResetToken();

    await user.save({validateBeforeSave: false});

    let URL_UPDATE = `${webpage_URL}/resetPassword/${resetToken}`


    try {

        await sendResponse({
            email: user.email,
            subject: "Reset Password",
            url: URL_UPDATE
        })

        res.status(200).json({
            message: "Sent to your email. Please check your mailbox!"
        })

    } catch (error) {

        console.error(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});

        res.status(500)
        throw new Error("Email Problem");
}   

});


//@desc             Reset Password
//@route            PUT   /api/users/:resetToken
//@access           Private

exports.resetPassword = asyncHandler(async (req, res, next) => {
    
    let resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    let user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });

    if (!user) {
        res.status(400)
        throw new Error("Unvalid user!")
    };

    let {newPassword} = req.body;

    if (!newPassword) {
        res.status(400)
        throw new Error("Please add new password")
    };

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave: false})

    res.status(200).json({
        message: "Reset Password Already"
    });


});

//@desc        Update user
//@router      PUT    /api/users/update/
//@access      Private

exports.updateUser = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(updateUser);
    
});

//Update Password

exports.updatePassword = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let {currentPassword, newPassword} = req.body;

    if (!currentPassword || !newPassword) {
        res.status(400)
        throw new Error("Please fill information!")
    };

    if (currentPassword === newPassword) {
        res.status(400)
        throw new Error("New password is the same with the old password")
    }

    let isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
        res.status(401)
        throw new Error("Password does not match!")
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    res.status(200).json({
        message: "Update password already!"
    });

});

//@desc         Get all users
//@route        GET   /api/users/all/
//@access       Public

exports.getAllUsers = asyncHandler(async (req, res, next) => {

    let users = await User.find().select("-password");

    res.status(200).json(users);

});


//Generate Token

const generateToken = (id) => {
    
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};


//Get user with token via middleware (test)

//@desc         Get Me
//@route        GET /api/users/me
//@access       Private

exports.getMe = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(404)
        throw new Error("User not found")
    };

    res.status(200).json(user);
});