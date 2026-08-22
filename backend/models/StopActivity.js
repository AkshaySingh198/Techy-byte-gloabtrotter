const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const StopActivity = sequelize.define('StopActivity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  stop_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activity_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  scheduled_time: {
    type: DataTypes.STRING,
    allowNull: true
  },
  day_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'stop_activities',
  timestamps: true,
  underscored: true
});

module.exports = StopActivity;
