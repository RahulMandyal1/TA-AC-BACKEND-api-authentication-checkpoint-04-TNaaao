const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
require("dotenv").config();

let userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

// hash  the user password before saving user data sinto the database
userSchema.pre("save", async function (req, res, next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (e) {
    res.status(500).json(e);
  }
});

//sign the user web token here to authenticate  the user
userSchema.methods.signToken = function () {
  let payload = {
    id: this.id,
    username: this.username,
    email: this.email,
  };
  try {
    let token = jwt.sign(payload, process.env.SECRET);
    console.log(token);
    return token;
  } catch (e) {
    res
      .status(500)
      .json({ error: " an error occured while signing the token " });
  }
};
let User = mongoose.model("User", userSchema);

module.exports = User;
