const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BlogComment = sequelize.define('BlogComment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'blog_comments',
  timestamps: true,
  underscored: true
});

module.exports = BlogComment;
