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
      if (token) {
        let isVerified = jwt.verify(token, process.env.SECRET);
        req.user = isVerified;
        req.user.token = token;
        console.log("this is the logged in user data", req.user);
      } else {
        req.user = null;
      }
      return next();
    } catch (err) {
      console.log(" get an error  token is not matched menas", err);
      return res
        .status(500)
        .json({ error: "token is not valid you need to login again" });
    }
  },
};
