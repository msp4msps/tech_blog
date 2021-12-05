const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log("posting");
  try {
    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,
      blog_id: req.session.post_id,
      created_date: new Date(),
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
