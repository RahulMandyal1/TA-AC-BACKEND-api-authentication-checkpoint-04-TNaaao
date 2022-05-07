const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answerId: { type: Schema.Types.ObjectId, ref: "Answer" },
});

let Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
