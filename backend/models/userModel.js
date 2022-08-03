
const mongoose = require("mongoose");
let crypto = require("crypto");
let bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date
    }
}, {
    timestamps: true
});

UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    };

    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.methods.getResetToken = function () {

    let resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", UserSchema);