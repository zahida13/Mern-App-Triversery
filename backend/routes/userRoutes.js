const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");
const { protect } = require("../middleWear/authMiddleWare");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/messages", protect, getMe);

module.exports = router;
