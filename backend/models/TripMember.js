const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TripMember = sequelize.define('TripMember', {
  trip_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('owner', 'editor', 'viewer'),
    defaultValue: 'editor'
  },
  status: {
    type: DataTypes.ENUM('invited', 'accepted'),
    defaultValue: 'accepted'
  },
  document_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  document_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  invited_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'trip_members',
  timestamps: false,
  underscored: true
});

module.exports = TripMember;
