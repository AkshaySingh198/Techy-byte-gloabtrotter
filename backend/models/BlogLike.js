const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BlogLike = sequelize.define('BlogLike', {
  blog_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'blog_likes',
  timestamps: true,
  underscored: true
});

module.exports = BlogLike;
