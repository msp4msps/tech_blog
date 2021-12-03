const sequelize = require("../Config/connection");
const { User, BlogPost, Comments } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentsData = require("./comments.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await BlogPost.bulkCreate(blogData);
  await Comments.bulkCreate(commentsData);

  process.exit(0);
};

seedDatabase();
