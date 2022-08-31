const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
const User = require("../model/userModel");

// @desc Get Goals
// @API GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @desc Post Goals
// @API GET /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goals);
});
// @desc Delete Goals
// @API GET /api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.findById(req.params.id);
  if (!goals) {
    res.status(400);
    throw new Error("Goal Not Found");
  }

  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make Sure The Logged In User Matches The Goal User
  if (goals.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  goals.remove(req.params.id);
  res.status(200).json();
});
// @desc Put Goals
// @API GET /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.findById(req.params.id);
  if (!goals) {
    res.status(400);
    throw new Error("Goal Not Found");
  }

  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make Sure The Logged In User Matches The Goal User
  if (goals.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json();
});
module.exports = {
  getGoals,
  setGoals,
  deleteGoals,
  updateGoals,
};
