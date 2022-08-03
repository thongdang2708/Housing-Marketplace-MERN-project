
const express = require("express");

const {register, login, setResetPassword, resetPassword, getMe, updateUser, updatePassword, getAllUsers} = require("../controllers/authControllers");
const {protect} = require("../middleware/auth");
const router = express.Router();

router.route("/").post(register);
router.route("/login").post(login);
router.route("/setResetPassword").post(setResetPassword);
router.route("/me").get(protect, getMe); // (Test only)
router.route("/update").put(protect, updateUser);
router.route("/updatePassword").post(protect, updatePassword);
router.route("/all").get(getAllUsers);
router.route("/:resetToken").put(resetPassword);



module.exports = router;