const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ExpenseShare = sequelize.define('ExpenseShare', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  expense_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount_owed: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  settled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'expense_shares',
  timestamps: true,
  underscored: true
});

module.exports = ExpenseShare;
