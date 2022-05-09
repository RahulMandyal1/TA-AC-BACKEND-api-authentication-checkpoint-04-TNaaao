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
router.post("/register", async (req, res, next) => {
  try {
    console.log("this is to create account", req.body);
    let user = await User.create(req.body);
    let token = user.signToken();
    res.status(201).json({
      user: {
        token: token,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

// user login   using the password and the email

router.post("/login", async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "both password and email is required" });
    }
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "user is not registered" });
    }
    // if the user is exits then compare  the password
    let isMatched = await bcrypt.compare(password, user.password);
    // if the password is not matched
    if (!isMatched) {
      return res.status(400).json({ error: "user password is not matched" });
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
  } catch (error) {
    next(error);
  }
});

router.get("/currentuser", auth.isVerified, async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
});

module.exports = router;
