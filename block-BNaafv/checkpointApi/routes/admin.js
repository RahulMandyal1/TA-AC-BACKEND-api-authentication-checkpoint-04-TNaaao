const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Question = require("../models/questions");
const User = require("../models/users");
const Answer = require("../models/answers");
const { route } = require(".");

// only admin can have access  to these routes
router.get("/", async (req, res, next) => {
  try {
    res
      .status(202)
      .json({ message: "this is the admin dashboard and admin is logged in" });
  } catch (error) {
    next(error);
  }
});

// block   a user

router.get("/:username/block", async (req, res, next) => {
  try {
    let blockuser = await User.findOneAndUpdate(
      { username: req.params.username },
      { isblocked: true },
      { new: true }
    );
    res.status(202).json({ user: blockuser });
  } catch (error) {
    next(error);
  }
});
//unblock a user

router.get("/:username/unblock", async (req, res, next) => {
  try {
    let unblockuser = await User.findOneAndUpdate(
      { username: req.params.username },
      { isblocked: false },
      { new: true }
    );
    res.status(202).json({ user: unblockuser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
