const User = require("./user");
const BlogPost = require("./blogPost");
const Comments = require("./comments");

BlogPost.hasMany(Comments, {
  foreignKey: "blog_id",
});

// Comments.belongsTo(BlogPost, {
//   foreignKey: "comment_id",
// });

User.hasMany(BlogPost, {
  foreignKey: "user_id",
});

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comments, {
  foreignKey: "user_id",
});

Comments.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, BlogPost, Comments };
