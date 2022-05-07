const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Question = require("../models/questions");
const User = require("../models/users");
const Answer = require("../models/answers");
const Comment = require("../models/comments");
//update an aswer
router.put("/:answerId", auth.isVerified, async (req, res) => {
  try {
    let answer = await Answer.findById(req.params.answerId);
    // only the user who have submitted the answer can edit  update the answer
    if (answer.author == req.user.id) {
      let updatedAnswer = await Answer.findByIdAndUpdate(answer._id, req.body, {
        new: true,
      });
      //   return updated answer
      return res.status(200).json({ answer: updatedAnswer });
    }
    // this will return only when if the user who is trying to edit
    // is not the same user who have created this answer
    res.status(500).json({
      error: "sorry you are not authorized to edit other user answers",
    });
  } catch (err) {
    res.status(500).json({ error: "answer is not updated" });
  }
});

//delete the answer
router.delete("/:answerId", auth.isVerified, async (req, res) => {
  try {
    let answer = await Answer.findById(req.params.answerId);
    // only the user who had created the answer can only delete the answer
    if (answer.author == req.user.id) {
      let removedAnswer = await Answer.findByIdAndDelete(answer._id);
      let removeReference = await Question.findByIdAndUpdate(
        removedAnswer.questionId,
        { $pull: { answers: answer._id } },
        { new: true }
      );
      console.log("removed the reference", removeReference);
      //   return updated answer
      return res.status(200).json({ answer: removedAnswer });
    }
    // this will return only when if the user who is trying to delete
    // is not the same user who have created this answer
    res.status(500).json({
      error: "sorry you are not authorized to delete other user answers",
    });
  } catch (err) {
    res.status(500).json({ error: "answer is not deleted" });
  }
});

//upvote user answer once the autheticated user clicks on  upvote button
router.get("/:answerId/upvote", auth.isVerified, async (req, res) => {
  try {
    let upvoteAnswer = await Answer.findByIdAndUpdate(
      req.params.answerId,
      { $inc: { upvote: 1 } },
      { new: true }
    );
    res.status(202).json({ answer: upvoteAnswer });
  } catch (err) {
    res.status(500).json({ error: "answer is not upvoted" });
  }
});

/// add comments on  answer
router.post("/:answerId/comment", auth.isVerified, async (req, res) => {
  try {
    req.body.author = req.user.id;
    req.body.answerId = req.params.answerId;
    let comment = await Comment.create(req.body);
    let updatedAnswer = await Answer.findByIdAndUpdate(
      req.params.answerId,
      {
        $push: { comments: comment._id },
      },
      { new: true }
    );
    res.status(201).json({ comment: comment });
  } catch (err) {}
});
module.exports = router;
