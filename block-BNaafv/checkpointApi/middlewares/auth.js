const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

//to verify if the user is logged in only if the token is mathced
module.exports = {
  isVerified: async function (req, res, next) {
    let token = req.headers.authorization;
    try {
      let isVerified = jwt.verify(token, process.env.SECRET);
      req.user = isVerified;
      req.user.token = token;
      return next();
    } catch (err) {
      return res
        .status(500)
        .json({ error: "token is not valid you need to login again" });
    }
  },
  //optinal authorization may or may not need
  optionalAuthorization: async function (req, res, next) {
    let token = req.headers.authorization;
    try {
      if (token) {
        let isVerified = jwt.verify(token, process.env.SECRET);
        req.user = isVerified;
        req.user.token = token;
      } else {
        req.user = null;
      }
      return next();
    } catch (err) {
      return res
        .status(500)
        .json({ error: "token is not valid you need to login again" });
    }
  },
  //to check user is admin or not
  isadmin: async function (req, res, next) {
    let token = req.headers.authorization;
    try {
      let isVerified = jwt.verify(token, process.env.SECRET);
      req.user = isVerified;
      req.user.token = token;
      let user = await User.findOne({ email: req.user.email });
      if (user.isadmin) {
        return next();
      }
      res.status(500).json({ error: "sorry you are not admin" });
    } catch (err) {
      res.status(500).json({ error: "sorry you are not admin" });
    }
  },
  // to authorize user only when if he is unblocked
  // if user is blocked then he should not able to move forward
  isAuthorized: async function (req, res, next) {
    let token = req.headers.authorization;
    try {
      let isVerified = jwt.verify(token, process.env.SECRET);
      req.user = isVerified;
      req.user.token = token;
      let user = await User.findOne({ email: req.user.email });
      console.log("this is the user that we have found" , user);
      if (user.isBlocked === false) {
        return next();
      }

      // if user is blocked then he should not be allowed to move forward
      res.status(500).json({ error: "sorry you are blocked by  admin" });
    } catch (err) {
      res.status(500).json({ error: "sorry you are no authorized" });
    }
  },
};


