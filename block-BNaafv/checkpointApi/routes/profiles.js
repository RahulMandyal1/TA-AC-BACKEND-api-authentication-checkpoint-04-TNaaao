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


// a blocked user can have no longer access to these routes
router.use(auth.isAuthorized);


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

//follow  the user
router.get("/:username/follow", auth.isVerified, async (req, res, next) => {
  try {
    let username = req.params.username;
    let user = await User.findOne({ username: username });
    let updateProfile = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { followingList: user._id },
      },
      {
        new: true,
      }
    );

    // now update again if one user has followed then it should be
    //reflected back in other user data so update the second user follower list
    let targetedUser= await User.findByIdAndUpdate(
      user._id,
      {
        $push: { followersList: updateProfile._id },
      },
      { new: true }
    );
    res.status(202).json({ user: updateProfile , targetedUser : targetedUser });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//unfollow the user
router.get("/:username/unfollow", auth.isVerified, async (req, res, next) => {
  try {
    let username = req.params.username;
    let user = await User.findOne({ username: username });
    // Remove from the follower list of the user who is unfollowing
    let updateProfile = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { followingList: user._id },
      },
      {
        new: true,
      }
    );
    // also remove  form the user follower list whose follower is going to lose
    // once a user has unfollowed him it should reflect also in his data
    let targetedUser = await User.findOneAndUpdate(
      { username: username },
      { $pull: { followersList: req.user.id } },
      { new: true }
    );
    res.status(202).json({ user: updateProfile  ,targetedUser : targetedUser});
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
module.exports = router;
