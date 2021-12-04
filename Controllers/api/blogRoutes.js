const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models");

router.get("/:id", async (req, res) => {
  try {
    const getPost = await BlogPost.findByPk(req.params.id, {});
    const post = getPost.get({ plain: true });
    req.session.post_id = post.id;
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

router.delete("/:id", async (req, res) => {
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
    res.status(201).json(deletePost);
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Could not delete post",
    });
  }
});

module.exports = router;
