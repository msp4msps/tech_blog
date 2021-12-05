const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", async (req, res) => {
  try {
    const getPost = await BlogPost.findByPk(req.params.id, {});
    const post = getPost.get({ plain: true });
    req.session.post_id = post.id;
    console.log(post);
    res.json(post);
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Could not grab post",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
      created_date: new Date(),
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatePost = await BlogPost.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).json({
      status: "Success",
      message: "Post Updated",
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err,
    });
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletePost = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletePost) {
      res.status(404).json({
        status: "Fail",
        message: "No post found with this id",
      });
      return;
    }
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Could not delete post",
    });
  }
});

module.exports = router;
