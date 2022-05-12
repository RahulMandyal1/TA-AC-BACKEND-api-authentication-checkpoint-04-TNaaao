const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Question = require("../models/questions");
const User = require("../models/users");
const Answer = require("../models/answers");
const Comment = require("../models/comments");
let dataformat = require("../helpers/formatdata");
let {
  userJSON,
  userProfile,
  formatQuestion,
  formatQuestions,
  formatAnswer,
  formatAnswers,
  formatComment,
} = dataformat;
// a blocked user can have no longer access to these routes
router.use(auth.isAuthorized);

//update an aswer
router.put("/:answerId", auth.isVerified, async (req, res, next) => {
  try {
    let answer = await Answer.findById(req.params.answerId);
    // only the user who have submitted the answer can edit  update the answer
    if (answer.author == req.user.id) {
      let updatedAnswer = await Answer.findByIdAndUpdate(answer._id, req.body, {
        new: true,
      }).populate("author");
      //   return updated answer
      return res.status(200).json({ answer: formatAnswer(updatedAnswer) });
    }
    // this will return only when if the user who is trying to edit
    // is not the same user who have created this answer
    res.status(400).json({
      error: "sorry you are not authorized to edit other user answers",
    });
  } catch (error) {
    next(error);
  }
});

//delete the answer
router.delete("/:answerId", auth.isVerified, async (req, res, next) => {
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
      let deleteComment = await Comment.deleteMany({ answerId: answer._id });
      //   return updated answer
      return res.status(200).json({ message: "article deleted sucessfully" });
    }
    // this will return only when if the user who is trying to delete
    // is not the same user who have created this answer
    res.status(400).json({
      error: "sorry you are not authorized to delete other user answers",
    });
  } catch (error) {
    next(error);
  }
});

//upvote answer  one user can upvote for only single time
router.get("/:answerId/upvote", auth.isVerified, async (req, res, next) => {
  try {
    let answer = await Answer.findById(req.params.answerId);
    // a user can upvote only once not multiple times
    if (!answer.upvotedBy.includes(req.user.id)) {
      let upvoteAnswer = await Answer.findByIdAndUpdate(
        req.params.answerId,
        { $inc: { upvoteCount: 1 }, $push: { upvotedBy: req.user.id } },
        { new: true }
      ).populate("author");
      return res.status(202).json({ answer: formatAnswer(upvoteAnswer) });
    }
    res.status(400).json({ message: "you can not upvote multiple times" });
  } catch (error) {
    next(error);
  }
});

//remove your  vote from answer but only those user can remove their vote whose
// have voted  for a answer
router.get("/:answerId/removevote", auth.isVerified, async (req, res, next) => {
  try {
    let answer = await Answer.findById(req.params.answerId);
    // a user can upvote only once not multiple times
    if (answer.upvotedBy.includes(req.user.id)) {
      let removeUpvote = await Answer.findByIdAndUpdate(
        req.params.answerId,
        { $inc: { upvoteCount: -1 }, $pull: { upvotedBy: req.user.id } },
        { new: true }
      ).populate("author");
      return res.status(202).json({ answer: formatAnswer(removeUpvote) });
    }
    res.status(400).json({ message: "you  have not added a vote yet " });
  } catch (error) {
    next(error);
  }
});

/// add comments on  answer
router.post("/:answerId/comment", auth.isVerified, async (req, res, next) => {
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
    comment = await Comment.findById(comment._id).populate("author");
    res.status(201).json({ comment: formatComment(comment) });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
