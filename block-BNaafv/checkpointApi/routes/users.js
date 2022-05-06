const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const auth = require("../middlewares/auth");
require("dotenv").config;
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// to create a user
router.post("/register", async (req, res) => {
  try {
    let user = await User.create(req.body);
    let token = user.signToken();
    res.status(201).json({
      user: {
        token: token,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.json({ err: err });
  }
});

// user login   using the password and the email

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(500)
        .json({ error: "both password and email is required" });
    }
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(500).json({ error: "user is not registered" });
    }
    // if the user is exits then compare  the password
    let isMatched = await bcrypt.compare(password, user.password);
    // if the password is not matched
    if (!isMatched) {
      return res.status(500).json({ error: "user password is not matched" });
    }
    // if user password is mathced then generate  the user  jwt token
    // and send it to the user
    let token = user.signToken();
    res.status(202).json({
      user: {
        token: token,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({ error: " there is an error in the user login" });
  }
});

router.get("/currentuser", auth.isVerified, async (req, res) => {
  try {
    let currentuser = await User.findOne({ email: req.user.email });
    let token = currentuser.signToken();
    res.status(202).json({
      user: {
        token: token,
        username: currentuser.username,
        email: currentuser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "no user is logged in right now" });
  }
});

module.exports = router;
