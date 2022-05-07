const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Question = require("../models/questions");
const User = require("../models/users");
const Answer = require("../models/answers");
const { route } = require(".");

// only admin can have access  to these routes
router.get("/", async (req, res) => {
  try {
    res
      .status(202)
      .json({ message: "this is the admin dashboard and admin is logged in" });
  } catch (err) {
    res.status(202).json({ error: err });
  }
});

// block   a user

router.get("/:username/block", async (req, res) => {
  try {
    let blockuser = await User.findOneAndUpdate(
      { username: req.params.username },
      { isblocked: true },
      { new: true }
    );
    res.status(202).json({ user: blockuser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
//unblock a user

router.get("/:username/unblock", async (req, res) => {
  try {
    let unblockuser = await User.findOneAndUpdate(
      { username: req.params.username },
      { isblocked: false },
      { new: true }
    );
    res.status(202).json({ user: unblockuser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
