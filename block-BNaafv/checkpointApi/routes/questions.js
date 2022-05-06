const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Question = require("../models/questions");
const User = require("../models/users");
const Answer = require("../models/answers");

//get all the questions
router.get("/", async (req, res) => {
  try {
    let questions = await Question.find({}).populate({
      path: "author",
      select: ["username"],
    });
    res.status(202).json({ questions: questions });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//create a question
router.post("/", auth.isVerified, async (req, res) => {
  try {
    //convert the tags string into an array
    req.body.slug = "";
    req.body.tags = req.body.tags.split(",");
    req.body.author = req.user.id;
    let question = await Question.create(req.body);
    let updateUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { questions: question._id },
      },
      { new: true }
    );
    console.log("user is also updated", updateUser);
    res.status(201).json({ question: question });
  } catch (err) {
    res.status(500).json({ question: "question is not created right now " });
  }
});

//update question
router.put("/:slug", auth.isVerified, async (req, res) => {
  //   if the user update tags then once again convert str to array
  if (req.body.tags) {
    req.body.tags = req.body.tags.split(",");
  }
  //   if user change its  title then also chage its slug
  if (req.body.title) {
    req.body.slug = req.body.title.split(" ").join("_");
  }
  try {
    let question = await Question.findOne({ slug: req.params.slug });
    // if user who is updating article is the author of that article then
    // only he can update the article
    if (question.author == req.user.id) {
      //udpate question
      const updatedQuestion = await Question.findByIdAndUpdate(
        question._id,
        req.body,
        { new: true }
      );
      res.status(201).json({ question: updatedQuestion });
    }
    // if user is not author of this article then
    res.status(500).json({ error: "sorry you are not authorized to update" });
  } catch (err) {
    res.status(500).json({ question: "question is not updated " });
  }
});

//delete an question only its creator can delete the question
//other users are not authorized ot delete this question
router.delete("/:slug", auth.isVerified, async (req, res) => {
  try {
    let question = await Question.findOne({ slug: req.params.slug });
    // only user who create this question can delete this question
    if (question.author == req.user.id) {
      //udpate question
      const deletedQuestion = await Question.findByIdAndDelete(question._id);
      res.status(201).json({ question: deletedQuestion });
    }
    // if user is not author of this article then
    res.status(500).json({ error: "sorry you are not authorized to delete" });
  } catch (err) {
    res.status(500).json({ question: "question is not deleted " });
  }
});

//add an answer
router.post("/:questionid/answer", auth.isVerified, async (req, res) => {
  try {
    let questionId = req.params.questionid;
    req.body.questionId = questionId;
    req.body.author = req.user.id;
    let answer = await Answer.create(req.body);
    //now also update question document and add the answer id
    let updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      {
        $push: { answers: answer },
      },
      { new: true }
    );
    //return the created answer
    res.status(201).json({ answer: answer });
  } catch (err) {
    res.status(500).json({ error: "answer is not submitted" });
  }
});



module.exports = router;
