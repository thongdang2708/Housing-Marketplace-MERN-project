
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    housing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Housing",
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Message", MessageSchema);
