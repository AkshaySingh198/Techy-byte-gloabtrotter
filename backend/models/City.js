const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: 'India'
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cost_index: {
    type: DataTypes.FLOAT,
    defaultValue: 2.5
  },
  popularity_score: {
    type: DataTypes.INTEGER,
    defaultValue: 80
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  best_season: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'cities',
  timestamps: true,
  underscored: true
});

module.exports = City;
