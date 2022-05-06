const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Question = require("../models/questions");
const User = require("../models/users");
const Answer = require("../models/answers");

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
module.exports = router;
