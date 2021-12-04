const router = require("express").Router();
const session = require("express-session");
const { BlogPost, User, Comments } = require("../models");

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
      username: req.session.username,
      user_id: req.session.user_id,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err,
    });
  }
});

router.get("/:id", async (req, res) => {
  // if (!req.session.loggedIn) {
  //   res.redirect("/login");
  //   return;
  // }
  try {
    const dbBlogData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          attributes: ["commentBody", "created_date"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        { model: User, attributes: ["username"] },
      ],
    });
    const post = dbBlogData.get({ plain: true });
    req.session.post_id = post.id;
    res.render("blogPost", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err,
    });
  }
});

// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

module.exports = router;
