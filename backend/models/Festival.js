const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Festival = sequelize.define('Festival', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'festivals',
  timestamps: true,
  underscored: true
});

module.exports = Festival;
