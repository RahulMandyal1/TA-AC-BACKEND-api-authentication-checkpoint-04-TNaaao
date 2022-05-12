const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answerId: { type: Schema.Types.ObjectId, ref: "Answer" },
  questionId: { type: Schema.Types.ObjectId, ref: "Question" },
});

let Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
