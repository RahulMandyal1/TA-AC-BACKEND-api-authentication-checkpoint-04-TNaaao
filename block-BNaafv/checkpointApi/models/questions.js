const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    tags: [String],
    slug: { type: String },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

// to assign  slug to article document
questionSchema.pre("save", function (next) {
  this.slug = this.title + randomNumber();
  this.slug = this.slug.split(" ").join("-");
  next();
});

function randomNumber(num = 123223) {
  return Math.floor(Math.random() * num);
}

let Question = mongoose.model("Question", questionSchema);
module.exports = Question;
