const router = require("express").Router();
const { BlogPost, User } = require("../models");

//GET All Blog POST for Homepage

router.get("/", async (req, res) => {
  try {
    const dbBlogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = dbBlogData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      // username: req.session.username,
      // user_id: req.session.user_id,
      // loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err,
    });
  }
});

module.exports = router;