
const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const colors = require("colors");
const app = express();
const authRoute = require("./routes/authRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const houseRoute = require("./routes/housingRoutes");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const messageRoute = require("./routes/messageRoutes");
//Connect Database
connectDB();


//Middleware Functionality

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//API routes
app.use("/api/users", authRoute);
app.use("/api/housing", houseRoute);
app.use("/api/message", messageRoute);
//Error Handling
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(__dirname, "../", "frontend", "build", "index.html");
    });
}
//Server listens

app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`.green.underline.bold);
});