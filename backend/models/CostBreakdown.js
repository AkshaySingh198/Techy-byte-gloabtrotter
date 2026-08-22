const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CostBreakdown = sequelize.define('CostBreakdown', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  trip_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('transport', 'stay', 'activity', 'meals'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  day_number: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'cost_breakdowns',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      fields: ['trip_id', 'day_number']
    }
  ]
});

module.exports = CostBreakdown;
