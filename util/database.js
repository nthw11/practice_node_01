const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog-project', 'root', 'fNjbEdLAP7cn', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
