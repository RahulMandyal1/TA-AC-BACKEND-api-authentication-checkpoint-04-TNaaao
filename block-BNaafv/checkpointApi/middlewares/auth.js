const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

//to verify if the user is logged in only if the token is mathced
// so we will get some information about  the user that we have entered
// in the payload when we have send the token to user for  the first time
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
};


