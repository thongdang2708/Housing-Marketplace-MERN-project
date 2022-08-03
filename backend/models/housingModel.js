
const mongoose = require("mongoose");
const geocoder = require("../utils/geocoding");

const HousingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        uniquie: true,
        trim: true
    },
    selection: {
        type: String,
        required: true,
        enum: ["sell", "rent"],
        default: "rent"
    },
    bedRooms: {
        type: Number,
        required: true,
        default: 1
    },
    bathRooms: {
        type: Number,
        required: true,
        default: 1
    },
    parkingSpot: {
        type: Boolean,
        required: true,
        default: false
    },
    furnished: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    offer: {
        type: Boolean,
        required: true,
        default: false
    },
    discountPrice: {
        type: Number,
        default: 0
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        },
        formattedAddress: String,
        street: String,
        city: String,
        zipcode: String,
        country: String
    },
    images: {
        type: [String]
    }

}, {
    timestamps: true
});

HousingSchema.pre("save", async function (next) {

    let loc = await geocoder.geocode(this.address);

    this.location.coordinates = [loc[0].latitude, loc[0].longitude];
    this.location.formattedAddress = loc[0].formattedAddress;
    this.location.street = loc[0].streetName;
    this.location.city = loc[0].city;
    this.location.zipcode = loc[0].zipcode;
    this.location.country = loc[0].countryCode;

    next();
});


module.exports = mongoose.model("Housing", HousingSchema);