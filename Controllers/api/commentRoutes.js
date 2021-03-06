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

router.get("/:id", async (req, res) => {
  try {
    const getPost = await Comments.findByPk(req.params.id, {});
    const post = getPost.get({ plain: true });
    console.log(post);
    res.json(post);
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Could not grab post",
    });
  }
});

module.exports = router;
