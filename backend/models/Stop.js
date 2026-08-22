const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Stop = sequelize.define('Stop', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  trip_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  arrival_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  departure_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'stops',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      fields: ['trip_id', 'order_index']
    }
  ]
});

module.exports = Stop;
