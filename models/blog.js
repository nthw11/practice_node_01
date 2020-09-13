const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Blog = sequelize.define('blog', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  item1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  item2: {
    type: Sequelize.STRING,
    allowNull: true
  },
  item3: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tags: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: { type: Sequelize.DATE}
});

module.exports = Blog;