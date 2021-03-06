let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let answersSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    questionId: { type: Schema.Types.ObjectId, ref: "Question" },
    upvoteCount: { type: Number, default: 0 },
    upvotedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

let Answer = mongoose.model("Answer", answersSchema);
module.exports = Answer;
