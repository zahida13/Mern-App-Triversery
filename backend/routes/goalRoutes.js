const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  deleteGoals,
  updateGoals,
} = require("../controller/goalController");
const { protect } = require("../middleWear/authMiddleWare");

router.get("/", protect, getGoals).post("/", protect, setGoals);
router.delete("/:id", protect, deleteGoals).put("/:id", protect, updateGoals);
module.exports = router;
