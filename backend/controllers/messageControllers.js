
const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel")
//@desc         Add Message
//@route        POST   /api/message/
//@access       Public

exports.addMessage = asyncHandler(async (req, res, next) => {

    let {message, user, housing} = req.body;

    if (!message || !user || !housing) {
        res.status(400)
        throw new Error("No enough information")
    };


    let createdMessage = await Message.create({
        user,
        housing,
        message
    });

    res.status(201).json({
        message: "Saved message and sent to landlord!"
    })
});