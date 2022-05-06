const express = require("express");
const router = express.Router();
const User = require("../models/users");
const auth = require("../middlewares/auth");

//get user profile data
router.get("/:username", auth.isVerified, async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    console.log(" this is the found profile of the  username", user);
    res.status(202).json({
      profile: {
        name: user.name,
        username: user.username,
        image: user.avatar,
        bio: user.bio,
      },
    });
  } catch (err) {
    res.status(500).json({ error: " no profile is found for this username" });
  }
});

// update user information only logged in user can update their account only
router.put("/:username", auth.isVerified, async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    if (user.username === req.user.username) {
      let updatedProfile = await User.findByIdAndUpdate(user._id, req.body, {
        new: true,
      });
      res.status(202).json({
        profile: {
          name: updatedProfile.name,
          username: updatedProfile.username,
          image: updatedProfile.avatar,
          bio: updatedProfile.bio,
        },
      });
    }
    res
      .status(500)
      .json({ error: " you are not authorized user login with your account" });
  } catch (err) {
    res.status(500).json({ error: " no profile is found for this username" });
  }
});
// update user profile
module.exports = router;
