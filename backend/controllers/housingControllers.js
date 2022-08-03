
const User = require("../models/userModel");
const Housing = require("../models/housingModel");
const asyncHandler = require("express-async-handler");

//@desc         Create a house ad with authorized user
//@route        POST   /api/housing/
//@access       Private

exports.createHouse = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!");
    }; 

    let body = JSON.parse(req.body.body);

   
    
    let {name, selection, bedRooms, bathRooms, parkingSpot, furnished, address, price, offer, discountPrice} = body;
    
    if (!name || !address || bedRooms === 0 || bathRooms === 0 || price === 0) {
        res.status(400)
        throw new Error("Please fill information")
    };

    // parkingSpot = true;
    // furnished = true;
    // offer = true

    let checkName = await Housing.findOne({name: name});

    if (checkName) {
        res.status(400)
        throw new Error("This name already exists. Please fill again!")
    };

    
    if (!req.files) {
        let url = `${req.protocol}://${req.get("host")}/uploads/no-image.svg.png`;
        let housing = await Housing.create({
            user: user._id,
            name,
            selection,
            bedRooms: Number(bedRooms),
            bathRooms: Number(bathRooms),
            parkingSpot,
            furnished,
            address,
            price: Number(price),
            images: [url],
            offer,
            discountPrice: Number(discountPrice)
        });
        return res.status(201).json(housing);
    } 

    let file = req.files.file;
    let isArray = file instanceof Array;


    if (isArray) {

        let emptyArray = [];

        file.forEach((item) => {

            if (!item.mimetype.startsWith("image")) {
                res.status(400)
                throw new Error("Please upload an image file")
            };

            if (item.size > process.env.FILE_SIZE) {
                res.status(400)
                throw new Error(`Please upload an image file less than ${process.env.FILE_SIZE}`);
            };

            let url = `${req.protocol}://${req.get("host")}/uploads/${item.name}`;

            item.mv(`${process.env.FILE_PATH}/${item.name}`, err => {
                if (err) {
                    console.error(error);
                    res.status(500)
                    throw new Error("Upload problem")
                } else {
                    console.log("Successfully")
                }
            });
            
            emptyArray.push(url);

        })

        let housing = await Housing.create({
            user: user._id,
            name,
            selection,
            bedRooms: Number(bedRooms),
            bathRooms: Number(bathRooms),
            parkingSpot,
            furnished,
            address,
            price: Number(price),
            images: emptyArray,
            offer,
            discountPrice: Number(discountPrice)
        });

        res.status(201).json(housing);
        
    } else {

        if (!file.mimetype.startsWith("image")) {
            res.status(400)
            throw new Error("Please upload an image file")
        }

        if (file.size > process.env.FILE_SIZE) {
            res.status(400)
            throw new Error(`Please upload an image file less than ${process.env.FILE_SIZE}`)
        };

        let url = `${req.protocol}://${req.get("host")}/uploads/${file.name}`;

        file.mv(`${process.env.FILE_PATH}/${file.name}`, async (err) => {
            if (err) {
                console.log(error);
                res.status(500)
                throw new Error("Upload problem")
            } else {
                
                let housing = await Housing.create({
                user: user._id,
                name,
                selection,
                bedRooms: Number(bedRooms),
                bathRooms: Number(bathRooms),
                parkingSpot,
                furnished,
                address,
                price: Number(price),
                images: [url],
                discountPrice: Number(discountPrice)
                });

                res.status(201).json(housing);
            }
        })
    }


});

//@desc          Get All Housing Ads Of A Specific User
//@desc          GET   /api/housing/
//@route         Private

exports.getAllHousing = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let housing = await Housing.find({user: req.user.id});

    res.status(200).json(housing);

});

//@desc           Delete housing ad of specific user
//@route          DELETE /api/housing/:id
//@access         Private

exports.deleteHousing = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let housing = await Housing.findById(req.params.id);

    if (!housing) {
        res.status(404)
        throw new Error("Housing not found!")
    };

    if (housing.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized!")
    };

    let deleteHousing = await Housing.findByIdAndRemove(req.params.id);

    res.status(200).json(deleteHousing);


});


//@route        GET ALL HOUSINGS
//@desc         GET    /api/housing/full
//@access       Public

exports.getFull = asyncHandler(async (req, res, next) => {

    let housings = await Housing.find();
    
    res.status(200).json(housings);
});

//@desc          Get top 5 latest ads
//@route         GET   /api/housing/topfive/
//@desc          Public

exports.displayTopFive = asyncHandler(async (req, res, next) => {

    let housing = await Housing.find();

    let reverseHousing = housing.reverse();

    let topFiveHousingAds = reverseHousing.slice(0, 5);
    res.status(200).json(topFiveHousingAds);
});

//@desc         Get selling housing ads
//@route        GET     /api/housing/sell/
//@desc         Public

exports.displaySell = asyncHandler(async (req, res, next) => {

    let housing = await Housing.find({selection: "sell"});

    res.status(200).json(housing);
});


//@desc         Get rent housing ads
//@route        GET      /api/housing/rent/
//@desc         Public

exports.displayRent = asyncHandler(async (req, res, next) => {

    let housing = await Housing.find({selection: "rent"});

    res.status(200).json(housing);
});



//@desc         Get Single Housing Ad
//@route        GET     /api/housing/:id/
//@desc         Private

exports.getSingleHousing = asyncHandler(async (req, res, next) => {

    let housing = await Housing.findById(req.params.id);

    if (!housing) {
        res.status(404)
        throw new Error("Housing not found!");
    };

    res.status(200).json(housing);
});

//@desc         Get housing ads with offers
//@route        GET      /api/housing/offers/
//@access       Public

exports.getHousingOffers = asyncHandler(async (req, res, next) => {

    let housing = await Housing.find({offer: true});

    res.status(200).json(housing);
});