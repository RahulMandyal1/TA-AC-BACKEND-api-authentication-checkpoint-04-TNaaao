const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Question = require("../models/questions");
const User = require("../models/users");
const Answer = require("../models/answers");
const Comment = require("../models/comments");


// a blocked user can have no longer access to these routes
router.use(auth.isAuthorized);

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

//upvote answer  one user can upvote for only single time
router.get("/:answerId/upvote", auth.isVerified, async (req, res) => {
  try {
    let answer = await Answer.findById(req.params.answerId);
    // a user can upvote only once not multiple times
    if (!answer.upvotedBy.includes(req.user.id)) {
      let upvoteAnswer = await Answer.findByIdAndUpdate(
        req.params.answerId,
        { $inc: { upvoteCount: 1 }, $push: { upvotedBy: req.user.id } },
        { new: true }
      );
      return res.status(202).json({ answer: upvoteAnswer });
    }
    res.status(500).json({ message: "you can not upvote multiple times" });
  } catch (err) {
    res.status(500).json({ error: "answer is not upvoted" });
  }
});

//remove your  vote from answer but only those user can remove their vote whose
// have voted  for a answer
router.get("/:answerId/removevote", auth.isVerified, async (req, res) => {
  try {
    let answer = await Answer.findById(req.params.answerId);
    // a user can upvote only once not multiple times
    if (answer.upvotedBy.includes(req.user.id)) {
      let removeUpvote = await Answer.findByIdAndUpdate(
        req.params.answerId,
        { $inc: { upvoteCount: -1 }, $pull: { upvotedBy: req.user.id } },
        { new: true }
      );
      return res.status(202).json({ answer: removeUpvote });
    }
    res.status(500).json({ message: "you  have not added a vote yet " });
  } catch (err) {
    res.status(500).json({ error: "your vote on answer is not removed" });
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
